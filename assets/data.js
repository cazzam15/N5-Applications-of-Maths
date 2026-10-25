// Nat 5 Applications of Mathematics — question bank, worksheets, key facts, mock papers and links.
// Written from the SQA / Qualifications Scotland National 5 Applications of Mathematics course specification (C844 75, v3.0, valid from 2023–24) (sqa.org.uk/sqa/47418.html). Built by build/build.py — edit build/applications_of_maths.py, not this file.
// Question format: {topic, type:'mcq'|'fillin', q, opts (mcq), ans (index for mcq, text for fillin), explain}
const META={
 "subject": "Applications of Mathematics",
 "title": "Free Nat 5 Applications of Maths Revision — Scotland",
 "slug": "nat5-applications-of-maths",
 "store": "n5aom_v1",
 "legacyStore": null
};
const TOPICS=[
 {
  "id": "numeracy",
  "name": "Numeracy",
  "icon": "🔢",
  "sub": "Percentages · Fractions · Rounding & significant figures · Ratio & proportion · Speed, distance & time"
 },
 {
  "id": "finance",
  "name": "Finance",
  "icon": "💷",
  "sub": "Pay & deductions · Budgeting · Best deals · Currency conversion · Savings, loans & credit"
 },
 {
  "id": "measurement",
  "name": "Measurement",
  "icon": "📏",
  "sub": "Scale drawings · Bearings & navigation · Container packing · Precedence tables · Time zones · Tolerance"
 },
 {
  "id": "geometry",
  "name": "Geometry",
  "icon": "📐",
  "sub": "Gradient · Area & perimeter · Composite shapes · Volume · Pythagoras"
 },
 {
  "id": "stats",
  "name": "Statistics & Probability",
  "icon": "📊",
  "sub": "Averages & spread · Standard deviation · Boxplots · Scattergraphs · Pie charts · Probability & risk"
 }
];
const QUESTIONS=[
{"topic": "numeracy", "type": "mcq", "q": "Round 0.0048372 to 2 significant figures.", "opts": ["0.00", "0.005", "0.0048", "0.0049"], "ans": 2, "explain": "The first significant figure is the first non-zero digit (4). Two significant figures gives 0.0048 — the next digit (3) is less than 5, so round down."},
{"topic": "numeracy", "type": "mcq", "q": "Round 38 562 to 3 significant figures.", "opts": ["38 500", "386", "38 600", "38 560"], "ans": 2, "explain": "The first three significant figures are 3, 8, 5. The next digit is 6, so round up to 386 hundreds = 38 600. Keep the place value — don't write 386."},
{"topic": "numeracy", "type": "mcq", "q": "Round 7.38459 to 3 decimal places.", "opts": ["7.38", "7.384", "7.385", "7.3846"], "ans": 2, "explain": "Look at the 4th decimal place (5): it is 5 or more, so the 3rd decimal place goes up: 7.384 → 7.385."},
{"topic": "numeracy", "type": "mcq", "q": "Without a calculator: find 35% of £64.", "opts": ["£41.60", "£22.40", "£19.20", "£2.24"], "ans": 1, "explain": "10% of £64 = £6.40, so 30% = £19.20 and 5% = £3.20. 35% = £19.20 + £3.20 = £22.40."},
{"topic": "numeracy", "type": "mcq", "q": "Without a calculator: find ¾ of 248 kg.", "opts": ["190 kg", "124 kg", "62 kg", "186 kg"], "ans": 3, "explain": "¼ of 248 = 248 ÷ 4 = 62. ¾ = 3 × 62 = 186 kg."},
{"topic": "numeracy", "type": "mcq", "q": "Without a calculator: 2½ + 1¾ = ?", "opts": ["4", "3¼", "3¾", "4¼"], "ans": 3, "explain": "Whole numbers: 2 + 1 = 3. Fractions: ½ + ¾ = 2/4 + 3/4 = 5/4 = 1¼. Total = 3 + 1¼ = 4¼."},
{"topic": "numeracy", "type": "mcq", "q": "How many quarters are there in 3¾?", "opts": ["7", "15", "13", "12"], "ans": 1, "explain": "3 wholes = 3 × 4 = 12 quarters, plus 3 more quarters = 15 quarters."},
{"topic": "numeracy", "type": "mcq", "q": "Without a calculator: 4.37 × 6 = ?", "opts": ["262.2", "24.22", "26.42", "26.22"], "ans": 3, "explain": "4 × 6 = 24, 0.37 × 6 = 2.22. Total 26.22."},
{"topic": "numeracy", "type": "mcq", "q": "Without a calculator: 52.8 ÷ 100 = ?", "opts": ["0.0528", "5.28", "0.528", "5280"], "ans": 2, "explain": "Dividing by 100 moves every digit two places to the right: 52.8 → 0.528."},
{"topic": "numeracy", "type": "mcq", "q": "Without a calculator: 18.6 − 7.95 = ?", "opts": ["11.35", "11.65", "10.65", "10.75"], "ans": 2, "explain": "Line up the decimal points: 18.60 − 7.95 = 10.65."},
{"topic": "numeracy", "type": "mcq", "q": "Amy scored 13 out of 20 in a test. What is this as a percentage?", "opts": ["60%", "13%", "70%", "65%"], "ans": 3, "explain": "13 ÷ 20 × 100 = 65%. (Or: 13/20 = 65/100.)"},
{"topic": "numeracy", "type": "mcq", "q": "Write 0.375 as a fraction in its simplest form.", "opts": ["3/8", "375/100", "3/4", "37/100"], "ans": 0, "explain": "0.375 = 375/1000. Divide top and bottom by 125: 3/8."},
{"topic": "numeracy", "type": "mcq", "q": "A car worth £18 000 loses 15% of its value each year. What is it worth after 3 years? (to the nearest pound)", "opts": ["£27,376", "£11,054", "£13,005", "£9,900"], "ans": 1, "explain": "Compound decrease: multiply by 0.85 once for each year. 18 000 × 0.85³ = £11,054.25 → £11,054. Taking 45% off in one go is wrong — each year's 15% is of a smaller amount."},
{"topic": "numeracy", "type": "mcq", "q": "A gym membership costs £240. The price rises by 4% this year and 4% again next year. What will it cost after both rises?", "opts": ["£259.58", "£259.20", "£221.18", "£249.60"], "ans": 0, "explain": "Compound increase: 240 × 1.04 × 1.04 = 240 × 1.04² = £259.58. This is slightly more than a single 8% rise (£259.20)."},
{"topic": "numeracy", "type": "mcq", "q": "A shop buys a jacket for £40 and sells it for £52. What is the percentage profit?", "opts": ["23%", "30%", "12%", "40%"], "ans": 1, "explain": "Profit = £52 − £40 = £12. Percentage profit = 12 ÷ 40 × 100 = 30%. Always divide by the ORIGINAL amount."},
{"topic": "numeracy", "type": "mcq", "q": "Paint is mixed blue : white in the ratio 2 : 5. How much white paint is needed with 6 litres of blue?", "opts": ["30 litres", "2.4 litres", "12 litres", "15 litres"], "ans": 3, "explain": "2 parts = 6 litres, so 1 part = 3 litres. White = 5 parts = 15 litres."},
{"topic": "numeracy", "type": "mcq", "q": "Share £360 in the ratio 4 : 5.", "opts": ["£90 and £270", "£144 and £216", "£160 and £200", "£180 and £180"], "ans": 2, "explain": "Total parts = 4 + 5 = 9. One part = £360 ÷ 9 = £40. So £160 and £200 — check: 160 + 200 = 360."},
{"topic": "numeracy", "type": "mcq", "q": "On a plan with scale 1 : 50, a room is 9 cm long. How long is the real room?", "opts": ["45 m", "4.5 cm", "0.45 m", "4.5 m"], "ans": 3, "explain": "Real length = 9 × 50 = 450 cm = 4.5 m."},
{"topic": "numeracy", "type": "mcq", "q": "6 pens cost £4.50. How much do 10 pens cost?", "opts": ["£7.50", "£9.00", "£5.50", "£6.75"], "ans": 0, "explain": "Direct proportion: 1 pen = £4.50 ÷ 6 = £0.75. 10 pens = £7.50."},
{"topic": "numeracy", "type": "mcq", "q": "4 workers take 9 days to build a wall. How long would 6 workers take, working at the same rate?", "opts": ["4 days", "13.5 days", "6 days", "11 days"], "ans": 2, "explain": "Inverse proportion: more workers, fewer days. Total work = 4 × 9 = 36 worker-days. 36 ÷ 6 = 6 days."},
{"topic": "numeracy", "type": "mcq", "q": "A train travels 195 km in 2 hours 30 minutes. What is its average speed?", "opts": ["84.8 km/h", "65 km/h", "97.5 km/h", "78 km/h"], "ans": 3, "explain": "2 hours 30 minutes = 2.5 hours (not 2.3!). Speed = 195 ÷ 2.5 = 78 km/h."},
{"topic": "numeracy", "type": "mcq", "q": "A cyclist rides 18 km at 48 km/h. How long does it take?", "opts": ["37.5 minutes", "2.67 hours", "22.5 minutes", "30 minutes"], "ans": 2, "explain": "Time = distance ÷ speed = 18 ÷ 48 = 0.375 h. 0.375 × 60 = 22.5 minutes."},
{"topic": "numeracy", "type": "fillin", "q": "Speed, distance and time: distance = speed × _____.", "ans": "time", "explain": "D = S × T. Rearranged: S = D ÷ T and T = D ÷ S. Remember to convert minutes to hours as a decimal (e.g. 45 min = 0.75 h)."},
{"topic": "numeracy", "type": "fillin", "q": "When two quantities increase together at the same rate (double one, the other doubles), they are in _____ proportion.", "ans": "direct", "explain": "Direct proportion: find the value of ONE, then multiply. Inverse proportion (e.g. workers and days): as one goes up, the other goes down."},
{"topic": "finance", "type": "mcq", "q": "Jo earns £11.80 an hour and works a 37.5-hour week. What is her basic weekly pay?", "opts": ["£442.50", "£472.00", "£413.00", "£436.60"], "ans": 0, "explain": "Basic pay = rate × hours = 11.80 × 37.5 = £442.50."},
{"topic": "finance", "type": "mcq", "q": "Sam's basic rate is £12.40 an hour. Overtime is paid at time-and-a-half. How much does Sam earn for 6 hours of overtime?", "opts": ["£148.80", "£111.60", "£74.40", "£18.60"], "ans": 1, "explain": "Overtime rate = 12.40 × 1.5 = £18.60 an hour. 6 hours × £18.60 = £111.60."},
{"topic": "finance", "type": "mcq", "q": "A salesperson earns £950 a month plus 4% commission on sales. Last month's sales were £23 500. What was their gross pay?", "opts": ["£1,890.00", "£1,044.00", "£10,350.00", "£940.00"], "ans": 0, "explain": "Commission = 4% of £23 500 = £940. Gross pay = £950 + £940 = £1,890.00."},
{"topic": "finance", "type": "mcq", "q": "Gross pay is £2140.00. Deductions are income tax £412.36, National Insurance £151.20 and pension £107.00. What is the net pay?", "opts": ["£2,810.56", "£1,576.44", "£1,469.44", "£1,727.64"], "ans": 2, "explain": "Net pay = gross pay − total deductions. Deductions = £670.56. Net = £1,469.44."},
{"topic": "finance", "type": "mcq", "q": "Using these rates: personal allowance £12 570, then 20% tax on the next £37 700. How much income tax is paid on an annual salary of £31 200?", "opts": ["£14,904.00", "£6,240.00", "£2,514.00", "£3,726.00"], "ans": 3, "explain": "Taxable income = £31 200 − £12 570 = £18 630. Tax = 20% of £18 630 = £3,726.00. In the exam, the rates are always given — read them carefully."},
{"topic": "finance", "type": "mcq", "q": "Lewis pays 6% of his gross monthly pay of £2600 into a pension. How much is this each month?", "opts": ["£433.33", "£1,560.00", "£156.00", "£1,872.00"], "ans": 2, "explain": "6% of £2600 = 0.06 × 2600 = £156.00."},
{"topic": "finance", "type": "fillin", "q": "Pay before any deductions are taken off is called _____ pay.", "ans": "gross", "explain": "Gross pay = basic pay + overtime + bonus/commission. Net pay (take-home pay) = gross pay − deductions (income tax, National Insurance, pension)."},
{"topic": "finance", "type": "fillin", "q": "Pay after income tax, National Insurance and pension have been taken off is called _____ pay.", "ans": "net", "explain": "Net pay is sometimes called take-home pay."},
{"topic": "finance", "type": "mcq", "q": "Which is the best buy? A: 500 g for £2.45   B: 750 g for £3.20   C: 1 kg for £4.10", "opts": ["A", "B", "C", "They are all the same value"], "ans": 2, "explain": "Compare the price per 100 g: A = 49.0p, B = 42.7p, C = 41.0p. C is cheapest per 100 g. Always compare the same unit and show your working."},
{"topic": "finance", "type": "mcq", "q": "Phone A: £18 a month for 24 months. Phone B: £120 up front, then £14 a month for 24 months. Phone C: £450 to buy outright. Which is cheapest over 24 months?", "opts": ["C (£450)", "B and C cost the same", "A (£432)", "B (£456)"], "ans": 2, "explain": "A = 18 × 24 = £432. B = 120 + 14 × 24 = £456. C = £450. A is cheapest. Three pieces of information on each product is typical of exam best-deal questions."},
{"topic": "finance", "type": "mcq", "q": "The exchange rate is £1 = €1.16. How many euros do you get for £250?", "opts": ["€2900.00", "€215.52", "€251.16", "€290.00"], "ans": 3, "explain": "Pounds → euros: MULTIPLY by the rate. 250 × 1.16 = €290.00."},
{"topic": "finance", "type": "mcq", "q": "The exchange rate is £1 = €1.16. A meal costs €87. How much is this in pounds?", "opts": ["£100.92", "£85.84", "£1.33", "£75.00"], "ans": 3, "explain": "Euros → pounds: DIVIDE by the rate. 87 ÷ 1.16 = £75.00."},
{"topic": "finance", "type": "mcq", "q": "£1 = €1.16 and £1 = $1.27. Kirsty has €400 left after a holiday in Spain. She changes it to US dollars, via pounds. How many dollars does she get? (nearest cent)", "opts": ["$589.28", "$365.35", "$437.93", "$508.00"], "ans": 2, "explain": "Step 1, euros → pounds: 400 ÷ 1.16 = £344.83. Step 2, pounds → dollars: × 1.27 = $437.93. A multi-stage conversion with three currencies is a common exam task."},
{"topic": "finance", "type": "mcq", "q": "£3000 is saved in an account paying 2.5% interest per year, compounded. How much is in the account after 2 years?", "opts": ["£3,075.00", "£3,151.88", "£150.00", "£3,150.00"], "ans": 1, "explain": "Year 1: 3000 × 1.025 = £3075.00. Year 2: 3075 × 1.025 = £3,151.88. Interest is added to interest, so it's more than 2 × 2.5% simple interest."},
{"topic": "finance", "type": "mcq", "q": "A £2500 loan is repaid at £89.50 a month for 3 years. How much interest is paid in total?", "opts": ["£722.00", "£2,231.50", "£3,222.00", "£-1,426.00"], "ans": 0, "explain": "Total repaid = 89.50 × 36 months = £3,222.00. Interest = £3,222.00 − £2500 = £722.00."},
{"topic": "finance", "type": "mcq", "q": "A credit card charges 1.9% interest per month on any balance not paid off. Ewan owes £600 and pays nothing this month. How much will he owe next month?", "opts": ["£611.40", "£601.90", "£714.00", "£11.40"], "ans": 0, "explain": "Interest = 1.9% of £600 = £11.40. New balance = £611.40. Monthly rates on credit and store cards add up quickly — that's why the course compares them with loans."},
{"topic": "finance", "type": "mcq", "q": "Which usually costs MORE in interest over a year: a credit card at 1.9% per month or a bank loan at 9.9% per year (APR)?", "opts": ["The credit card", "It can't be compared", "The bank loan", "They cost the same"], "ans": 0, "explain": "1.9% a month compounded over 12 months ≈ 25.3% a year, far more than 9.9% a year. Always convert to the same time period before comparing."},
{"topic": "finance", "type": "mcq", "q": "Monthly budget. Income: wages £1650, child benefit £240. Outgoings: rent £725, council tax £180, energy £96, food £320, transport £140, phone/internet £75. How much is left each month?", "opts": ["£354.00", "£429.00", "£594.00", "£114.00"], "ans": 0, "explain": "Total income = £1,890. Total outgoings = £1,536. Balance = £1,890 − £1,536 = £354.00."},
{"topic": "finance", "type": "fillin", "q": "A card issued by one shop, usually with a high interest rate, that can only be used in that shop is a _____ card.", "ans": "store", "explain": "Store cards often have higher interest rates than credit cards. The course compares loans, savings, credit cards, store cards and credit agreements."},
{"topic": "measurement", "type": "mcq", "q": "A scale drawing uses 1 cm : 2.5 m. A wall is 12 m long. How long should it be on the drawing?", "opts": ["30 cm", "4.8 m", "4.8 cm", "9.5 cm"], "ans": 2, "explain": "12 ÷ 2.5 = 4.8 cm. Lines on scale drawings are drawn and measured to the nearest millimetre."},
{"topic": "measurement", "type": "mcq", "q": "On a map with scale 1 : 25 000, two villages are 14 cm apart. What is the real distance?", "opts": ["3.5 km", "35 km", "0.35 km", "350 m"], "ans": 0, "explain": "14 × 25 000 = 350 000 cm. ÷ 100 = 3500 m. ÷ 1000 = 3.5 km."},
{"topic": "measurement", "type": "fillin", "q": "Bearings are always measured from the _____ direction.", "ans": "north", "explain": "Bearings are measured clockwise from North and written with three figures, e.g. 045° or 120°."},
{"topic": "measurement", "type": "mcq", "q": "How should a bearing of 60° be written?", "opts": ["0.60°", "600°", "060°", "60°"], "ans": 2, "explain": "Bearings always have three figures. 60° is written 060°."},
{"topic": "measurement", "type": "mcq", "q": "A boat sails on a bearing of 070°. What bearing must it sail on to return the way it came?", "opts": ["070°", "290°", "250°", "110°"], "ans": 2, "explain": "The back bearing is the bearing ± 180°. 070° + 180° = 250°."},
{"topic": "measurement", "type": "mcq", "q": "In a scale drawing, angles should be drawn and measured to the nearest…", "opts": ["degree", "half degree", "5 degrees", "10 degrees"], "ans": 0, "explain": "From the course specification: lines to the nearest millimetre, angles to the nearest degree."},
{"topic": "measurement", "type": "mcq", "q": "Boxes weighing 7, 5, 4, 4, 3, 3 and 2 kg must be packed into crates that hold at most 10 kg each. What is the smallest number of crates needed?", "opts": ["3", "4", "2", "5"], "ans": 0, "explain": "Total = 28 kg, so at least 3 crates (2 crates hold only 20 kg). 3 works: 7+3 = 10, 5+3+2 = 10, 4+4 = 8. So 3 crates."},
{"topic": "measurement", "type": "mcq", "q": "Pallets 1.2 m × 0.8 m are loaded flat (not stacked) into a lorry bed 13.6 m × 2.4 m. Each pallet can be turned either way. What is the most pallets that fit?", "opts": ["40", "33", "26", "34"], "ans": 3, "explain": "Turned with 0.8 m along the length and 1.2 m across: 13.6 ÷ 0.8 = 17 along, 2.4 ÷ 1.2 = 2 across → 34. The other way gives 11 × 3 = 33. Always try both orientations."},
{"topic": "measurement", "type": "mcq", "q": "Task A takes 10 min, B (after A) takes 15 min, C (after A) takes 25 min, D (after B and C) takes 5 min. B and C can be done at the same time. What is the shortest time to finish all tasks?", "opts": ["30 minutes", "55 minutes", "45 minutes", "40 minutes"], "ans": 3, "explain": "A (10) must come first. Then B and C run at the same time — the longer one (C, 25) decides. Then D (5). Shortest time = 10 + 25 + 5 = 40 minutes."},
{"topic": "measurement", "type": "fillin", "q": "A table showing which tasks must be finished before each task can start is called a _____ table.", "ans": "precedence", "explain": "Precedence tables let you plan which activities can be done at the same time and which must be done in order."},
{"topic": "measurement", "type": "mcq", "q": "A flight leaves Glasgow at 09:40 UK time and takes 7 h 50 min. New York is 5 hours behind the UK. What is the local time in New York when it lands?", "opts": ["17:30", "12:30", "11:30", "22:30"], "ans": 1, "explain": "Landing time in UK time = 09:40 + 7 h 50 min = 17:30. New York is 5 hours behind: 17:30 − 5 h = 12:30."},
{"topic": "measurement", "type": "mcq", "q": "A video call starts at 19:00 in Edinburgh. Sydney is 11 hours ahead. What time is it in Sydney?", "opts": ["08:00 the same day", "06:00 the next day", "08:00 the next day", "06:00 the same day"], "ans": 1, "explain": "19:00 + 11 h = 30:00 → 06:00 the next day."},
{"topic": "measurement", "type": "mcq", "q": "A rod is made 250 mm ± 0.4 mm. What are the limits of its length?", "opts": ["250 mm to 250.4 mm", "249.6 mm to 250.4 mm", "249.4 mm to 250.4 mm", "246 mm to 254 mm"], "ans": 1, "explain": "Lower limit = 250 − 0.4 = 249.6 mm. Upper limit = 250 + 0.4 = 250.4 mm."},
{"topic": "measurement", "type": "mcq", "q": "A bolt is 12.0 mm ± 0.2 mm wide. It must fit a hole 12.3 mm ± 0.1 mm wide. Will every bolt fit?", "opts": ["No — the smallest hole is 12.1 mm", "Yes, but only just — the widest bolt and the narrowest hole are both 12.2 mm", "Yes — there is always at least 0.5 mm to spare", "No — the bolt is always too wide"], "ans": 1, "explain": "Widest bolt = 12.2 mm. Narrowest hole = 12.2 mm. In the worst case they are exactly the same size, so every bolt fits, but only just. Always compare the WORST-case limits."},
{"topic": "measurement", "type": "mcq", "q": "A thermometer's scale is marked every 2 °C. The liquid is halfway between the 36 and 38 marks. What should you record?", "opts": ["36.5 °C", "37 °C", "38 °C", "36 °C"], "ans": 1, "explain": "Read to the nearest marked, minor division. Halfway between 36 and 38 is 37 °C."},
{"topic": "geometry", "type": "mcq", "q": "A ramp rises 1.5 m over a horizontal distance of 6 m. What is its gradient?", "opts": ["4", "0.15", "7.5", "0.25"], "ans": 3, "explain": "Gradient = vertical ÷ horizontal = 1.5 ÷ 6 = 0.25."},
{"topic": "geometry", "type": "mcq", "q": "Find the gradient of the line joining (2, 3) and (6, 11).", "opts": ["−2", "8", "0.5", "2"], "ans": 3, "explain": "Gradient = change in y ÷ change in x = (11 − 3) ÷ (6 − 2) = 8 ÷ 4 = 2."},
{"topic": "geometry", "type": "mcq", "q": "Safety rules say a wheelchair ramp must have a gradient of no more than 0.083. A ramp rises 40 cm over 5 m. Is it safe?", "opts": ["No — gradient 0.125", "Yes — gradient 0.08", "No — gradient 8", "Yes — gradient 0.8"], "ans": 1, "explain": "Use the same units: 40 cm = 0.4 m. Gradient = 0.4 ÷ 5 = 0.08, which is less than 0.083, so it is safe. Always give a reason with your decision."},
{"topic": "geometry", "type": "mcq", "q": "A ladder reaches 12 m up a wall. Its foot is 9 m from the wall. How long is the ladder?", "opts": ["15 m", "13.5 m", "21 m", "7.9 m"], "ans": 0, "explain": "Pythagoras: c² = a² + b² = 9² + 12² = 81 + 144 = 225. c = √225 = 15 m."},
{"topic": "geometry", "type": "mcq", "q": "A right-angled triangle has a hypotenuse of 10 cm and one shorter side of 6 cm. Find the other side.", "opts": ["16 cm", "11.7 cm", "4 cm", "8 cm"], "ans": 3, "explain": "To find a SHORTER side, subtract: b² = 10² − 6² = 100 − 36 = 64. b = 8 cm."},
{"topic": "geometry", "type": "mcq", "q": "A rectangular garden is 4.2 m by 3.1 m. How long is the path along its diagonal? (1 d.p.)", "opts": ["2.8 m", "27.2 m", "5.2 m", "7.3 m"], "ans": 2, "explain": "Diagonal² = 4.2² + 3.1² = 17.64 + 9.61 = 27.25. Diagonal = √27.25 = 5.22 → 5.2 m."},
{"topic": "geometry", "type": "mcq", "q": "Find the area of a triangle with base 14 cm and height 9 cm.", "opts": ["31.5 cm²", "63 cm²", "23 cm²", "126 cm²"], "ans": 1, "explain": "Area of a triangle = ½ × base × height = ½ × 14 × 9 = 63 cm²."},
{"topic": "geometry", "type": "mcq", "q": "A bike wheel has a diameter of 65 cm. How far does it travel in one full turn? (2 d.p., in metres)", "opts": ["0.33 m", "2.04 m", "1.02 m", "1.33 m"], "ans": 1, "explain": "Distance in one turn = circumference = πd = π × 0.65 = 2.0420 → 2.04 m."},
{"topic": "geometry", "type": "mcq", "q": "A shape is a rectangle 8 m by 6 m with a semicircle on one 6 m side. Find its area (1 d.p.).", "opts": ["104.5 m²", "62.1 m²", "48.0 m²", "76.3 m²"], "ans": 1, "explain": "Rectangle = 8 × 6 = 48 m². Semicircle radius = 3 m: ½ × π × 3² = 14.14 m². Total = 62.14 → 62.1 m²."},
{"topic": "geometry", "type": "mcq", "q": "For the same shape (rectangle 8 m by 6 m with a semicircle on one 6 m side), what is the perimeter? (1 d.p.)", "opts": ["37.4 m", "40.8 m", "28.0 m", "31.4 m"], "ans": 3, "explain": "Perimeter = the three straight sides (8 + 6 + 8 = 22 m) plus the curved edge (half of π × 6 = 9.42 m). Total = 31.42 → 31.4 m. Don't count the 6 m side the semicircle sits on."},
{"topic": "geometry", "type": "mcq", "q": "A cylinder has radius 4 cm and height 11 cm. What is its volume? (nearest cm³)", "opts": ["138 cm³", "2212 cm³", "276 cm³", "553 cm³"], "ans": 3, "explain": "V = πr²h = π × 4² × 11 = 552.9 → 553 cm³. If you're given the diameter, halve it first."},
{"topic": "geometry", "type": "mcq", "q": "A triangular prism has a right-angled triangle end (3 cm by 4 cm, the two shorter sides) and length 10 cm. What is its volume?", "opts": ["50 cm³", "70 cm³", "60 cm³", "120 cm³"], "ans": 2, "explain": "V = Ah. A = ½ × 3 × 4 = 6 cm². V = 6 × 10 = 60 cm³."},
{"topic": "geometry", "type": "mcq", "q": "A water butt is a cylinder with diameter 60 cm and height 80 cm. How many litres does it hold? (1 litre = 1000 cm³, nearest litre)", "opts": ["754 litres", "905 litres", "23 litres", "226 litres"], "ans": 3, "explain": "Radius = 30 cm. V = π × 30² × 80 = 226,195 cm³ = 226.2 litres → 226 litres."},
{"topic": "geometry", "type": "mcq", "q": "An ice-cream is a cone (radius 3 cm, height 8 cm) topped with a hemisphere (half a sphere) of radius 3 cm. What is its total volume? (nearest cm³)", "opts": ["132 cm³", "75 cm³", "188 cm³", "283 cm³"], "ans": 0, "explain": "Cone = ⅓πr²h = 75.4 cm³. Hemisphere = half of ⁴⁄₃πr³ = 56.5 cm³. Total = 131.9 → 132 cm³. Both formulae are on the formulae list."},
{"topic": "geometry", "type": "fillin", "q": "Pythagoras' theorem only works in a _____-angled triangle.", "ans": "right", "explain": "a² + b² = c², where c is the hypotenuse — the longest side, opposite the right angle."},
{"topic": "geometry", "type": "fillin", "q": "The longest side of a right-angled triangle is called the _____.", "ans": "hypotenuse", "explain": "It is always opposite the right angle. To find it, add the squares; to find a shorter side, subtract."},
{"topic": "stats", "type": "mcq", "q": "Find the median of: 12, 15, 9, 15, 18, 11, 14", "opts": ["15", "13.4", "14", "9"], "ans": 2, "explain": "Order them first: 9, 11, 12, 14, 15, 15, 18. The middle (4th) value is 14."},
{"topic": "stats", "type": "mcq", "q": "Find the mean of: 12, 15, 9, 15, 18, 11, 14 (1 d.p.)", "opts": ["13.4", "13", "14", "15"], "ans": 0, "explain": "Total = 94. Mean = 94 ÷ 7 = 13.43 → 13.4."},
{"topic": "stats", "type": "mcq", "q": "Find the mode and range of: 12, 15, 9, 15, 18, 11, 14", "opts": ["Mode 15, range 9", "Mode 15, range 18", "Mode 18, range 9", "Mode 9, range 15"], "ans": 0, "explain": "Mode = most common value = 15. Range = highest − lowest = 18 − 9 = 9."},
{"topic": "stats", "type": "mcq", "q": "Find the interquartile range of: 3, 5, 6, 8, 9, 11, 12, 15", "opts": ["8.5", "5", "12", "6"], "ans": 3, "explain": "8 values: lower half 3, 5, 6, 8 → Q1 = (5 + 6) ÷ 2 = 5.5. Upper half 9, 11, 12, 15 → Q3 = (11 + 12) ÷ 2 = 11.5. IQR = Q3 − Q1 = 6."},
{"topic": "stats", "type": "mcq", "q": "Find the standard deviation of 4, 6, 7, 9, 9 (2 d.p.). Use s = √[Σ(x − x̄)² ÷ (n − 1)].", "opts": ["4.50", "5.00", "2.12", "1.90"], "ans": 2, "explain": "Mean = 35 ÷ 5 = 7. Squared deviations: 9, 1, 0, 4, 4 → total 18. 18 ÷ (5 − 1) = 4.5. s = √4.5 = 2.12. Divide by n − 1, not n."},
{"topic": "stats", "type": "mcq", "q": "Class A's test scores have mean 64, standard deviation 4. Class B's have mean 64, standard deviation 11. Which statement is correct?", "opts": ["Class B's scores are more consistent", "Both classes are equally consistent", "Class B did better on average", "Class A's scores are more consistent"], "ans": 3, "explain": "The means are equal, so on average they did the same. A smaller standard deviation means the scores are less spread out — more consistent. Always comment on BOTH the average and the spread."},
{"topic": "stats", "type": "mcq", "q": "In a boxplot, what does the box itself show?", "opts": ["The middle 50% of the data (from Q1 to Q3)", "The full range", "The mean ± 1", "The top 25%"], "ans": 0, "explain": "The box runs from the lower quartile (Q1) to the upper quartile (Q3), with a line at the median. The whiskers go out to the lowest and highest values."},
{"topic": "stats", "type": "mcq", "q": "What five values are needed to draw a boxplot?", "opts": ["Mean, mode, median, range, IQR", "Q1, Q2, Q3, Q4, Q5", "Lowest, mean, median, mode, highest", "Lowest, Q1, median, Q3, highest"], "ans": 3, "explain": "The five-figure summary: lowest value, lower quartile, median, upper quartile, highest value."},
{"topic": "stats", "type": "mcq", "q": "A scattergraph shows that as temperature rises, ice-cream sales rise. This is…", "opts": ["Positive correlation", "Negative correlation", "Inverse proportion", "No correlation"], "ans": 0, "explain": "Both increase together → positive correlation. If one goes up as the other goes down → negative correlation."},
{"topic": "stats", "type": "fillin", "q": "A straight line drawn through the middle of the points on a scattergraph, following the trend, is called the line of best _____.", "ans": "fit", "explain": "It should follow the trend with roughly equal numbers of points above and below. Use it to estimate values."},
{"topic": "stats", "type": "mcq", "q": "In a survey of 120 pupils, 36 chose football. What angle should the football sector be in a pie chart?", "opts": ["30°", "120°", "108°", "36°"], "ans": 2, "explain": "36 ÷ 120 × 360 = 108°. Check: all the angles must add up to 360°."},
{"topic": "stats", "type": "mcq", "q": "In a pie chart for 200 people, the 'walk' sector has an angle of 54°. How many people walk?", "opts": ["30", "108", "27", "54"], "ans": 0, "explain": "54 ÷ 360 × 200 = 30 people."},
{"topic": "stats", "type": "mcq", "q": "A bag has 3 red, 4 blue and 1 green counter. One is picked at random. What is P(red)?", "opts": ["3/4", "1/3", "3/5", "3/8"], "ans": 3, "explain": "P(red) = number of red ÷ total = 3 ÷ 8 = 3/8 (or 0.375, or 37.5%)."},
{"topic": "stats", "type": "mcq", "q": "The probability a phone battery is faulty is 0.02. A shop sells 1500 phones. How many faulty batteries would you expect?", "opts": ["300", "2", "15", "30"], "ans": 3, "explain": "Expected frequency = probability × number of trials = 0.02 × 1500 = 30."},
{"topic": "stats", "type": "mcq", "q": "A coin is flipped and a dice is rolled. What is the probability of getting a head AND a six?", "opts": ["1/6", "1/8", "7/12", "1/12"], "ans": 3, "explain": "Combined independent events: multiply. P(head) × P(six) = ½ × ⅙ = 1/12. A table of all 12 outcomes shows this too."},
{"topic": "stats", "type": "mcq", "q": "A survey about school meals asked only 10 pupils, all from S6. Why might the results not be reliable?", "opts": ["The sample is too large", "S6 pupils don't eat school meals", "The sample is too small and biased", "Pupils always tell the truth"], "ans": 2, "explain": "Small samples and samples from one group (bias) may not represent everyone. A larger sample from every year group would be more reliable."},
{"topic": "stats", "type": "mcq", "q": "In the stem-and-leaf diagram 4 | 2 5 7 and 5 | 0 3 (key 4 | 2 = 42), what is the range?", "opts": ["5", "53", "7", "11"], "ans": 3, "explain": "The values are 42, 45, 47, 50, 53. Range = 53 − 42 = 11."},
{"topic": "stats", "type": "fillin", "q": "The difference between the upper quartile and the lower quartile is the _____ range.", "ans": "interquartile", "explain": "IQR = Q3 − Q1. It measures the spread of the middle half of the data and isn't affected by extreme values."}
];
const SHEETS=[
 {
  "title": "Finance worksheet",
  "icon": "💷",
  "keyAreas": "<strong>📋 Course content:</strong> Pay &amp; deductions · Budgeting · Best deals · Currency · Savings &amp; borrowing",
  "sections": [
   {
    "head": "Section A — Pay",
    "qs": [
     {
      "kind": "mcq",
      "label": "Q1 · Multiple Choice",
      "text": "Overtime at double time for someone on £10.60 an hour is paid at…",
      "reveal": "<strong>✓ £21.20 an hour.</strong> Double time = 2 × the basic rate.",
      "opts": [
       [
        "£21.20 an hour",
        true
       ],
       [
        "£15.90 an hour",
        false
       ],
       [
        "£12.60 an hour",
        false
       ],
       [
        "£10.60 an hour",
        false
       ]
      ]
     },
     {
      "kind": "blanks",
      "label": "Q2 · Fill in the Blanks",
      "text": "Complete the sentence:",
      "reveal": "<strong>✓</strong> <strong>Net</strong> pay = <strong>gross</strong> pay − deductions.",
      "body": "<input class=\"eq-in\" id=\"aq2a\" placeholder=\"?\"/> pay = <input class=\"eq-in\" id=\"aq2b\" placeholder=\"?\"/> pay − deductions",
      "ids": [
       "aq2a",
       "aq2b"
      ],
      "answers": [
       "net",
       "gross"
      ]
     },
     {
      "kind": "written",
      "label": "Q3 · Calculation (3 marks)",
      "text": "Morag earns £2350 a month. Her deductions are income tax £281.00, National Insurance £130.80 and pension 5% of her gross pay. Calculate her net pay.",
      "reveal": "<strong>✓ Model answer:</strong><br/>• Pension = 5% of £2350 = £117.50 (1)<br/>• Total deductions = 281.00 + 130.80 + 117.50 = £529.30 (1)<br/>• Net pay = 2350 − 529.30 = <strong>£1820.70</strong> (1)",
      "placeholder": "Show your working…",
      "tall": false
     }
    ]
   },
   {
    "head": "Section B — Making a decision",
    "qs": [
     {
      "kind": "written",
      "label": "Q4 · Best deal (3 marks)",
      "text": "Broadband A: £24 a month for 18 months. Broadband B: £35 set-up then £22 a month for 18 months. Broadband C: £21 a month for 18 months plus a £60 router. Which is cheapest? Give a reason.",
      "reveal": "<strong>✓ Model answer:</strong><br/>• A = 24 × 18 = £432 (1)<br/>• B = 35 + 22 × 18 = £431; C = 21 × 18 + 60 = £438 (1)<br/>• <strong>B is cheapest</strong> at £431 (1)",
      "placeholder": "Work out the total for each…",
      "tall": true
     },
     {
      "kind": "written",
      "label": "Q5 · Currency (3 marks)",
      "text": "£1 = €1.16 and £1 = 1.27 US dollars. Ali changes £500 into euros, spends €420, then changes the rest back into pounds. How much does he get back?",
      "reveal": "<strong>✓ Model answer:</strong><br/>• £500 × 1.16 = €580 (1)<br/>• €580 − €420 = €160 left (1)<br/>• €160 ÷ 1.16 = <strong>£137.93</strong> (1)",
      "placeholder": "Show each step…",
      "tall": false
     }
    ]
   }
  ]
 },
 {
  "title": "Statistics worksheet",
  "icon": "📊",
  "keyAreas": "<strong>📋 Course content:</strong> Averages &amp; spread · Standard deviation · Boxplots · Comparing data · Probability",
  "sections": [
   {
    "head": "Section A — Calculate",
    "qs": [
     {
      "kind": "written",
      "label": "Q1 · Standard deviation (3 marks)",
      "text": "Find the mean and standard deviation of: 10, 12, 15, 11, 12.",
      "reveal": "<strong>✓ Model answer:</strong><br/>• Mean = 60 ÷ 5 = 12 (1)<br/>• Σ(x − x̄)² = 4 + 0 + 9 + 1 + 0 = 14 (1)<br/>• s = √(14 ÷ 4) = <strong>1.87</strong> (1)",
      "placeholder": "Show the table of (x − x̄) and (x − x̄)²…",
      "tall": true
     },
     {
      "kind": "mcq",
      "label": "Q2 · Multiple Choice",
      "text": "Which measure is NOT affected by one very large value?",
      "reveal": "<strong>✓ The median.</strong> The mean, range and standard deviation all change if one value is extreme.",
      "opts": [
       [
        "Median",
        true
       ],
       [
        "Mean",
        false
       ],
       [
        "Range",
        false
       ],
       [
        "Standard deviation",
        false
       ]
      ]
     }
    ]
   },
   {
    "head": "Section B — Compare",
    "qs": [
     {
      "kind": "written",
      "label": "Q3 · Comparing (2 marks)",
      "text": "Shop A's delivery times: median 3 days, IQR 1 day. Shop B's: median 2 days, IQR 4 days. Make two valid comparisons.",
      "reveal": "<strong>✓ Model answer:</strong><br/>• On average, Shop B delivers faster (lower median). (1)<br/>• Shop A's delivery times are more consistent (smaller IQR). (1)",
      "placeholder": "Compare average AND spread, in context…",
      "tall": false
     },
     {
      "kind": "written",
      "label": "Q4 · Probability (2 marks)",
      "text": "A raffle sells 400 tickets. Kate buys 6. What is the probability she wins first prize? Write it as a fraction in its simplest form and as a percentage.",
      "reveal": "<strong>✓</strong> 6/400 = <strong>3/200</strong> (1) = <strong>1.5%</strong> (1)",
      "placeholder": "",
      "tall": false
     }
    ]
   }
  ]
 },
 {
  "title": "Measurement & geometry worksheet",
  "icon": "📐",
  "keyAreas": "<strong>📋 Course content:</strong> Scale · Bearings · Time zones · Tolerance · Pythagoras · Volume",
  "sections": [
   {
    "head": "Section A — Measurement",
    "qs": [
     {
      "kind": "blanks",
      "label": "Q1 · Fill in the Blanks",
      "text": "Complete the bearings facts:",
      "reveal": "<strong>✓</strong> Bearings are measured <strong>clockwise</strong> from <strong>north</strong> and written with <strong>three</strong> figures.",
      "body": "Bearings are measured <input class=\"eq-in\" id=\"aq6a\" placeholder=\"?\"/> from <input class=\"eq-in\" id=\"aq6b\" placeholder=\"?\"/> and written with <input class=\"eq-in\" id=\"aq6c\" placeholder=\"?\"/> figures.",
      "ids": [
       "aq6a",
       "aq6b",
       "aq6c"
      ],
      "answers": [
       "clockwise",
       "north",
       "three"
      ]
     },
     {
      "kind": "written",
      "label": "Q2 · Tolerance (2 marks)",
      "text": "A shelf must be 900 mm ± 2 mm long. Shelves measured 897 mm, 901 mm and 903 mm. Which are acceptable? Explain.",
      "reveal": "<strong>✓</strong> Limits are 898 mm to 902 mm (1). Only the <strong>901 mm</strong> shelf is acceptable (1).",
      "placeholder": "",
      "tall": false
     }
    ]
   },
   {
    "head": "Section B — Geometry",
    "qs": [
     {
      "kind": "written",
      "label": "Q3 · Composite solid (4 marks)",
      "text": "A grain silo is a cylinder (diameter 6 m, height 10 m) with a cone on top (same diameter, height 2 m). Calculate its volume to the nearest m³.",
      "reveal": "<strong>✓ Model answer:</strong><br/>• Radius = 3 m (1)<br/>• Cylinder = π × 3² × 10 = 282.7 m³ (1)<br/>• Cone = ⅓ × π × 3² × 2 = 18.8 m³ (1)<br/>• Total = <strong>302 m³</strong> (1)",
      "placeholder": "Find each part, then add…",
      "tall": true
     },
     {
      "kind": "written",
      "label": "Q4 · Pythagoras (3 marks)",
      "text": "A ship sails 7 km north then 10 km east. How far is it from where it started? (1 d.p.)",
      "reveal": "<strong>✓</strong> d² = 7² + 10² = 149 (1) · d = √149 (1) = <strong>12.2 km</strong> (1)",
      "placeholder": "Sketch it first…",
      "tall": false
     }
    ]
   }
  ]
 }
];
const FACTS=[
 {
  "h": "📋 On the formulae list",
  "cards": [
   [
    "Circle",
    "Circumference C = πd<br/>Area A = πr²"
   ],
   [
    "Pythagoras",
    "a² + b² = c² (c = hypotenuse)"
   ],
   [
    "Volume",
    "Cylinder V = πr²h · Prism V = Ah<br/>Cone V = ⅓πr²h · Sphere V = ⁴⁄₃πr³"
   ],
   [
    "Gradient",
    "vertical height ÷ horizontal distance"
   ],
   [
    "Standard deviation",
    "s = √[Σ(x − x̄)² ÷ (n − 1)]"
   ]
  ]
 },
 {
  "h": "🧠 Learn these (not given)",
  "cards": [
   [
    "Speed, distance, time",
    "D = S × T · S = D ÷ T · T = D ÷ S<br/>Minutes → hours: ÷ 60 (45 min = 0.75 h)"
   ],
   [
    "Area",
    "Rectangle = l × b · Triangle = ½ × b × h"
   ],
   [
    "Percentage change",
    "change ÷ original × 100"
   ],
   [
    "Compound change",
    "Increase r%: × (1 + r/100) each time<br/>Decrease r%: × (1 − r/100) each time"
   ],
   [
    "Currency",
    "£ → other: × rate · other → £: ÷ rate"
   ],
   [
    "Expected frequency",
    "probability × number of trials"
   ]
  ]
 },
 {
  "h": "💷 Pay",
  "cards": [
   [
    "Gross pay",
    "Basic + overtime + bonus/commission"
   ],
   [
    "Net pay",
    "Gross pay − deductions (income tax, National Insurance, pension)"
   ],
   [
    "Overtime",
    "Time-and-a-half = 1.5 × basic rate · Double time = 2 × basic rate"
   ]
  ]
 },
 {
  "h": "📊 Statistics",
  "cards": [
   [
    "Averages",
    "Mean = total ÷ number · Median = middle (ordered) · Mode = most common"
   ],
   [
    "Spread",
    "Range = highest − lowest · IQR = Q3 − Q1 · Standard deviation"
   ],
   [
    "Comparing data sets",
    "Comment on the average AND the spread, in context"
   ],
   [
    "Boxplot",
    "Lowest · Q1 · Median · Q3 · Highest"
   ]
  ]
 }
];
const MOCK_INTRO="Two practice sets of 25 questions from the whole bank, 1 mark each — a fresh set every attempt. Have a calculator, ruler and protractor ready.<br/><strong>The real exam:</strong> two question papers, 90 marks in total — Paper 1 (non-calculator) 35 marks in 50 minutes, Paper 2 (calculator allowed) 55 marks in 1 hour 40 minutes, including case studies. There is no coursework. You're given a formulae list.";
const MOCK_PAPERS=[
 {
  "key": "paper1",
  "title": "Practice set 1 — Mixed questions",
  "short": "Set 1",
  "desc": "25 questions · 30 minutes · all topics",
  "n": 25,
  "mins": 30
 },
 {
  "key": "paper2",
  "title": "Practice set 2 — Mixed questions",
  "short": "Set 2",
  "desc": "25 questions · 40 minutes · all topics",
  "n": 25,
  "mins": 40
 }
];
const MOCK_GRADES=[
 {
  "min": 70,
  "grade": "A",
  "msg": "Outstanding! An A-grade performance."
 },
 {
  "min": 60,
  "grade": "B",
  "msg": "Well done! Review the questions you dropped to push for an A."
 },
 {
  "min": 50,
  "grade": "C",
  "msg": "Good effort! Target your weakest topics to move up."
 },
 {
  "min": 40,
  "grade": "D",
  "msg": "Keep revising — use Smart Mix to work on the topics you found hardest."
 },
 {
  "min": 0,
  "grade": "No Award",
  "msg": "Don't give up! Review your answers, then try again."
 }
];
const EXAM_TIPS=[
 [
  "✏️",
  "<strong>Show your working</strong> — most marks are for the method. A correct answer with no working may only get 1 mark."
 ],
 [
  "🔢",
  "<strong>Practise Paper 1 without a calculator</strong> — percentages, fractions and decimals by hand are worth 35 marks."
 ],
 [
  "📋",
  "<strong>Know your formulae list</strong> — circle, Pythagoras, cylinder, prism, cone, sphere, standard deviation and gradient are given. Everything else (e.g. speed = distance ÷ time, area of a triangle) you need to know."
 ],
 [
  "💬",
  "<strong>Justify decisions</strong> — when a question asks \"Should…?\" or \"Which is best?\", give a clear answer AND the numbers that prove it."
 ],
 [
  "🧾",
  "<strong>Read the case studies carefully</strong> — Paper 2 has longer real-life problems. Highlight the numbers you need before you start."
 ],
 [
  "📏",
  "<strong>Bring a ruler and protractor</strong> — scale drawings need lines to the nearest mm and angles to the nearest degree."
 ],
 [
  "⏱",
  "<strong>Manage your time</strong> — Paper 1: 35 marks in 50 min (about 1½ min a mark). Paper 2: 55 marks in 1 h 40 (under 2 min a mark)."
 ]
];
const LINKS=[
 [
  "https://www.sqa.org.uk/sqa/47418.html",
  "SQA — Nat 5 Applications of Mathematics",
  "Official past papers, marking instructions, course spec and formulae list"
 ],
 [
  "https://www.bbc.co.uk/bitesize/subjects/zw6rcqt",
  "BBC Bitesize — Nat 5 Applications of Maths",
  "Notes, videos and tests for every topic"
 ],
 [
  "https://scholar.hw.ac.uk",
  "SCHOLAR (Heriot-Watt)",
  "Online course material used by many Scottish schools"
 ],
 [
  "https://www.understandingstandards.org.uk/Subjects/Mathematics",
  "Understanding Standards",
  "SQA exemplar answers and marking guidance"
 ]
];
const ABOUT="Covers the five areas of SQA Nat 5 Applications of Mathematics: numeracy, finance, measurement, geometry, and statistics &amp; probability.<br/><br/> ✅ Written from the SQA (Qualifications Scotland) course specification <strong>C844 75</strong>, version 3.0 (valid from session 2023–24), and the N5 formulae list.<br/><br/> 92 practice questions · 3 interactive worksheets (13 questions) · Practice tests · Flashcards · Timed challenge · Key facts reference.<br/><br/> Progress saves automatically in your browser — nothing is sent anywhere. Not affiliated with the SQA.";
