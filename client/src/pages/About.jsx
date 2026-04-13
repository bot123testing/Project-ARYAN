import React from 'react';
import { Quote } from 'lucide-react';

const About = () => {
    const impactStories = [
        {
            name: "Ramesh Kumar",
            location: "Udaipur, Rajasthan",
            story: "I didn't know I was eligible for the agricultural loan subsidy until I scanned my income certificate on Project ARYAN. The Live Map helped me find the exact co-op bank branch that finalized my application within a week.",
            role: "Local Farmer"
        },
        {
            name: "Lata Devi",
            location: "Pune, Maharashtra",
            story: "During the flood emergency, my family was desperate for rations. Using the portal, my son located a verified NGO camp just 3 kilometers away distributing food packets. This platform is a lifesaver.",
            role: "Citizen"
        },
        {
            name: "Dr. Vikram Singh",
            location: "Smile Health Clinic, Mumbai",
            story: "As a clinic operator, Project ARYAN's dashboard provides us with real-time analytics. We noticed a surge in medicine searches across our pin code and immediately scaled our supply camp, reaching 200+ families effortlessly.",
            role: "NGO Partner"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Hero */}
            <div className="bg-blue-700 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 opacity-90"></div>
                <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">About Project ARYAN</h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        A unified tech-driven initiative designed to transparently bridge the gap between welfare funds, NGOs, and the citizens who need them the most.
                    </p>
                </div>
            </div>

            {/* Why I Built This */}
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <div className="bg-white p-10 md:p-14 rounded-3xl shadow-lg border border-gray-100 mb-16 transform -translate-y-16 relative z-20">
                    <h2 className="text-3xl font-bold text-dark mb-6 flex items-center gap-3">
                        <span className="bg-blue-100 text-primary p-2 rounded-lg">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path></svg>
                        </span>
                        Why I Built This
                    </h2>
                    <div className="prose prose-lg text-gray-600 leading-relaxed">
                        <p>
                            Project ARYAN was born out of a critical observation: despite the allocating of substantial government welfare funds and the tireless efforts of numerous NGOs, there is a persistent and tragic disconnect when it comes to the final delivery to citizens. I frequently noticed that the most vulnerable populations—particularly the digitally illiterate or those residing in remote areas—were completely unaware of the subsidies, schemes, and emergency relief available to them.
                        </p>
                        <p className="mt-4">
                            The bureaucratic hurdles to identify eligibility, paired with the chaotic dispersal of aid locations during crises, often left people frustrated and unsupported. I wanted to build a solution that removes these barriers entirely. By leveraging modern technologies like Optical Character Recognition (OCR) for automated documentation scanning, and an interactive, real-time Live Map, Project ARYAN transforms a complex labyrinth of paperwork into an accessible, dignified, and instant experience for every citizen.
                        </p>
                    </div>
                </div>

                {/* Impact Stories */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-dark">Impact Stories</h2>
                        <p className="text-gray-500 mt-2">Real changes brought to the communities we serve.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {impactStories.map((story, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                                <div>
                                    <Quote className="text-blue-200 mb-4" size={32} />
                                    <p className="text-gray-600 italic mb-6 leading-relaxed text-sm">
                                        "{story.story}"
                                    </p>
                                </div>
                                <div className="border-t pt-4">
                                    <h4 className="font-bold text-dark">{story.name}</h4>
                                    <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{story.role}</p>
                                    <p className="text-xs text-gray-400">{story.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
