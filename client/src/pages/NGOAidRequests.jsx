import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Navigation, CheckCircle, Clock } from 'lucide-react';

const NGOAidRequests = () => {
    const [requests, setRequests] = useState([]);
    const [dispatchedIds, setDispatchedIds] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.get(`${API_URL}/api/analytics/aid-requests`);
                if (res.data.success) {
                    setRequests(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch aid requests", err);
            }
        };
        fetchRequests();
    }, []);

    const handleDispatch = (id) => {
        setDispatchedIds(prev => [...prev, id]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Truck size={32} className="text-primary" />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Aid Dispatch Center</h1>
                        </div>
                        <p className="text-gray-500 font-medium text-lg">Managing and verifying incoming citizen aid requests.</p>
                    </div>
                    
                    <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                        <div className="px-6 py-2 text-center border-r">
                            <p className="text-xs font-bold text-gray-400 uppercase">Pending</p>
                            <p className="text-2xl font-black text-primary">{requests.length - dispatchedIds.length}</p>
                        </div>
                        <div className="px-6 py-2 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Dispatched</p>
                            <p className="text-2xl font-black text-green-600">{dispatchedIds.length}</p>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f8fafc] text-[#64748b] text-xs uppercase font-black border-b border-gray-100">
                                <tr>
                                    <th className="py-5 px-8">Citizen Details</th>
                                    <th className="py-5 px-8">Delivery Address</th>
                                    <th className="py-5 px-8">Requested Needs</th>
                                    <th className="py-5 px-8 text-center">Protocol Status</th>
                                    <th className="py-5 px-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {requests.map((request) => {
                                    const isDispatched = dispatchedIds.includes(request._id);
                                    
                                    return (
                                        <tr key={request._id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="py-6 px-8">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900">Citizen ID: {request._id.slice(-6).toUpperCase()}</span>
                                                    <span className="text-xs text-gray-400 mt-1">Requested to: {request.ngoName}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="flex items-start gap-2 max-w-[250px]">
                                                    <Navigation size={14} className="mt-1 text-gray-400 shrink-0" />
                                                    <span className="text-sm font-medium text-gray-600">{request.address}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {request.needs.map((need, idx) => (
                                                        <span key={idx} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold border border-blue-100">
                                                            {need}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-center">
                                                {isDispatched ? (
                                                    <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black ring-1 ring-blue-300 ring-inset">
                                                        <CheckCircle size={14} /> ORDER DISPATCHED
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black ring-1 ring-green-300 ring-inset">
                                                        <CheckCircle size={14} /> VERIFIED BY DOCTOR
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <button 
                                                    onClick={() => handleDispatch(request._id)}
                                                    disabled={isDispatched}
                                                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                                        isDispatched 
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                                                        : 'bg-primary text-white hover:bg-black shadow-lg shadow-blue-100 active:scale-95'
                                                    }`}
                                                >
                                                    {isDispatched ? 'Dispatched' : 'Dispatch Order'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {requests.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-3 text-gray-300">
                                                <Clock size={48} />
                                                <p className="text-xl font-bold">No incoming aid requests found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-amber-900">NGO Command Protocol</h4>
                        <p className="text-sm text-amber-800 leading-relaxed mt-1">
                            Orders marked as "Verified by Doctor" have passed the medical consultation stage. Once dispatched, citizens will be notified via the portal. Ensure inventory mapping is updated in the "Inventory Management" tab.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NGOAidRequests;
