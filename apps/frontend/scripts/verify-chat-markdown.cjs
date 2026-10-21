/** Render the actual component to HTML without installing a test runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const componentPath = path.resolve(__dirname, '../src/features/chat/components/ChatMarkdown.tsx');
const compiled = ts.transpileModule(fs.readFileSync(componentPath, 'utf8'), {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const loaded = new Module(componentPath, module);
loaded.filename = componentPath;
loaded.paths = Module._nodeModulePaths(path.dirname(componentPath));
loaded._compile(compiled, componentPath);
const { ChatMarkdown } = loaded.exports;
const render = (content, renderInline) => renderToStaticMarkup(React.createElement(ChatMarkdown, { content, renderInline }));
const checks = [];
const text = render('## Course topics\n\n- **Matter** and consciousness\n- Historical materialism\n\n1. Read\n2. Practice\n\nUse `evidence` and *reasoning*.');
for (const [name, marker] of [
  ['headings', '<h3'], ['bold', '<strong>Matter</strong>'],
  ['bulleted lists', '<ul'], ['numbered lists', '<ol'],
  ['inline code', '>evidence</code>'], ['emphasis', '<em>reasoning</em>'],
]) { assert.ok(text.includes(marker), name); checks.push({ name, status: 'passed' }); }
const unsafe = render('<script>alert(1)</script>\n\n[Open](javascript:alert(1))');
assert.ok(!unsafe.includes('<script>'));
assert.ok(!unsafe.includes('<a '));
checks.push({ name: 'HTML and model-provided links remain inert text', status: 'passed' });
const code = render('```js\n<script>alert(1)</script>\n```');
assert.ok(code.includes('<pre') && code.includes('&lt;script&gt;'));
checks.push({ name: 'Code blocks remain escaped', status: 'passed' });
const citation = render('## Course\n\n- Triết [R1]', line => React.createElement('span', null,
  line.replace('[R1]', ''), line.includes('[R1]') ? React.createElement('a', { href: '/course/test' }, 'Triết') : null));
assert.ok(citation.includes('<h3') && citation.includes('<a href="/course/test">Triết</a>'));
checks.push({ name: 'Citation callback is preserved in formatted blocks', status: 'passed' });
console.log(JSON.stringify({ scope: 'Real React component rendered on the server; no browser or model simulation', checks }, null, 2));
