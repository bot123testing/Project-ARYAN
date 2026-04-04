export const schemesDB = [
    // --- AGRICULTURE ---
    {
        id: "agr-01",
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        sector: "Agriculture",
        targetProfessions: ["Farmer"],
        keywords: ["kisan", "land", "farmer", "patta", "holding", "agriculture", "bank account", "aadhaar"],
        description: "Provides income support of ₹6,000 per year to all landholding farmer families across the country.",
        officialLink: "https://pmkisan.gov.in/"
    },
    {
        id: "agr-02",
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        sector: "Agriculture",
        targetProfessions: ["Farmer"],
        keywords: ["crop", "insurance", "kisan", "weather", "damage", "premium", "sowing", "harvest"],
        description: "A comprehensive crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
        officialLink: "https://pmfby.gov.in/"
    },
    {
        id: "agr-03",
        name: "Kisan Credit Card (KCC) Scheme",
        sector: "Agriculture",
        targetProfessions: ["Farmer", "Artisan"],
        keywords: ["credit", "loan", "kisan", "bank", "nabard", "rupay", "working capital"],
        description: "Aims to provide adequate and timely credit support from the banking system to the farmers for their cultivation and other needs.",
        officialLink: "https://agricoop.nic.in/en"
    },
    {
        id: "agr-04",
        name: "Paramparagat Krishi Vikas Yojana (PKVY)",
        sector: "Agriculture",
        targetProfessions: ["Farmer"],
        keywords: ["organic", "farming", "fertilizer", "soil", "chemical free", "cluster"],
        description: "An extended component of Soil Health Management (SHM) to promote organic farming through a cluster approach.",
        officialLink: "https://pgsindia-ncof.gov.in/pkvy"
    },
    {
        id: "agr-05",
        name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        sector: "Agriculture",
        targetProfessions: ["Farmer"],
        keywords: ["water", "irrigation", "drop", "crop", "drip", "sprinkler", "per drop more crop"],
        description: "Aims to improve water use efficiency on farms and expand cultivable area under assured irrigation.",
        officialLink: "https://pmksy.gov.in/"
    },

    // --- HEALTHCARE ---
    {
        id: "hlt-01",
        name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
        sector: "Healthcare",
        targetProfessions: ["Farmer", "Daily Wage Worker", "Unemployed", "Artisan"],
        keywords: ["health", "hospital", "bpl", "ration", "medical", "treatment", "insurance", "card", "ayushman"],
        description: "World's largest health insurance/assurance scheme providing a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care.",
        officialLink: "https://pmjay.gov.in/"
    },
    {
        id: "hlt-02",
        name: "Janani Suraksha Yojana (JSY)",
        sector: "Healthcare",
        targetProfessions: ["Daily Wage Worker", "Unemployed", "Farmer"],
        keywords: ["maternal", "pregnant", "hospital", "asha", "delivery", "health", "infant"],
        description: "A safe motherhood intervention under the National Health Mission (NHM) being implemented with the objective of reducing maternal and neonatal mortality.",
        officialLink: "https://nhm.gov.in/"
    },
    {
        id: "hlt-03",
        name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
        sector: "Healthcare",
        targetProfessions: ["Women Entrepreneur", "Daily Wage Worker", "Unemployed", "Farmer"],
        keywords: ["pregnant", "pregnancy", "checkup", "antenatal", "ultrasound", "blood test", "health"],
        description: "Aims to provide assured, comprehensive and quality antenatal care, free of cost, to pregnant women on the 9th of every month.",
        officialLink: "https://pmsma.nhp.gov.in/"
    },
    {
        id: "hlt-04",
        name: "National Tuberculosis Elimination Programme (NTEP)",
        sector: "Healthcare",
        targetProfessions: ["Daily Wage Worker", "Unemployed", "Farmer", "Student", "Small Business Owner"],
        keywords: ["tb", "tuberculosis", "treatment", "dots", "nikshay", "medicine", "cough"],
        description: "State-run tuberculosis control initiative of the Government of India aiming to eliminate TB.",
        officialLink: "https://tbcindia.gov.in/"
    },

    // --- HOUSING ---
    {
        id: "hou-01",
        name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
        sector: "Housing",
        targetProfessions: ["Farmer", "Daily Wage Worker", "Artisan"],
        keywords: ["house", "kachha", "pucca", "rural", "gramin", "bpl", "ration", "landless"],
        description: "Aims to provide a pucca house with basic amenities to all rural families who are homeless or living in kutcha or dilapidated houses.",
        officialLink: "https://pmayg.nic.in/"
    },
    {
        id: "hou-02",
        name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
        sector: "Housing",
        targetProfessions: ["Daily Wage Worker", "Small Business Owner", "Artisan"],
        keywords: ["house", "urban", "city", "slum", "credit", "subsidy", "building", "home loan"],
        description: "Addresses urban housing shortage among the EWS/LIG and MIG categories including the slum dwellers.",
        officialLink: "https://pmaymis.gov.in/"
    },

    // --- EDUCATION ---
    {
        id: "edu-01",
        name: "Post Matric Scholarships Scheme for Minorities",
        sector: "Education",
        targetProfessions: ["Student"],
        keywords: ["scholarship", "minority", "college", "fees", "student", "matric", "income certificate"],
        description: "Provides financial assistance to poor and meritorious students belonging to minority communities to pursue higher education.",
        officialLink: "https://scholarships.gov.in/"
    },
    {
        id: "edu-02",
        name: "National Means-cum-Merit Scholarship (NMMS)",
        sector: "Education",
        targetProfessions: ["Student"],
        keywords: ["scholarship", "merit", "exam", "school", "dropout", "student", "income certificate"],
        description: "Awards scholarships to meritorious students of economically weaker sections to arrest their drop out at class VIII and encourage them to continue study.",
        officialLink: "https://scholarships.gov.in/"
    },
    {
        id: "edu-03",
        name: "Pragati Scholarship for Girls",
        sector: "Education",
        targetProfessions: ["Student", "Women Entrepreneur"],
        keywords: ["girl", "technical", "aicte", "degree", "diploma", "scholarship", "women", "student"],
        description: "Scholarship scheme by AICTE to provide assistance for advancement of girls pursuing technical education.",
        officialLink: "https://www.aicte-india.org/"
    },
    {
        id: "edu-04",
        name: "Free Coaching Scheme for SC and OBC Students",
        sector: "Education",
        targetProfessions: ["Student", "Unemployed"],
        keywords: ["coaching", "exam", "upsc", "ssc", "sc", "obc", "caste certificate", "student"],
        description: "Aims to provide qualitative coaching to SC and OBC students to enable them to appear in competitive examinations.",
        officialLink: "https://socialjustice.gov.in/"
    },

    // --- MSME / BUSINESS ---
    {
        id: "msm-01",
        name: "Prime Minister's Employment Generation Programme (PMEGP)",
        sector: "MSME/Business",
        targetProfessions: ["Small Business Owner", "Women Entrepreneur", "Unemployed", "Artisan"],
        keywords: ["msme", "business", "loan", "project", "udyami", "margin money", " subsidy", "enterprise"],
        description: "Credit-linked subsidy programme aiming to generate employment opportunities through establishment of micro enterprises.",
        officialLink: "https://www.kviconline.gov.in/pmegpeportal/"
    },
    {
        id: "msm-02",
        name: "MUDRA Yojana (Pradhan Mantri Mudra Yojana)",
        sector: "MSME/Business",
        targetProfessions: ["Small Business Owner", "Women Entrepreneur", "Artisan"],
        keywords: ["mudra", "loan", "shishu", "kishor", "tarun", "bank", "microfinance", "msme", "collateral free"],
        description: "Provides collateral-free loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.",
        officialLink: "https://www.mudra.org.in/"
    },
    {
        id: "msm-03",
        name: "Stand-Up India Scheme",
        sector: "MSME/Business",
        targetProfessions: ["Women Entrepreneur", "Small Business Owner"],
        keywords: ["women", "sc", "st", "greenfield", "loan", "enterprise", "business", "bank"],
        description: "Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch.",
        officialLink: "https://www.standupmitra.in/"
    },
    {
        id: "msm-04",
        name: "Udyam Registration",
        sector: "MSME/Business",
        targetProfessions: ["Small Business Owner", "Women Entrepreneur", "Artisan"],
        keywords: ["udyam", "msme", "certificate", "aadhaar", "enterprise", "business", "manufacturing"],
        description: "A fully online, paperless, and free registration process for MSMEs, based entirely on self-declaration.",
        officialLink: "https://udyamregistration.gov.in/"
    },
    {
        id: "msm-05",
        name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
        sector: "MSME/Business",
        targetProfessions: ["Small Business Owner", "Women Entrepreneur"],
        keywords: ["guarantee", "collateral", "loan", "bank", "msme", "credit", "business"],
        description: "Provides credit guarantee to financial institutions that provide loans to SMEs and MSMEs without requiring collateral.",
        officialLink: "https://www.cgtmse.in/"
    },

    // --- SOCIAL WELFARE ---
    {
        id: "soc-01",
        name: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
        sector: "Social Welfare",
        targetProfessions: ["Daily Wage Worker", "Unemployed", "Farmer", "Artisan"],
        keywords: ["job card", "wage", "rural", "employment", "100 days", "labor", "panchayat", "bpl"],
        description: "Provides at least 100 days of guaranteed wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.",
        officialLink: "https://nrega.nic.in/"
    },
    {
        id: "soc-02",
        name: "Pradhan Mantri Shram Yogi Maandhan (PM-SYM)",
        sector: "Social Welfare",
        targetProfessions: ["Daily Wage Worker", "Artisan"],
        keywords: ["pension", "unorganized", "labor", "monthly", "contribution", "age", "retire"],
        description: "A voluntary and contributory pension scheme for unorganized workers for assurance of a monthly pension of ₹3000 after reaching 60 years of age.",
        officialLink: "https://maandhan.in/"
    },
    {
        id: "soc-03",
        name: "National Social Assistance Programme (NSAP)",
        sector: "Social Welfare",
        targetProfessions: ["Unemployed", "Daily Wage Worker", "Farmer"],
        keywords: ["pension", "old age", "widow", "disability", "bpl", "assistance", "destitute"],
        description: "Provides financial assistance to the elderly, widows, and persons with disabilities in the form of social pensions.",
        officialLink: "https://nsap.nic.in/"
    },
    {
        id: "soc-04",
        name: "Pradhan Mantri Ujjwala Yojana (PMUY)",
        sector: "Social Welfare",
        targetProfessions: ["Daily Wage Worker", "Farmer", "Women Entrepreneur"],
        keywords: ["lpg", "gas", "cylinder", "women", "bpl", "ration", "fuel", "connection"],
        description: "Aims to safeguard the health of women & children by providing them with a clean cooking fuel – LPG.",
        officialLink: "https://www.pmuy.gov.in/"
    },
    {
        id: "soc-05",
        name: "Deendayal Antyodaya Yojana-NRLM",
        sector: "Social Welfare",
        targetProfessions: ["Women Entrepreneur", "Artisan", "Daily Wage Worker"],
        keywords: ["self help group", "shg", "women", "livelihood", "poor", "rural", "credit", "bank"],
        description: "Organizes rural poor women into Self Help Groups (SHGs) and supports them to start entrepreneurial activities.",
        officialLink: "https://aajeevika.gov.in/"
    }
];
