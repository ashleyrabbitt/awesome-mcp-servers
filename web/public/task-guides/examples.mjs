// Expected answers to the fictional briefs, for checking a visitor’s own results.
export const referenceExamples={
 'turn-a-spreadsheet-into-a-chart':{
  title:'Check the numbers before judging the design',
  headings:['Month','Visits','Signups','Signup rate'],rows:[['January','800','40','5%'],['February','1,200','48','4%'],['March','1,000','60','6%']],
  note:'February brought the most visitors. March converted the largest share. A chart of signup totals alone hides that difference.'
 },
 'extract-data-from-documents':{
  title:'Compare the extraction with the invoice',
  headings:['Field','Expected result'],rows:[['Invoice number','DEMO-014'],['Notebook line','2 × $6 = $12'],['Pen line','3 × $2 = $6'],['Subtotal / tax / total','$18.00 / $1.26 / $19.26'],['Purchase-order number','Blank or null']],
  note:'A plausible purchase-order number fails this check. The source contains none.'
 },
 'forecast-inventory':{
  title:'Work out a baseline first',
  headings:['Assumption','Two-week lead time','Three-week lead time'],rows:[['Weekly demand excluding the promotion','109 ÷ 7 ≈ 15.6 units','109 ÷ 7 ≈ 15.6 units'],['Demand during lead time','About 31.1 units','About 46.7 units'],['With 38 on hand and no safety stock','No shortfall','Shortfall of about 8.7 units'],['Smallest order in packs of 12','0 units','12 units']],
  note:'This simple check assumes immediate ordering, no safety stock and no open orders. A different recommendation can make sense if the tool explains its buffer or forecast.'
 },
 'categorize-customer-feedback':{
  title:'Check the evidence behind a theme',
  headings:['Possible theme','Comment IDs','What to investigate'],rows:[['Finding or downloading a file','A, C, F','Can a customer find the export control?'],['Repeated invoice export','B','Does the system retry or generate two files?'],['Billing contact','E','Who needs access to billing notices?'],['Positive feedback','D','What makes the dashboard readable?']],
  note:'“Export” appears in multiple comments with different meanings. Treat this grouping as a starting hypothesis and let a reviewer move a comment.'
 },
 'prepare-teaching-materials':{
  title:'Check the exit ticket',
  headings:['Example prompt','Expected response'],rows:[['Which fruit has the tallest bar?','Pears, with 9.'],['How many more pears than peaches are shown?','5 more (9 minus 4).'],['What should a text alternative retain?','Each fruit, its count and what is being counted.']],
  note:'A learner should be able to answer from the chart or its text alternative. Both formats should test the same idea.'
 }
};
