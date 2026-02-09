import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, FileText, CheckCircle, Loader } from 'lucide-react';

const DocumentScanner = ({ onScanComplete }) => {
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setScanning(true);
        setProgress(0);

        try {
            const result = await Tesseract.recognize(
                file,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(parseInt(m.progress * 100));
                        }
                    }
                }
            );

            // Simple simulated extraction logic
            const text = result.data.text.toLowerCase();
            let estimatedIncome = 0;

            // Heuristic to find numbers
            const numbers = text.match(/\d+/g);
            if (numbers) {
                // Assume the largest number found is income/amount for demo purposes
                estimatedIncome = Math.max(...numbers.map(Number));
            }

            console.log("Extracted Text:", text);
            onScanComplete({
                rawText: text,
                estimatedIncome: estimatedIncome > 0 ? estimatedIncome : 120000 // Fallback
            });

        } catch (err) {
            console.error(err);
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="mb-4 flex justify-center text-primary">
                {scanning ? <Loader className="animate-spin" size={48} /> : <Camera size={48} />}
            </div>
            <h3 className="text-lg font-bold mb-2">Auto-Fill via Certificate</h3>
            <p className="text-sm text-gray-500 mb-4">Upload your Income/Caste Certificate to auto-fill the form using OCR.</p>

            <label className="inline-block bg-primary text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                {scanning ? `Scanning... ${progress}%` : "Upload Document"}
            </label>
        </div>
    );
};

export default DocumentScanner;
