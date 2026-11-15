/* Business English A2–C1, units 3–6 of each course (original IF Academy material). */
(function () {
  var K = IFX.k;

  /* ---------------- Business A2 ---------------- */
  IFX.make('be-a2', [
    { id: 'u3', t: 'Companies and products', topic: 'Company profile',
      v: ['Talking about a company', `
company | noun | a business that sells goods or services | She works for a big company. | компания
product | noun | something that is made and sold | Our main product is software. | продукт
customer | noun | a person who buys something | We have customers in ten countries. | клиент
employee | noun | a person who works for a company | The firm has 200 employees. | сотрудник
head office | noun | the main office of a company | Our head office is in Astana. | головной офис
branch | noun | one office or shop of a larger company | The bank has a branch in Kostanay. | филиал
produce | verb | to make goods | The factory produces furniture. | производить
sell | verb | to give something for money | We sell our products online. | продавать`],
      g: ['Comparing products', "<table><tr><td>Short adjectives</td><td>cheap → cheap<b>er</b> → the cheap<b>est</b> · big → big<b>ger</b></td></tr><tr><td>Long adjectives</td><td>reliable → <b>more</b> reliable → <b>the most</b> reliable</td></tr><tr><td>Irregular</td><td>good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b></td></tr><tr><td>Compare</td><td>Model A is <b>lighter than</b> Model B. It's <b>not as expensive as</b> the old one.</td></tr></table>",
        [K.mc('Our new laptop is ___ than the old one.', ['light', 'lighter', 'lightest'], 1),
         K.mc('This is the ___ product in our range.', ['most popular', 'popularest', 'more popular'], 0),
         K.mc('The service is ___ than last year.', ['good', 'better', 'best'], 1),
         K.mc('Model B isn\'t as cheap ___ Model A.', ['than', 'as', 'that'], 1),
         K.gap('This is the ___ (reliable) printer we sell.', 'most reliable'),
         K.ord('Our head office is bigger than the branch.')]],
      r: ['Company profile: SteppeTech', "SteppeTech is a small technology company from Kostanay. It started in 2018 with three employees. Now it has forty-five employees, a head office in Kostanay and a branch in Astana.\n\nThe company produces apps for schools and small businesses. Its most popular product is 'ClassBook', an app that teachers use to plan lessons and send homework. SteppeTech sells its products in Kazakhstan, Uzbekistan and Kyrgyzstan. 'Our apps are cheaper than international apps, and they work in Kazakh, Russian and English,' says the director, Arman Bekov.",
        [K.mc('When did SteppeTech start?', ['2008', '2018', '2020'], 1),
         K.mc('How many employees does it have now?', ['three', 'forty-five', 'two hundred'], 1),
         K.mc('Where is its branch?', ['Kostanay', 'Astana', 'Almaty'], 1),
         K.mc('What is ClassBook?', ['a school', 'an app for teachers', 'a book'], 1),
         K.tf('SteppeTech\'s apps are more expensive than international apps.', false)]] },

    { id: 'u4', t: 'Business travel', topic: 'Travel',
      v: ['Travelling for work', `
business trip | noun | a journey for work | I'm going on a business trip to Almaty. | командировка
flight | noun | a journey by plane | My flight leaves at 8:30. | рейс
check in | phrasal verb | to show your ticket at the airport or arrive at a hotel | Please check in two hours before the flight. | регистрироваться
boarding pass | noun | a card you show to get on the plane | Have your boarding pass ready. | посадочный талон
reservation | noun | an arrangement to keep a room or table | I have a reservation for two nights. | бронь
receipt | noun | a paper that shows you paid | Keep all your receipts for expenses. | чек, квитанция
expenses | noun | money you spend for work that the company pays back | The company pays my travel expenses. | расходы
schedule | noun | a plan of times and activities | Here's the schedule for the visit. | расписание`],
      g: ['Present continuous for arrangements', "<p>Use the <b>present continuous</b> for future plans that are already arranged — with a time and place.</p><table><tr><td>Positive</td><td>I<b>'m flying</b> to Almaty on Monday. We<b>'re meeting</b> the client at 10.</td></tr><tr><td>Negative</td><td>She <b>isn't coming</b> to the conference.</td></tr><tr><td>Question</td><td>When <b>are</b> you <b>leaving</b>? Where <b>are</b> you <b>staying</b>?</td></tr></table>",
        [K.mc('I ___ the director at 3 pm tomorrow.', ['meet', "'m meeting", 'met'], 1),
         K.mc('Where ___ you staying in Astana?', ['do', 'are', 'is'], 1),
         K.mc('She ___ to the conference — she\'s ill.', ["isn't coming", "doesn't come", "not coming"], 0),
         K.gap('We ___ (fly) to Tashkent next Tuesday.', "'re flying", 'are flying'),
         K.mc('"What are you doing on Friday?" "I ___ a presentation."', ["'m giving", 'give', 'gave'], 0),
         K.ord('When are you leaving for the airport?')]],
      r: ['Email: your trip schedule', "Dear Ms Petrova,\n\nThank you for agreeing to visit our factory next week. Here is your schedule.\n\nOn Monday 14 April you are flying from Kostanay to Almaty on flight KC 812, which leaves at 7:40. Our driver, Yerlan, is meeting you at the airport. You are staying at the Grand Hotel; the reservation is in your name for two nights.\n\nOn Monday afternoon you are visiting the factory, and in the evening our director is taking you to dinner. On Tuesday morning you are meeting the sales team. Your flight home leaves at 18:15. Please keep all receipts — we will pay your expenses.\n\nBest regards,\nDana Seitova, Office Manager",
        [K.mc('Which day is Ms Petrova flying to Almaty?', ['Sunday', 'Monday', 'Tuesday'], 1),
         K.mc('Who is meeting her at the airport?', ['the director', 'the driver', 'Dana'], 1),
         K.mc('How many nights is the hotel reservation?', ['one', 'two', 'three'], 1),
         K.mc('What is happening on Tuesday morning?', ['a factory visit', 'a meeting with the sales team', 'dinner'], 1),
         K.tf('Ms Petrova has to pay her own expenses.', false)]] },

    { id: 'u5', t: 'Schedules and deadlines', topic: 'Time management',
      v: ['Planning work', `
deadline | noun | the time by which work must be finished | The deadline is Friday. | крайний срок
on time | phrase | at the correct time; not late | The project finished on time. | вовремя
postpone | verb | to move to a later time | We postponed the meeting until Monday. | переносить, откладывать
calendar | noun | a list of days to plan your appointments | Let me check my calendar. | календарь
available | adjective | free to meet or talk | Are you available on Thursday? | свободный
urgent | adjective | needing attention immediately | This is urgent — please reply today. | срочный
reminder | noun | a message to help you remember | I'll send you a reminder. | напоминание
task | noun | a piece of work to do | I have three tasks to finish today. | задача`],
      g: ['Prepositions of time and will for decisions', "<table><tr><td><b>at</b></td><td>at 9 o'clock, at noon, at the end of the day</td></tr><tr><td><b>on</b></td><td>on Monday, on 3 May, on Friday morning</td></tr><tr><td><b>in</b></td><td>in March, in 2026, in the morning, in two weeks</td></tr><tr><td><b>by / until</b></td><td>Send it <b>by</b> Friday (no later than). I'm here <b>until</b> 6 (up to that time).</td></tr><tr><td><b>will</b> — decisions now</td><td>\"The printer's broken.\" \"I<b>'ll</b> call IT.\"</td></tr></table>",
        [K.mc('The meeting is ___ Tuesday.', ['in', 'on', 'at'], 1),
         K.mc('Please send the report ___ Friday at the latest.', ['by', 'until', 'in'], 0),
         K.mc('I\'m in the office ___ 5 pm today.', ['by', 'until', 'on'], 1),
         K.mc('"Mr Ali isn\'t here." "OK, I ___ call back later."', ["'ll", "'m going to", 'call'], 0),
         K.gap('The conference starts ___ 9 o\'clock.', 'at'),
         K.ord('Can we postpone the meeting until next week?')]],
      r: ['Message thread: moving a meeting', "Asel (9:05): Hi Timur, I'm sorry, but I can't make our meeting on Wednesday at 11. I have an urgent call with a client.\n\nTimur (9:12): No problem. Are you available on Thursday morning?\n\nAsel (9:14): I'm busy until 10, but I'm free after that.\n\nTimur (9:15): OK, let's say 10:30 on Thursday. I'll book the small meeting room.\n\nAsel (9:16): Perfect. Can you send me the sales figures by Wednesday evening, so I can read them before we meet?\n\nTimur (9:18): Sure. I'll send you a reminder on Thursday morning too.",
        [K.mc('Why can\'t Asel meet on Wednesday?', ['she is ill', 'she has an urgent client call', 'she is on holiday'], 1),
         K.mc('When is the new meeting?', ['Wednesday at 11', 'Thursday at 10', 'Thursday at 10:30'], 2),
         K.mc('Who is booking the room?', ['Asel', 'Timur', 'the manager'], 1),
         K.mc('When does Asel want the sales figures?', ['by Wednesday evening', 'on Thursday', 'next week'], 0),
         K.tf('Timur will send a reminder.', true)]] },

    { id: 'u6', t: 'Solving problems', topic: 'Customer service',
      v: ['Problems and solutions', `
complaint | noun | a statement that something is wrong | We received a complaint about the delivery. | жалоба
refund | noun | money given back | The customer asked for a refund. | возврат денег
replace | verb | to give a new one instead of the old one | We'll replace the broken item. | заменять
damaged | adjective | broken or harmed | The box arrived damaged. | повреждённый
delivery | noun | when goods are brought to you | Delivery takes three days. | доставка
apologise | verb | to say you are sorry | I apologise for the delay. | извиняться
solve | verb | to find an answer to a problem | We solved the problem quickly. | решать
inconvenience | noun | a small problem or trouble | Sorry for any inconvenience. | неудобство`],
      g: ['Offers and advice: will, should, could', "<table><tr><td>Offer: <b>I'll…</b></td><td>I<b>'ll send</b> you a new one today.</td></tr><tr><td>Offer: <b>Shall I…?</b></td><td><b>Shall I</b> call you back?</td></tr><tr><td>Advice: <b>should</b></td><td>You <b>should</b> keep the receipt.</td></tr><tr><td>Suggestion: <b>could</b></td><td>We <b>could</b> offer a discount.</td></tr><tr><td>Apology</td><td>I'm very sorry <b>for</b> the delay / <b>about</b> the mistake.</td></tr></table>",
        [K.mc('"My order is damaged." "I\'m sorry. I ___ send you a new one."', ["'ll", 'shall', 'should'], 0),
         K.mc('___ I call you back in ten minutes?', ['Will', 'Shall', 'Should'], 1),
         K.mc('You ___ check the address before you order.', ['should', 'shall', "'ll"], 0),
         K.mc('We ___ offer you a 10% discount. (a suggestion)', ['could', 'shall', 'must'], 0),
         K.gap('I apologise ___ the inconvenience.', 'for'),
         K.ord("I'll replace the damaged item today.")]],
      r: ['A complaint and a reply', "Customer: Hello, I ordered a desk chair from your website two weeks ago. It arrived yesterday, but the box was damaged and one leg is broken. I'm not happy — I need the chair for my new office.\n\nCustomer service: I'm very sorry about this, Mr Nurlanov. Thank you for telling us. We can solve this in two ways: we'll send you a new chair, and the delivery will take two days, or we can give you a full refund. You don't need to send the broken chair back. And for the inconvenience, we'll give you a 15% discount on your next order. Which do you prefer?",
        [K.mc('What did Mr Nurlanov order?', ['a desk', 'a desk chair', 'a lamp'], 1),
         K.mc('What is the problem?', ['it arrived late', 'one leg is broken', 'wrong colour'], 1),
         K.mc('How long will a new delivery take?', ['one day', 'two days', 'two weeks'], 1),
         K.tf('He must send the broken chair back.', false),
         K.mc('What extra does the company offer?', ['free delivery', 'a 15% discount', 'a free desk'], 1)]] }
  ]);

  /* ---------------- Business B1 ---------------- */
  IFX.make('be-b1', [
    { id: 'u3', t: 'Job interviews', topic: 'Recruitment',
      v: ['Applying for a job', `
CV | noun | a document listing your education and work experience | Please send your CV and a cover letter. | резюме
candidate | noun | a person applying for a job | We've interviewed six candidates. | кандидат
experience | noun | knowledge from doing a job | She has five years' experience in sales. | опыт
strength | noun | something you are good at | My main strength is communication. | сильная сторона
weakness | noun | something you are not good at | What is your biggest weakness? | слабая сторона
hire | verb | to give someone a job | They hired her after the second interview. | нанимать
salary | noun | money you earn every month or year | The salary is negotiable. | зарплата
responsible for | phrase | having a duty to deal with something | I was responsible for training new staff. | ответственный за`],
      g: ['Present perfect or past simple?', "<table><tr><td><b>Present perfect</b> — experience, no finished time</td><td>I<b>'ve worked</b> in three countries. I<b>'ve managed</b> a team of ten.</td></tr><tr><td><b>Past simple</b> — finished time / finished job</td><td>From 2019 to 2022 I <b>worked</b> for a bank. I <b>left</b> last year.</td></tr><tr><td>Interview questions</td><td><b>Have</b> you ever <b>led</b> a project? — Yes. In 2023 I <b>led</b> a team of five.</td></tr></table>",
        [K.mc('I ___ in marketing since 2020.', ['worked', "'ve worked", 'work'], 1),
         K.mc('In 2018 I ___ my first job.', ['got', "'ve got", 'have get'], 0),
         K.mc('___ you ever managed a budget?', ['Did', 'Have', 'Were'], 1),
         K.mc('She ___ the company two years ago.', ['joined', 'has joined', 'joins'], 0),
         K.gap('I ___ (be) responsible for training since last year.', "'ve been", 'have been'),
         K.ord('I have worked in sales for five years.')]],
      r: ['Interview tips from a recruiter', "Every year I interview hundreds of candidates, and the ones who get hired usually do three things well.\n\nFirst, they prepare. They have read about our company and they can explain why they want to work here, not just anywhere. Second, they give examples. If you say your strength is teamwork, tell me about a time you worked well in a team — what you did and what happened. Third, they are honest about their weaknesses. Everybody has them! Say what your weakness is and what you have done to improve it.\n\nOne more tip: don't ask about the salary in the first five minutes. There will be time for that later.",
        [K.mc('What do successful candidates do first?', ['ask about salary', 'prepare and research the company', 'talk about weaknesses'], 1),
         K.mc('If you say you\'re good at teamwork, you should…', ['repeat it many times', 'give a real example', 'say nothing else'], 1),
         K.tf('The recruiter thinks some people have no weaknesses.', false),
         K.mc('What should you say about a weakness?', ['nothing', 'what you have done to improve it', 'that it is a strength'], 1),
         K.mc('When shouldn\'t you ask about salary?', ['at the end', 'in the first five minutes', 'in a second interview'], 1)]] },

    { id: 'u4', t: 'Marketing', topic: 'Products and promotion',
      v: ['Marketing words', `
brand | noun | the name and image of a company or product | Apple is a famous brand. | бренд
launch | verb / noun | to introduce a new product | We're launching a new app in May. | запускать, запуск
target market | noun | the group of customers a product is for | Our target market is students. | целевой рынок
advertise | verb | to tell people about a product to sell it | They advertise on Instagram. | рекламировать
competitor | noun | a company selling similar products | Our main competitor has lowered its prices. | конкурент
survey | noun | a set of questions to find out opinions | We did a survey of 500 customers. | опрос
feature | noun | an important part of a product | The best feature is the long battery life. | особенность, функция
promote | verb | to help sell by advertising | We promote our products at trade fairs. | продвигать`],
      g: ['Comparing: much, far, a bit, as … as', "<table><tr><td>Big difference</td><td>Our app is <b>much / far</b> faster than theirs.</td></tr><tr><td>Small difference</td><td>It's <b>a bit / slightly</b> more expensive.</td></tr><tr><td>Equal / not equal</td><td>It's <b>as</b> good <b>as</b> the market leader. It's <b>not as</b> popular <b>as</b> it was.</td></tr><tr><td>Superlative + ever / in</td><td>It's <b>the best</b> product we've <b>ever</b> made. <b>the cheapest in</b> the market</td></tr></table>",
        [K.mc('Our prices are ___ lower than our competitor\'s.', ['much', 'very', 'more'], 0),
         K.mc('The new model is ___ heavier — only 50 grams.', ['far', 'slightly', 'much'], 1),
         K.mc('This campaign wasn\'t ___ successful as the last one.', ['so', 'as', 'than'], 1),
         K.mc('It\'s the most popular app ___ the country.', ['of', 'in', 'than'], 1),
         K.gap('This is the best launch we\'ve ___ had.', 'ever'),
         K.ord('Our brand is far more famous than theirs.')]],
      r: ['How a small brand grew', "Five years ago, Qazaq Tea was a tiny family company selling tea in markets in Shymkent. Today it is one of the fastest-growing brands in the country.\n\nThe owners did a survey and found that their target market — young people in cities — thought tea was 'old-fashioned'. So they changed everything. They launched colourful packaging, new flavours such as apple and mint, and a much stronger presence on social media. Instead of expensive TV adverts, they promoted the tea through local food bloggers.\n\nTheir competitors are much bigger, but Qazaq Tea's sales are now far higher among people under thirty. 'We're not as big as the international brands,' says the founder, 'but we understand our customers better.'",
        [K.mc('Where did Qazaq Tea start?', ['in Almaty', 'in Shymkent', 'in Kostanay'], 1),
         K.mc('What did young people think about tea?', ['it was too expensive', 'it was old-fashioned', 'it was healthy'], 1),
         K.mc('How did they promote the tea?', ['TV adverts', 'local food bloggers', 'newspapers'], 1),
         K.tf('Qazaq Tea is bigger than its competitors.', false),
         K.mc('What is the founder\'s main point?', ['they have the lowest prices', 'they understand their customers better', 'they are international'], 1)]] },

    { id: 'u5', t: 'Calls and video meetings', topic: 'Communication',
      v: ['Phrasal verbs for calls', `
get through | phrasal verb | to manage to contact someone by phone | I couldn't get through to the office. | дозвониться
hold on | phrasal verb | to wait for a short time | Hold on, I'll check. | подождать
call back | phrasal verb | to phone someone again | Can I call you back in five minutes? | перезвонить
put through | phrasal verb | to connect a caller to another person | I'll put you through to the manager. | соединить
cut off | phrasal verb | to stop a phone connection suddenly | Sorry, we were cut off. | прерваться (о связи)
mute | verb | to turn off your microphone | Please mute yourself when not speaking. | выключить микрофон
share your screen | phrase | to show what is on your computer to others | Can you share your screen? | показать экран
set up | phrasal verb | to arrange or organise | Let's set up a call for Tuesday. | организовать, назначить`],
      g: ['Phrasal verbs: word order', "<table><tr><td>Separable verbs + noun</td><td><b>Set up</b> the meeting / <b>Set</b> the meeting <b>up</b>.</td></tr><tr><td>Separable verbs + pronoun</td><td>pronoun <b>in the middle</b>: <b>Set it up</b>. <b>Call me back</b>. (not <s>Call back me</s>)</td></tr><tr><td>Inseparable</td><td><b>get through to</b> sb, <b>look after</b> sb: I couldn't <b>get through to</b> him.</td></tr></table>",
        [K.mc('Can you call ___ this afternoon?', ['back me', 'me back'], 1),
         K.mc('The meeting? I\'ll set ___ for Friday.', ['up it', 'it up'], 1),
         K.mc('I\'ll put you ___ to the sales department.', ['through', 'off', 'back'], 0),
         K.mc('Sorry, I think we were cut ___.', ['out', 'off', 'up'], 1),
         K.gap('___ on, please. I\'ll find the file.', 'Hold'),
         K.ord('Could you share your screen with us?')]],
      r: ['Video call etiquette', "Video calls are now a normal part of business, but many people still make simple mistakes.\n\nBefore the call, check your camera and microphone, and set up in a quiet place. Join a minute or two early. During the call, mute yourself when you're not speaking — background noise is very distracting for others. If you want to speak, use the 'raise hand' button or wait for a pause.\n\nIf you share your screen, close other windows first: nobody needs to see your personal messages! And if you get cut off, don't panic. Rejoin quickly and say, 'Sorry, I was cut off. Could you repeat the last point?'",
        [K.mc('When should you join a video call?', ['exactly on time', 'a minute or two early', 'five minutes late'], 1),
         K.mc('Why should you mute yourself?', ['to save battery', 'background noise distracts others', 'it is the law'], 1),
         K.mc('What should you do before sharing your screen?', ['close other windows', 'turn off the camera', 'restart the computer'], 0),
         K.tf('If you are cut off, you should leave the meeting.', false),
         K.mc('The text is mainly…', ['a story', 'advice', 'an advertisement'], 1)]] },

    { id: 'u6', t: 'Hospitality and clients', topic: 'Entertaining clients',
      v: ['Looking after visitors', `
host | verb / noun | to receive and entertain guests | We hosted a group from Germany. | принимать (гостей)
venue | noun | a place where an event happens | The venue for the dinner is by the river. | место проведения
dietary requirements | noun | special food needs | Do you have any dietary requirements? | особенности питания
itinerary | noun | a detailed plan for a visit | I've emailed you the itinerary. | программа визита
small talk | noun | polite conversation about simple topics | Small talk helps build relationships. | светская беседа
make yourself at home | phrase | please relax and be comfortable | Come in and make yourself at home. | чувствуйте себя как дома
look forward to | phrase | to feel happy about something in the future | I look forward to meeting you. | с нетерпением ждать
on behalf of | phrase | representing someone | On behalf of the company, welcome! | от имени`],
      g: ['First conditional for offers and arrangements', "<table><tr><td><b>If</b> + present, <b>will</b> + verb</td><td><b>If</b> you <b>arrive</b> early, our driver <b>will meet</b> you.</td></tr><tr><td>Offers</td><td><b>If</b> you<b>'d like</b>, I<b>'ll show</b> you the city.</td></tr><tr><td><b>when / as soon as</b></td><td>I'll call you <b>as soon as</b> the car <b>arrives</b>. (not <s>will arrive</s>)</td></tr><tr><td><b>unless</b></td><td>We'll eat outside <b>unless</b> it rains.</td></tr></table>",
        [K.mc('If you ___ any dietary requirements, please tell us.', ['have', 'will have', 'had'], 0),
         K.mc('I\'ll send the itinerary as soon as it ___ ready.', ['will be', 'is', 'was'], 1),
         K.mc('We\'ll have dinner on the terrace ___ it\'s too cold.', ['if', 'unless', 'when'], 1),
         K.gap('If you like, I ___ (take) you to the museum.', "'ll take", 'will take'),
         K.mc('"I look forward ___ meeting you."', ['to', 'for', 'at'], 0),
         K.ord('If you arrive early, our driver will meet you.')]],
      r: ['Hosting international guests', "When we host foreign partners in Kostanay, we always plan carefully. A week before the visit, we send an itinerary and ask about dietary requirements — some guests don't eat meat, others don't drink alcohol, and some need halal food.\n\nOn the first evening, we usually choose a venue that shows local culture, such as a restaurant serving beshbarmak. Small talk is important: guests enjoy talking about the city, the weather — always a popular topic in our winters! — and their journey. We avoid politics and money.\n\nAt the end of the visit, the director thanks the guests on behalf of the company and gives them a small present. If the visit goes well, the business relationship will be much stronger.",
        [K.mc('When does the company send the itinerary?', ['on the first day', 'a week before', 'after the visit'], 1),
         K.mc('Why do they ask about dietary requirements?', ['to save money', 'guests have different food needs', 'for the hotel'], 1),
         K.mc('What kind of venue do they choose on the first evening?', ['a fast-food café', 'a restaurant showing local culture', 'the office'], 1),
         K.tf('They talk about politics and money with guests.', false),
         K.mc('Who thanks the guests at the end?', ['the driver', 'the director', 'the guests'], 1)]] }
  ]);

  /* ---------------- Business B2 ---------------- */
  IFX.make('be-b2', [
    { id: 'u3', t: 'Recruiting talent', topic: 'Human resources',
      v: ['HR and recruitment', `
recruit | verb | to find new people to join an organisation | We're recruiting three engineers. | набирать (персонал)
shortlist | noun / verb | a final list of candidates | Five applicants made the shortlist. | короткий список
onboarding | noun | the process of helping new staff start a job | Good onboarding reduces staff turnover. | адаптация новых сотрудников
staff turnover | noun | the rate at which employees leave | High staff turnover is expensive. | текучесть кадров
headhunt | verb | to persuade someone to leave a job for another | She was headhunted by a rival firm. | переманивать
benefits package | noun | extras such as insurance and holidays | The benefits package is very attractive. | соцпакет
probation period | noun | a trial period at the start of a job | The probation period is three months. | испытательный срок
retain | verb | to keep employees | It's hard to retain good staff. | удерживать`],
      g: ['Relative clauses in business writing', "<table><tr><td>Defining (no commas)</td><td>We need someone <b>who</b> speaks Chinese. The role <b>that</b> we advertised has been filled.</td></tr><tr><td>Non-defining (commas, no <i>that</i>)</td><td>Our HR director, <b>who</b> joined in 2021, introduced remote working.</td></tr><tr><td><b>whose / where / which</b> (whole clause)</td><td>a candidate <b>whose</b> CV impressed us · the office <b>where</b> she works · Turnover fell, <b>which</b> saved money.</td></tr><tr><td>Reduced clauses</td><td>Candidates <b>applying</b> before 1 May… · the report <b>published</b> last week</td></tr></table>",
        [K.mc('We\'re looking for a manager ___ has experience in retail.', ['who', 'which', 'whose'], 0),
         K.mc('Our CEO, ___ founded the company, is retiring.', ['that', 'who', 'which'], 1),
         K.mc('She\'s the candidate ___ references were excellent.', ['who', 'whose', 'which'], 1),
         K.mc('Staff turnover fell by 20%, ___ saved us a lot of money.', ['that', 'which', 'what'], 1),
         K.gap('All candidates ___ (apply) before Friday will be contacted.', 'applying'),
         K.ord('The person who gets the job will start in June.')]],
      r: ['Why good people leave', "Recruiting talented employees is expensive: replacing a skilled member of staff can cost the equivalent of six to nine months of their salary. Yet many companies, which spend heavily on headhunting, invest surprisingly little in keeping the people they already have.\n\nExit interviews reveal a consistent pattern. Employees rarely leave only because of pay. More often they cite a poor relationship with their manager, a lack of opportunities to develop, or an onboarding process that left them confused and isolated in their first weeks.\n\nCompanies whose retention rates are high tend to do simple things consistently: managers hold regular one-to-one meetings, career paths are made clear, and new staff are given a mentor during their probation period. A generous benefits package helps, but it cannot compensate for feeling ignored.",
        [K.mc('How much can it cost to replace a skilled employee?', ['one month\'s salary', '6–9 months\' salary', 'two years\' salary'], 1),
         K.tf('Pay is the main reason most employees leave.', false),
         K.mc('Which reason is NOT mentioned?', ['a poor relationship with the manager', 'lack of development', 'a long commute'], 2),
         K.mc('What do companies with high retention give new staff?', ['a bonus', 'a mentor', 'extra holidays'], 1),
         K.mc('The last sentence suggests that…', ['benefits are useless', 'feeling valued matters more than benefits', 'salaries should be cut'], 1)]] },

    { id: 'u4', t: 'Figures and finance', topic: 'Finance',
      v: ['Money and figures', `
revenue | noun | money a company receives from sales | Revenue rose to $4 million. | выручка
profit margin | noun | the percentage of revenue that is profit | Our profit margin is 12%. | маржа прибыли
forecast | noun / verb | a prediction of future figures | Sales are forecast to grow by 5%. | прогноз
quarter | noun | a period of three months | Profits fell in the third quarter. | квартал
break even | phrasal verb | to make neither a profit nor a loss | We expect to break even next year. | выйти на безубыточность
overheads | noun | regular costs such as rent and electricity | We moved offices to reduce overheads. | накладные расходы
cash flow | noun | money moving in and out of a business | Poor cash flow can kill a small company. | денежный поток
invest | verb | to put money into something to make a profit | We plan to invest in new equipment. | инвестировать`],
      g: ['Describing numbers precisely and approximately', "<table><tr><td>Approximate</td><td><b>roughly / approximately / around</b> 2 million · <b>just over / just under</b> 40% · <b>nearly / almost</b> half</td></tr><tr><td>Fractions</td><td>a third, a quarter, three-quarters, the majority, a small minority</td></tr><tr><td>Change</td><td>rose <b>by</b> 10% (the difference) · rose <b>to</b> 50 million (the new figure) · <b>from</b> … <b>to</b> …</td></tr><tr><td>Doubling</td><td>doubled · halved · tripled · a <b>twofold</b> increase</td></tr></table>",
        [K.mc('Revenue increased ___ 15%, from 2 to 2.3 million.', ['to', 'by', 'at'], 1),
         K.mc('Profits rose ___ $5 million.', ['by', 'to', 'of'], 1),
         K.mc('48% is…', ['just over half', 'just under half', 'exactly half'], 1),
         K.mc('If sales go from 100 to 50, they have…', ['doubled', 'halved', 'tripled'], 1),
         K.gap('25% is a ___ of the total.', 'quarter'),
         K.ord('Costs fell by roughly a third last year.')]],
      r: ['Quarterly results summary', "In the third quarter, revenue rose by 8% to just over 410 million tenge, mainly due to strong online sales, which nearly doubled compared with the same period last year. However, the profit margin fell slightly, from 11% to 9.5%, because of higher delivery costs and an increase in overheads after the opening of the new warehouse.\n\nCash flow remains healthy, and the board has approved a plan to invest approximately 60 million tenge in automation, which is forecast to reduce delivery costs by around a quarter within two years. The company still expects to break even on the new warehouse by the end of next year.",
        [K.mc('How much did revenue rise?', ['by 8%', 'by 11%', 'by 25%'], 0),
         K.mc('What nearly doubled?', ['overheads', 'online sales', 'the profit margin'], 1),
         K.mc('Why did the profit margin fall?', ['lower sales', 'higher delivery costs and overheads', 'new staff'], 1),
         K.mc('How much will be invested in automation?', ['about 60 million', 'about 410 million', 'about 9.5 million'], 0),
         K.tf('The warehouse is already making a profit.', false)]] },

    { id: 'u5', t: 'Responsible business', topic: 'Ethics and sustainability',
      v: ['Sustainability and ethics', `
sustainable | adjective | able to continue without harming the environment | We use sustainable packaging. | устойчивый
carbon footprint | noun | the amount of CO₂ produced by an activity | We aim to cut our carbon footprint by half. | углеродный след
supply chain | noun | all the companies involved in making and delivering a product | We audit our whole supply chain. | цепочка поставок
transparency | noun | being open about how you operate | Customers expect transparency. | прозрачность
comply with | verb | to obey a rule or law | All suppliers must comply with the code. | соблюдать
fair trade | noun | trade that pays producers a fair price | We only buy fair trade coffee. | справедливая торговля
greenwashing | noun | pretending to be more environmentally friendly than you are | The campaign was criticised as greenwashing. | гринвошинг
stakeholder | noun | anyone affected by a company's actions | We consulted all stakeholders. | заинтересованная сторона`],
      g: ['Obligation in policies: must, be required to, be expected to', "<table><tr><td>Strong obligation</td><td>Suppliers <b>must</b> / <b>are required to</b> / <b>are obliged to</b> comply with the code.</td></tr><tr><td>Expectation</td><td>Staff <b>are expected to</b> / <b>should</b> reduce printing.</td></tr><tr><td>No obligation</td><td>Employees <b>are not required to</b> / <b>don't have to</b> attend.</td></tr><tr><td>Prohibition</td><td>Child labour <b>is strictly prohibited</b>. Staff <b>must not</b> accept gifts over $50.</td></tr></table>",
        [K.mc('All suppliers ___ to provide safety certificates.', ['must', 'are required', 'should'], 1),
         K.mc('Staff are ___ to switch off lights when they leave.', ['expected', 'prohibited', 'obliged not'], 0),
         K.mc('Accepting expensive gifts ___ prohibited.', ['is strictly', 'must', 'are'], 0),
         K.mc('Attendance is optional: you are not ___ to come.', ['required', 'prohibited', 'expected not'], 0),
         K.gap('Every factory must comply ___ local labour laws.', 'with'),
         K.ord('Employees are expected to reduce waste.')]],
      r: ['Green claims under scrutiny', "Consumers increasingly say they prefer sustainable brands, and companies have responded with a wave of green advertising. But regulators are now looking more closely at these claims.\n\nIn several countries, companies are now required to prove statements such as 'carbon neutral' or 'eco-friendly'. Vague claims that cannot be backed up with data may be treated as greenwashing and lead to fines. Firms are also expected to show transparency across their supply chain, since much of a product's carbon footprint is created by suppliers rather than by the brand itself.\n\nFor honest companies, this is good news. Those that can demonstrate real progress — for example, by publishing independent audits — are likely to win the trust of both customers and investors.",
        [K.mc('What are regulators doing?', ['banning advertising', 'checking green claims more closely', 'paying companies'], 1),
         K.mc('What may happen if claims can\'t be proven?', ['nothing', 'fines', 'tax reductions'], 1),
         K.tf('Most of a product\'s carbon footprint always comes from the brand itself.', false),
         K.mc('How can honest companies win trust?', ['by publishing independent audits', 'by stopping advertising', 'by lowering prices'], 0),
         K.mc('The writer\'s view of the new rules is…', ['negative for everyone', 'good news for honest companies', 'unclear'], 1)]] },

    { id: 'u6', t: 'Handling a crisis', topic: 'Crisis management',
      v: ['When things go wrong', `
crisis | noun | a time of great difficulty or danger | The company faced a serious crisis. | кризис
recall | verb / noun | to ask customers to return a faulty product | They recalled 10,000 cars. | отзывать (товар)
statement | noun | an official public announcement | The CEO issued a statement. | заявление
damage control | noun | actions to limit harm to reputation | The PR team went into damage control. | минимизация ущерба
reputation | noun | what people think of a company | Their reputation suffered badly. | репутация
take responsibility | phrase | to accept that you are to blame | The company took full responsibility. | взять на себя ответственность
compensate | verb | to pay someone for loss or damage | Customers were compensated. | компенсировать
lessons learned | phrase | what you understand after a problem | We published the lessons learned. | извлечённые уроки`],
      g: ['Third conditional and should have for reviewing mistakes', "<table><tr><td>Third conditional</td><td>If we <b>had tested</b> the batch, we <b>would have found</b> the fault.</td></tr><tr><td>Mixed (past → present)</td><td>If we <b>had acted</b> faster, our reputation <b>would be</b> stronger now.</td></tr><tr><td>Criticism / regret</td><td>We <b>should have informed</b> customers sooner. They <b>shouldn't have ignored</b> the warnings.</td></tr><tr><td>Possibility</td><td>The problem <b>could have been</b> avoided.</td></tr></table>",
        [K.mc('If we had checked the data, we ___ the error.', ['would notice', 'would have noticed', 'noticed'], 1),
         K.mc('The company ___ apologised earlier.', ['should have', 'should', 'must'], 0),
         K.mc('If they hadn\'t delayed the recall, customers ___ angry now.', ["wouldn't be", "won't be", "wouldn't have been"], 0),
         K.mc('The crisis ___ have been avoided with better testing.', ['could', 'should', 'would'], 0),
         K.gap('If the CEO had taken responsibility, the shares ___ have fallen so much.', "wouldn't", 'would not'),
         K.ord('We should have informed our customers immediately.')]],
      r: ['Case study: the faulty heater', "In January, a company selling electric heaters discovered that one model could overheat. The warning came from a small number of customer complaints, but managers decided to wait for more data before acting.\n\nTwo weeks later, a video of a smoking heater went viral. The company issued a short statement denying any danger, which made matters worse. Only after a week of negative headlines did the CEO take responsibility, announce a full recall and offer to compensate every customer.\n\nIn the review that followed, the lessons learned were clear. If the company had acted on the first complaints, the recall would have been smaller and cheaper. It should have communicated openly rather than denying the problem. 'We protected our product instead of our customers,' the CEO admitted, 'and that nearly cost us our reputation.'",
        [K.mc('What was the problem?', ['heaters could overheat', 'heaters were too expensive', 'deliveries were late'], 0),
         K.mc('What did managers decide at first?', ['to recall immediately', 'to wait for more data', 'to stop production'], 1),
         K.mc('Why did the first statement make things worse?', ['it denied any danger', 'it was too long', 'it blamed customers'], 0),
         K.tf('The company eventually offered compensation.', true),
         K.mc('The CEO admits the company protected…', ['its customers', 'its product instead of its customers', 'its employees'], 1)]] }
  ]);

  /* ---------------- Business C1 (English only) ---------------- */
  IFX.make('be-c1', [
    { id: 'u3', t: 'Innovation and disruption', topic: 'Innovation',
      v: ['Innovation', `
disruptive | adjective | changing an industry completely by replacing old ways | Streaming was disruptive to the DVD rental business.
incumbent | noun | a company that already dominates a market | Incumbents are often slow to innovate.
iterate | verb | to repeat a process, improving it each time | We iterate on the design every two weeks.
scalable | adjective | able to grow without problems | Is the business model scalable?
first-mover advantage | noun | the benefit of being first in a market | They lost their first-mover advantage.
cannibalise | verb | to reduce sales of your own existing product with a new one | The new model may cannibalise sales of the old one.
pivot | verb / noun | to change business direction | The start-up pivoted to B2B software.
obsolete | adjective | no longer used because something better exists | Fax machines are largely obsolete.`],
      g: ['Cleft sentences for emphasis', "<table><tr><td><b>It is / was … that / who</b></td><td><b>It was</b> the customer data <b>that</b> convinced the board. <b>It's</b> speed, not size, <b>that</b> matters.</td></tr><tr><td><b>What … is / was …</b></td><td><b>What</b> incumbents underestimate <b>is</b> how quickly habits change.</td></tr><tr><td><b>All … is …</b> / <b>The thing … is …</b></td><td><b>All</b> we need <b>is</b> one successful pilot. <b>The reason</b> we pivoted <b>was</b> cash flow.</td></tr></table>",
        [K.mc('___ was the new CEO who pushed for the change.', ['It', 'What', 'This'], 0),
         K.mc('___ surprised us was the speed of adoption.', ['It', 'What', 'That'], 1),
         K.mc('All we need ___ more time.', ['are', 'is', 'be'], 1),
         K.mc('It\'s not the price ___ customers care about most.', ['what', 'that', 'which it'], 1),
         K.gap('___ the company lacked was a clear strategy.', 'What'),
         K.ord('It was the data that changed our minds.')]],
      r: ['The innovator\'s trap', "Why do successful companies so often fail to respond to disruptive technologies? It is rarely a lack of intelligence or resources. What usually traps incumbents is their own success.\n\nA disruptive product typically starts out cheaper, simpler and, by traditional standards, worse than existing offerings. It appeals to customers the incumbent does not value. Investing in it would cannibalise profitable existing lines, so managers, acting perfectly rationally, choose to ignore it — until it improves enough to attract their core customers.\n\nThe companies that escape this trap tend to create separate units with their own budgets and metrics, allowing them to iterate rapidly without being judged against the parent firm's margins. What they understand is that defending today's business and building tomorrow's are different jobs.",
        [K.mc('According to the text, incumbents usually fail because of…', ['lack of intelligence', 'their own success', 'poor resources'], 1),
         K.mc('A disruptive product typically starts out…', ['more expensive and better', 'cheaper and simpler', 'identical to existing products'], 1),
         K.mc('Why do managers ignore disruptive products?', ['investing would cannibalise profitable lines', 'they don\'t notice them', 'they are illegal'], 0),
         K.tf('The writer suggests managers who ignore disruption act irrationally.', false),
         K.mc('Successful companies tend to…', ['create separate units with their own metrics', 'cut prices', 'buy their competitors'], 0)]] },

    { id: 'u4', t: 'Mergers and acquisitions', topic: 'Corporate strategy',
      v: ['M&A', `
acquisition | noun | the purchase of one company by another | The acquisition was completed in March.
merger | noun | the joining of two companies into one | The merger created the region's largest bank.
due diligence | noun | a detailed investigation before a deal | Due diligence revealed hidden debts.
synergy | noun | the extra value created when two things combine | The deal promised significant cost synergies.
hostile takeover | noun | an acquisition the target company does not want | The board fought off a hostile takeover.
valuation | noun | an estimate of a company's worth | The valuation was considered too high.
integration | noun | the process of combining two organisations | Cultural integration proved difficult.
divest | verb | to sell part of a business | The group divested its retail division.`],
      g: ['Formal passives and impersonal structures', "<table><tr><td>Impersonal passive</td><td><b>It is expected that</b> the deal will close in Q3. <b>It has been reported that</b>…</td></tr><tr><td>Subject + passive + infinitive</td><td>The company <b>is understood to be</b> in talks. Synergies <b>are estimated to have reached</b> $40m.</td></tr><tr><td>Passive with modals</td><td>Approval <b>must be obtained</b>. The deal <b>could have been structured</b> differently.</td></tr><tr><td><b>There is said / thought to be</b></td><td><b>There is thought to be</b> strong interest from investors.</td></tr></table>",
        [K.mc('The firm is ___ to be considering a merger.', ['understood', 'understanding', 'understand'], 0),
         K.mc('It ___ that the deal will be approved.', ['expects', 'is expected', 'has expected'], 1),
         K.mc('Synergies are estimated ___ $40m last year.', ['to reach', 'to have reached', 'reaching'], 1),
         K.mc('Regulatory approval ___ before completion.', ['must obtain', 'must be obtained', 'must obtained'], 1),
         K.gap('There ___ said to be three bidders.', 'are'),
         K.ord('It is believed that the valuation was too high.')]],
      r: ['Why most mergers disappoint', "Mergers are announced with great confidence: the combined company, it is claimed, will be stronger, more efficient and better placed to compete. Yet studies repeatedly suggest that a majority of acquisitions fail to create the value that was promised.\n\nThe reasons are seldom financial. Due diligence is usually thorough on debts and contracts, but far less so on culture. When a fast-moving, informal start-up is absorbed into a hierarchical corporation, the very qualities that made it valuable can be lost within months as key staff leave.\n\nPaying too much is the other common error. In competitive bidding, valuations are pushed upwards and the projected synergies needed to justify the price become unrealistic. It is therefore often argued that the best deals are the ones that are walked away from.",
        [K.mc('What do studies suggest about most acquisitions?', ['they create great value', 'they fail to deliver promised value', 'they are always hostile'], 1),
         K.mc('Which area is often neglected in due diligence?', ['debts', 'contracts', 'culture'], 2),
         K.mc('What can happen when a start-up is absorbed?', ['key staff leave', 'profits always double', 'prices fall'], 0),
         K.tf('Competitive bidding tends to push valuations down.', false),
         K.mc('"The best deals are the ones that are walked away from" means…', ['never buy companies', 'it is often wise not to complete a deal', 'walking is healthy'], 1)]] },

    { id: 'u5', t: 'Working across cultures', topic: 'Global teams',
      v: ['International collaboration', `
high-context | adjective | relying on shared understanding rather than explicit words | In high-context cultures, much is left unsaid.
hierarchical | adjective | organised with clear levels of authority | Decision-making is highly hierarchical.
consensus | noun | general agreement | The Swedish team prefers to reach consensus.
candid | adjective | honest and direct | Thank you for your candid feedback.
saving face | phrase | avoiding embarrassment or loss of respect | Allowing a colleague to save face is important.
time zone | noun | a region with the same standard time | Our team spans five time zones.
asynchronous | adjective | not happening at the same time | We rely on asynchronous communication.
misalignment | noun | a lack of agreement on goals or expectations | The delay was caused by misalignment between teams.`],
      g: ['Softening and diplomatic language', "<table><tr><td>Softening verbs</td><td>I <b>wonder if</b> we could… · I'd <b>suggest</b> that… · We <b>might want to</b> reconsider…</td></tr><tr><td>Qualifiers</td><td><b>slightly</b> concerned · <b>a little</b> behind schedule · <b>not entirely</b> convinced</td></tr><tr><td>Negative questions</td><td><b>Wouldn't it be</b> better to wait? <b>Isn't there</b> a risk that…?</td></tr><tr><td>Past forms for distance</td><td>I <b>was wondering</b> whether… · We <b>were hoping</b> to…</td></tr></table>",
        [K.mc('Most diplomatic: ___', ['Your plan is wrong.', "I'm not entirely convinced by the plan.", 'Bad plan.'], 1),
         K.mc('I ___ if we could extend the deadline.', ['wonder', 'demand', 'insist'], 0),
         K.mc('___ it be wiser to consult the client first?', ["Wouldn't", "Won't", "Doesn't"], 0),
         K.mc('We\'re ___ behind schedule.', ['a little', 'very much', 'completely'], 0),
         K.gap('I was ___ whether you had time to review the draft.', 'wondering'),
         K.ord('We might want to reconsider the timeline.')]],
      r: ['The silence that wasn\'t agreement', "A Kazakh-German engineering team was preparing a major bid. In the final video call, the German project lead presented the plan and asked, 'Any objections?' Silence followed, which she interpreted as consensus. Two weeks later, she discovered that the Almaty team had serious concerns about the timeline but had not felt it appropriate to contradict a senior colleague in front of the whole group.\n\nThe misalignment was not about competence but about communication style. In more hierarchical, high-context settings, disagreement is often expressed indirectly or privately, so that no one loses face. In lower-context cultures, silence tends to be read as approval.\n\nThe team changed its approach: before decisions, the lead now asks members to send comments asynchronously, and she holds brief one-to-one calls. 'I've learned that the absence of objections is not the same as agreement,' she says.",
        [K.mc('How did the German lead interpret the silence?', ['as disagreement', 'as consensus', 'as a technical problem'], 1),
         K.mc('Why didn\'t the Almaty team object?', ['they agreed', 'it seemed inappropriate to contradict a senior colleague publicly', 'they did not understand'], 1),
         K.tf('The problem was caused by a lack of technical skill.', false),
         K.mc('In lower-context cultures, silence is usually read as…', ['approval', 'disagreement', 'confusion'], 0),
         K.mc('What did the team change?', ['they stopped meeting', 'comments in writing and one-to-one calls before decisions', 'they hired a translator'], 1)]] },

    { id: 'u6', t: 'The perfect pitch', topic: 'Persuasion and presenting',
      v: ['Pitching an idea', `
pitch | noun / verb | a persuasive presentation of an idea | She pitched the idea to investors.
value proposition | noun | the main reason a customer should buy | Our value proposition is speed.
compelling | adjective | so persuasive that you must pay attention | They made a compelling case.
pain point | noun | a specific problem customers have | We solve a real pain point for farmers.
traction | noun | evidence that a product is gaining customers | The app has strong early traction.
call to action | noun | a clear request for what the audience should do next | End with a clear call to action.
anecdote | noun | a short personal story | An anecdote can make data memorable.
rhetorical question | noun | a question asked for effect, not an answer | Who wouldn't want to save time?`],
      g: ['Rhetorical devices for impact', "<table><tr><td>Rule of three (tricolon)</td><td>It's <b>faster, cheaper and safer</b>.</td></tr><tr><td>Contrast</td><td><b>Not</b> a product — <b>a</b> platform. We don't sell software; <b>we sell time</b>.</td></tr><tr><td>Inversion for emphasis</td><td><b>Never before has</b> it been so easy… · <b>Not only does</b> it save money, <b>but</b> it also…</td></tr><tr><td>Rhetorical questions</td><td><b>What if</b> you could halve your costs?</td></tr></table>",
        [K.mc('Which uses the rule of three?', ['It is quick.', 'It is quick, simple and affordable.', 'It is very, very quick.'], 1),
         K.mc('Not only ___ save time, but it also reduces errors.', ['it does', 'does it', 'it'], 1),
         K.mc('Never before ___ so many customers asked for this.', ['have', 'had have', 'did'], 0),
         K.mc('Which is a rhetorical question?', ['What time is it?', 'Who wouldn\'t want to pay less?', 'Where is the office?'], 1),
         K.gap('We don\'t sell software — ___ sell peace of mind.', 'we'),
         K.ord('Not only is it cheaper, but it is also faster.')]],
      r: ['Anatomy of a winning pitch', "Investors hear dozens of pitches a week, and most of them blur together. The ones that stand out tend to share a structure.\n\nThey open with a pain point, often through a brief anecdote: 'Last spring, a farmer near Kostanay lost a third of his harvest because he didn't know a storm was coming.' Only then do they introduce the solution and its value proposition, stated in a single sentence. Next comes evidence — not projections, but traction: paying customers, growth rates, partnerships.\n\nFinally, the best presenters end with a clear call to action. Never do they leave the room without saying exactly what they want: the amount of investment, what it will be used for, and what it will achieve. As one investor put it, 'A compelling pitch isn't the one with the most slides — it's the one I can repeat to my partners in thirty seconds.'",
        [K.mc('How do strong pitches usually open?', ['with financial projections', 'with a pain point, often through an anecdote', 'with the team\'s CVs'], 1),
         K.mc('What kind of evidence do investors prefer?', ['projections', 'traction such as paying customers', 'awards'], 1),
         K.tf('The best presenters end without asking for anything specific.', false),
         K.mc('A good call to action includes…', ['the amount, its use and the result', 'a joke', 'a thank-you slide'], 0),
         K.mc('According to the investor, a compelling pitch is one that…', ['has the most slides', 'can be repeated in thirty seconds', 'lasts an hour'], 1)]] }
  ]);
})();
