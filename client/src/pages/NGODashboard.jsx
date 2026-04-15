import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Activity, Users, Map as MapIcon, TrendingUp, Search as SearchIconLucide, ExternalLink } from 'lucide-react';

const NGODashboard = () => {
    const [stats, setStats] = useState(null);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                // Fetch stats
                const statsRes = await axios.get(`${API_URL}/api/analytics/search-stats`);
                if (statsRes.data.success) setStats(statsRes.data);

                // Fetch aid requests
                const requestsRes = await axios.get(`${API_URL}/api/analytics/aid-requests`);
                if (requestsRes.data.success) setRequests(requestsRes.data.data);

            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };
        fetchData();
    }, []);

    const totalSearches = stats?.totalSearches || 0;
    const topAid = stats?.topAidTypes?.[0] || { name: 'N/A', count: 0 };
    const secondAid = stats?.topAidTypes?.[1] || { name: 'N/A', count: 0 };
    const topLocation = stats?.topLocations?.[0] || { name: 'N/A', count: 0 };

    const statCards = [
        { label: "Total Community Searches", value: totalSearches, icon: <SearchIcon /> },
        { label: `Searches for ${topAid.name}`, value: topAid.count, icon: <Users className="text-blue-500" size={24} /> },
        { label: `Searches for ${secondAid.name}`, value: secondAid.count, icon: <Activity className="text-red-500" size={24} /> },
        { label: `Top Required Area`, value: topLocation.name, icon: <MapIcon className="text-green-500" size={24} /> },
    ];

    const demandData = stats?.topAidTypes?.map(aid => ({
        category: aid.name,
        count: aid.count,
        percentage: totalSearches > 0 ? Math.round((aid.count / totalSearches) * 100) : 0
    })) || [];

    return (
        <div className="container mx-auto px-6 py-10 min-h-screen">
            <div className="flex justify-between items-end mb-10 border-b pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight">NGO Dashboard</h1>
                    <p className="text-gray-500 mt-2 text-lg">Welcome back! Here's what's happening in your community.</p>
                </div>
                <Link to="/ngo-inventory" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
                    <TrendingUp size={20} /> Update Inventory
                </Link>
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
                {/* Analytics & Table Panel */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Analytics Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#1e293b]">Community Needs Analytics</h2>
                            <p className="text-sm text-gray-500 mt-1">Real-time breakdown of aid searches in your operating region.</p>
                        </div>

                        <div className="space-y-6">
                            {demandData.length > 0 ? demandData.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-700">{item.category}</span>
                                        <span className="text-sm font-bold text-blue-600">{item.count} Searches</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3">
                                        <div 
                                            className="bg-blue-600 h-3 rounded-full relative" 
                                            style={{ width: `${item.percentage}%` }}
                                        >
                                            <div className="absolute right-0 top-0 h-full w-2 bg-white/20 rounded-r-full"></div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 italic">No search data yet.</p>
                            )}
                        </div>
                    </div>

                    {/* NEW: Aid Requests Table */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1e293b]">Consolidated Aid Requests</h2>
                                <p className="text-sm text-gray-500 mt-1">Verified requests via the Live Map consultation flow.</p>
                            </div>
                            <Link to="/ngo-aid-requests" className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
                                Command Center <ExternalLink size={14} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8fafc] text-[#64748b] text-xs uppercase font-black border-b border-gray-100">
                                    <tr>
                                        <th className="py-5 px-8">NGO/Center</th>
                                        <th className="py-5 px-8">Delivery Address</th>
                                        <th className="py-5 px-8">Needs</th>
                                        <th className="py-5 px-8">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {requests.map((r, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="py-6 px-8 font-bold text-blue-600">{r.ngoName}</td>
                                            <td className="py-6 px-8 text-sm text-gray-600 truncate max-w-[150px]">{r.address}</td>
                                            <td className="py-6 px-8">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {r.needs?.map((n, j) => (
                                                        <span key={j} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold border border-blue-100">{n}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-xs text-gray-400 font-bold">
                                                {new Date(r.timestamp).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {requests.length === 0 && (
                                        <tr><td colSpan="4" className="py-24 text-center text-gray-300 font-bold italic">No aid requests logged yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Side Panel */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-8 rounded-2xl shadow-lg border border-blue-400 text-white">
                        <h3 className="font-bold text-xl mb-3">Action Required</h3>
                        <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                            There has been a 25% spike in searches for Food & Ration passing through your sector. Consider updating your distribution capacity to alert citizens.
                        </p>
                        <Link to="/ngo-inventory" className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl shadow-md hover:bg-blue-50 transition block text-center">
                            Manage capacity
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#1e293b] mb-4 border-b pb-2">Recent Citizen Inquiries</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2"></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 leading-tight">Wheat subsidy request</p>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">2 hours ago • Verified Profile</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 leading-tight">Medical emergency assistance</p>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">5 hours ago • High Priority</p>
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
