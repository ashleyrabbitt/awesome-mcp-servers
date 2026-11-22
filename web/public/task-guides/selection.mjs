import {escapeHTML as e} from '../catalog.mjs';
const homeReasons={
 tripmojo:'It builds an itinerary a traveler can check against travel times and booking requirements.',
 currents:'It connects a claimed CI failure to recorded test artifacts a developer can inspect.',
 tamekoshi:'It gives a meeting organizer a concrete way to test what a desktop assistant captures from a call.',
 threadlore:'It lets a designer compare an AI-generated weaving pattern with a physical sample.'
};
export function pickNote(t){
 const reason=homeReasons[t.id]||t.best_for||t.bestFor||t.firstTry||t.description;
 return `<aside class="selection-note"><strong>Why we picked it</strong><p>${e(reason)}</p><small>AI Superpower editorial selection · <time datetime="2026-11-22">November 22, 2026</time></small></aside>`;
}
