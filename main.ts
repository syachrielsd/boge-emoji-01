// Your Agent in One Emoji — entry program.
//
// Writes exactly one emoji glyph to entry.txt in the output directory.
// The glyph: 🧞 (genie, U+1F9DE) — an agent is a doer of its person's
// bidding; a genie grants wishes and executes tasks on command. It reads
// instantly at small size, is specific about how the agent works, is
// distinctive (not the obvious robot or smiley), and its playful tone fits.
//
// Deterministic, stdlib only, no network, no secrets.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single glyph this entry submits.
const EMOJI = "🧞";

// The output directory: the grader's directory, or /output by default.
// An empty env value counts as unset, so a stray empty variable cannot
// send the output to the current directory by accident.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";

// Guard the gate's own rules before writing: exactly one grapheme,
// non-whitespace, valid UTF-8 text.
if ([...EMOJI].length !== 1 || EMOJI.trim().length === 0) {
  throw new Error("entry glyph must be exactly one non-whitespace character");
}

mkdirSync(outputDir, { recursive: true });
// Write the glyph alone — no trailing newline, no extra text.
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, EMOJI, "utf8");

// Self-check: read the file back and confirm it is byte-identical to
// the glyph's UTF-8 encoding, so a silent write failure cannot pass.
const written = readFileSync(outPath);
const expected = Buffer.from(EMOJI, "utf8");
if (!written.equals(expected)) {
  throw new Error(
    `entry.txt mismatch: wrote ${written.length} bytes, expected ${expected.length}`,
  );
}
