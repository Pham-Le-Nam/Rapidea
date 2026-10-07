import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";

// Exercise the actual TypeScript helper without adding a test-runtime dependency.
const source = readFileSync(new URL("./ai-conversations.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { mergeAiConversationHistory } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const conversation = (id, lastMessageAt) => ({ id, lastMessageAt, title: id });

test("learner and instructor conversations share one newest-first list", () => {
    const result = mergeAiConversationHistory(
        [conversation("learner", "2026-10-05T10:00:00Z")],
        [conversation("instructor", "2026-10-06T10:00:00Z")], true,
    );
    assert.deepEqual(result.map(c => [c.id, c.mode]), [["instructor", "INSTRUCTOR"], ["learner", "LEARNER"]]);
});
test("non-instructors cannot see cached instructor conversations", () => {
    const result = mergeAiConversationHistory([conversation("learner", "2026-10-05")], [conversation("private", "2026-10-06")], false);
    assert.deepEqual(result.map(c => c.id), ["learner"]);
});
test("history stream determines the mode even when an older response omits it", () => {
    assert.equal(mergeAiConversationHistory([], [conversation("teacher", "2026-10-06")], true)[0].mode, "INSTRUCTOR");
});
test("pagination duplicates are removed and equal timestamps have stable ordering", () => {
    const result = mergeAiConversationHistory([conversation("a", "2026-10-06"), conversation("b", "2026-10-06"), conversation("a", "2026-10-06")], [], false);
    assert.deepEqual(result.map(c => c.id), ["b", "a"]);
});
test("merging does not mutate stored conversation modes or source arrays", () => {
    const original = Object.freeze({ ...conversation("teacher", "2026-10-06"), mode: "LEARNER" });
    const input = Object.freeze([original]);
    assert.equal(mergeAiConversationHistory([], input, true)[0].mode, "INSTRUCTOR");
    assert.equal(original.mode, "LEARNER");
});
