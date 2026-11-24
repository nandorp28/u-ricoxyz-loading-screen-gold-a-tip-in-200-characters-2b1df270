import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Tip: if the spinner stops, do not panic. Your agent just found a second bug inside the fix for the first bug and is deciding whether to tell you.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
const roundTrip = readFileSync(`${outDir}/entry.txt`, "utf8");
if (roundTrip !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match the line");
}
console.log(`Wrote ${chars.length} characters`);
