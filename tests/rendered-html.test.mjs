import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("pre-renders the finished Genesis Moment home page", async () => {
  const html = await readFile(
    new URL("../.next/server/app/index.html", import.meta.url),
    "utf8",
  );
  assert.match(html, /<title>The Genesis Moment<\/title>/i);
  assert.match(html, /Who saw something in you before you could see it in yourself\?/);
  assert.match(html, /Most success stories start too late/i);
  assert.match(html, /Belief is not an idea\. It takes a form\./i);
  assert.match(html, /Stories/);
  assert.match(html, /Thoughtcasts/);
  assert.match(html, /The Mustard Seed/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("includes Netlify publishing and form pathways", async () => {
  const [admin, config, forms, packageJson] = await Promise.all([
    readFile(new URL("../public/admin/index.html", import.meta.url), "utf8"),
    readFile(new URL("../public/admin/config.yml", import.meta.url), "utf8"),
    readFile(new URL("../public/forms.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(admin, /decap-cms/i);
  assert.match(admin, /netlify-identity/i);
  assert.match(config, /name:\s*git-gateway/);
  assert.match(config, /name:\s*episodes/);
  assert.match(config, /name:\s*thoughtcasts/);
  assert.match(forms, /data-netlify="true"/);
  assert.match(forms, /tell-your-story/);
  assert.match(forms, /nominate-someone/);
  assert.match(forms, /support-the-ministry/);
  assert.match(packageJson, /generate-content\.mjs/);
});
