// English Files · Advanced Plus (C2): grammar and speaking for each unit, written by IF Academy.
// Only the unit order and grammar topic follow the coursebook syllabus. The explanations and exercises were written
// for the first Advanced Plus course (app/courses/ef-c2.js) and are kept in c2-base.json; the speaking tasks are below.
import fs from 'node:fs';
const base = JSON.parse(fs.readFileSync(new URL('./c2-base.json', import.meta.url), 'utf8')).grammar;
const talk = {
  '1A': ["Describe somebody who inspired you without ever telling you what to do. What exactly would they do or say?", "Is pressure from a coach, teacher or boss ever useful? Where should motivation come from?"],
  '1B': ["How far should parents protect a child from failure? Give an example from your own upbringing or somebody else's.", "What is the most useful piece of feedback you have ever received, and why did it work?"],
  '2A': ["Tell the story of a time you were able to do something you had thought impossible.", "Is resilience something people are born with or something they build? Defend your view."],
  '2B': ["Describe the most physically demanding journey you have made. Use at least three different verbs of movement.", "Why do people choose difficult adventures when comfortable holidays exist?"],
  '3A': ["Do you expect to be happier at sixty than you are now? What would your answer depend on?", "Describe a piece of research you have read about. How reliable did it seem, and why?"],
  '3B': ["Which idioms in your own language come from a famous writer or book? Explain two of them in English.", "Should schools still teach four-hundred-year-old plays? Argue for or against."],
  '4A': ["What are the pros and cons of treating boys and girls in exactly the same way at school?", "Describe one way in which your childhood has affected the adult you are. What caused what?"],
  '4B': ["Would a four-day week work in your profession or school? What would have to change?", "Describe how your attitude to work or study has been changing over the last few years."],
  '5A': ["Describe a week in which your emotions changed sharply. What were you apprehensive about, and what surprised you?", "Is it better to show strong emotions at work or to hide them? Give reasons."],
  '5B': ["Compare two places or cultures you know well. Use at least three different structures for contrast.", "Is it possible to belong fully to two cultures at once? What is gained and what is lost?"],
  '6A': ["Describe something that was made by hand and that matters to you. Who made it, and how?", "Which traditional skill in your country is most likely to disappear? Should anybody try to save it?"],
  '6B': ["Describe a time when a number or statistic misled you or somebody you know.", "Should everybody have to study statistics at school? Why, or why not?"],
  '7A': ["Summarise a crime story, real or fictional, using passive reporting forms (is thought to…, is said to have…).", "Is prison an effective deterrent? What alternatives would you support, and for which offences?"],
  '7B': ["Would you rather live alone or with other people? Explain what you would miss in each case.", "Choose a pair of words with opposite connotations (for example thrifty and stingy) and describe a person both ways."],
  '8A': ["Describe a meal that mattered in a relationship, your own or somebody else's. What would have happened otherwise?", "Which food from your country is an acquired taste? How would you persuade a visitor to try it?"],
  '8B': ["Describe a picture, building or view that you know very well, as precisely as you can. Mind the order of your adjectives.", "Tell about a time you looked at something familiar and suddenly saw it differently."]
};
const out = {};
for (const [k, g] of Object.entries(base)) out[k] = { g: g.g, rule: g.rule, ex: g.ex, talk: talk[k] };
export default out;
