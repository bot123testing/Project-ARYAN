import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { schemesDB } from '../data/schemesDB';
import { Activity } from 'lucide-react';

const sectors = ["Agriculture", "Healthcare", "Housing", "Education", "MSME/Business", "Social Welfare"];
const professions = ["Farmer", "Daily Wage Worker", "Student", "Unemployed", "Small Business Owner", "Women Entrepreneur", "Artisan"];

// New dummy data
const incomes = ["Below ₹1 Lakh", "₹1L - ₹2.5L", "Above ₹2.5L"];
const genders = ["Male", "Female", "Other"];
const categories = ["General", "OBC", "SC", "ST"];
const dummyStates = ["Maharashtra", "UP", "Karnataka", "Tamil Nadu"];

const EligibilityScanner = () => {
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');
    const [ocrText, setOcrText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [results, setResults] = useState([]);
    const [extractedDetails, setExtractedDetails] = useState({ aadhaar: '', dob: '', name: '' });

    // Missing state variables for form
    const [income, setIncome] = useState('');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsScanning(true);
        setOcrText('');
        setExtractedDetails({ aadhaar: '', dob: '', name: '' });
        
        Tesseract.recognize(
            file,
            'eng',
            { logger: m => {
                if (m.status === 'recognizing text') {
                    setScanProgress(Math.round(m.progress * 100));
                }
            }}
        ).then(({ data: { text } }) => {
            try {
                const rawText = text;
                setOcrText(rawText.toLowerCase());

                // --- Task 5: Smart Regex Extraction ---
                const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
                const dobRegex = /\b\d{2}[\/-]\d{2}[\/-]\d{4}\b/;
                const nameRegex = /([A-Z]{3,}\s[A-Z]{3,}(\s[A-Z]{3,})?)/; // Simple heuristic for Names in caps

                const aadhaarMatch = rawText.match(aadhaarRegex);
                const dobMatch = rawText.match(dobRegex);
                const nameMatch = rawText.match(nameRegex);

                setExtractedDetails({
                    aadhaar: aadhaarMatch ? aadhaarMatch[0] : 'Not Found',
                    dob: dobMatch ? dobMatch[0] : 'Not Found',
                    name: nameMatch ? nameMatch[0] : 'Not Found'
                });
            } catch (innerError) {
                console.error("Extraction error:", innerError);
            } finally {
                setIsScanning(false);
                setScanProgress(0);
            }
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

        const sorted = calculatedSchemes.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setResults(sorted);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-all duration-300">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header Phase */}
                <div className="text-center pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">Eligibility Engine</h1>
                    <p className="mt-3 text-lg font-medium text-gray-500">Scan documents & provide demographic details to accurately match with real Indian Government Welfare Schemes.</p>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left Column - Form Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-black">1</div>
                                Personal Details
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Provide your basic demographic information.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Form fields same as before... */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Citizen Profession</label>
                                <select value={selectedProfession} onChange={(e) => setSelectedProfession(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm">
                                    <option value="">Select Profession</option>
                                    {professions.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Target Welfare Sector</label>
                                <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm">
                                    <option value="">Select Sector</option>
                                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Annual Family Income</label>
                                <select value={income} onChange={(e) => setIncome(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm">
                                    <option value="">Select Income Bracket</option>
                                    {incomes.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm">
                                    <option value="">Select Gender</option>
                                    {genders.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Social Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm">
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">State</label>
                                <select value={state} onChange={(e) => setState(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-gray-50 text-sm">
                                    <option value="">Select State</option>
                                    {dummyStates.map(st => <option key={st} value={st}>{st}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - OCR Card & Extracted Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 flex flex-col">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-black">2</div>
                                    Smart Document Scan
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Upload Aadhar or ID for auto-verification.</p>
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors relative min-h-[150px]">
                                <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="text-center pointer-events-none">
                                    <span className="block text-sm font-semibold text-blue-600 bg-blue-50 py-2 border border-blue-100 px-4 rounded-lg inline-block">Upload Document</span>
                                </div>
                            </div>

                            {isScanning && (
                                <div className="text-sm text-blue-600 font-medium animate-pulse text-center">Processing... {scanProgress}%</div>
                            )}
                        </div>

                        {/* NEW: Extracted Details Panel */}
                        {(extractedDetails.aadhaar || extractedDetails.dob || extractedDetails.name) && (
                            <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-xl border-l-8 border-blue-400 anim-fade-in">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Activity size={20} className="text-blue-300" />
                                    Live Extraction Results
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <p className="text-[10px] uppercase font-black text-blue-300">Aadhaar Identified</p>
                                        <p className="text-lg font-mono tracking-widest">{extractedDetails.aadhaar || 'Scanning...'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/10 p-3 rounded-lg">
                                            <p className="text-[10px] uppercase font-black text-blue-300">DOB</p>
                                            <p className="font-bold">{extractedDetails.dob || 'Scanning...'}</p>
                                        </div>
                                        <div className="bg-white/10 p-3 rounded-lg">
                                            <p className="text-[10px] uppercase font-black text-blue-300">Name</p>
                                            <p className="font-bold truncate">{extractedDetails.name || 'Scanning...'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                    <button onClick={calculateMatchScore} disabled={isScanning || !selectedSector || !selectedProfession} className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-xl font-bold rounded-xl shadow-lg transition-all active:scale-[0.99] flex justify-center items-center">
                        {isScanning ? "Matching..." : "Calculate Eligibility"}
                    </button>
                </div>

                {/* Results UI */}
                {results.length > 0 && (
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Matches Found: {results.length} Schemes</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {results.map((scheme) => (
                                <div key={scheme.id} className="bg-white rounded-xl shadow-sm border-l-4 p-6 transition-all hover:shadow-md border-green-500">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">{scheme.name}</h3>
                                        <div className="px-3 py-1 rounded-full text-sm font-black text-white bg-green-600">
                                            {scheme.matchPercentage}%
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded uppercase mb-2 inline-block">{scheme.sector}</span>
                                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">{scheme.description}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <a 
                                            href={scheme.officialLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-md"
                                        >
                                            Visit Official Gov Portal to Apply
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EligibilityScanner;
