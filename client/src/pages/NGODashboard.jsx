import React from 'react';
import { Activity, Users, Map as MapIcon, TrendingUp } from 'lucide-react';

const NGODashboard = () => {
    // Dummy Analytics Data
    const statCards = [
        { label: "Total Community Searches", value: "2,450", icon: <SearchIcon /> }, // will use local icon
        { label: "Searches for Food Ration (This Week)", value: "450", icon: <Users className="text-blue-500" size={24} /> },
        { label: "Searches for Medicine", value: "120", icon: <Activity className="text-red-500" size={24} /> },
        { label: "Mapped Verified NGOs Nearby", value: "34", icon: <MapIcon className="text-green-500" size={24} /> },
    ];

    const demandData = [
        { category: "Food/Ration", percentage: 75, count: 850 },
        { category: "Medicine & Health", percentage: 55, count: 540 },
        { category: "Financial/Loan Subsidies", percentage: 40, count: 320 },
        { category: "Agricultural Resources", percentage: 30, count: 210 },
        { category: "Education Materials", percentage: 15, count: 115 },
    ];

    return (
        <div className="container mx-auto px-6 py-10 min-h-screen">
            <div className="flex justify-between items-end mb-10 border-b pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-dark tracking-tight">NGO Dashboard</h1>
                    <p className="text-gray-500 mt-2 text-lg">Welcome back! Here's what's happening in your community.</p>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
                    <TrendingUp size={20} /> Update Inventory
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Analytics Panel */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-dark">Community Needs Analytics</h2>
                        <p className="text-sm text-gray-500 mt-1">Real-time breakdown of aid searches in your operating region over the last 30 days.</p>
                    </div>

                    <div className="space-y-6">
                        {demandData.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-700">{item.category}</span>
                                    <span className="text-sm font-bold text-primary">{item.count} Searches</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div 
                                        className={`bg-blue-600 h-3 rounded-full relative`} 
                                        style={{ width: `${item.percentage}%` }}
                                    >
                                        <div className="absolute right-0 top-0 h-full w-2 bg-white/20 rounded-r-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side Panel */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-600 to-primary p-8 rounded-2xl shadow-lg border border-blue-500 text-white">
                        <h3 className="font-bold text-xl mb-3">Action Required</h3>
                        <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                            There has been a 25% spike in searches for Food & Ration passing through your sector. Consider updating your distribution capacity to alert citizens.
                        </p>
                        <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl shadow-md hover:bg-blue-50 transition">
                            Manage capacity
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-dark mb-4 border-b pb-2">Recent Citizen Inquiries</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2"></div>
                                <div>
                                    <p className="text-sm font-semibold">Wheat subsidy request</p>
                                    <p className="text-xs text-gray-400 mt-0.5">2 hours ago • Verified Profile</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                                <div>
                                    <p className="text-sm font-semibold">Medical emergency assistance</p>
                                    <p className="text-xs text-gray-400 mt-0.5">5 hours ago • High Priority</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon for standard search map
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

export default NGODashboard;
