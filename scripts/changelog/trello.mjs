// Minimal Trello REST client for the changelog scripts.
// Needs TRELLO_KEY, TRELLO_TOKEN and TRELLO_BOARD (board id or short link).

const API = "https://api.trello.com/1";

function auth() {
  const key = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;
  const board = process.env.TRELLO_BOARD;
  if (!key || !token || !board) {
    throw new Error("Set TRELLO_KEY, TRELLO_TOKEN and TRELLO_BOARD");
  }
  return { key, token, board };
}

export async function trello(method, path, params = {}) {
  const { key, token } = auth();
  const query = new URLSearchParams({ key, token, ...params });
  const res = await fetch(`${API}/${path}?${query}`, { method });
  if (!res.ok) {
    throw new Error(`Trello ${method} ${path}: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

export const boardId = () => auth().board;

export async function listByName(name) {
  const lists = await trello("GET", `boards/${boardId()}/lists`, { fields: "name" });
  const list = lists.find((l) => l.name.toLowerCase() === name.toLowerCase());
  if (!list) throw new Error(`No "${name}" list on the board`);
  return list;
}

export async function labelsByName() {
  const labels = await trello("GET", `boards/${boardId()}/labels`, { fields: "name", limit: "100" });
  return Object.fromEntries(labels.filter((l) => l.name).map((l) => [l.name, l.id]));
}

export async function cardsInList(listId) {
  return trello("GET", `lists/${listId}/cards`, {
    fields: "name,desc,idLabels,idMembers,shortUrl,dateLastActivity",
  });
}

// The "Customer changelog" section of a card description:
//
//   **Customer changelog** (draft by Claude, edit before deploy)
//   Type: New | Improved | Fixed
//   Area: Loyalty | Reviews | Storefront | Integrations | Admin
//   Title: ...
//   Summary: ...
//   Docs: /docs/...            (optional)
export const NOTE_HEADER = "**Customer changelog**";
export const DRAFT_MARK = "(draft by Claude, edit before deploy)";

export function parseNote(desc) {
  const start = desc.indexOf(NOTE_HEADER);
  if (start === -1) return null;
  const headerLine = desc.slice(start).split("\n")[0];
  const body = desc.slice(start + headerLine.length).split(/\n\*\*/)[0];
  const field = (name) => body.match(new RegExp(`^${name}:\\s*(.+)$`, "mi"))?.[1].trim();
  const type = field("Type")?.toLowerCase();
  const note = {
    type,
    area: field("Area"),
    title: field("Title"),
    summary: field("Summary"),
    docsHref: field("Docs") || undefined,
    draft: headerLine.includes(DRAFT_MARK),
  };
  if (!["new", "improved", "fixed"].includes(type) || !note.area || !note.title || !note.summary) {
    return { ...note, invalid: true };
  }
  return note;
}

// Wording rules every changelog entry must pass. Merchants read these, so they
// must sound like a person explaining a change, not like marketing or AI filler.
const BANNED_WORDS = [
  "seamless", "seamlessly", "effortless", "effortlessly", "unlock", "unlocks", "elevate",
  "empower", "empowers", "leverage", "supercharge", "game-changer", "game changer",
  "revolutionize", "revolutionary", "delve", "robust", "streamline", "streamlined",
  "cutting-edge", "next-level", "world-class", "best-in-class", "harness", "boost",
  "excited", "thrilled", "delighted", "enhanced", "utilize", "journey", "tapestry",
];

export function lintNote(note) {
  const problems = [];
  const text = `${note.title}\n${note.summary}`;
  if (/[—–]/.test(text)) problems.push("uses an em or en dash");
  if (/!/.test(text)) problems.push("uses an exclamation mark");
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(text)) problems.push("uses an emoji");
  for (const word of BANNED_WORDS) {
    // Matches word forms too: "unlock" catches "unlocked", "boost" catches "boosted".
    if (new RegExp(`\\b${word}\\w*`, "i").test(text)) problems.push(`uses "${word}"`);
  }
  if (note.title.length > 70) problems.push("title is longer than 70 characters");
  if (note.title !== note.title.trim() || /\.$/.test(note.title)) problems.push("title ends with a period or space");
  const sentences = note.summary.split(/(?<=[.?])\s+/).filter(Boolean);
  if (sentences.length > 3) problems.push("summary is longer than 3 sentences");
  if (note.summary.length > 320) problems.push("summary is longer than 320 characters");
  return problems;
}

export function formatNote(note, { draft }) {
  const lines = [
    `${NOTE_HEADER}${draft ? ` ${DRAFT_MARK}` : ""}`,
    `Type: ${note.type[0].toUpperCase()}${note.type.slice(1)}`,
    `Area: ${note.area}`,
    `Title: ${note.title}`,
    `Summary: ${note.summary}`,
  ];
  if (note.docsHref) lines.push(`Docs: ${note.docsHref}`);
  return lines.join("\n");
}
