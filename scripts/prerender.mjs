// Build-time static prerender (fire-your-seo-agency, crawler-eye rule: content must exist without JavaScript).
// Runs after `vite build`. Writes real HTML for the home, 9 calculator routes, trust pages, 404, sitemap.
// Formulas below mirror components/*.tsx. The React app still takes over in the browser.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const SITE = 'https://finoracalc.tech';
const DATE = process.env.PRERENDER_DATE || '2026-10-13';
const en = JSON.parse(fs.readFileSync(path.join(root, 'public/locales/en.json'), 'utf8'));
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const usd = (v, d = 0) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const int = v => Math.round(v).toLocaleString('en-US');
const pct = v => v.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%';

// ---------- calculators (mirror the components) ----------
function compound(P, rate, months, c) { const r = rate / 100 / 12; let b = P, ti = 0; for (let i = 0; i < months; i++) { const x = b * r; b += x + c; ti += x; } return { fv: b, contrib: P + c * months, interest: ti }; }
function loanPay(P, rate, years) { const r = rate / 100 / 12, n = years * 12; const m = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); return { m, total: m * n, interest: m * n - P }; }
function savingsNeeded(target, pv, years, rate) { const r = rate / 100 / 12, n = years * 12; const fvp = pv * Math.pow(1 + r, n); const m = (target - fvp) / ((Math.pow(1 + r, n) - 1) / r); return { m, contrib: pv + m * n, interest: target - (pv + m * n) }; }
function retire(p, c, rate, years) { const r = rate / 100 / 12, n = years * 12; const fv = p * Math.pow(1 + r, n) + c * ((Math.pow(1 + r, n) - 1) / r); const tc = p + c * n; return { fv, tc, ti: fv - tc }; }

