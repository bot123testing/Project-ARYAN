import React, { useState } from 'react';
import DocumentScanner from '../components/OCR/DocumentScanner';
import BenefitCard from '../components/Schemes/BenefitCard';
import { initialSchemes } from '../../../server/data/mockData'; // Direct import for demo

const FindAid = () => {
    const [formData, setFormData] = useState({
        age: '',
        income: '',
        occupation: '',
        gender: 'Any'
    });
    const [matches, setMatches] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleOCRComplete = (data) => {
        setFormData(prev => ({
            ...prev,
            income: data.estimatedIncome // Auto-fill income
        }));
        alert('OCR Success: Income Auto-Filled from Certificate!');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Client-side filtering logic (Mirroring server logic for immediate demo)
        const results = initialSchemes.filter(scheme => {
            // Simple filtering for demo
            if (formData.age && scheme.criteria.minAge && parseInt(formData.age) < scheme.criteria.minAge) return false;
            if (formData.income && scheme.criteria.maxIncome && parseInt(formData.income) > scheme.criteria.maxIncome) return false;
            return true;
        });

        setMatches(results);
        setShowResults(true);
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-dark mb-6 text-center">Eligibility Checker & Benefit Calculator</h1>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Left: Document Vault / OCR */}
                <div className="space-y-6">
                    <DocumentScanner onScanComplete={handleOCRComplete} />

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-primary mb-2">Why use OCR?</h4>
                        <p className="text-sm text-blue-800">
                            Uploading your Income Certificate allows us to verify your financial status instantly and calculate exact subsidy amounts.
                        </p>
                    </div>
                </div>

                {/* Center: Form */}
                <div className="md:col-span-2">
                    <form onSubmit={handleSearch} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                    placeholder="e.g. 25"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-gray-50"
                                    value={formData.income}
                                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                                    placeholder="Auto-filled by OCR"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.occupation}
                                    onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                                >
                                    <option value="">Select...</option>
                                    <option value="Farmer">Farmer</option>
                                    <option value="Student">Student</option>
                                    <option value="Unemployed">Unemployed</option>
                                    <option value="Worker">Worker</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.gender}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="Any">Any</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            Find Eligible Schemes
                        </button>
                    </form>

                    {/* Results Section */}
                    {showResults && (
                        <div className="mt-10 animate-fade-in-up">
                            <h3 className="text-2xl font-bold text-dark mb-6">Matched Schemes ({matches.length})</h3>
                            <div className="grid gap-6">
                                {matches.length > 0 ? (
                                    matches.map(scheme => (
                                        <BenefitCard key={scheme.id} scheme={scheme} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No matching schemes found directly. Try adjusting your filters.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindAid;
