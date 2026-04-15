const INDIAN_CITIES = [
    { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { name: "Surat", lat: 21.1702, lng: 72.8311 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
    { name: "Kanpur", lat: 26.4499, lng: 80.3319 },
    { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
    { name: "Indore", lat: 22.7196, lng: 75.8577 },
    { name: "Thane", lat: 19.2183, lng: 72.9781 },
    { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
    { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
    { name: "Patna", lat: 25.5941, lng: 85.1376 },
    { name: "Vadodara", lat: 22.3072, lng: 73.1812 },
    { name: "Ghaziabad", lat: 28.6692, lng: 77.4538 }
];

const AID_TYPES = [
    { type: "Medicine", label: "Medicine Center" },
    { type: "Food/Ration", label: "Food Ration Center" },
    { type: "Subsidized Fertilizer Center", label: "Agri Subsidy Center" },
    { type: "Free Clinic", label: "Free Health Clinic" }
];

const generateClusteredData = () => {
    const data = [];
    let idCounter = 1;

    INDIAN_CITIES.forEach(city => {
        // Generate 3-4 markers per city
        const numMarkers = Math.floor(Math.random() * 2) + 3; // 3 or 4
        
        for (let i = 0; i < numMarkers; i++) {
            const aid = AID_TYPES[i % AID_TYPES.length];
            // Small random offset to separate markers in the same city
            const latOffset = (Math.random() - 0.5) * 0.05;
            const lngOffset = (Math.random() - 0.5) * 0.05;
            
            data.push({
                id: idCounter++,
                name: `${city.name} ${aid.label}`,
                locationName: `${city.name}, India`,
                type: aid.type,
                description: `Emergency ${aid.type} resources available at this ${city.name} branch.`,
                location: {
                    lat: city.lat + latOffset,
                    lng: city.lng + lngOffset
                },
                services: [{ type: aid.type, quantity: Math.floor(Math.random() * 500) + 100 }],
                contactPhone: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
                websiteURL: "https://india.gov.in"
            });
        }
    });

    return data;
};

export const MOCK_NGOS = generateClusteredData();
