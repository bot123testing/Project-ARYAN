import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

const BenefitCard = ({ scheme }) => {
    // Basic benefit calculation simulation
    const estimatedBenefit = scheme.financialCap;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-xl text-xs font-bold">
                {scheme.status}
            </div>

            <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-primary transition">{scheme.name}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">{scheme.ministry}</p>

            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{scheme.description}</p>

            <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center mb-4">
                <span className="text-sm text-blue-700 font-medium">Estimated Benefit:</span>
                <span className="text-lg font-bold text-primary">₹{estimatedBenefit.toLocaleString()}</span>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    Apply Now <ExternalLink size={16} />
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    Details
                </button>
            </div>
        </div>
    );
};

export default BenefitCard;
