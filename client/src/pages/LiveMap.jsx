import React, { useState, useEffect } from 'react';
import GeoMap from '../components/Map/GeoMap';
import { Search, MapPin } from 'lucide-react';
import { MOCK_NGOS } from '../data/mapMockData';

const LiveMap = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const [searchType, setSearchType] = useState('');
    const [filteredData, setFilteredData] = useState(MOCK_NGOS);

    const aidTypes = [
        "Medicine",
        "Food/Ration",
        "Free Clinic",
        "Subsidized Fertilizer Center",
        "Loan Subsidy Bank"
    ];

    useEffect(() => {
        const results = MOCK_NGOS.filter(ngo => {
            const matchesLocation = ngo.locationName.toLowerCase().includes(searchLocation.toLowerCase());
            const matchesType = searchType ? ngo.type === searchType : true;
            return matchesLocation && matchesType;
        });
        setFilteredData(results);
    }, [searchLocation, searchType]);

    // Calculate center dynamically
    const centerPosition = filteredData.length > 0 
        ? [filteredData[0].location.lat, filteredData[0].location.lng] 
        : [20.5937, 78.9629]; // Default India Center

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
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Region, City, or State...</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Delhi, Maharashtra" 
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">What aid do you need?</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <select 
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        {aidTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <h3 className="font-semibold text-sm text-gray-500 uppercase">Map Legend</h3>
                            <div className="flex flex-col gap-2 pointer-events-none opacity-80">
                                <label className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                                    <span className="text-sm">Available Resources ({filteredData.length} found)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-primary mb-2">Did you know?</h3>
                        <p className="text-sm text-blue-800">You can click on any pin to see real-time inventory levels (e.g., "50 Oxygen Cylinders available").</p>
                    </div>
                </div>

                {/* Map Interface */}
                <div className="lg:col-span-2">
                    <GeoMap ngos={filteredData} center={centerPosition} />
                </div>
            </div>
        </div>
    );
};

export default LiveMap;
