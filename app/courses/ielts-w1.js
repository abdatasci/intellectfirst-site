/* IELTS Lessons · Writing Task 1, the other chart types: bar chart, pie charts, table (original IF Academy material).
   Every chart's figures are invented for practice. Each model answer is written to Band 7.5+ and to full exam length. */
(function () {
  var K = IFX.k;
  IFX.make('ielts', [
    { id: 'u9', t: 'Writing Task 1: bar charts', topic: 'Writing Task 1', skill: true,
      chart: { type: 'bar', title: 'Commuters who cycled to work (%)', max: 60, cats: ['Amsterdam', 'Copenhagen', 'Berlin', 'London'], series: [['2010', [38, 35, 10, 3]], ['2020', [44, 49, 18, 7]]] },
      v: ['Words for comparing figures', `
proportion | noun | a part of a total, often given as a percentage | The proportion of commuters who cycled rose in every city. | доля
respectively | adverb | in the same order as the things already mentioned | Berlin and London had 18% and 7% respectively. | соответственно
marginally | adverb | by a very small amount | Amsterdam was marginally ahead of Copenhagen in 2010. | незначительно
considerably | adverb | by a large amount | The figures for Berlin were considerably lower. | значительно
by contrast | phrase | used to introduce a clear difference | By contrast, only 3% of Londoners cycled. | напротив
double | verb | to become twice as big | The figure for London more than doubled. | удваиваться
twice as high as | phrase | two times the level of something | The rate in Amsterdam was twice as high as in Berlin. | в два раза выше, чем
lead the way | phrase | to be first or highest | Amsterdam led the way in 2010. | лидировать`],
      g: ['How to compare the bars', "<p>A bar chart asks you to <b>compare</b>. Do not list every bar. Group the bars, then compare the groups.</p><table><tr><td>1 · Paraphrase</td><td>The bar chart <b>compares</b> the proportion of … in … and …</td></tr><tr><td>2 · Overview</td><td><b>Overall</b>, … rose in all four cities, and … had by far the highest figures.</td></tr><tr><td>3 · Group</td><td>Paragraph 1: the two highest. Paragraph 2: the two lowest.</td></tr><tr><td>Bigger / smaller</td><td>marginally ahead of · considerably lower than · twice as high as</td></tr><tr><td>Order</td><td>18% and 7% <b>respectively</b></td></tr></table><p>Use <b>percentage points</b> for the gap between two percentages: from 35% to 49% is a rise of <b>14 percentage points</b>, not 14%.</p>",
        [K.mc('What is the main job of a bar chart answer?', ['to give your opinion', 'to compare the figures', 'to list every number'], 1),
         K.mc('From 35% to 49% is a rise of 14 ___.', ['per cent', 'percentage points', 'times'], 1),
         K.gap('Berlin and London had 18% and 7% ___.', 'respectively'),
         K.mc('38% compared with 35% → Amsterdam was ___ ahead.', ['marginally', 'considerably', 'twice'], 0),
         K.ord('The figures for the other two cities were considerably lower.'),
         K.mc('Which sentence is an overview?', ['In 2010, 38% of commuters in Amsterdam cycled.', 'Overall, cycling became more popular in all four cities.', 'London had 3% in 2010.'], 1)]],
      r: ['Model answer (Band 7.5+): a bar chart', "The bar chart compares the proportion of commuters who cycled to work in four European cities in 2010 and 2020.\n\nOverall, cycling became more popular in all four cities over the decade. Copenhagen and Amsterdam had by far the highest figures in both years, whereas cycling remained a minority choice in Berlin and, in particular, London.\n\nIn 2010, Amsterdam led the way, with 38% of commuters travelling by bicycle, marginally ahead of Copenhagen at 35%. By 2020, however, the positions had been reversed: the figure for Copenhagen had risen by 14 percentage points to 49%, almost half of all commuters, while Amsterdam saw a more modest increase to 44%.\n\nThe figures for the other two cities were considerably lower. In Berlin, the proportion of people cycling to work almost doubled, from 10% to 18%, yet it was still less than half the level recorded in Amsterdam. London had the lowest rate throughout; although its figure more than doubled, from 3% to 7%, fewer than one in ten Londoners commuted by bicycle at the end of the period.",
        [K.mc('Which city had the highest figure in 2020?', ['Amsterdam', 'Copenhagen', 'Berlin'], 1),
         K.mc('How are the body paragraphs organised?', ['one paragraph for each year', 'the two highest cities, then the two lowest', 'one paragraph for each city'], 1),
         K.tf('The writer gives an opinion about cycling.', false),
         K.mc('"The positions had been reversed" means:', ['both cities fell', 'the city in second place moved to first', 'the figures stayed the same'], 1),
         K.tf('In 2020, fewer than one in ten Londoners cycled to work.', true)]] },

    { id: 'u10', t: 'Writing Task 1: pie charts', topic: 'Writing Task 1', skill: true,
      chart: { type: 'pie', title: 'Household spending in one country', pies: [{ label: '1990', parts: [['Housing', 25], ['Food', 30], ['Transport', 15], ['Leisure', 10], ['Other', 20]] }, { label: '2020', parts: [['Housing', 35], ['Food', 18], ['Transport', 17], ['Leisure', 16], ['Other', 14]] }] },
      v: ['Words for shares of a total', `
account for | phrasal verb | to form a particular part of a total | Food accounted for 30% of spending in 1990. | составлять
make up | phrasal verb | to form a part of something | Housing made up a quarter of the total. | составлять
share | noun | one part of a total | The share spent on leisure grew. | доля
a quarter | noun | one of four equal parts; 25% | Housing was exactly a quarter of the budget. | четверть
a third | noun | one of three equal parts; about 33% | Housing rose to just over a third. | треть
just under | phrase | a little less than | Food fell to just under a fifth. | чуть меньше
roughly | adverb | about; not exactly | The two items were roughly half of all spending. | примерно
expenditure | noun | the money that is spent | Housing became the largest item of expenditure. | расходы`],
      g: ['Fractions and approximations', "<p>Pie charts show <b>parts of a whole</b>. A good answer mixes exact percentages with <b>fractions</b>, so the same numbers are not repeated in the same way.</p><table><tr><td>25%</td><td><b>a quarter</b></td></tr><tr><td>33% · 35%</td><td><b>a third</b> · just over a third</td></tr><tr><td>50% · 53%</td><td><b>half</b> · roughly half</td></tr><tr><td>20% · 18%</td><td><b>a fifth</b> · just under a fifth</td></tr><tr><td>75%</td><td><b>three quarters</b></td></tr><tr><td>Verbs</td><td>accounted for · made up · represented</td></tr></table><p>With two pies, compare <b>the same category in both years</b>. Do not describe one pie and then the other.</p>",
        [K.mc('35% is best described as:', ['just over a third', 'just under a quarter', 'roughly half'], 0),
         K.mc('18% is:', ['just over a fifth', 'just under a fifth', 'a quarter'], 1),
         K.gap('Food ___ for 30% of household spending in 1990.', 'accounted'),
         K.mc('With two pie charts, the best plan is to:', ['describe the first pie, then the second', 'compare each category across the two years', 'describe only the biggest slice'], 1),
         K.ord('Housing made up exactly a quarter of the total.'),
         K.mc('Which word is NOT a synonym for "about"?', ['roughly', 'approximately', 'exactly'], 2)]],
      r: ['Model answer (Band 7.5+): two pie charts', "The two pie charts show how households in one country divided their spending among five categories in 1990 and 2020.\n\nOverall, housing replaced food as the largest item of expenditure, and the share spent on leisure and transport grew, while the proportion devoted to food fell sharply.\n\nIn 1990, food accounted for the largest share of household budgets, at 30%, followed by housing, which made up exactly a quarter. Thirty years later, the pattern was very different: housing had climbed to 35%, just over a third of all spending, whereas food had dropped by twelve percentage points to 18%, less than a fifth of the total.\n\nSpending on leisure rose from 10% to 16%, the largest relative increase of any category, and transport edged up from 15% to 17%. By contrast, the proportion spent on other goods and services declined from a fifth to 14%. As a result, housing and food together still represented roughly half of household expenditure in both years, at 55% in 1990 and 53% in 2020.",
        [K.mc('What was the largest item of spending in 1990?', ['housing', 'food', 'transport'], 1),
         K.mc('Which category grew most in relative terms?', ['leisure', 'housing', 'transport'], 0),
         K.tf('Spending on "other" goods and services increased.', false),
         K.mc('"Edged up" means:', ['rose a little', 'rose sharply', 'fell slightly'], 0),
         K.tf('Housing and food together were about half of spending in both years.', true)]] },

    { id: 'u11', t: 'Writing Task 1: tables', topic: 'Writing Task 1', skill: true,
      chart: { type: 'table', title: 'Visitors to four museums in one city (thousands)', head: ['Museum', '2015', '2019', '2023'], rows: [['Art Gallery', '550', '530', '560'], ['History Museum', '420', '450', '390'], ['Science Centre', '310', '480', '620'], ['Maritime Museum', '120', '90', '60']] },
      v: ['Words for reading a table', `
attendance | noun | the number of people who go to a place or event | Attendance at the Science Centre doubled. | посещаемость
overtake | verb | to become bigger or better than something else | The Science Centre overtook the Art Gallery in 2023. | обгонять
comparatively | adverb | when measured against something else | The other two museums were comparatively stable. | сравнительно
fluctuate | verb | to go up and down | Visitor numbers fluctuated only slightly. | колебаться
steadily | adverb | gradually and regularly | The Maritime Museum declined steadily. | постепенно, неуклонно
far behind | phrase | much lower than the others | The Maritime Museum was far behind with 120,000. | далеко позади
fall back | phrasal verb | to return to a lower level | Visits fell back to 390,000. | снизиться, откатиться
one tenth | noun | one of ten equal parts | It had less than one tenth of the visitors. | одна десятая`],
      g: ['Choosing what to report', "<p>A table has too many numbers to report them all. Choose the <b>key features</b>: the highest, the lowest, the biggest change and anything that stayed the same.</p><table><tr><td>1 · Scan</td><td>Read along the rows (change over time) and down the columns (which is biggest).</td></tr><tr><td>2 · Overview</td><td>The biggest change and the main contrast, <b>without numbers</b>.</td></tr><tr><td>3 · Details</td><td>Start with the first year, then describe the changes.</td></tr><tr><td>Thousands</td><td>The table says 550 (thousands) → write <b>550,000</b>.</td></tr><tr><td>Change</td><td>doubled · halved · rose slightly · fell back · declined steadily</td></tr></table><p>Check the <b>units</b> in the title before you write a single number.</p>",
        [K.mc('How many of the numbers in a table should you report?', ['all of them', 'only the key ones', 'none of them'], 1),
         K.mc('The table shows "550" and the title says "thousands". You write:', ['550', '550,000', '5,500'], 1),
         K.gap('Visits to the Science Centre ___ from 310,000 to 620,000.', 'doubled'),
         K.mc('The overview should contain:', ['the main changes, without numbers', 'every number in the first row', 'your opinion'], 0),
         K.ord('The Maritime Museum declined steadily over the period.'),
         K.mc('From 120,000 to 60,000, the number of visitors:', ['doubled', 'halved', 'fluctuated'], 1)]],
      r: ['Model answer (Band 7.5+): a table', "The table gives information about the number of visitors to four museums in one city in 2015, 2019 and 2023.\n\nOverall, the Science Centre experienced dramatic growth and became the most visited of the four, while the Maritime Museum lost half of its visitors. Attendance at the other two museums was comparatively stable.\n\nIn 2015, the Art Gallery was the most popular attraction, with 550,000 visitors, followed by the History Museum with 420,000. The Science Centre received 310,000, and the Maritime Museum was far behind with only 120,000.\n\nOver the following eight years, visits to the Science Centre doubled, reaching 620,000 in 2023 and overtaking the Art Gallery, whose figures fluctuated only slightly and ended at 560,000. The History Museum saw a small rise to 450,000 in 2019 before falling back to 390,000, its lowest level in the period. Meanwhile, the Maritime Museum declined steadily, from 120,000 to 90,000 and then to 60,000, so that by 2023 it attracted fewer than one tenth as many visitors as the Science Centre.",
        [K.mc('Which museum was the most visited in 2023?', ['the Art Gallery', 'the Science Centre', 'the History Museum'], 1),
         K.mc('What happened to the Maritime Museum?', ['It lost half of its visitors.', 'It doubled its visitors.', 'It stayed the same.'], 0),
         K.tf('The overview contains exact numbers.', false),
         K.mc('When did the History Museum have its lowest figure?', ['2015', '2019', '2023'], 2),
         K.tf('The Art Gallery was the most popular museum in 2015.', true)]] }
  ]);
  /* The course by skill: Writing Task 1, Writing Task 2, Reading, Listening, Speaking. Unit ids do not change, so progress is kept. */
  IFX.order('ielts', ['u1', 'u9', 'u10', 'u11', 'u8', 'u2', 'u6', 'u3', 'u7', 'u4', 'u5']);
})();
