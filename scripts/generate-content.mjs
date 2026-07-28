import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
async function readCollection(name) {
  const dir = path.join(root, "content", name);
  const files = (await fs.readdir(dir)).filter((file) => file.endsWith(".json")).sort();
  const values = await Promise.all(files.map(async (file) => JSON.parse(await fs.readFile(path.join(dir, file), "utf8"))));
  return values.filter((item) => item.status === "published");
}

const episodes = await readCollection("episodes");
const thoughtcasts = await readCollection("thoughtcasts");
const source = `// Generated from /content by scripts/generate-content.mjs.\nexport const episodes = ${JSON.stringify(episodes, null, 2)} as const;\n\nexport const thoughtcasts = ${JSON.stringify(thoughtcasts, null, 2)} as const;\n`;
await fs.writeFile(path.join(root, "app", "generated-content.ts"), source);
console.log(`Generated ${episodes.length} episodes and ${thoughtcasts.length} Thoughtcasts.`);