const CALCS = [
  (() => { const x = compound(10000, 7, 120, 200); return {
    slug: 'compound-interest', name: en.compoundInterestTitle,
    title: 'Compound Interest Calculator with Monthly Deposits | Finora',
    desc: 'Estimate future value with monthly compounding and recurring deposits. See total contributions and interest earned for any rate and term. Free and in-browser.',
    h1: 'Compound Interest Calculator',
    answer: 'Future value is your balance compounded monthly at the annual rate divided by 12, with each month\'s deposit added.',
    inputs: [['Principal amount', usd(10000)], ['Annual interest rate', '7%'], ['Number of months', '120'], ['Monthly contribution', usd(200)]],
    results: [[en.futureValue, usd(x.fv)], [en.totalContributions, usd(x.contrib)], [en.totalInterest, usd(x.interest)]],
    method: ['Each month the calculator adds interest of (annual rate / 100 / 12) x the current balance, then adds the monthly contribution. It repeats this for every month of the term.', 'Total contributions = principal + monthly contribution x months. Total interest earned = the sum of the monthly interest amounts.'],
    limits: ['Assumes one constant annual rate; real returns vary and can be negative.', 'Taxes, fees and inflation are not deducted, so the result is a nominal estimate.'],
    faq: [['How do I calculate compound interest with monthly deposits?', `Compound the balance monthly at the annual rate divided by 12 and add each deposit. With ${usd(10000)} at 7% for 120 months plus ${usd(200)} a month, the future value is ${usd(x.fv)}.`], ['What is the difference between contributions and interest earned?', `Contributions are the money you put in (${usd(x.contrib)} in the example). Interest earned is the growth on top (${usd(x.interest)}).`], ['Does this calculator include taxes or fees?', 'No. It shows a nominal projection at a constant rate; fees, taxes and inflation are not deducted.']],
  }; })(),
  (() => { const I = 10000 * 0.05 * 3; return {
    slug: 'simple-interest', name: en.simpleInterestTitle,
    title: 'Simple Interest Calculator: Interest and Total | Finora',
    desc: 'Calculate simple interest on a deposit or loan from principal, annual rate and years. Shows total interest and the final amount. Free and runs in your browser.',
    h1: 'Simple Interest Calculator',
    answer: 'Simple interest equals principal x annual rate x years, and it is not compounded.',
    inputs: [['Principal amount', usd(10000)], ['Annual interest rate', '5%'], ['Number of years', '3']],
    results: [[en.futureValue, usd(10000 + I)], [en.principal, usd(10000)], [en.totalInterest, usd(I)]],
    method: ['Total interest = principal x (annual rate / 100) x years. Future value = principal + total interest.', 'Because interest is never added back to the principal, growth is linear, unlike compound interest.'],
    limits: ['Assumes a constant rate for the whole term and no additional deposits.', 'Many bank products compound; use the compound interest calculator for those.'],
    faq: [['How is simple interest calculated?', `Multiply principal by the annual rate and by the number of years. For ${usd(10000)} at 5% for 3 years, the interest is ${usd(I)}.`], ['What is the difference between simple and compound interest?', 'Simple interest is earned only on the original principal. Compound interest is earned on the principal plus previously earned interest.'], ['What is the final amount in the example?', `Principal plus interest: ${usd(10000 + I)}.`]],
  }; })(),
  (() => { const x = savingsNeeded(50000, 5000, 10, 5); return {
    slug: 'savings-goal', name: en.savingsGoalTitle,
    title: 'Savings Goal Calculator: Monthly Amount Needed | Finora',
    desc: 'Find the monthly contribution needed to reach a savings goal from your starting balance, time horizon and expected rate, with monthly compounding. Free tool.',
    h1: 'Savings Goal Calculator',
    answer: 'The monthly amount needed is the goal minus the grown starting balance, divided by the monthly annuity growth factor.',
    inputs: [['Savings goal', usd(50000)], ['Initial deposit', usd(5000)], ['Years to save', '10'], ['Estimated annual rate', '5%']],
    results: [[en.monthlyContributionNeeded, usd(x.m, 2)], [en.totalContributions, usd(x.contrib)], [en.totalInterest, usd(x.interest)]],
    method: ['The starting deposit grows by (1 + rate/12)^months. The gap between the goal and that value must come from monthly deposits.', 'Monthly deposit = gap / (((1 + rate/12)^months - 1) / (rate/12)). If the starting deposit alone already reaches the goal, the result is 0.'],
    limits: ['Assumes a constant rate and deposits at the end of every month.', 'Requires a rate above 0%; taxes and inflation are not modelled.'],
    faq: [['How much should I save each month to reach my goal?', `It depends on goal, time, starting balance and rate. To reach ${usd(50000)} in 10 years from ${usd(5000)} at 5%, deposit about ${usd(x.m, 2)} a month.`], ['How much of the goal comes from interest?', `In the example, interest provides about ${usd(x.interest)} and your contributions ${usd(x.contrib)}.`], ['What if my starting balance already covers the goal?', 'The calculator then shows a required monthly contribution of 0.']],
  }; })(),
  (() => ({
    slug: 'roi', name: en.roiTitle,
    title: 'ROI Calculator: Return on Investment Percentage | Finora',
    desc: 'Calculate return on investment from your initial cost and final value. Get net profit and ROI percentage instantly with a clear formula. Free, no signup.',
    h1: 'ROI Calculator',
    answer: 'ROI is (final value - initial investment) / initial investment x 100.',
    inputs: [['Initial investment', usd(10000)], ['Final value of investment', usd(12500)]],
    results: [[en.roiPercentage, pct(25)], [en.netProfit, usd(2500)]],
    method: ['Net profit = final value - initial investment. ROI = net profit / initial investment x 100.', 'A negative ROI means the final value is lower than the amount invested.'],
    limits: ['ROI ignores how long the investment was held, so it cannot compare investments of different durations.', 'Fees, taxes and dividends must be included in the final value yourself.'],
    faq: [['How do I calculate ROI?', 'Subtract the initial investment from the final value, divide by the initial investment, then multiply by 100. For 10,000 growing to 12,500, ROI is 25%.'], ['What is a good ROI?', 'It depends on the asset, risk and time held. ROI does not account for time, so compare it with annualised returns for longer periods.'], ['Can ROI be negative?', 'Yes. If the final value is below the initial investment, net profit and ROI are negative.']],
  }))(),
  (() => { const x = loanPay(200000, 6.5, 30); return {
    slug: 'loan', name: en.loanTitle,
    title: 'Loan and Mortgage Payment Calculator: Monthly Cost | Finora',
    desc: 'Calculate the fixed monthly payment, total payment and total interest on a loan or mortgage from amount, annual rate and term in years. Free and in-browser.',
    h1: 'Loan and Mortgage Calculator',
    answer: 'The monthly payment comes from the standard amortization formula using loan amount, monthly rate and number of payments.',
    inputs: [['Loan amount', usd(200000)], ['Annual interest rate', '6.5%'], ['Loan term (years)', '30']],
    results: [[en.monthlyPayment, usd(x.m, 2)], [en.totalPayment, usd(x.total)], [en.totalInterestPaid, usd(x.interest)]],
    method: ['Monthly rate r = annual rate / 100 / 12 and payments n = years x 12. Payment = P x r x (1+r)^n / ((1+r)^n - 1).', 'Total payment = payment x n. Total interest = total payment - loan amount.'],
    limits: ['Assumes a fixed rate and equal monthly payments.', 'Property tax, insurance, fees and extra payments are not included.'],
    faq: [['How is a monthly loan payment calculated?', `With the amortization formula. For ${usd(200000)} at 6.5% over 30 years, the payment is ${usd(x.m, 2)} a month.`], ['How much interest will I pay over the loan?', `Total payments minus the amount borrowed. In the example, about ${usd(x.interest)}.`], ['Does the result include taxes and insurance?', 'No. It covers principal and interest only.']],
  }; })(),
  (() => { const x = retire(20000, 500, 6, 35); return {
    slug: 'retirement', name: en.retirementTitle,
    title: 'Retirement Savings Calculator: Estimated Balance | Finora',
    desc: 'Estimate your retirement savings from current age, retirement age, current savings, monthly contribution and expected annual return. Free, runs in your browser.',
    h1: 'Retirement Calculator',
    answer: 'Retirement savings grow by compounding your current balance monthly and adding every monthly contribution until retirement age.',
    inputs: [['Current age', '30'], ['Retirement age', '65'], ['Current savings', usd(20000)], ['Monthly contribution', usd(500)], ['Estimated annual return', '6%']],
    results: [[en.estimatedRetirementSavings, usd(x.fv)], [en.totalContributions, usd(x.tc)], [en.totalInterest, usd(x.ti)]],
    method: ['Months = (retirement age - current age) x 12 and monthly rate = annual return / 100 / 12.', 'Estimated savings = current savings x (1+r)^months + contribution x (((1+r)^months - 1) / r). Total contributions = current savings + contribution x months.'],
    limits: ['Assumes a constant return and a fixed contribution; inflation, taxes and withdrawals are not modelled.', 'The result is an illustration for planning, not investment advice.'],
    faq: [['How much will I have at retirement?', `With ${usd(20000)} saved, ${usd(500)} a month and a 6% return from age 30 to 65, the estimate is ${usd(x.fv)}.`], ['How much of that is my own money?', `Contributions total ${usd(x.tc)}; the remaining ${usd(x.ti)} is estimated growth.`], ['Does the estimate adjust for inflation?', 'No. Figures are nominal, so future amounts buy less than the same amount today.']],
  }; })(),
  (() => { const f = 1000 * Math.pow(1.03, 10); return {
    slug: 'inflation', name: en.inflationTitle,
    title: 'Inflation Calculator: Future Cost and Increase | Finora',
    desc: 'See what an amount costs in the future at a constant inflation rate. Enter the amount, annual inflation and years to get the future cost and the increase.',
    h1: 'Inflation Calculator',
    answer: 'At a constant inflation rate, future cost equals today\'s amount x (1 + rate) raised to the number of years.',
    inputs: [['Initial amount', usd(1000)], ['Annual inflation rate', '3%'], ['Number of years', '10']],
    results: [[en.futureCost, usd(f, 2)], [en.purchasingPowerLost, usd(f - 1000, 2)]],
    method: ['Future cost = amount x (1 + inflation rate / 100)^years.', 'The second result is the difference between future cost and the original amount, that is, how much more the same goods would cost.'],
    limits: ['Assumes one constant inflation rate; real inflation changes every year.', 'You enter the rate yourself; the tool does not load official price-index data.'],
    faq: [['How do I calculate future cost with inflation?', `Multiply today's price by (1 + inflation rate) for each year. ${usd(1000)} at 3% for 10 years becomes ${usd(f, 2)}.`], ['What does the second result show?', `The extra amount needed to buy the same goods: ${usd(f - 1000, 2)} in the example.`], ['What inflation rate should I use?', 'Use a long-run average for your currency or a recent official figure; the tool does not provide official data.']],
  }; })(),
  (() => { const t = 80 * 0.18, tot = 80 + t; return {
    slug: 'tip', name: en.tipTitle,
    title: 'Tip Calculator: Tip, Total and Split Per Person | Finora',
    desc: 'Work out the tip, the total and the amount per person for a restaurant bill. Enter the bill, tip percentage and number of people. Free and in-browser.',
    h1: 'Tip Calculator',
    answer: 'Tip equals the bill x tip percentage; the total divided by the number of people gives each person\'s share.',
    inputs: [['Bill amount', usd(80)], ['Tip percentage', '18%'], ['Number of people', '4']],
    results: [[en.tipAmount, usd(t, 2)], [en.totalAmount, usd(tot, 2)], [en.amountPerPerson, usd(tot / 4, 2)]],
    method: ['Tip amount = bill x tip percentage / 100. Total = bill + tip. Amount per person = total / number of people.', 'The tip is calculated on the pre-tip bill amount you enter.'],
    limits: ['Splits the total evenly; it does not handle unequal shares.', 'Customary tip percentages differ by country and service type.'],
    faq: [['How do I calculate a tip?', `Multiply the bill by the tip percentage. An ${usd(80)} bill at 18% has a ${usd(t, 2)} tip.`], ['How do I split the bill?', `Divide the total by the number of people. ${usd(tot, 2)} among 4 people is ${usd(tot / 4, 2)} each.`], ['Is tax included?', 'Only if you include it in the bill amount you enter.']],
  }; })(),
  (() => ({
    slug: 'break-even', name: en.breakEvenTitle,
    title: 'Break-Even Point Calculator: Units and Revenue | Finora',
    desc: 'Find the break-even point in units and revenue from fixed costs, variable cost per unit and selling price. Free calculator that runs entirely in your browser.',
    h1: 'Break-Even Point Calculator',
    answer: 'Break-even units equal fixed costs divided by the margin per unit (price minus variable cost), rounded up.',
    inputs: [['Total fixed costs', usd(12000)], ['Variable cost per unit', usd(8)], ['Price per unit', usd(20)]],
    results: [[en.breakEvenUnits, '1,000'], [en.breakEvenRevenue, usd(20000)]],
    method: ['Break-even units = fixed costs / (price per unit - variable cost per unit); the calculator rounds up to whole units. Break-even revenue = break-even units x price per unit.', 'The price per unit must be higher than the variable cost per unit, otherwise there is no break-even volume.'],
    limits: ['Assumes price and variable cost per unit stay constant at every volume.', 'Taxes and financing costs are not modelled.'],
    faq: [['How do I calculate the break-even point?', 'Divide total fixed costs by the margin per unit. With 12,000 fixed costs, a 20 price and an 8 variable cost, break-even is 1,000 units.'], ['What is break-even revenue?', 'Break-even units multiplied by the selling price: 20,000 in the example.'], ['What if the price is below the variable cost?', 'Each sale loses money, so no number of units reaches break-even.']],
  }))(),
];

