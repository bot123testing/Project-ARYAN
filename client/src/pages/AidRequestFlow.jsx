import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MOCK_NGOS } from '../data/mapMockData';
import { CheckCircle, AlertTriangle, MapPin, ClipboardList, Info } from 'lucide-react';

const AidRequestFlow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [ngo, setNgo] = useState(null);
    const [address, setAddress] = useState('');
    const [selectedNeeds, setSelectedNeeds] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const needs = [
        "Fever / Flu Symptoms",
        "Persistent Cough",
        "Shortness of Breath",
        "Need Oxygen Cylinder",
        "Subsidized Grains",
        "Fertilizer Shortage",
        "Pesticide Needed",
        "Financial Support"
    ];

    useEffect(() => {
        const found = MOCK_NGOS.find(n => n.id === parseInt(id));
        if (found) {
            setNgo(found);
        } else {
            navigate('/map');
        }
    }, [id, navigate]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const toggleNeed = (need) => {
        setSelectedNeeds(prev => 
            prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
        );
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/analytics/aid-request`, {
                ngoId: ngo.id,
                ngoName: ngo.name,
                address,
                needs: selectedNeeds,
                suggestedRelief: "Pending Professional Evaluation"
            });
            setStep(4);
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit request. Please try again.");
        } finally {
            setIsSubmitting(false);
            setShowWarning(false);
        }
    };

    if (!ngo) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                
                {/* Progress Bar */}
                {step < 4 && (
                    <div className="bg-blue-600 h-2 flex">
                        <div className="bg-blue-300 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                    </div>
                )}

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <MapPin size={24} />
                                <h1 className="text-2xl font-bold">Step 1: Delivery Address</h1>
                            </div>
                            <p className="text-gray-500">Provide the specific location where the aid should be dispatched.</p>
                            <textarea 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full address..."
                                className="w-full h-32 p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <button 
                                disabled={!address.trim()}
                                onClick={handleNext}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold transition-all shadow-lg"
                            >
                                Continue to Needs
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <ClipboardList size={24} />
                                <h1 className="text-2xl font-bold">Step 2: Specific Needs</h1>
                            </div>
                            <p className="text-gray-500">Select all symptoms or resource shortages currently faced.</p>
                            <div className="grid grid-cols-1 gap-3">
                                {needs.map(need => (
                                    <button 
                                        key={need}
                                        onClick={() => toggleNeed(need)}
                                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                                            selectedNeeds.includes(need) 
                                            ? 'bg-blue-50 border-blue-500 text-blue-800 font-bold' 
                                            : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {need}
                                        {selectedNeeds.includes(need) && <CheckCircle size={18} />}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button onClick={handleBack} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold transition-all">Back</button>
                                <button 
                                    disabled={selectedNeeds.length === 0}
                                    onClick={handleNext}
                                    className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold transition-all shadow-lg"
                                >
                                    Review Suggestion
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center">
                            <div className="flex flex-col items-center gap-4 mb-6">
                                <div className="bg-green-100 p-4 rounded-full text-green-600">
                                    <Info size={40} />
                                </div>
                                <h1 className="text-2xl font-bold">Step 3: Suggested Relief</h1>
                            </div>
                            
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-left">
                                <h3 className="font-bold text-blue-800 mb-2 underline">Preliminary Match:</h3>
                                <p className="text-blue-900 font-medium">
                                    Based on your input, we suggest scheduling a priority wellness check with {ngo.name} volunteers and preparing basic recovery kits.
                                </p>
                            </div>

                            <p className="text-sm text-gray-500 italic">
                                * Final dispatch plan depends on NGO inventory and on-site verification.
                            </p>

                            <div className="flex gap-4 pt-4">
                                <button onClick={handleBack} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold transition-all">Back</button>
                                <button 
                                    onClick={() => setShowWarning(true)}
                                    className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="py-12 text-center space-y-6 anim-fade-in">
                            <div className="flex flex-col items-center gap-4">
                                <div className="bg-green-100 p-6 rounded-full text-green-600 animate-bounce">
                                    <CheckCircle size={64} />
                                </div>
                                <h1 className="text-3xl font-black text-gray-900">Order Placed!</h1>
                                <p className="text-gray-600 max-w-xs mx-auto">
                                    Your request has been sent to <strong>{ngo.name}</strong>. A staff member will call the verified number soon.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate('/map')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md"
                            >
                                Back to Map
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
                        <div className="flex items-center gap-3 text-amber-500">
                            <AlertTriangle size={32} />
                            <h2 className="text-2xl font-bold">Medical Warning</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed font-medium">
                            This is a preliminary match. A verified local doctor or NGO worker <strong>MUST</strong> contact you to verify these symptoms before any medication is dispatched.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-bold shadow-lg transition-all"
                            >
                                {isSubmitting ? 'Submitting...' : 'I Understand, Proceed'}
                            </button>
                            <button 
                                onClick={() => setShowWarning(false)}
                                className="w-full text-gray-500 font-semibold hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AidRequestFlow;
