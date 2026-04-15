import React, { useState } from 'react';
import { Package, Plus, Minus, Save, ChevronRight, CheckCircle, Activity } from 'lucide-react';

const NGOInventory = () => {
    const [center, setCenter] = useState("Mumbai Central Relief");
    const [showSuccess, setShowSuccess] = useState(false);

    const [inventory, setInventory] = useState({
        medicine: [
            { id: 1, name: "Azithromycin", qty: 250 },
            { id: 2, name: "Savlon", qty: 120 },
            { id: 3, name: "Diclogem", qty: 85 },
            { id: 4, name: "Paracetamol", qty: 500 },
            { id: 5, name: "Oxygen Cylinders", qty: 15 }
        ],
        food: [
            { id: 6, name: "Wheat", qty: 1200 },
            { id: 7, name: "Barley", qty: 450 },
            { id: 8, name: "Rice", qty: 2000 },
            { id: 9, name: "Lentils (Dal)", qty: 800 },
            { id: 10, name: "Cooking Oil", qty: 300 }
        ]
    });

    const updateQty = (category, id, delta) => {
        setInventory(prev => ({
            ...prev,
            [category]: prev[category].map(item => 
                item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
            )
        }));
    };

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                            <Package className="text-primary" size={32} />
                            Inventory Management
                        </h1>
                        <p className="text-gray-500 mt-1">Update regional resource availability for citizen mapping.</p>
                    </div>
                    
                    <select 
                        value={center}
                        onChange={(e) => setCenter(e.target.value)}
                        className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary outline-none font-bold text-gray-700"
                    >
                        <option>Mumbai Central Relief</option>
                        <option>Pune Suburban Hub</option>
                        <option>Nashik Agri Depot</option>
                    </select>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Medicine */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                        <div className="flex items-center gap-2 text-red-600 font-bold border-b pb-3 uppercase tracking-wider text-sm">
                            <Activity size={18} /> Medical Supplies
                        </div>
                        <div className="space-y-4">
                            {inventory.medicine.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <span className="font-semibold text-gray-700">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => updateQty('medicine', item.id, -1)} className="p-1.5 bg-white border rounded-lg hover:bg-gray-100">
                                            <Minus size={16} />
                                        </button>
                                        <input type="number" readOnly value={item.qty} className="w-16 text-center bg-transparent font-black text-primary" />
                                        <button onClick={() => updateQty('medicine', item.id, 1)} className="p-1.5 bg-white border rounded-lg hover:bg-gray-100">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Food */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                        <div className="flex items-center gap-2 text-green-600 font-bold border-b pb-3 uppercase tracking-wider text-sm">
                            <ChevronRight size={18} className="bg-green-100 rounded-full" /> Food & Ration
                        </div>
                        <div className="space-y-4">
                            {inventory.food.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <span className="font-semibold text-gray-700">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => updateQty('food', item.id, -1)} className="p-1.5 bg-white border rounded-lg hover:bg-gray-100">
                                            <Minus size={16} />
                                        </button>
                                        <input type="number" readOnly value={item.qty} className="w-20 text-center bg-transparent font-black text-primary" />
                                        <button onClick={() => updateQty('food', item.id, 1)} className="p-1.5 bg-white border rounded-lg hover:bg-gray-100">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col items-center gap-4">
                    <button 
                        onClick={handleSave}
                        className="w-full md:w-auto px-12 py-4 bg-primary hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        <Save size={24} />
                        Save Inventory Updates
                    </button>
                    
                    {showSuccess && (
                        <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-2 rounded-full border border-green-200 animate-bounce">
                            <CheckCircle size={20} />
                            Inventory synced with Live Map successfully!
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default NGOInventory;
