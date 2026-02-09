import React, { useState, useEffect } from 'react';
import GeoMap from '../components/Map/GeoMap';
import { Search } from 'lucide-react';
// Import mock data directly for demo if API fails
// In a real app, this would be an axios call
const MOCK_NGOS = [
    {
        id: 101,
        name: "Goonj",
        description: "Providing clothing and basic household needs.",
        location: { lat: 28.5272, lng: 77.1389 },
        services: [{ type: "Material", quantity: 500 }],
    },
    {
        id: 102,
        name: "Smile Foundation",
        description: "Education for underprivileged children.",
        location: { lat: 19.1136, lng: 72.8697 },
        services: [{ type: "Education", quantity: 120 }],
    },
    {
        id: 103,
        name: "Akshaya Patra",
        description: "Unlimited food for education.",
        location: { lat: 12.9716, lng: 77.5946 },
        services: [{ type: "Food", quantity: 5000 }],
    }
];

const MapPage = () => {
    return (
        <div className="container mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Live Resource Map</h1>
                <p className="text-gray-600">Locate Verified NGOs, Government Centers, and Emergency Relief Camps near you.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input type="text" placeholder="Search for food, medicine..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm text-gray-500 uppercase">Filter By Type</h3>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="text-primary rounded" />
                                <span>Government Centers (Blue)</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="text-secondary rounded" />
                                <span>Verified NGOs (Green)</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="text-red-500 rounded" />
                                <span>Emergency Relief (Red)</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-primary mb-2">Did you know?</h3>
                        <p className="text-sm text-blue-800">You can click on any pin to see real-time inventory levels (e.g., "50 Oxygen Cylinders available").</p>
                    </div>
                </div>

                {/* Map Interface */}
                <div className="lg:col-span-2">
                    <GeoMap ngos={MOCK_NGOS} />
                </div>
            </div>
        </div>
    );
};

export default MapPage;
