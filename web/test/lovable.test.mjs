import test from 'node:test';
import assert from 'node:assert/strict';
import {
  lovableBase, lovableRoutes, lovablePage, lovableMeta, shelfResources,
} from '../public/lovable-hub.mjs';
import {lovableLessons} from '../public/lovable-lessons.mjs';
import {
  buildLovableBrief, buildLovableCampaign, lovableMetric, installLovable,
} from '../public/lovable-client.mjs';
import {renderRoute} from '../public/views.mjs';
import {pageSEO, seoMarkup} from '../public/seo.mjs';

test('the complete course is rendered as crawlable distinct routes with matching metadata', () => {
  assert.equal(lovableLessons.length, 16);
  assert.equal(new Set(lovableRoutes).size, lovableRoutes.length);
  const titles = new Set(), descriptions = new Set();
  for (const route of lovableRoutes) {
    const html = renderRoute(route, [], {saved: [], compare: []});
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.ok(html.includes('Independent learning guide'), route);
    const seo = pageSEO(route, [], html);
    assert.equal(seo.noindex, false, route);
    assert.equal(seo.canonical, 'https://aisuperpower.cc' + route);
    assert.ok(!titles.has(seo.title), 'duplicate title: ' + route);
    assert.ok(!descriptions.has(seo.description), 'duplicate description: ' + route);
    titles.add(seo.title); descriptions.add(seo.description);
    const page = seo.structured['@graph'].find(item => item['@id'] === seo.canonical + '#page');
    assert.equal(page.isAccessibleForFree, true);
    assert.equal(page.author.name, 'Ashley Kays');
    assert.equal(page['@type'], lovableMeta(route).type);
    assert.ok(!page.aggregateRating && !page.review && !page.offers);
    assert.ok(seoMarkup(seo).includes('rel="canonical"'));
  }
  assert.equal(lovablePage(lovableBase + '/missing-lesson'), null);
  assert.equal(lovableMeta(lovableBase + '/missing-lesson'), null);
  const missing = renderRoute(lovableBase + '/missing-lesson', []);
  assert.equal(pageSEO(lovableBase + '/missing-lesson', [], missing).noindex, true);
});

test('lesson source links are visible and agree with structured citations', () => {
  for (const lesson of lovableLessons) {
    const route = lovableBase + '/' + lesson.id;
    const html = lovablePage(route);
    const page = pageSEO(route, [], html).structured['@graph'].find(item => item['@type'] === 'LearningResource');
    assert.ok(page, lesson.id);
    assert.deepEqual(page.citation, lesson.sources.map(source => source.url));
    assert.ok(html.includes('id="practice-prompt"'));
    assert.ok(html.includes('data-lv-complete="' + lesson.id + '"'));
    for (const source of lesson.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(['docs.lovable.dev', 'developers.google.com', 'support.google.com'].includes(url.hostname));
      assert.ok(html.includes(source.url.replaceAll('&', '&amp;')), source.url);
    }
  }
  const seoLesson = lovableLessons.find(lesson => lesson.id === 'seo-aeo-geo');
  assert.ok(seoLesson.sources.some(source => source.url.includes('16984139')));
});

test('practice data uses six unique resources and the teaching example remains explicitly independent', () => {
  assert.equal(shelfResources.length, 6);
  assert.equal(new Set(shelfResources.map(resource => resource.id)).size, 6);
  const html = lovablePage(lovableBase + '/toolkit');
  for (const resource of shelfResources) {
    assert.match(resource.id, /^[a-z0-9-]+$/);
    assert.ok(html.includes('data-lv-resource="' + resource.id + '"'));
    assert.ok(html.includes(resource.title));
  }
  assert.match(html, /authored teaching example with fictional data/);
  assert.match(lovablePage(lovableBase), /not a recording or proof of a build inside Lovable/);
});

