import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, FileText, Database, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [metrics, setMetrics] = useState({ totalUsers: 0, totalNGOs: 0, totalSchemes: 0 });
    const [schemes, setSchemes] = useState([]);
    const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);
    const [currentScheme, setCurrentScheme] = useState({
        name: '', ministry: '', description: '', financialCap: 0, applicationUrl: '', status: 'Active'
    });
    const [isEditing, setIsEditing] = useState(false);

    // Dynamic config based on env
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchMetrics();
        fetchSchemes();
    }, []);

    const fetchMetrics = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/admin/metrics`);
            if (res.data.success) {
                setMetrics({
                    totalUsers: res.data.totalUsers || 0,
                    totalNGOs: res.data.totalNGOs || 0,
                    totalSchemes: res.data.totalSchemes || 0
                });
            }
        } catch (error) {
            console.error("Error fetching metrics:", error);
        }
    };

    const fetchSchemes = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/schemes`);
            setSchemes(res.data);
        } catch (error) {
            console.error("Error fetching schemes:", error);
        }
    };

    const handleDeleteScheme = async (id) => {
        if (!window.confirm("Are you sure you want to delete this scheme?")) return;
        try {
            await axios.delete(`${API_URL}/api/schemes/${id}`);
            fetchSchemes();
            fetchMetrics();
        } catch (error) {
            console.error("Error deleting scheme:", error);
            alert("Failed to delete scheme.");
        }
    };

    const handleOpenModal = (scheme = null) => {
        if (scheme) {
            setIsEditing(true);
            setCurrentScheme(scheme);
        } else {
            setIsEditing(false);
            setCurrentScheme({
                name: '', ministry: '', description: '', financialCap: 0, applicationUrl: '', status: 'Active'
            });
        }
        setIsSchemeModalOpen(true);
    };

    const handleSaveScheme = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/schemes/${currentScheme._id}`, currentScheme);
            } else {
                await axios.post(`${API_URL}/api/schemes`, currentScheme);
            }
            setIsSchemeModalOpen(false);
            fetchSchemes();
            fetchMetrics();
        } catch (error) {
            console.error("Error saving scheme:", error);
            alert("Failed to save scheme.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-2xl font-black text-blue-800">Admin Panel</h2>
                </div>
                <nav className="mt-4 px-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('Overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'Overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Database size={20} />
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('Manage Schemes')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'Manage Schemes' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FileText size={20} />
                        Manage Schemes
                    </button>
                    <button 
                        onClick={() => setActiveTab('Manage Users')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'Manage Users' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={20} />
                        Manage Users
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">{activeTab}</h1>
                </div>

                {/* Overview Tab */}
                {activeTab === 'Overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="bg-blue-100 p-4 rounded-full text-blue-600"><Users size={32} /></div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-1">Total Users</p>
                                <h3 className="text-3xl font-bold text-gray-900">{metrics.totalUsers}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="bg-green-100 p-4 rounded-full text-green-600"><Database size={32} /></div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-1">Total NGOs</p>
                                <h3 className="text-3xl font-bold text-gray-900">{metrics.totalNGOs}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="bg-purple-100 p-4 rounded-full text-purple-600"><FileText size={32} /></div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-1">Active Schemes</p>
                                <h3 className="text-3xl font-bold text-gray-900">{schemes.length > 0 ? schemes.length : metrics.totalSchemes}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* Manage Schemes Tab */}
                {activeTab === 'Manage Schemes' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-end mb-4">
                            <button 
                                onClick={() => handleOpenModal()} 
                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition"
                            >
                                <Plus size={20} />
                                Add New Scheme
                            </button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-bold border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-6">Scheme Name</th>
                                        <th className="py-4 px-6">Ministry</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schemes.map(s => (
                                        <tr key={s._id || s.id || Math.random()} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-800">{s.name}</td>
                                            <td className="py-4 px-6 text-gray-600">{s.ministry}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.status === 'Active' || !s.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {s.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right flex justify-end gap-3">
                                                <button onClick={() => handleOpenModal(s)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteScheme(s._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {schemes.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="py-8 text-center text-gray-500">No schemes found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Manage Users Tab Placeholder */}
                {activeTab === 'Manage Users' && (
                    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <h2 className="text-xl font-bold text-gray-700 mb-2">User Management</h2>
                        <p className="text-gray-500">This feature is under development.</p>
                    </div>
                )}
            </div>

            {/* Scheme Form Modal */}
            {isSchemeModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0">
                            <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Scheme' : 'Add New Scheme'}</h2>
                            <button onClick={() => setIsSchemeModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSaveScheme} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Scheme Name</label>
                                    <input required type="text" value={currentScheme.name} onChange={e => setCurrentScheme({...currentScheme, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ministry</label>
                                    <input required type="text" value={currentScheme.ministry} onChange={e => setCurrentScheme({...currentScheme, ministry: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea required value={currentScheme.description} onChange={e => setCurrentScheme({...currentScheme, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Financial Cap (₹)</label>
                                        <input required type="number" value={currentScheme.financialCap} onChange={e => setCurrentScheme({...currentScheme, financialCap: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                                        <select value={currentScheme.status} onChange={e => setCurrentScheme({...currentScheme, status: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="Active">Active</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Official Application URL</label>
                                    <input type="url" value={currentScheme.applicationUrl} onChange={e => setCurrentScheme({...currentScheme, applicationUrl: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400" placeholder="https://..." />
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsSchemeModalOpen(false)} className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition">Cancel</button>
                                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold transition shadow-md">{isEditing ? 'Update Scheme' : 'Save Scheme'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
