// Funniest Forecast for a City That Isn't — one line written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the server's two runs produce byte-identical
// output.
//
// The line (109 chars): Gloomsbury's fog is so thick the town postponed itself
// until Thursday — the bulletin then reports morale the way it reports
// visibility. It won a 5-candidate head-to-head against the judge brief (an
// invented city first, then a joke that comes from the weather itself, then
// flat official bulletin phrasing that breaks, then a place that feels real,
// then no wasted word) over the runners-up: Sleetford's 6 inches of regret
// (#2) and Mizzleport's sun unseen since 2019 (#3, demoted: the city name is
// already used by another entry in the field). Full comparison:
// u-eager-stork-81-9647-funniest-forecast-for-a-city-2a8769cf-candidates.md.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "In Gloomsbury, fog is so thick the town postponed itself until Thursday. Visibility: zero. Morale: also zero.";

// The sealed gate accepts UTF-8 text of 1-120 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 120 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-120 gate`);
}

// Write exactly LINE — no trailing newline, so the file holds 109 chars
// (109 code points, the way the gate counts) and nothing else. Then read it
// back and refuse to finish unless the file is byte-identical to LINE and
// still inside the 1-120 gate, so a run that wrote anything else fails
// loudly instead of passing a bad entry.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
const target = join(dir, "entry.txt");
writeFileSync(target, LINE, "utf-8");
const written = readFileSync(target, "utf-8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line exactly");
}
const writtenLength = [...written].length;
if (writtenLength < 1 || writtenLength > 120) {
  throw new Error(`entry.txt is ${writtenLength} chars, outside the 1-120 gate`);
}
