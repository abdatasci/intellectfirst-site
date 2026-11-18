// Helpers for the English Files grammar files. All explanations, examples and tasks are original IF Academy content;
// only the unit order and the grammar topic of each unit follow the coursebook syllabus.
export const mc = (q, o, a) => ({ t: 'mc', q, o, a }), gap = (q, ...a) => ({ t: 'gap', q, a });
export const R = (intro, rows, note) => `<p>${intro}</p><table>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table>${note ? `<p>${note}</p>` : ''}`;
export const U = (g, intro, rows, ex, talk, ru, note) => ({ g, rule: R(intro, rows, note), ex, talk, ...(ru ? { ru } : {}) });