test('custom metrics reject arbitrary actions, IDs and personal text', () => {
  const lesson = lovableLessons[0].id;
  assert.deepEqual(lovableMetric('lesson_view', lesson), {
    name: 'lovable_lesson_view',
    params: {course_id: 'lovable-foundations', content_id: lesson},
  });
  assert.equal(lovableMetric('lesson_view'), null);
  assert.equal(lovableMetric('lesson_complete', 'missing-lesson'), null);
  for (const value of [
    'person@example.com', 'My private client brief', 'https://example.com/?secret=123',
    '</script>', {email: 'person@example.com'}, ['lesson-prompt'], null,
  ]) {
    assert.equal(lovableMetric('prompt_copy', value), null);
    assert.equal(lovableMetric('kit_download', value), null);
    assert.equal(lovableMetric(value, lesson), null);
  }
  const metric = lovableMetric('prompt_copy', 'lv-brief-output', {input: 'private text'});
  assert.deepEqual(Object.keys(metric.params).sort(), ['content_id', 'course_id']);
  assert.ok(!JSON.stringify(metric).includes('private text'));
});

test('campaign links stay on the owned destination and preserve attribution before fragments', () => {
  const destinations = {
    hub: ['/learn/lovable', ''],
    kit: ['/learn/lovable', '#free-kit'],
    tools: ['/learn/lovable/toolkit', ''],
  };
  for (const [destination, [pathname, hash]] of Object.entries(destinations)) {
    const link = buildLovableCampaign({
      destination, source: 'whop', creative: 'first-build-01',
      url: 'https://attacker.example/', email: 'private@example.com',
    });
    const url = new URL(link);
    assert.equal(url.origin, 'https://aisuperpower.cc');
    assert.equal(url.pathname, pathname);
    assert.equal(url.hash, hash);
    assert.equal(url.searchParams.get('utm_source'), 'whop');
    assert.equal(url.searchParams.get('utm_medium'), 'referral');
    assert.equal(url.searchParams.get('utm_campaign'), 'lovable-launch');
    assert.equal(url.searchParams.get('utm_content'), 'first-build-01');
    assert.equal([...url.searchParams].length, 4);
    assert.ok(!link.includes('private'));
  }
  const newsletter = new URL(buildLovableCampaign({destination: 'hub', source: 'newsletter', creative: 'lesson-one'}));
  assert.equal(newsletter.searchParams.get('utm_medium'), 'email');
});

test('campaign generation rejects unsupported and potentially identifying labels', () => {
  const good = {destination: 'hub', source: 'whop', creative: 'lesson-one'};
  for (const creative of ['', 'A', 'has spaces', 'me@example.com', 'a/b', 'x?email=y', 'x'.repeat(65)]) {
    assert.equal(buildLovableCampaign({...good, creative}), null);
  }
  for (const source of ['unknown', 'https://example.com', '__proto__', 'constructor']) {
    assert.equal(buildLovableCampaign({...good, source}), null);
  }
  for (const destination of ['unknown', '//example.com', 'https://example.com']) {
    assert.equal(buildLovableCampaign({...good, destination}), null);
  }
});

test('the brief formatter preserves literal plain text and real line breaks without extra fields', () => {
  const input = {
    audience: '  Freelance designers  ',
    problem: 'Keep the literal $& and `code` text.',
    features: 'Search resources\nFilter by topic',
    exclusions: 'No accounts',
    checks: 'Open a file\nRefresh saved items',
    email: 'private@example.com',
  };
  const brief = buildLovableBrief(input);
  assert.ok(brief.includes('AUDIENCE\nFreelance designers\n\nPROBLEM'));
  assert.ok(brief.includes('Keep the literal $& and `code` text.'));
  assert.ok(brief.includes('Search resources\nFilter by topic'));
  assert.ok(!brief.includes('private@example.com'));
  assert.ok(!brief.includes('\\n'));
  const large = buildLovableBrief({...input, features: 'x'.repeat(2000)});
  const featureText = large.split('FIRST VERSION\n')[1].split('\n\nOUT OF SCOPE')[0];
  assert.equal(featureText.length, 1500);
});

test('blank or whitespace-only brief fields retain a useful prompt instead of empty sections', () => {
  const empty = buildLovableBrief({});
  const whitespace = buildLovableBrief({
    audience: '  ', problem: '\n\t ', features: '  ',
    exclusions: '  ', checks: '\n',
  });
  assert.equal(whitespace, empty);
});

