/* =====================================================================
   Kapantay | content and data
   Edit this file to change facts, laws, claims, quiz questions and
   references. Every statistic carries a reference number (K.c(n))
   that links to the Sources tab on evidence.html.
   Last reviewed: 19 September 2026.
   ===================================================================== */
window.K = window.K || {};
(function (K) {
  'use strict';

  /* Citation helper: K.c(1,2) -> superscript links [1][2] */
  K.c = function () {
    return Array.prototype.slice.call(arguments).map(function (n) {
      return '<a class="cite" href="evidence.html#r' + n + '" title="See source ' + n + '">[' + n + ']</a>';
    }).join('');
  };
  var c = K.c;

  /* ---------- References ---------- */
  K.refs = [
    { id: 1, ref: 'World Health Organization. <i>Violence against women</i> (fact sheet), 18 June 2026.', url: 'https://www.who.int/news-room/fact-sheets/detail/violence-against-women', used: 'Global prevalence, killings, health and economic costs, risk factors, higher-risk groups and prevention.' },
    { id: 2, ref: 'WHO and partners. <i>Devastatingly pervasive: 1 in 3 women globally experience violence</i>, 9 March 2021.', url: 'https://www.who.int/news/item/09-03-2021-devastatingly-pervasive-1-in-3-women-globally-experience-violence', used: 'Violence among young women aged 15 to 24.' },
    { id: 3, ref: 'Philippine Statistics Authority and ICF. <i>2022 National Demographic and Health Survey (NDHS)</i>.', url: 'https://microdata.worldbank.org/index.php/catalog/5846/study-description', used: 'Survey scope: women aged 15 to 49.' },
    { id: 4, ref: 'Philippine Commission on Women. <i>Violence Against Women</i>.', url: 'https://pcw.gov.ph/violence-against-women/', used: 'The 17.5% figure from the 2022 NDHS.' },
    { id: 5, ref: 'The DHS Program. <i>Intimate Partner Violence Experiences of Filipino Women</i>, DHS Working Paper No. 205, 2024.', url: 'https://dhsprogram.com/pubs/pdf/WP205/WP205.pdf', used: 'Trend of 29% (2008), 24% (2017) and 18% (2022).' },
    { id: 6, ref: 'UN Women and Philippine Commission on Women. <i>Beijing+30 Progress Report: Philippines</i>, 2024.', url: 'https://www.unwomen.org/sites/default/files/2024-09/b30_report_philippines_en.pdf', used: 'Help-seeking (48%) and where survivors turn first.' },
    { id: 7, ref: 'Rappler. <i>In numbers: State of Filipino women in 2022</i>, 10 March 2023.', url: 'https://www.rappler.com/philippines/numbers-state-filipino-women-2022/', used: 'Forms of violence reported in NDHS 2022 and PNP case counts for 2019 to 2021.' },
    { id: 8, ref: 'Yoshioka E, Palatino M, Nazareno J, Operario D. Intimate partner violence and sexual agency in a nationally representative sample of women and girls in the Philippines. <i>Journal of Interpersonal Violence</i>, 2022;37(11-12):NP8867-NP8889.', url: 'https://pubmed.ncbi.nlm.nih.gov/33300443/', used: 'Attitudes toward violence (2017 NDHS).' },
    { id: 9, ref: 'World Economic Forum, <i>Global Gender Gap Report 2026</i>, as reported by The Philippine Star, "Philippines retains spot in Global Gender Gap index", 17 September 2026.', url: 'https://www.philstar.com/headlines/2026/09/17/2556888/philippines-retains-spot-global-gender-gap-index', used: 'Rank and sub-index scores. Released this week; check weforum.org for the full edition.' },
    { id: 10, ref: 'Philippine Commission on Women. <i>FAQs: RA 9262, the Anti-Violence Against Women and Their Children Act of 2004</i>.', url: 'https://pcw.gov.ph/faq-republic-act-9262/', used: 'What RA 9262 covers, protection orders, penalties, the no-mediation rule, time limits and hotlines.' },
    { id: 11, ref: 'Philippine Commission on Women. <i>Republic Act 11313: Safe Spaces Act</i>.', url: 'https://pcw.gov.ph/republic-act-11313-safe-spaces-act/', used: 'Safe Spaces Act, public transport provisions and anti-sexual-harassment officers.' },
    { id: 12, ref: 'Republic Act No. 11313 (2019), full text.', url: 'https://lawphil.net/statutes/repacts/ra2019/ra_11313_2019.html', used: "The law's coverage of gender, gender identity and expression." },
    { id: 13, ref: 'Asian Development Bank, Law and Policy Reform Program. <i>Safe Spaces Act, Republic Act No. 11313</i>.', url: 'https://lpr.adb.org/resource/safe-spaces-act-republic-act-no-11313-philippines', used: "Online harassment forms and the Act's expansion of the 1995 law." },
    { id: 14, ref: 'Philippine Commission on Women. <i>Republic Act 11596: An Act Prohibiting the Practice of Child Marriage</i>.', url: 'https://pcw.gov.ph/republic-act-11596-an-act-prohibiting-the-practice-of-child-marriage-and-imposing-penalties-for-violations-thereof/', used: 'Treaties the Philippines is party to, including CEDAW.' },
    { id: 15, ref: "Center for Reproductive Rights. <i>Victory for Children's Rights: Ending Child Marriage in the Philippines</i>.", url: 'https://reproductiverights.org/news/philippines-criminalizes-child-marriage/', used: 'RA 11596 provisions (under 18, void marriages, penalties, transition period).' },
    { id: 16, ref: 'Philippine Commission on Women. <i>Republic Acts</i> (index of laws on women, including RA 9710 and RA 11648).', url: 'https://pcw.gov.ph/republic-acts-2/', used: 'Titles of RA 9710 and RA 11648.' },
    { id: 17, ref: 'Respicio & Co. <i>Age of Consent and Dating Minors Laws in the Philippines</i>.', url: 'https://www.respicio.ph/commentaries/age-of-consent-and-dating-minors-laws-in-the-philippines', used: 'RA 8353 and the change from 12 to 16 under RA 11648.' },
    { id: 18, ref: 'Philippine Commission on Women. <i>Violence Against Women Helplines</i>.', url: 'https://pcw.gov.ph/violence-against-women-helplines/', used: 'Where to confirm current helpline numbers by region.' },
    { id: 19, ref: 'World Health Organization. <i>The power of listening, the power of the LIVES approach</i>, 19 November 2025.', url: 'https://www.who.int/news-room/feature-stories/detail/the-power-of-listening--the-power-of-the-lives-approach', used: 'The LIVES first-line support approach.' },
    { id: 20, ref: 'Platon Martinez. <i>Republic Act No. 11313 or "The Safe Spaces Act"</i>.', url: 'https://platonmartinez.com/articles/republic-act-no-11313-or-the-safe-spaces-act-addressing-gender-based-sexual-harassment', used: 'Which agencies enforce the Safe Spaces Act, including the PNP Anti-Cybercrime Group for online cases.' },
    { id: 21, ref: 'Supreme Court E-Library. <i>Implementing Rules and Regulations of RA 11313</i>.', url: 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/96805', used: "Local governments' role in helping survivors reach counselling." }
  ];

  /* ---------- Dashboard KPIs ---------- */
  K.kpis = [
    { value: '31.6%', label: 'of women worldwide have experienced partner or sexual violence in their lifetime', tag: 'Global, WHO 2023 estimates', cites: [1], href: 'evidence.html#statistics' },
    { value: '17.5%', label: 'of Filipino women aged 15 to 49 reported partner violence', tag: 'Philippines, NDHS 2022', cites: [4], href: 'evidence.html#statistics' },
    { value: '48%', label: 'of Filipino survivors of physical or sexual violence sought help', tag: 'Philippines, NDHS 2022', cites: [6], href: 'help.html' },
    { value: '20th', label: 'of 145 economies on the World Economic Forum gender gap index', tag: 'Philippines, 2026', cites: [9], href: 'issues.html#beyond' }
  ];

  /* ---------- Pictogram views ---------- */
  K.pict = [
    { tab: 'Worldwide', n: 32, mode: 'on', fig: '32 of 100 women', txt: 'have experienced physical or sexual partner violence, or sexual violence from a non-partner, in their lifetime (WHO estimate: 31.6%).' + c(1, 2), on: 'Experienced violence', off: 'Other women' },
    { tab: 'Philippines', n: 18, mode: 'on', fig: 'About 18 of 100 Filipino women', txt: 'aged 15 to 49 have experienced physical, sexual or emotional violence from a current or most recent partner (2022 survey: 17.5%).' + c(3, 4), on: 'Experienced partner violence', off: 'Other women' },
    { tab: 'Young women', n: 25, mode: 'on', fig: '25 of 100 young women', txt: 'aged 15 to 24 who have been in a relationship experience partner violence by their mid-twenties.' + c(2), on: 'Experienced partner violence', off: 'Other young women' },
    { tab: 'Seeking help', n: 48, mode: 'help', fig: '48 of 100 survivors sought help', txt: 'Among Filipino women who experienced physical or sexual violence, fewer than half sought help. Most of those turned to family or friends first.' + c(6), on: 'Did not seek help', help: 'Sought help' }
  ];

  /* ---------- Data explorer ---------- */
  K.explorer = [
    { id: 'trend', tab: 'Partner violence over time', title: 'Filipino women who have ever experienced partner violence',
      desc: 'Share of ever-married women aged 15 to 49 who reported physical, sexual or emotional violence from their current or most recent husband or partner, by survey year.',
      unit: '%', max: 40, items: [['2008', 29], ['2017', 24], ['2022', 18]],
      insight: 'A real decline of 11 percentage points in 14 years. It still means roughly one woman in six.', cites: [5, 4] },
    { id: 'cases', tab: 'Cases reported to police', title: 'Violence against women cases logged by the Philippine National Police',
      desc: 'Annual totals of reported cases, which include rape, sexual harassment, trafficking and photo or video voyeurism.',
      unit: '', max: 25000, items: [['2019', 20860], ['2020', 15292], ['2021', 12535]],
      insight: 'Fewer reports do not necessarily mean fewer victims. Watchdog groups say pandemic lockdowns may have suppressed reporting.', cites: [7] },
    { id: 'gap', tab: 'Gender gap index, 2026', title: 'How far the Philippines has closed the gender gap',
      desc: 'Parity scores from the World Economic Forum index, where 100% would mean full parity. The Philippines ranks 20th of 145 economies.',
      unit: '%', max: 100, items: [['Overall', 78.0], ['Economic participation', 78.3], ['Educational attainment', 98.9], ['Health and survival', 96.9], ['Political empowerment', 37.9]],
      insight: 'Political empowerment is the widest gap. The index does not measure violence, so a high rank does not mean people are safe.', cites: [9] }
  ];


  K.ledger = [
    { b: '840 million', t: 'women and girls, about 1 in 3 worldwide, have experienced physical or sexual partner violence or sexual violence from a non-partner in their lifetime (31.6%).' + c(1) },
    { b: '140', t: 'women and girls were killed every day in 2023, on average, by a partner or other family member.' + c(1) },
    { b: '4th', t: 'Partner violence is the fourth leading cause of poor health among women, measured in disability-adjusted life years.' + c(1) },
    { b: '1\u20136%', t: 'of GDP is what violence against women costs some countries through policing, justice, social protection and health services.' + c(1) },
    { b: '0.2%', t: 'is the average yearly decline in partner violence over the last 20 years. WHO says the UN target to end it by 2030 is very unlikely to be met.' + c(1) },
    { b: '48%', t: 'of Filipino women who experienced physical or sexual violence sought help. Most of them turned first to family or friends, not to services.' + c(6) }
  ];

  K.facts = [
    { t: 'Worldwide, about 1 in 3 women (31.6%) has experienced partner or sexual violence in her lifetime.' + c(1) },
    { t: 'In 2023, an average of 140 women and girls were killed every day by a partner or other family member.' + c(1) },
    { t: 'Barangay officials are not allowed to mediate between a woman and her abuser under RA 9262.' + c(10) },
    { t: 'A Barangay Protection Order takes effect for 15 days. A Temporary Protection Order from a court lasts 30 days.' + c(10) },
    { t: 'Emotional violence is the most commonly reported form of partner violence in the Philippines: 15.2% in the 2022 survey.' + c(7) },
    { t: 'Since 2022, sexual intercourse with a child under 16 is statutory rape in the Philippines. The age was raised from 12.' + c(17) },
    { t: 'The Safe Spaces Act covers harassment in streets, public transport, online spaces, workplaces and schools.' + c(11, 13) },
    { t: 'Partner violence among Filipino women fell from 29% in 2008 to 18% in 2022. Progress is real, and so is the gap that remains.' + c(5) }
  ];

  K.updates = [
    { date: '17 Sep 2026', t: 'The World Economic Forum released its 2026 gender gap index. The Philippines holds 20th of 145 economies with 78.0% of the gap closed.' + c(9) },
    { date: '18 Jun 2026', t: 'WHO updated its violence against women fact sheet, including new data on trans women and the global burden of disease.' + c(1) },
    { date: '19 Nov 2025', t: 'WHO published its 2023 prevalence estimates: about 840 million women have experienced partner or sexual violence.' + c(1) }
  ];

  /* ---------- Issue: forms, risk, factors, consequences, prevention ---------- */
  K.forms = [
    { id: 'physical', tab: 'Physical violence', desc: 'Causing, attempting or threatening bodily harm, or putting a woman or her child in fear of imminent harm.' + c(10),
      eg: ['Hitting, slapping or beating', 'Threatening to hurt her or her children', 'Making her fear imminent harm'], law: 'RA 9262 when committed by a current or former partner.' },
    { id: 'sexual', tab: 'Sexual violence', desc: 'Rape, forced sexual acts, sexual harassment, demeaning sexual remarks, treating a person as a sex object, or forcing someone to watch obscene material or take part in indecent acts.' + c(10),
      eg: ['Forced or coerced sex, including within a relationship', 'Demeaning sexual remarks', 'Forcing someone to watch obscene material'], law: 'RA 9262 (partners), RA 8353 (rape) and RA 11648 (children under 16).' },
    { id: 'psych', tab: 'Psychological abuse', desc: 'Controlling where a woman goes or whom she sees, threatening to take her children, repeated humiliation or verbal abuse, stalking, destroying belongings or harming her pets.' + c(10),
      eg: ['Restricting her movement or contact with family', 'Public ridicule and repeated verbal abuse', 'Stalking, or destroying property or harming pets'], law: 'RA 9262. It is the most commonly reported form: 15.2% of women in the 2022 survey, against 6.4% physical and 2.3% sexual.' + c(7) },
    { id: 'economic', tab: 'Economic abuse', desc: 'Stopping a woman from working, controlling her money or property, destroying household property, or withholding financial support that is legally due to her or her children.' + c(10),
      eg: ['Forbidding her from working or running a business', 'Controlling all household money', 'Refusing legally due support for her or the children'], law: 'RA 9262.' },
    { id: 'public', tab: 'Harassment in public and online', desc: 'Catcalling, following, unwanted sexual remarks and touching in streets and public transport. Online, it includes cyberstalking, relentless messaging, and sharing sexual content or someone\'s photos without consent.' + c(11, 13),
      eg: ['Catcalling and stalking in the street', 'Unwanted sexual comments in a jeepney or bus', 'Sharing someone\'s intimate photos without consent'], law: 'RA 11313, the Safe Spaces Act.' }
  ];

  K.risk = [
    ['Adolescent girls', 'More than one in five ever-partnered girls aged 15 to 19 have already experienced physical or sexual violence from a partner.' + c(1)],
    ['Young women', 'One in four women aged 15 to 24 who have been in a relationship experience partner violence by their mid-twenties.' + c(2)],
    ['Transgender women', 'A systematic review found lifetime prevalence of 41% for physical violence and 30% for sexual violence.' + c(1)],
    ['Women with disabilities', 'They face heightened risk from partners and from people responsible for their care.' + c(1)],
    ['Sex workers', 'Lifetime exposure to any violence ranges from 41% to 65%.' + c(1)],
    ['Refugee women', 'One estimate puts sexual violence against refugee women at 20%.' + c(1)]
  ];

  K.factors = {
    inner: { title: 'Person and relationship', items: ['Attitudes that justify violence and a sense of entitlement', "Men's controlling behaviour and unequal power in the relationship", 'Witnessing violence or suffering abuse in childhood', 'Harmful use of alcohol', 'Mental health conditions and lower levels of education'] },
    outer: { title: 'Community and society', items: ['Gender norms that protect male privilege and stigmatise women', 'Poverty and unemployment', 'High rates of child marriage, community violence and crime', 'Discriminatory laws on property, inheritance, marriage, divorce and custody', 'Weak or missing enforcement of laws against violence', 'Discrimination inside justice, health, religious and education institutions'] }
  };

  K.consequences = [
    { tab: 'Health', title: 'Effects on health', items: ['Injuries, chronic pain, headaches and limited mobility', 'Unintended pregnancy, unsafe abortion, gynaecological problems and sexually transmitted infections including HIV', 'Higher risk of miscarriage, stillbirth, pre-term delivery and low birth weight', 'Depression, post-traumatic stress, anxiety, sleep problems, alcohol use disorders and suicide attempts', 'Death: on average 140 women and girls were killed every day in 2023 by a partner or family member'], cites: [1], note: 'If any of this feels close to home, the Get help page lists people you can call.' },
    { tab: 'Children', title: 'Effects on children', items: ['Behavioural and emotional disturbances in children who grow up with violence', 'Higher chances of experiencing or perpetrating violence later in life', 'Higher rates of infant and child illness and death, for example through diarrhoeal disease, malnutrition and lower immunisation'], cites: [1] },
    { tab: 'Economy', title: 'Effects on livelihoods and the economy', items: ['Isolation, inability to work, lost wages and less participation in daily life', 'Reduced ability to care for oneself and one\'s children', 'In some countries, violence against women costs between 1% and 6% of GDP through policing, justice, social protection and health services'], cites: [1] }
  ];

  K.prevention = [
    ['Enact and enforce laws that promote equality', 'Laws only protect people when they are enforced, funded and known. Weak enforcement is itself a risk factor.' + c(1)],
    ['Fund prevention and response', 'WHO calls for resources for both stopping violence and supporting survivors, including sexual, reproductive and mental health care.' + c(1)],
    ['Invest in women\'s rights organisations', 'Community groups reach people that institutions miss and help change norms from the ground up.' + c(1)],
    ['Change harmful norms and attitudes', 'Attitudes that justify violence and male entitlement are risk factors, so shifting them is prevention.' + c(1)],
    ['Widen access to education, work and services', 'Poverty, unemployment and lower education are linked to higher risk, so economic empowerment is protection.' + c(1)]
  ];

  /* ---------- Laws ---------- */
  K.lawCats = [['all', 'All'], ['family', 'Partners and family'], ['harass', 'Harassment'], ['sexual', 'Sexual violence'], ['youth', 'Children and youth'], ['frame', 'Rights framework']];
  K.lawCatName = { family: 'Partners and family', harass: 'Harassment', sexual: 'Sexual violence', youth: 'Children and youth', frame: 'Rights framework' };
  K.laws = [
    { ra: 'RA 9262', title: 'Anti-Violence Against Women and Their Children Act', year: 'Enacted 2004', cat: 'family',
      sum: 'Treats abuse by an intimate partner as a public crime and gives survivors fast protection.',
      pts: ['Covers physical, sexual, psychological and economic abuse against a wife, ex-wife, a woman the offender has or had a sexual or dating relationship with, or the mother of his child, and against her children.' + c(10),
            'Protection orders: Barangay (15 days), Temporary from a court (30 days), and Permanent until the court revokes it.' + c(10),
            'Penalties include imprisonment from 1 month and 1 day up to 20 years, damages of P100,000 to P300,000 and mandatory counselling or psychiatric treatment.' + c(10)] },
    { ra: 'RA 11313', title: 'Safe Spaces Act (Bawal Bastos Law)', year: 'Enacted 2019', cat: 'harass',
      sum: 'Defines and penalises gender-based sexual harassment in streets, public spaces, public transport, online, workplaces and schools.',
      pts: ['Expands the 1995 law to cover public spaces and online harassment, including cyberstalking and sharing sexual content without consent.' + c(13),
            'Public-vehicle drivers who harass passengers can lose their licence through the LTO.' + c(11),
            'Protects people from harassment based on gender, gender identity and expression.' + c(12)] },
    { ra: 'RA 7877', title: 'Anti-Sexual Harassment Act', year: 'Enacted 1995', cat: 'harass',
      sum: 'The first national law on sexual harassment, centred on work, education and training settings.',
      pts: ['Later expanded by the Safe Spaces Act, which reaches public spaces and online platforms.' + c(13)] },
    { ra: 'RA 8353', title: 'Anti-Rape Law', year: 'Enacted 1997', cat: 'sexual',
      sum: 'Reclassified rape from a crime against chastity to a crime against persons and widened what counts as sexual assault.',
      pts: ['Includes acts beyond penile penetration, such as insertion of objects, under the definition of rape.' + c(17)] },
    { ra: 'RA 11648', title: 'Stronger Protection Against Rape and Sexual Exploitation and Abuse', year: 'Enacted 2022', cat: 'youth',
      sum: 'Raised the age below which sexual intercourse with a child is statutory rape from 12 to 16.',
      pts: ['Applies to boys and girls alike.' + c(17), 'Amends the Revised Penal Code, the Anti-Rape Law and RA 7610 on child abuse.' + c(16)] },
    { ra: 'RA 11596', title: 'Prohibition of Child Marriage', year: 'Enacted 2021', cat: 'youth',
      sum: 'Prohibits marriage of anyone under 18 and declares such marriages void.',
      pts: ['Penalises those who arrange, facilitate or officiate a child marriage.' + c(15),
            'Includes a one-year transition period during which penal provisions were suspended for Muslims and Indigenous peoples.' + c(15)] },
    { ra: 'RA 9710', title: 'Magna Carta of Women', year: 'Enacted 2009', cat: 'frame',
      sum: "The Philippines' comprehensive women's rights law. It obliges government to eliminate discrimination and promote gender equality across sectors." + c(16),
      pts: ['Provides the framework that later laws on violence, harassment and child protection build on.'] },
    { ra: 'CEDAW', title: 'UN Convention on the Elimination of All Forms of Discrimination Against Women', year: 'Adopted 1979', cat: 'frame',
      sum: "The main international treaty on women's rights. The Philippines is a State Party." + c(14),
      pts: ['Philippine laws on child marriage and violence explicitly cite the treaty as an obligation.' + c(14)] }
  ];

  K.finder = [
    { id: 'partner', label: 'A partner or ex-partner hurts, threatens, stalks or controls me, or refuses to give support',
      law: 'RA 9262: Anti-Violence Against Women and Their Children Act',
      body: 'Covers physical, sexual, psychological and economic abuse by a husband, ex-husband, live-in partner, boyfriend or girlfriend, dating partner or the father of your child. Withholding legally due financial support counts as economic abuse.' + c(10),
      steps: ['If you are in immediate danger, call 911.', 'Go to your barangay hall and ask for a Barangay Protection Order. It lasts 15 days, and barangay officials are not allowed to mediate.', 'For longer protection, apply at the Family Court for a Temporary Protection Order (30 days) or a Permanent Protection Order. The Public Attorney\'s Office can help you file.', 'Report to the police Women and Children Protection Desk and keep messages, photos and medical records as evidence.'] },
    { id: 'public', label: 'Someone catcalls, follows, touches me or sends unwanted sexual messages, in public or online',
      law: 'RA 11313: Safe Spaces Act (Bawal Bastos Law)',
      body: 'Penalises gender-based sexual harassment in streets, public spaces, public transport and online. Online harassment includes cyberstalking, relentless messaging and sharing sexual content or your photos without consent.' + c(11, 13),
      steps: ['Write down the date, place and details. For online cases, save screenshots and links.', 'Report to the nearest police station or Women and Children Protection Desk. Online cases are handled by the PNP Anti-Cybercrime Group.' + c(20), 'Ask your local government about counselling. The law directs LGUs to help survivors reach psychological support.' + c(21), 'If a public-vehicle driver did it, note the plate number. The LTO can cancel the licence of a driver found guilty.' + c(11)] },
    { id: 'work', label: 'A boss, teacher, trainer or co-worker sexually harasses me at work or school',
      law: 'RA 7877 (Anti-Sexual Harassment Act) and RA 11313 (Safe Spaces Act)',
      body: 'RA 7877 (1995) addresses sexual harassment in work, education and training settings. The Safe Spaces Act (2019) expanded it and also penalises gender-based sexual harassment in workplaces and schools.' + c(13),
      steps: ['Write down what happened, when, where and who saw it.', 'Ask HR or your school who the anti-sexual-harassment officer or committee is, and file a written complaint.' + c(11), 'If the internal process fails or you fear retaliation, go to the police or the Public Attorney\'s Office.'] },
    { id: 'child', label: 'A child is being sexually abused, or someone under 18 is being pushed into marriage',
      law: 'RA 11648 (Stronger Protection Against Rape) and RA 11596 (Child Marriage Ban)',
      body: 'Since 2022, sexual intercourse with a child under 16 is statutory rape regardless of apparent consent.' + c(17) + ' Marriage of anyone under 18 is prohibited and void, and those who arrange, facilitate or officiate it can be penalised.' + c(15),
      steps: ['If a child is in danger, call 911 or the Aleng Pulis line, 0919-777-7377.', 'Report to the barangay VAW desk, your social welfare office or the police Women and Children Protection Desk.', 'Do not question the child repeatedly or confront the suspected abuser alone. Trained social workers and police should conduct detailed interviews.'] },
    { id: 'unsure', label: 'I am not sure what is happening or which law applies',
      law: 'Start by talking to someone trained',
      body: 'You do not need to name the abuse to ask for help. Helplines and women\'s desks can explain which law and office apply to your situation.' + c(10, 18),
      steps: ['Call or text the Aleng Pulis hotline, 0919-777-7377.', 'Visit your barangay VAW Desk or the nearest Women and Children Protection Unit at a hospital.', 'See the <a href="help.html">full list of helplines</a>.'] }
  ];

  /* ---------- Claim check ---------- */
  K.claims = [
    { claim: 'Violence against women is rare.', v: 'false', label: 'Not supported',
      body: 'WHO estimates that 31.6% of women worldwide, about 840 million, have experienced partner or non-partner sexual violence in their lifetime.' + c(1, 2) + ' In the Philippines, 17.5% of women aged 15 to 49 reported partner violence in the 2022 national survey.' + c(4) + ' Both figures are likely to understate the problem because of stigma and under-reporting.' + c(1) },
    { claim: 'What happens between partners is a private family matter.', v: 'false', label: 'Not supported',
      body: 'Under RA 9262, violence against women and their children is a public crime. Anyone with personal knowledge of it may file a complaint. Barangay officials, police and social workers are not allowed to mediate or pressure a woman to drop her case.' + c(10) },
    { claim: 'It only counts as violence if there are visible injuries.', v: 'false', label: 'Not supported',
      body: 'Philippine law recognises psychological and economic abuse alongside physical and sexual violence.' + c(10) + ' In the 2022 survey, emotional violence was the most commonly reported form at 15.2%, ahead of physical (6.4%) and sexual (2.3%).' + c(7) },
    { claim: 'If it were that bad, she would just leave.', v: 'mis', label: 'Misleading',
      body: 'Fewer than half (48%) of Filipino women who experienced physical or sexual violence sought help, and 60% of those who did turned to family or friends rather than to services.' + c(6) + ' WHO links violence to stigma, poverty, unemployment and weak enforcement of laws.' + c(1) + ' Economic abuse, such as controlling a woman\'s money or stopping her from working, can make leaving harder still.' + c(10) },
    { claim: 'A husband is sometimes justified in hitting his wife.', v: 'false', label: 'Not supported',
      body: 'Physical violence against a wife or partner is a crime under RA 9262.' + c(10) + ' WHO lists attitudes that justify violence as a risk factor for it.' + c(1) + ' Yet in the 2017 national survey, 11.2% of women and girls with a male partner held this view, which shows why norms matter.' + c(8) },
    { claim: 'Only women can be victims of gender-based violence.', v: 'partly', label: 'Partly true',
      body: 'Most research and RA 9262 centre on women and children.' + c(1, 10) + ' But gender-diverse people face high rates too: a review found lifetime physical violence against trans women at 41% and sexual violence at 30%.' + c(1) + ' The Safe Spaces Act protects people from harassment based on gender, gender identity and expression,' + c(12) + ' and men abused by partners can file cases under the Revised Penal Code.' + c(10) },
    { claim: 'The Philippines ranks near the top for gender equality, so violence is not a real problem here.', v: 'mis', label: 'Misleading',
      body: 'The 2026 World Economic Forum index ranks the Philippines 20th of 145 economies, with 78.0% of the gender gap closed. Its political empowerment score is only 37.9%.' + c(9) + ' The index measures economic participation, education, health and political empowerment. It does not measure violence,' + c(9) + ' and about one in six Filipino women reported partner violence in 2022.' + c(4) },
    { claim: 'Violence is falling, so there is no need for urgency.', v: 'partly', label: 'Partly true',
      body: 'Partner violence reported by Filipino women fell from 29% in 2008 to 24% in 2017 and 18% in 2022, a real gain.' + c(5) + ' Globally, though, the decline has averaged only 0.2% a year for two decades, and WHO says the 2030 target is very unlikely to be met.' + c(1) + ' Many survivors never report, so official counts can mislead.' + c(6, 7) }
  ];

  /* ---------- Help ---------- */
  K.hotlines = [
    { who: 'Emergency (police, medical)', what: 'National emergency hotline', num: '911', tel: 'tel:911' },
    { who: 'PNP Women and Children Protection Center', what: 'Aleng Pulis hotline, call or text', num: '0919-777-7377', tel: 'tel:+639197777377' },
    { who: 'PNP Women and Children Protection Center', what: '24/7 office line', num: '(02) 8532-6690', tel: 'tel:+63285326690' },
    { who: "Public Attorney's Office", what: 'Legal help, including protection orders', num: '(02) 8929-9436', tel: 'tel:+63289299436' },
    { who: 'NBI Violence Against Women and Children Division', what: 'Investigation and complaints', num: '(02) 8525-6028', tel: 'tel:+63285256028' },
    { who: 'Your barangay VAW Desk', what: 'Ask for a Barangay Protection Order in your barangay hall', place: 'Barangay hall' },
    { who: 'Nearest hospital or social welfare office', what: 'Women and Children Protection Unit, or your city or municipal social welfare office', place: 'Walk in' }
  ];

  K.bpoSteps = [
    ['Go to your barangay hall', 'Apply in the barangay where you live. The application must be in writing, signed and sworn under oath. A standard form is available in English and major local languages.' + c(10)],
    ['Ask for a Barangay Protection Order (BPO)', 'It orders the person to stop the abuse and is effective for 15 days. Barangay officials are expected to act within 24 hours.' + c(10)],
    ['If the barangay refuses or delays', 'You can file an administrative complaint with the Sangguniang Panlungsod or Bayan, go to the police, or ask the Clerk of Court of your Family Court for help filing.' + c(10)],
    ['Seek a longer order from the court', 'A Temporary Protection Order lasts 30 days. A Permanent Protection Order lasts until the court revokes it, and it cannot be denied only because time has passed since the abuse. Both are enforceable anywhere in the Philippines.' + c(10)]
  ];

  K.whoCanApply = ['The woman or child who was harmed', 'Her parents or guardians, or relatives within the fourth civil degree', 'DSWD or local social workers', 'Police officers, preferably from the women and children desk', 'The Punong Barangay or a Barangay Kagawad', 'Her lawyer, counsellor, therapist or health care provider', 'At least two concerned citizens with personal knowledge of the abuse'];

  K.timeLimits = [
    ['20 years', 'to file for physical harm or threats, coercion or restricting freedom of movement, withholding legally due support, and controlling her money or work.'],
    ['10 years', 'to file for forcing sexual acts that are not rape, stalking and other conduct causing serious emotional distress, and repeated verbal or emotional abuse.']
  ];

  /* ---------- Act ---------- */
  K.lives = [
    ['L', 'Listen', 'Let the person speak at their own pace, without judging or interrupting.'],
    ['I', 'Inquire about needs', 'Ask what they need and worry about. Do not decide for them.'],
    ['V', 'Validate', 'Say that you believe them and that the abuse is not their fault.'],
    ['E', 'Enhance safety', 'Think through how to stay safe, including when leaving is not safe yet.'],
    ['S', 'Support', "Connect them with the barangay VAW desk, police women's desk, a health facility or legal aid."]
  ];

  K.actions = [
    { g: 'With the people I know', items: [
      ['a1', 'Believe and listen without blaming when someone tells me about abuse', [19]],
      ['a2', 'Save the Aleng Pulis hotline (0919-777-7377) and my barangay VAW desk contact in my phone', [10]],
      ['a3', 'Speak up when jokes or comments treat violence or control as normal', [1]],
      ['a4', 'Avoid pressuring anyone to "patch things up" with an abuser', [10]]] },
    { g: 'At school or work', items: [
      ['b1', 'Find out who the anti-sexual-harassment officer or committee is where I study or work', [11]],
      ['b2', 'Ask whether our policies cover the Safe Spaces Act and how to report', [11]]] },
    { g: 'Online', items: [
      ['c1', 'Never share leaked intimate photos or private information, and report those who do', [13]],
      ['c2', 'Save screenshots and links before reporting a harassing account', [20]]] },
    { g: 'In my community', items: [
      ['d1', 'Ask my barangay whether its VAW desk is staffed, visible and known to residents', [10]],
      ['d2', "Support local women's rights organisations with time, skills or money", [1]],
      ['d3', 'Ask candidates and local officials how they will fund prevention and enforce the laws', [1]]] }
  ];

  K.quiz = [
    { q: 'Worldwide, about how many women experience partner violence or non-partner sexual violence in their lifetime?', o: ['1 in 10', '1 in 5', '1 in 3', '1 in 2'], a: 2, why: 'WHO estimates 31.6%, about 840 million women.', c: [1] },
    { q: 'Under RA 9262, how long does a Barangay Protection Order stay in effect?', o: ['5 days', '15 days', '30 days', 'One year'], a: 1, why: 'A BPO lasts 15 days. A court-issued Temporary Protection Order lasts 30 days, and a Permanent Protection Order lasts until revoked.', c: [10] },
    { q: 'May barangay officials mediate between a woman and her abuser to keep the family together?', o: ['Yes, always the first step', 'Yes, if both agree', 'No, the law does not allow it', 'Only for first offences'], a: 2, why: 'RA 9262 does not allow mediation or conciliation, and officials must not pressure a woman to drop her case.', c: [10] },
    { q: 'Which law extends protection against gender-based sexual harassment to streets, public transport and online spaces?', o: ['RA 7877', 'RA 11596', 'RA 9262', 'RA 11313'], a: 3, why: 'The Safe Spaces Act (RA 11313, 2019) expanded the 1995 law beyond work, school and training.', c: [13, 11] },
    { q: 'In the 2022 national survey, what share of Filipino women who experienced physical or sexual violence sought help?', o: ['About 9 in 10', 'About 3 in 4', 'Fewer than half', 'Almost none'], a: 2, why: 'Only 48% sought help, and most of them turned first to family or friends.', c: [6] },
    { q: "Which part of the Philippines' 2026 gender gap score is the lowest?", o: ['Educational attainment', 'Health and survival', 'Economic participation', 'Political empowerment'], a: 3, why: 'Political empowerment scores 37.9%, far below the other sub-indices.', c: [9] },
    { q: 'Since 2022, below what age is sexual intercourse with a child treated as statutory rape?', o: ['12', '14', '16', '18'], a: 2, why: 'RA 11648 raised the age from 12 to 16.', c: [17] },
    { q: 'What is the first step of WHO\'s LIVES approach for supporting someone who discloses abuse?', o: ['Investigate', 'Listen', 'Advise them to leave', 'Confront the abuser'], a: 1, why: 'LIVES stands for Listen, Inquire about needs, Validate, Enhance safety, Support.', c: [19] }
  ];

  /* ---------- About ---------- */
  K.pillars = [
    ['Awareness', 'Plain-language explanations of what gender-based violence is, how common it is and why it continues, drawn from WHO and Philippine government data.'],
    ['Equality', 'Evidence on where the Philippines stands on the gender gap and the laws that guarantee equal protection, including the Magna Carta of Women and CEDAW.'],
    ['Inclusion', 'Coverage of the groups at higher risk, including adolescent girls, women with disabilities and gender-diverse people, and of where the law protects beyond women.'],
    ['Empowerment', 'Tools that put knowledge to use: a rights finder, step-by-step guides to protection orders, and a personal action plan.'],
    ['Social responsibility', 'Everyone has a role. The action plan and the LIVES guide show what friends, colleagues, employers, schools and neighbours can do.']
  ];

  K.glossary = [
    ['Gender-based violence', 'Harm directed at a person because of their gender, or that affects one gender disproportionately. This site focuses on violence against women.'],
    ['Intimate partner violence (IPV)', 'Physical, sexual or psychological harm by a current or former partner, including controlling behaviour.'],
    ['VAWC', 'Violence against women and their children, the crime defined by RA 9262.'],
    ['BPO', 'Barangay Protection Order. Issued by the barangay, effective for 15 days.'],
    ['TPO / PPO', 'Temporary (30 days) and Permanent Protection Orders, issued by a court.'],
    ['NDHS', 'National Demographic and Health Survey, conducted by the Philippine Statistics Authority about every five years.'],
    ['PCW', 'Philippine Commission on Women, the government policy body on women and gender equality.'],
    ['WCPC', 'Women and Children Protection Center of the Philippine National Police.'],
    ['CEDAW', 'The UN Convention on the Elimination of All Forms of Discrimination Against Women.'],
    ['Statutory rape', 'Sexual intercourse with a child below the age set by law, regardless of apparent consent. The age is 16 in the Philippines since 2022.'],
    ['Gender gap index', 'A World Economic Forum score of how close women and men are to parity in economy, education, health and politics.'],
    ['Under-reporting', 'When many cases never reach surveys or authorities, so official numbers understate the problem.']
  ];

  K.faq = [
    ['Is Kapantay a crisis line or a legal service?', 'No. It is an independent educational project. For urgent help, call 911 or use the numbers on the Get help page. For legal advice, contact the Public Attorney\'s Office or a lawyer.'],
    ['Where does the data come from?', 'Every statistic links to a numbered source on the Evidence page: WHO, the Philippine Statistics Authority (through the NDHS), the Philippine Commission on Women, UN Women, the World Economic Forum and peer-reviewed research.'],
    ['Why focus on women when other people are affected too?', 'The strongest global evidence and the main Philippine laws on partner violence centre on women and children. The site also covers gender-diverse people and notes where the law protects men.'],
    ['Does this site store my information?', 'Only in your own browser. Accounts, progress and action plans live in local storage on your device and are never sent anywhere. See the privacy note below.'],
    ['How current is it?', 'Last reviewed 19 September 2026, including the World Economic Forum report released that week. Statistics change as new surveys are published, so check the linked sources for the latest figures.']
  ];

})(window.K);
