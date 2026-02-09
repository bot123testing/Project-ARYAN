import React from 'react';
import { ArrowRight, MapPin, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-white pt-10 pb-20 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100 rounded-bl-[50%] opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        <span className="flex h-2 w-2 rounded-full bg-primary relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        </span>
                        ARYAN Network Live
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-dark">
                        Bridging the Gap Between <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Policy & People</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg">
                        An intelligent ecosystem connecting citizens to Government Welfare Schemes and Immediate NGO Relief.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to="/find-aid" className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-xl shadow-blue-200">
                            Check Eligibility <ArrowRight size={20} />
                        </Link>
                        <Link to="/map" className="flex items-center justify-center gap-2 bg-white text-dark border border-gray-200 px-8 py-3.5 rounded-full text-lg font-semibold hover:border-primary hover:text-primary transition">
                            <MapPin size={20} /> Find Help Nearby
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                        <div>
                            <h3 className="text-3xl font-bold text-dark">340+</h3>
                            <p className="text-sm text-gray-500">Active Schemes</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-dark">50+</h3>
                            <p className="text-sm text-gray-500">Verified NGOs</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-dark">24/7</h3>
                            <p className="text-sm text-gray-500">AI Support</p>
                        </div>
                    </div>
                </div>

                {/* Hero Visual/Map Preview Placeholder */}
                <div className="relative">
                    <div className="bg-white p-2 rounded-2xl shadow-2xl skew-y-1 transform hover:skew-y-0 transition duration-500">
                        {/* Abstract Map UI Representation */}
                        <div className="bg-gray-100 rounded-xl h-96 w-full flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-slate-200 opacity-30"></div>
                            {/* Animated Markers */}
                            <div className="absolute top-1/4 left-1/4 bg-red-500 h-4 w-4 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                            <div className="absolute bottom-1/3 right-1/3 bg-green-500 h-4 w-4 rounded-full border-2 border-white shadow-lg animate-bounce delay-100"></div>
                            <div className="absolute top-1/2 left-2/3 bg-blue-500 h-4 w-4 rounded-full border-2 border-white shadow-lg animate-bounce delay-200"></div>

                            <div className="text-center z-10 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white">
                                <Search size={48} className="mx-auto text-primary mb-2 opacity-80" />
                                <h4 className="font-bold text-lg">Smart Discovery Engine</h4>
                                <p className="text-sm text-gray-500">Scanning for resources...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
