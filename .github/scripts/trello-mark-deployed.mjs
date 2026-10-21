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

async function main() {
  const prs = await github(`repos/${GITHUB_REPOSITORY}/commits/${DEPLOYED_SHA}/pulls`);
  const commit = await github(`repos/${GITHUB_REPOSITORY}/commits/${DEPLOYED_SHA}`);
  const text = [commit.commit.message, ...prs.flatMap((pr) => [pr.title, pr.body ?? ""])].join(
    "\n",
  );
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