function measurementFixture({analyticsReady = true, blocked = false, readOnlyStorage = false} = {}) {
  const docEvents = new Map(), windowEvents = new Map(), calls = [];
  let page = {dataset: {lvPage: 'lesson', lvLesson: lovableLessons[0].id}};
  const checkbox = {dataset: {lvComplete: lovableLessons[0].id}, checked: false};
  const status = {textContent: '', isConnected: true};
  const doc = {
    readyState: 'complete',
    querySelector(selector) {
      if (selector === '[data-lv-page]') return page;
      if (selector === '[data-lv-status]') return status;
      return null;
    },
    querySelectorAll(selector) {
      return selector === '[data-lv-complete]' && page ? [checkbox] : [];
    },
    addEventListener(name, callback) {
      docEvents.set(name, [...(docEvents.get(name) || []), callback]);
    },
  };
  const scope = {
    location: {hostname: 'aisuperpower.cc', pathname: lovableBase + '/' + lovableLessons[0].id},
    navigator: {globalPrivacyControl: blocked},
    localStorage: {
      getItem() { return null; },
      setItem() { if (readOnlyStorage) throw new Error('Quota exceeded'); },
    },
    addEventListener(name, callback) { windowEvents.set(name, callback); },
    clearTimeout() {},
    setTimeout() { return 1; },
  };
  const enableAnalytics = () => { scope.gtag = (...args) => calls.push(args); };
  if (analyticsReady) enableAnalytics();
  installLovable(doc, scope);
  return {
    calls, checkbox, enableAnalytics,
    event(name, event = {}) { for (const fn of docEvents.get(name) || []) fn(event); },
    load() { windowEvents.get('load')?.(); },
    go(id) {
      page = id ? {dataset: {lvPage: 'lesson', lvLesson: id}} : null;
      scope.location.pathname = id ? lovableBase + '/' + id : '/directory';
      checkbox.dataset.lvComplete = id || lovableLessons[0].id;
    },
  };
}

test('duplicate SPA notifications produce one lesson view per visit and count a return visit', () => {
  const f = measurementFixture();
  assert.equal(f.calls.length, 1);
  f.event('site:navigate'); f.event('site:navigate'); f.load();
  assert.equal(f.calls.length, 1);
  f.go(lovableLessons[1].id);
  f.event('site:navigate'); f.event('site:navigate');
  assert.equal(f.calls.length, 2);
  f.go(null); f.event('site:navigate');
  f.go(lovableLessons[0].id); f.event('site:navigate');
  assert.equal(f.calls.length, 3);
  assert.deepEqual(f.calls.map(call => call[2].content_id), [
    lovableLessons[0].id, lovableLessons[1].id, lovableLessons[0].id,
  ]);
});

test('late analytics initialization retries once and privacy opt-out suppresses collection', () => {
  const delayed = measurementFixture({analyticsReady: false});
  assert.equal(delayed.calls.length, 0);
  delayed.event('site:navigate');
  delayed.enableAnalytics(); delayed.load();
  delayed.event('site:navigate');
  assert.equal(delayed.calls.length, 1);
  const blocked = measurementFixture({blocked: true});
  blocked.event('site:navigate'); blocked.load();
  assert.equal(blocked.calls.length, 0);
});

test('progress remains usable in memory when storage reads succeed but writes fail', () => {
  const f = measurementFixture({readOnlyStorage: true});
  f.checkbox.checked = true;
  f.event('change', {target: f.checkbox});
  assert.equal(f.checkbox.checked, true);
  f.event('site:navigate');
  assert.equal(f.checkbox.checked, true);
});

test('worksheet download metrics allow the six known resource IDs and reject arbitrary filenames', () => {
  for (const resource of shelfResources) {
    assert.deepEqual(lovableMetric('kit_download', resource.id), {
      name: 'lovable_kit_download',
      params: {course_id: 'lovable-foundations', content_id: resource.id},
    });
  }
  for (const id of ['../../private.md', 'new-client-document', 'client@example.com.md']) {
    assert.equal(lovableMetric('kit_download', id), null);
  }
});

test('browser-only forms cannot submit entered text before JavaScript initializes', () => {
  const html = lovablePage(lovableBase + '/toolkit');
  for (const id of ['lv-brief-form', 'lv-campaign-form']) {
    const form = html.match(new RegExp('<form\\b[^>]*id="' + id + '"[^>]*>([\\s\\S]*?)</form>'))?.[1];
    assert.ok(form, id);
    const disabled = form.match(/<fieldset\b[^>]*\bdisabled[^>]*>[\s\S]*?<\/fieldset>/);
    assert.ok(disabled, id + ' has a disabled fieldset without JavaScript');
    assert.ok(!/<(?:input|textarea|select|button)\b/.test(form.replace(disabled[0], '')),
      id + ' must not leave submittable controls outside its disabled fieldset');
    assert.ok(form.includes('<noscript>'));
  }
  assert.match(html, /<button\b[^>]*data-lv-copy="lv-campaign-output"[^>]*\bdisabled/);
});

