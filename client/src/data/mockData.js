export const initialSchemes = [
    {
        id: 1,
        name: "Ayushman Bharat PM-JAY",
        ministry: "Ministry of Health",
        description: "Health assurance scheme covering up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
        financialCap: 500000,
        criteria: { minAge: 0, maxIncome: 250000, gender: "Any" },
        category: "Health",
        status: "Active"
    },
    {
        id: 2,
        name: "PM Kisan Samman Nidhi",
        ministry: "Ministry of Agriculture",
        description: "Income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
        financialCap: 6000,
        criteria: { minAge: 18, occupation: ["Farmer"], gender: "Any" },
        category: "Agriculture",
        status: "Active"
    },
    {
        id: 3,
        name: "Sukanya Samriddhi Yojana",
        ministry: "Ministry of Women & Child Development",
        description: "Small deposit scheme for the girl child. High interest rate and tax benefits.",
        financialCap: 150000,
        criteria: { maxAge: 10, gender: "Female" },
        category: "Education",
        status: "Active"
    },
    {
        id: 4,
        name: "PM Shram Yogi Maandhan",
        ministry: "Ministry of Labour",
        description: "Voluntary pension scheme for unorganized workers.",
        financialCap: 36000, // Annual pension
        criteria: { minAge: 18, maxAge: 40, maxIncome: 15000, gender: "Any" },
        category: "Pension",
        status: "Active"
    }
];

export const initialNGOs = [
    {
        id: 101,
        name: "Goonj",
        description: "Providing clothing and basic household needs.",
        location: { lat: 28.5272, lng: 77.1389, address: "Delhi HQ" },
        contact: { phone: "011-26972351" },
        services: [{ type: "Using Material", quantity: 500 }],
        status: "Active",
        trustScore: 4.8
    },
    {
        id: 102,
        name: "Smile Foundation",
        description: "Education for underprivileged children.",
        location: { lat: 19.1136, lng: 72.8697, address: "Mumbai Branch" },
        contact: { phone: "022-26351382" },
        services: [{ type: "Education", quantity: 120 }],
        status: "Active",
        trustScore: 4.7
    },
    {
        id: 103,
        name: "Akshaya Patra",
        description: "Unlimited food for education.",
        location: { lat: 12.9716, lng: 77.5946, address: "Bangalore" },
        contact: { phone: "080-23471956" },
        services: [{ type: "Food", quantity: 5000, isUrgent: true }],
        status: "Active",
        trustScore: 4.9
    }
];
