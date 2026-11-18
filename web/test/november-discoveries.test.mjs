import test from 'node:test';
import assert from 'node:assert/strict';
import {expandedNovemberPicks} from '../public/november-discoveries.mjs';
import {novemberLeaders} from '../public/november-leaderboard.mjs';
import {curated} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
import {publishedServices, editorialProviders} from '../public/editorial-providers.mjs';
import {serviceResults} from '../public/submissions.mjs';

test('additional November products have distinct launch pages and practical directory entries', () => {
  const collection = renderRoute('/product-hunt-picks', curated);
  const ids = new Set(novemberLeaders.map(tool => tool.id));
  assert.equal(expandedNovemberPicks.length, 50);
  assert.equal(new Set(expandedNovemberPicks.map(tool => tool.discoveryUrl)).size, 50);
  assert.ok(collection.includes('id="more-november-products"'));
  for (const tool of expandedNovemberPicks) {
    assert.ok(!ids.has(tool.id));
    assert.ok(collection.includes('href="/tools/' + tool.id + '"'));
    assert.ok(collection.includes(tool.discoveryUrl));
    assert.equal(new URL(tool.discoveryUrl).hostname, 'www.producthunt.com');
    assert.ok(curated.some(row => row.id === tool.id));
    assert.ok(renderRoute('/tools/' + tool.id, curated).includes(tool.url));
  }
});

test('service directory includes editorial providers before hydration and preserves a community claim', () => {
  const directory = renderRoute('/services', curated);
  assert.equal(editorialProviders.length, 10);
  for (const provider of editorialProviders) assert.ok(directory.includes(provider.website));
  assert.ok(directory.includes('Waymaker operates both this agency and AI Superpower.'));
  const agencies = serviceResults(editorialProviders, 'All', 'AI agency');
  assert.ok(agencies.includes('NineTwoThree'));
  assert.ok(!agencies.includes('Credo AI Advisory'));
  const provider = editorialProviders.find(row => row.id === 'ninetwothree');
  const claim = {...provider, id: 'community-record', editorial: false};
  const rows = publishedServices([claim]);
  assert.equal(rows.length, editorialProviders.length);
  assert.ok(rows.some(row => row.id === 'community-record'));
});
