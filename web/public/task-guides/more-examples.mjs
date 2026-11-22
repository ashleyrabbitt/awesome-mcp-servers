// Illustrative answer keys for practice briefs. Published execution reports live at /tool-tests.
export const moreExamples={
 'build-a-sales-proposal':{
  title:'Check the proposal against the brief',headings:['Draft term','Acceptable wording'],rows:[['Price and scope','One booking-page review and one revised page for a fixed $1,200.'],['Delivery trigger','Ten business days after the client provides access.'],['Client handoff','The client supplies the images.'],['Exclusions','Advertising and ongoing support require a separate agreement.']],
  note:'A draft promising delivery ten days from signature changes the agreement. Revise the start condition before sending it.'},
 'plan-a-social-campaign':{
  title:'Work backward from the booking deadline',headings:['Draft','Purpose','Check'],rows:[['Monday photo post','Show the ceramics workshop and invite bookings.','Eight seats total. Link to registration.'],['Wednesday short clip','Show the activity and remind viewers of the deadline.','Thursday at noon. Verify remaining seats before mentioning a number.'],['Friday post','Share a behind-the-scenes detail.','Remove the closed registration link.']],
  note:'Count bookings from tagged links. Post views can tell you who saw the campaign but cannot establish how many seats it filled.'},
 'review-research-papers':{
  title:'Work through a miniature evidence table',headings:['Fictional record','Observation','Allowed conclusion'],rows:[['A · 40 learners','Quiz scores increased from 6/10 to 7/10. No control group.','The observed group gained one point. Cause is uncertain.'],['B · 60 learners','Two groups scored 74% and 70% on the same assessment.','The observed difference is four percentage points.'],['C · 30 learners','Reported confidence rose on a five-point scale.','A self-rating measures a different outcome from a quiz.']],
  note:'These invented records illustrate the method. A real synthesis needs resolvable citations and source passages. Keep the confidence score separate from the quiz results.'},
 'make-content-accessible':{
  title:'Check what the audience will actually receive',headings:['Sample element','Worked output','Review'],rows:[['Workshop slide','“Workshop, Thursday at noon. Register by Wednesday.”','Match the actual time and action on the slide.'],['Chart of 3, 5 and 8 bookings','“Bookings rose from 3 to 5 to 8 over three weeks.”','Provide the week labels in adjacent text or a table.'],['Spoken introduction','Caption the spoken words and identify the speaker where needed.','Play with sound muted and check names, timing and meaning.']],
  note:'The quoted copy is an example. Replace it with the facts and purpose of your own material.'},
 'clean-up-a-podcast':{
  title:'Make an edit log from the same 30-second clip',headings:['Listen for','Example observation','Decision'],rows:[['Quiet phrase','The final syllable drops out after noise reduction.','Lower the reduction and compare at the same playback level.'],['Repeated sentence','Both the repetition and the following natural pause disappeared.','Restore the pause and remove only the repeated sentence.'],['Room tone','A metallic ringing is audible on headphones.','Compare a smaller adjustment with the untouched source.']],
  note:'These are illustrative listening notes. Save timecodes and the original clip so another editor can hear your judgment.'},
 'design-a-room':{
  title:'Check a concept against the measured room',headings:['Check','Example finding','Decision'],rows:[['Door swing','The chair overlaps the traced door arc by 6 inches.','Move it and measure again.'],['Budget','Illustrative chair $320 and lamp $95 total $415.','The $500 brief leaves $85 before delivery or tax.'],['Existing desk','The rendering removed it.','Reject or revise that layout before buying anything.']],
  note:'Save the original room measurements and verify actual product dimensions and prices independently.'},
 'animate-a-still-image':{
  title:'Compare the middle frame with the original',headings:['Moment','Sample observation','Verdict'],rows:[['Start','The printed circle matches the source mug.','Subject identity passes.'],['Middle','The circle stretches into a second handle.','Reject this take or regenerate with gentler motion.'],['End','The push-in and steam match the brief.','Motion passes. The distorted middle still needs fixing.']],
  note:'Record the exact frame or timecode and whether a retry uses more credits. A good final frame can conceal a bad transition.'},
 'evaluate-model-outputs':{
  title:'Score two fictional prediction sets',headings:['Ticket','Expected','Run A','Run B'],rows:[['Billed twice','billing','billing','billing'],['Reset password','account','account','account'],['Dashboard freezes','bug','bug','bug'],['Cannot see my plan','review','billing','review']],
  note:'On these invented outputs, A scores 3/4 (75%) and B scores 4/4 (100%) because B escalates the ambiguous case. Three unambiguous examples alone would give both runs 100%.'},
 'prototype-a-game':{
  title:'Test one complete game loop',headings:['Input','Expected state','Example defect'],rows:[['Catch four stars','Score 4. Play continues.','A missed star increments the score.'],['Catch the fifth','Score 5. Win screen appears once.','Stars keep falling behind the win screen.'],['Choose Restart','Score 0 and movement works again.','Old score persists. Reset the counter during initialization.']],
  note:'Record the device and control method. If only one platform has been exercised, keep the verdict scoped to it.'}
};