const HOME_FAQ = [
  ['What can I calculate with Finora?', 'Finora includes nine calculators: compound interest, simple interest, savings goal, ROI, loan and mortgage payment, retirement, inflation, tip and break-even.'],
  ['Is Finora free to use?', 'Yes. All calculators are free and run in your browser without an account.'],
  ['Are my numbers sent to a server?', 'No. Calculations run in your browser and the values you type are not sent to or stored by Finora.'],
  ['Are the results financial advice?', 'No. Results are educational estimates based on the inputs and constant-rate assumptions shown on each page.'],
];

// ---------- html helpers ----------
const NAV = `<nav aria-label="Calculators"><ul>${CALCS.map(c => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul></nav>`;
const FOOT = `<footer><p><a href="/">Calculators</a> · <a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/contact/">Contact</a> · <a href="/terms/">Terms</a> · <a href="/llms.txt">llms.txt</a></p><p>Finora gives educational estimates only. It is not financial, tax, legal or investment advice.</p></footer>`;
const jsonLd = o => `<script type="application/ld+json" id="structured-data">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const ORG = { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Finora', url: `${SITE}/`, description: 'Finora publishes free browser-based financial calculators with documented formulas.' };
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Finora', publisher: { '@id': ORG['@id'] } };
const faqLd = (url, faq) => ({ '@type': 'FAQPage', '@id': url + '#faq', url, mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumb = (url, name) => ({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Finora', item: `${SITE}/` }, { '@type': 'ListItem', position: 2, name, item: url }] });
const faqHtml = faq => `<section id="faq"><h2>FAQ</h2>${faq.map(([q, a]) => `<details open><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>`;
const table = rows => `<table><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>`;

function page({ url, title, desc, bodyHtml, graph, noindex = false }) {
  let h = template;
  const set = (re, val) => { if (!re.test(h)) throw new Error('template pattern missing: ' + re); h = h.replace(re, () => val); };
  set(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = h.replace(/\s*<meta\s+name="title"[\s\S]*?\/>/, '');
  set(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(desc)}" />`);
  h = h.replace(/\s*<meta\s+name="keywords"[\s\S]*?\/>/, '');
  h = h.replace(/\s*<meta name="(GPTBot|ClaudeBot|PerplexityBot|Google-Extended|CCBot|bingbot|googlebot)"[^>]*\/>/g, '');
  h = h.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '');
  set(/<meta name="robots"[^>]*\/>/, `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large'}" />`);
  set(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" id="canonical-link" />`);
  set(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" id="og-url" />`);
  set(/<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${esc(title)}" />`);
  set(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(desc)}" />`);
  set(/<meta name="twitter:url"[^>]*\/>/, `<meta name="twitter:url" content="${url}" id="twitter-url" />`);
  set(/<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  set(/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${esc(desc)}" />`);
  set(/<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/, jsonLd({ '@context': 'https://schema.org', '@graph': graph }));
  set(/<div id="root"><\/div>/, `<div id="root"><header><a href="/"><strong>Finora</strong></a>${NAV}</header><main>${bodyHtml}</main>${FOOT}</div>`);
  return h;
}
const write = (rel, html) => { const f = path.join(dist, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const checks = [];
function lens(url, title, desc) { checks.push([url, [...title].length, [...desc].length]); }

// ---------- calculator pages ----------
for (const c of CALCS) {
  const url = `${SITE}/${c.slug}/`;
  lens(url, c.title, c.desc);
  const body = `<h1>${esc(c.h1)}</h1><p>${esc(c.answer)}</p>
<section><h2>Worked example</h2>${table([...c.inputs, ...c.results])}</section>
<section><h2>How it is calculated</h2>${c.method.map(m => `<p>${esc(m)}</p>`).join('')}</section>
<section><h2>Assumptions and limits</h2><ul>${c.limits.map(m => `<li>${esc(m)}</li>`).join('')}</ul><p>Educational estimate only; not financial, tax, legal or investment advice.</p></section>
${faqHtml(c.faq)}
<section><h2>Other calculators</h2>${NAV}</section>`;
  write(`${c.slug}/index.html`, page({ url, title: c.title, desc: c.desc, bodyHtml: body, graph: [ORG, WEBSITE, { '@type': 'WebApplication', '@id': url + '#app', name: c.h1, url, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', description: c.desc, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: { '@id': ORG['@id'] }, dateModified: DATE }, faqLd(url, c.faq), crumb(url, c.h1)] }));
}

// ---------- home ----------
{
  const url = `${SITE}/`;
  const title = 'Finora: Free Financial Calculators for Loans and Savings';
  const desc = 'Nine free financial calculators with documented formulas: compound and simple interest, savings goal, ROI, loan, retirement, inflation, tip and break-even.';
  lens(url, title, desc);
  const body = `<h1>Finora Financial Calculators</h1><p>Finora offers nine free calculators for everyday money decisions. Each one shows its formula, a worked example and its limits, and runs entirely in your browser.</p>
<section><h2>Choose a calculator</h2><ul>${CALCS.map(c => `<li><a href="/${c.slug}/"><strong>${esc(c.name)}</strong></a>: ${esc(c.answer)}</li>`).join('')}</ul></section>
<section><h2>Guides</h2><ul><li><a href="/guides/compound-interest-formula.html">Compound interest formula</a></li><li><a href="/guides/roi-formula.html">ROI formula</a></li><li><a href="/guides/loan-payment-formula.html">Loan payment formula</a></li><li><a href="/guides/retirement-savings-goal.html">Retirement savings goal</a></li><li><a href="/guides/inflation-purchasing-power.html">Inflation and purchasing power</a></li></ul></section>
${faqHtml(HOME_FAQ)}`;
  write('index.html', page({ url, title, desc, bodyHtml: body, graph: [ORG, WEBSITE, faqLd(url, HOME_FAQ), { '@type': 'ItemList', '@id': url + '#calculators', name: 'Finora calculators', itemListElement: CALCS.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE}/${c.slug}/` })) }] }));
}

// ---------- trust pages ----------
const T = {
  about: {
    title: 'About Finora: Free Financial Calculators and Method', desc: 'Who publishes Finora, which calculators it offers, how results are produced, its limits, and how advertising and analytics are disclosed on the website.', h1: en.aboutUsTitle,
    body: `<p>${esc(en.aboutMissionContent)}</p><h2>${esc(en.aboutWhatWeOfferTitle)}</h2><p>${esc(en.aboutWhatWeOfferContent)}</p><ul>${[1,2,3,4,5,6,7,8,9].map(i => `<li>${esc(en['aboutFeature' + i])}</li>`).join('')}</ul><h2>${esc(en.aboutWhyChooseTitle)}</h2><ul>${[1,2,3,4,5].map(i => `<li><strong>${esc(en['aboutBenefit' + i + 'Title'])}:</strong> ${esc(en['aboutBenefit' + i + 'Content'])}</li>`).join('')}</ul><h2>${esc(en.aboutTeamTitle)}</h2><p>${esc(en.aboutTeamContent)}</p><h2>Advertising</h2><p>Pages can show one third-party display ad (Adsterra) below the calculator. Ads never change calculation results.</p>`,
  },
  privacy: {
    title: 'Finora Privacy Policy: Inputs, Analytics and Advertising', desc: 'How Finora handles calculator inputs, Google Analytics, cookies and third-party advertising. Calculator values stay in your browser and are never stored.', h1: en.privacyPolicyTitle,
    body: [1,2,3,4,5,6].map(i => `<h2>${esc(en['privacySection' + i + 'Title'])}</h2><p>${esc(en['privacySection' + i + 'Content'])}</p>${i === 2 ? `<ul>${[1,2,3].map(j => `<li>${esc(en['privacyData' + j])}</li>`).join('')}</ul>` : ''}`).join('') + `<p>${esc(en.privacyLastUpdated)}: ${DATE}</p><p>${esc(en.privacyContact)}</p>`,
  },
  terms: {
    title: "Finora Terms of Use: Estimates, Limits and Liability", desc: "Terms of use for Finora free financial calculators: personal use, results as estimates not advice, no warranty, limits of liability and third-party links.", h1: 'Terms of Use',
    body: [["Use of the calculators","Finora provides free, browser-based financial calculators for general information and education. You may use them for personal, non-commercial purposes. You must not use the site in a way that disrupts it or tries to access it by automated means at a rate that harms other users."],["Estimates, not advice","Results are estimates based on the inputs you enter and the simplifying assumptions shown on each page, such as constant rates. They are not financial, tax, legal or investment advice, and real outcomes will differ. Consider speaking to a qualified professional before making financial decisions."],["No warranty","The calculators and content are provided \"as is\" without warranties of accuracy, completeness, availability or fitness for a particular purpose. We work to keep formulas correct and fix confirmed errors, but we do not guarantee that results are error-free."],["Limitation of liability","To the extent permitted by law, Finora and its operators are not liable for losses or damages that arise from using or being unable to use the site, or from decisions made based on calculator results."],["Content and intellectual property","The text, design and code of this site belong to Finora unless stated otherwise. You may link to the site and briefly quote it with attribution. You may not republish the site wholesale or present it as your own."],["Third-party links and advertising","The site may link to third-party websites and may show third-party advertising. We do not control those sites and are not responsible for their content or practices. See the Privacy Policy for how analytics and advertising work."],["Changes to these terms","We may update these terms from time to time. The version published on this page applies. Continued use of the site after a change means you accept the updated terms."],["Contact","Questions about these terms can be sent to contact@finora.app."]].map(([h, t]) => '<h2>' + esc(h) + '</h2><p>' + esc(t) + '</p>').join('') + '<p>Last updated: ' + DATE + '</p>',
  },
  contact: {
    title: 'Contact Finora: Questions, Feedback and Corrections', desc: 'Contact the Finora team about calculator questions, bug reports, translation corrections or business inquiries. Typical reply time is 24 to 48 business hours.', h1: en.contactUsTitle,
    body: `<p>${esc(en.contactIntro)}</p><h2>${esc(en.contactInfoTitle)}</h2><ul><li>${esc(en.contactEmail)}: <a href="mailto:contact@finora.app">contact@finora.app</a></li><li>${esc(en.contactBusiness)}: <a href="mailto:business@finora.app">business@finora.app</a></li></ul><h2>${esc(en.contactHoursTitle)}</h2><p>${esc(en.contactHoursContent)}</p><h2>${esc(en.contactFeedbackTitle)}</h2><p>${esc(en.contactFeedbackContent)}</p><ul>${[1,2,3,4].map(i => `<li>${esc(en['contactFeedback' + i])}</li>`).join('')}</ul>`,
  },
};
for (const [k, p] of Object.entries(T)) {
  const url = `${SITE}/${k}/`; lens(url, p.title, p.desc);
  write(`${k}/index.html`, page({ url, title: p.title, desc: p.desc, bodyHtml: `<h1>${esc(p.h1)}</h1>${p.body}`, graph: [ORG, WEBSITE, { '@type': 'WebPage', '@id': url + '#page', url, name: p.h1, isPartOf: { '@id': WEBSITE['@id'] }, publisher: { '@id': ORG['@id'] }, dateModified: DATE }, crumb(url, p.h1)] }));
}

// ---------- 404 ----------
write('404.html', page({ url: `${SITE}/404.html`, title: 'Page not found | Finora', desc: 'This page does not exist. Use the calculator list to find the Finora tool you need.', bodyHtml: `<h1>Page not found</h1><p>The page you requested does not exist.</p>${NAV}`, graph: [ORG], noindex: true }));

// ---------- sitemap ----------
const guides = fs.readdirSync(path.join(root, 'public/guides')).filter(f => f.endsWith('.html')).map(f => `${SITE}/guides/${f}`);
const urls = [`${SITE}/`, ...CALCS.map(c => `${SITE}/${c.slug}/`), `${SITE}/about/`, `${SITE}/privacy/`, `${SITE}/contact/`, `${SITE}/terms/`, ...guides];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u, i) => `  <url><loc>${u}</loc><lastmod>${DATE}</lastmod><priority>${i === 0 ? '1.0' : u.includes('/guides/') ? '0.6' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`);

let bad = 0;
for (const [u, t, d] of checks) { const ok = t >= 50 && t <= 60 && d >= 150 && d <= 160; if (!ok) bad++; console.log(ok ? 'ok ' : 'BAD', u, 'title', t, 'desc', d); }
console.log('prerendered', checks.length + 1, 'pages;', urls.length, 'sitemap urls');
if (bad && !process.env.ALLOW_BAD_META) process.exit(2);
