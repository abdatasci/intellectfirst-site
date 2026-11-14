/* Business English B1: original IF Academy course. */
IFX.course({
  id: 'be-b1', track: 'business', level: 'B1', next: 'B2', icon: '💼',
  title: 'Business English B1', sub: 'English for work',
  blurb: 'Meetings, emails and customers — the phrases professionals use every day, with real workplace situations.',
  units: [
  { id: 'u1', title: 'Meetings', topic: 'Meetings', lessons: [
    { id: 'v', type: 'vocab', title: 'Meeting language', words: [
      { w: 'agenda', p: 'noun', d: 'a list of the topics to discuss in a meeting', e: 'The first item on the agenda is the budget.', ru: 'повестка дня' },
      { w: 'chair', p: 'verb', d: 'to lead a meeting', e: 'Who is chairing the meeting today?', ru: 'председательствовать' },
      { w: 'minutes', p: 'noun', d: 'a written record of what was said in a meeting', e: 'Anna will take the minutes.', ru: 'протокол' },
      { w: 'point of view', p: 'noun', d: 'your opinion about something', e: 'I understand your point of view, but…', ru: 'точка зрения' },
      { w: 'agree on', p: 'phrasal verb', d: 'to make a decision together', e: 'We agreed on a new deadline.', ru: 'договориться о' },
      { w: 'postpone', p: 'verb', d: 'to move an event to a later time', e: 'We have to postpone the meeting until Monday.', ru: 'откладывать' },
      { w: 'follow up', p: 'phrasal verb', d: 'to take more action after a meeting, e.g. send an email', e: 'I\'ll follow up with an email tomorrow.', ru: 'продолжить, напомнить' },
      { w: 'action point', p: 'noun', d: 'a task a person must do after a meeting', e: 'Let\'s go through the action points.', ru: 'задача по итогам' }
    ]},
    { id: 'g', type: 'grammar', title: 'Polite language: could, would, should',
      rule: '<p>At work we soften requests, suggestions and disagreement.</p><table><tr><td>requests</td><td><b>Could</b> you send me the report? · <b>Would</b> you mind <b>sending</b> it today?</td></tr><tr><td>suggestions</td><td>We <b>could</b> meet on Thursday. · Maybe we <b>should</b> ask the client.</td></tr><tr><td>disagreeing</td><td>I\'m not sure I agree. · I see your point, <b>but</b>…</td></tr><tr><td>wants</td><td>I<b>\'d like</b> to add something.</td></tr></table><p><i>Would you mind</i> + <b>-ing</b>.</p>',
      ex: [
        { t: 'mc', q: '___ you send me the agenda before the meeting?', o: ['Could', 'Should', 'Must'], a: 0 },
        { t: 'gap', q: 'Would you mind ___ (close) the door?', a: ['closing'] },
        { t: 'mc', q: 'Which is the most polite?', o: ['Give me the figures.', 'I want the figures.', 'Could you give me the figures, please?'], a: 2 },
        { t: 'mc', q: 'Disagree politely:', o: ['You\'re wrong.', 'I see your point, but I think it\'s too expensive.', 'No way.'], a: 1 },
        { t: 'gap', q: 'I\'d ___ to say something about the budget.', a: ['like'] },
        { t: 'order', a: 'Maybe we should postpone the launch.' }
      ]},
    { id: 'r', type: 'reading', title: 'Five rules for shorter meetings', photo: '/media/spaces/lab-3.webp', alt: 'The IF Business Lab meeting table',
      text: 'Most professionals spend several hours a week in meetings — and many say that half of that time is wasted. Here are five rules that successful teams use.\n\n1. No agenda, no meeting. Send the agenda at least a day before, so people can prepare.\n2. Invite only the people you need. Others can read the minutes later.\n3. Start and finish on time. If you wait for late colleagues, you teach everyone that being late is fine.\n4. One person chairs. The chair keeps the discussion on the agenda and makes sure quiet people can give their point of view.\n5. End with action points. Before everyone leaves, agree on who does what and by when — then follow up by email the same day.\n\nTeams that follow these rules often reduce meeting time by a third. As one manager says, "A good meeting isn\'t a conversation. It\'s a decision."',
      ex: [
        { t: 'mc', q: 'Why should you send the agenda a day before?', o: ['so people can prepare', 'so the meeting is longer', 'so people can say no'], a: 0 },
        { t: 'tf', q: 'Everyone in the department should come to every meeting.', a: false },
        { t: 'mc', q: 'What does the chair do?', o: ['takes the minutes', 'keeps the discussion on the agenda', 'sends the invitations'], a: 1 },
        { t: 'mc', q: 'How should a meeting end?', o: ['with coffee', 'with clear action points', 'with a new agenda'], a: 1 },
        { t: 'mc', q: '“A good meeting is a decision” means meetings should…', o: ['be friendly', 'produce a result', 'be very long'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'A written record of a meeting:', o: ['agenda', 'minutes', 'action point'], a: 1 },
      { t: 'mc', q: 'The client is ill, so we must ___ the meeting.', o: ['postpone', 'chair', 'agree'], a: 0 },
      { t: 'gap', q: 'Would you mind ___ (repeat) that?', a: ['repeating'] },
      { t: 'mc', q: 'I\'ll ___ with an email after the call.', o: ['follow up', 'agree on', 'take'], a: 0 },
      { t: 'order', a: 'Could we go through the action points?' },
      { t: 'match', p: [['agenda', 'list of topics'], ['chair', 'lead a meeting'], ['point of view', 'opinion'], ['agree on', 'decide together']] }
    ]}
  ]},
  { id: 'u2', title: 'Emails and customers', topic: 'Customer service', lessons: [
    { id: 'v', type: 'vocab', title: 'Email and customer service', words: [
      { w: 'enquiry', p: 'noun', d: 'a question asking for information', e: 'Thank you for your enquiry about our courses.', ru: 'запрос' },
      { w: 'attach', p: 'verb', d: 'to add a file to an email', e: 'Please find the price list attached.', ru: 'прикреплять' },
      { w: 'complaint', p: 'noun', d: 'when a customer says they are not happy', e: 'We received a complaint about the delivery.', ru: 'жалоба' },
      { w: 'apologise', p: 'verb', d: 'to say sorry', e: 'We apologise for the delay.', ru: 'извиняться' },
      { w: 'refund', p: 'noun', d: 'money given back to a customer', e: 'You can get a full refund within 14 days.', ru: 'возврат денег' },
      { w: 'confirm', p: 'verb', d: 'to say that something is true or arranged', e: 'Could you confirm your booking?', ru: 'подтверждать' },
      { w: 'available', p: 'adjective', d: 'free or possible to get or use', e: 'Are you available on Tuesday?', ru: 'доступный, свободный' },
      { w: 'look forward to', p: 'phrase', d: 'to be happy about something in the future', e: 'I look forward to hearing from you.', ru: 'с нетерпением ждать' }
    ]},
    { id: 'g', type: 'grammar', title: 'Formal and informal emails',
      rule: '<table><tr><th></th><th>formal</th><th>informal</th></tr><tr><td>start</td><td>Dear Mr Akhmetov, · Dear Sir or Madam,</td><td>Hi Aru,</td></tr><tr><td>reason</td><td>I am writing to enquire about…</td><td>Just a quick note about…</td></tr><tr><td>request</td><td>I would be grateful if you could…</td><td>Can you…?</td></tr><tr><td>attachment</td><td>Please find attached…</td><td>I\'ve attached…</td></tr><tr><td>end</td><td>I look forward to hearing from you. Kind regards,</td><td>Speak soon, · Thanks,</td></tr></table><p><b>Look forward to</b> + <b>-ing</b>: <i>I look forward to <b>meeting</b> you.</i></p>',
      ex: [
        { t: 'mc', q: 'Formal start for an unknown person:', o: ['Hi there,', 'Dear Sir or Madam,', 'Hey,'], a: 1 },
        { t: 'gap', q: 'I look forward to ___ (hear) from you.', a: ['hearing'] },
        { t: 'mc', q: 'Formal request:', o: ['I would be grateful if you could send the invoice.', 'Send the invoice.', 'Can u send the invoice?'], a: 0 },
        { t: 'mc', q: '“Please find attached” is…', o: ['formal', 'informal'], a: 0 },
        { t: 'gap', q: 'I am writing ___ enquire about your prices.', a: ['to'] },
        { t: 'order', a: 'We apologise for any inconvenience.' }
      ]},
    { id: 'r', type: 'reading', title: 'Turning a complaint into a loyal customer', photo: 'mIlxO9bYuo8', alt: 'Customer support staff with headsets in an office',
      text: 'Dear Ms Serikova,\n\nThank you for your email of 12 November. I am very sorry to hear that your order arrived five days late and that one of the items was damaged. Please accept our sincere apologies.\n\nI have checked your order and can confirm that the delay was caused by a problem at our warehouse. This should not have happened. We have already sent a replacement item by express delivery, and it will arrive tomorrow. In addition, we have arranged a full refund of the delivery cost, and you will see it in your account within three working days.\n\nAs a thank-you for your patience, I have attached a 15% discount code for your next order.\n\nIf you have any further questions, please do not hesitate to contact me directly. I look forward to hearing from you.\n\nKind regards,\nMarat Zhunusov\nCustomer Service Manager',
      ex: [
        { t: 'mc', q: 'Why did Ms Serikova write to the company?', o: ['to order more items', 'to complain about a late, damaged order', 'to ask for a job'], a: 1 },
        { t: 'mc', q: 'What caused the delay?', o: ['the weather', 'a problem at the warehouse', 'a mistake by the customer'], a: 1 },
        { t: 'tf', q: 'The company is refunding the whole order.', a: false, why: 'Only the delivery cost is refunded.' },
        { t: 'mc', q: 'What is attached to the email?', o: ['a discount code', 'an invoice', 'a new order form'], a: 0 },
        { t: 'mc', q: 'What is the style of the email?', o: ['informal', 'formal'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Money given back to a customer:', o: ['refund', 'enquiry', 'complaint'], a: 0 },
      { t: 'mc', q: 'Is Mr Lee ___ for a call at 3 pm?', o: ['available', 'attached', 'confirmed'], a: 0 },
      { t: 'gap', q: 'We ___ for the delay. (say sorry)', a: ['apologise', 'apologize'] },
      { t: 'mc', q: 'Informal ending:', o: ['Yours faithfully,', 'Speak soon,', 'Kind regards,'], a: 1 },
      { t: 'order', a: 'Could you confirm the date of the meeting?' },
      { t: 'match', p: [['enquiry', 'request for information'], ['complaint', 'customer is unhappy'], ['attach', 'add a file'], ['confirm', 'say it is arranged']] }
    ]}
  ]}
]});
