import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { schemesDB } from '../data/schemesDB';

const sectors = ["Agriculture", "Healthcare", "Housing", "Education", "MSME/Business", "Social Welfare"];
const professions = ["Farmer", "Daily Wage Worker", "Student", "Unemployed", "Small Business Owner", "Women Entrepreneur", "Artisan"];

const EligibilityScanner = () => {
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');
    const [ocrText, setOcrText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [results, setResults] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsScanning(true);
        setOcrText('');
        
        Tesseract.recognize(
            file,
            'eng',
            { logger: m => {
                if (m.status === 'recognizing text') {
                    setScanProgress(Math.round(m.progress * 100));
                }
            }}
        ).then(({ data: { text } }) => {
            setOcrText(text.toLowerCase());
            setIsScanning(false);
            setScanProgress(0);
        }).catch(err => {
            console.error("OCR Error: ", err);
            setIsScanning(false);
            setScanProgress(0);
        });
    };

    const calculateMatchScore = () => {
        if (!selectedSector || !selectedProfession) {
            alert('Please select a Sector and Profession before calculating.');
            return;
        }

        const calculatedSchemes = schemesDB.map(scheme => {
            let score = 0;

            // 1. Sector Weight: 40%
            if (scheme.sector === selectedSector) {
                score += 40;
            }

            // 2. Profession Weight: 35%
            if (scheme.targetProfessions.includes(selectedProfession)) {
                score += 35;
            }

            // 3. OCR Keyword Weight: 25% (Partial credit: 1 keyword = 10%, 2+ = 25%)
            let matchedKeywords = [];
            if (ocrText.trim() !== '') {
                matchedKeywords = scheme.keywords.filter(kw => ocrText.includes(kw.toLowerCase()));
                if (matchedKeywords.length === 1) {
                    score += 10;
                } else if (matchedKeywords.length >= 2) {
                    score += 25;
                }
            }

            return {
                ...scheme,
                matchPercentage: score,
                matchedKeywords
            };
        });

        // Sort Highest to Lowest
        const sorted = calculatedSchemes.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setResults(sorted);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-all duration-300">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Phase */}
                <div className="text-center pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">Eligibility Engine</h1>
                    <p className="mt-3 text-lg font-medium text-gray-500">Scan documents to accurately match with real Indian Government Welfare Schemes.</p>
                </div>

                {/* Input Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Profession */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Citizen Profession</label>
                        <select 
                            value={selectedProfession} 
                            onChange={(e) => setSelectedProfession(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm"
                        >
                            <option value="">Select Profession</option>
                            {professions.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    {/* Sector */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Target Welfare Sector</label>
                        <select 
                            value={selectedSector} 
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm"
                        >
                            <option value="">Select Sector</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    {/* OCR Uploader */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Scan Document (OCR)</label>
                        <div className="relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        {isScanning && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600 font-medium animate-pulse">
                                <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                                Scanning text... {scanProgress}%
                            </div>
                        )}
                        {!isScanning && ocrText && (
                            <p className="mt-2 text-xs font-semibold text-green-600">✓ Document scanned successfully.</p>
                        )}
                    </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-center">
                    <button 
                        onClick={calculateMatchScore}
                        disabled={isScanning || !selectedSector || !selectedProfession}
                        className="px-8 py-4 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                        Calculate Eligibility
                    </button>
                </div>

                {/* Results UI */}
                {results.length > 0 && (
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight text-center mb-8">Matches Found: {results.length} Schemes</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {results.map((scheme, index) => {
                                const isHighProb = scheme.matchPercentage > 70;
                                const isMedium = scheme.matchPercentage > 30 && scheme.matchPercentage <= 70;

                                // Ignore drawing completely irrelevant 0% blocks for a cleaner UI if you prefer, 
                                // but the prompt implied mapping them all, so we will show all.

                                return (
                                    <div key={scheme.id} className={`bg-white rounded-xl shadow-sm border-l-4 p-6 transition-all hover:shadow-md ${isHighProb ? 'border-green-500' : isMedium ? 'border-yellow-500' : 'border-gray-300'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">{scheme.name}</h3>
                                            <div className={`px-3 py-1 rounded-full text-sm font-black text-white whitespace-nowrap ${isHighProb ? 'bg-green-600' : isMedium ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                                                {scheme.matchPercentage}%
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mb-4">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">{scheme.sector}</span>
                                        </div>

                                        {isHighProb && (
                                            <div className="inline-block px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-lg mb-4">
                                                ★ High Probability Match
                                            </div>
                                        )}

                                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                            {scheme.description}
                                        </p>

                                        {scheme.matchedKeywords.length > 0 && (
                                            <div className="mb-4 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                                <p className="text-xs font-bold text-blue-800 mb-1">OCR Detected Terms:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {scheme.matchedKeywords.map((kw, idx) => (
                                                        <span key={idx} className="bg-white/80 border border-blue-200 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">{kw}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center transition-colors">
                                                Government Portal <span className="ml-1 text-lg leading-none">›</span>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EligibilityScanner;
