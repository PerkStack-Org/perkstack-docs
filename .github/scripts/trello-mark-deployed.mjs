// After a production deploy: finds the PR(s) behind the deployed commit, reads
// the Trello card links in their description and title, moves those cards to the
// board's "Deployed" column and comments with the PR link.
//
// Shared by perkstack, perkstack-docs and perkstack-landing (keep the copies in sync).
// Env: GH_TOKEN, GITHUB_REPOSITORY, DEPLOYED_SHA, TRELLO_KEY, TRELLO_TOKEN, TRELLO_BOARD

const { GH_TOKEN, GITHUB_REPOSITORY, DEPLOYED_SHA, TRELLO_KEY, TRELLO_TOKEN, TRELLO_BOARD } =
  process.env;

async function github(path) {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function trello(method, path, params = {}) {
  const query = new URLSearchParams({ key: TRELLO_KEY, token: TRELLO_TOKEN, ...params });
  const res = await fetch(`https://api.trello.com/1/${path}?${query}`, { method });
  if (!res.ok) throw new Error(`Trello ${method} ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

// A release PR (develop into main) lists no cards itself: they are on the
// feature PRs merged into develop. So for every PR behind the deployed commit,
// also read the PRs behind each of its commits (GitHub returns at most 250).
async function prsBehind(sha) {
  const direct = await github(`repos/${GITHUB_REPOSITORY}/commits/${sha}/pulls`);
  const found = new Map(direct.map((pr) => [pr.number, pr]));
  const messages = [];
  for (const pr of direct) {
    for (let page = 1; page <= 3; page++) {
      const commits = await github(
        `repos/${GITHUB_REPOSITORY}/pulls/${pr.number}/commits?per_page=100&page=${page}`,
      );
      for (const c of commits) {
        messages.push(c.commit.message);
        for (const inner of await github(`repos/${GITHUB_REPOSITORY}/commits/${c.sha}/pulls`)) {
          if (!found.has(inner.number)) found.set(inner.number, inner);
        }
      }
      if (commits.length < 100) break;
    }
  }
  return { prs: [...found.values()], messages };
}

async function main() {
  const { prs, messages } = await prsBehind(DEPLOYED_SHA);
  const commit = await github(`repos/${GITHUB_REPOSITORY}/commits/${DEPLOYED_SHA}`);
  const text = [
    commit.commit.message,
    ...messages,
    ...prs.flatMap((pr) => [pr.title, pr.body ?? ""]),
  ].join("\n");
  const shortLinks = [
    ...new Set([...text.matchAll(/trello\.com\/c\/([A-Za-z0-9]{8})/g)].map((m) => m[1])),
  ];
  if (shortLinks.length === 0) {
    console.log("No Trello card links in the deployed PR; nothing to move.");
    return;
  }

  const lists = await trello("GET", `boards/${TRELLO_BOARD}/lists`, { fields: "name" });
  const deployed = lists.find((l) => l.name.toLowerCase() === "deployed");
  if (!deployed) throw new Error('No "Deployed" list on the board');
  const where =
    prs[0]?.html_url ?? `https://github.com/${GITHUB_REPOSITORY}/commit/${DEPLOYED_SHA}`;

  for (const shortLink of shortLinks) {
    const card = await trello("GET", `cards/${shortLink}`, { fields: "name,idList" });
    if (card.idList === deployed.id) continue;
    await trello("PUT", `cards/${shortLink}`, { idList: deployed.id, pos: "top" });
    await trello("POST", `cards/${shortLink}/actions/comments`, {
      text: `Deployed to production from ${GITHUB_REPOSITORY}: ${where}`,
    });
    console.log(`Moved "${card.name}" to Deployed`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
