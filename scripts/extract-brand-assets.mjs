import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const source = process.argv[2];
if (!source) {
  throw new Error("Pass the supplied Genesis Moment logo sheet as the first argument.");
}

const destination = path.resolve("public", "brand");
await mkdir(destination, { recursive: true });

await sharp(source)
  .extract({ left: 1090, top: 870, width: 430, height: 140 })
  .png()
  .toFile(path.join(destination, "genesis-moment-horizontal.png"));

await sharp(source)
  .extract({ left: 8, top: 38, width: 304, height: 342 })
  .png()
  .toFile(path.join(destination, "genesis-moment-emblem.png"));

await sharp(source)
  .extract({ left: 350, top: 870, width: 150, height: 135 })
  .png()
  .toFile(path.join(destination, "genesis-moment-mark.png"));

console.log(`Extracted brand assets to ${destination}`);