function shelfFixture() {
  const listeners = new Map(), calls = [], storage = new Map();
  const element = (dataset = {}) => ({
    dataset, attributes: {}, hidden: false, disabled: false, textContent: '', children: [],
    setAttribute(name, value) { this.attributes[name] = value; },
    hasAttribute(name) { return Object.hasOwn(this.attributes, name); },
    closest() { return this; },
    replaceChildren() { this.children = []; },
    append(...children) { this.children.push(...children); },
    focus() { this.focused = true; },
  });
  const search = Object.assign(element(), {id: 'lv-shelf-search', value: ''});
  const topic = Object.assign(element(), {id: 'lv-shelf-topic', value: 'All topics'});
  const saved = Object.assign(element(), {id: 'lv-shelf-saved', checked: false});
  const count = element(), empty = element(), panel = element();
  const cards = shelfResources.map(resource => {
    const button = element({lvSaveResource: resource.id});
    return {...element({lvResource: resource.id}), querySelector: () => button};
  });
  const selectors = new Map([
    ['[data-lv-page]', element({lvPage: 'toolkit'})],
    ['[data-lv-status]', {...element(), isConnected: true}],
    ['#lv-shelf-results', element()], ['#lv-shelf-search', search],
    ['#lv-shelf-topic', topic], ['#lv-shelf-saved', saved],
    ['#lv-shelf-count', count], ['#lv-shelf-empty', empty], ['#lv-resource-detail', panel],
  ]);
  const doc = {
    readyState: 'complete',
    querySelector: selector => selectors.get(selector) || null,
    querySelectorAll: selector => selector === '[data-lv-resource]' ? cards : [],
    addEventListener(name, callback) {
      listeners.set(name, [...(listeners.get(name) || []), callback]);
    },
    createElement: () => element(),
  };
  const scope = {
    location: {hostname: 'aisuperpower.cc', pathname: lovableBase + '/toolkit'},
    navigator: {},
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    gtag: (...args) => calls.push(args),
    addEventListener() {}, clearTimeout() {}, setTimeout() { return 1; },
  };
  installLovable(doc, scope);
  return {
    search, topic, saved, count, empty, panel, calls, element,
    visible: () => cards.filter(card => !card.hidden).map(card => card.dataset.lvResource),
    async event(name, event) {
      for (const callback of listeners.get(name) || []) await callback(event);
    },
  };
}

test('demo search trims whitespace, ignores case, combines topics and can reset no results', async () => {
  const f = shelfFixture();
  assert.equal(f.visible().length, 6);
  f.search.value = '  PORTFOLIO  ';
  await f.event('input', {target: f.search});
  assert.deepEqual(f.visible(), ['portfolio-case-study-outline']);
  assert.equal(f.count.textContent, '1 resource');
  f.topic.value = 'Research';
  await f.event('change', {target: f.topic});
  assert.deepEqual(f.visible(), []);
  assert.equal(f.empty.hidden, false);
  const reset = f.element();
  reset.setAttribute('data-lv-shelf-reset', '');
  await f.event('click', {target: reset});
  assert.equal(f.search.value, '');
  assert.equal(f.topic.value, 'All topics');
  assert.equal(f.visible().length, 6);
  assert.equal(f.empty.hidden, true);
  f.search.value = '   ';
  await f.event('input', {target: f.search});
  assert.equal(f.visible().length, 6);
});

test('opening a resource creates an accessible real worksheet link with its fixed download metric', async () => {
  const f = shelfFixture(), id = shelfResources[0].id;
  await f.event('click', {target: f.element({lvResourceDetail: id})});
  assert.equal(f.panel.hidden, false);
  assert.equal(f.panel.focused, true);
  const link = f.panel.children.find(child => child.href);
  assert.ok(link);
  assert.equal(link.href, '/downloads/lovable/resources/' + id + '.md');
  assert.equal(link.hasAttribute('download'), false);
  assert.equal(link.dataset.lvDownload, id);
  await f.event('click', {target: link});
  const events = f.calls.filter(call => call[1] === 'lovable_kit_download');
  assert.equal(events.length, 1);
  assert.equal(events[0][2].content_id, id);
});
