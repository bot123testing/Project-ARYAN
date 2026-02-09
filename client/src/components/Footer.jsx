import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">A</span> ARYAN Network
                        </h2>
                        <p className="text-gray-400 max-w-sm">
                            Empowering citizens with a unified platform for government welfare and immediate NGO assistance. Bridging the gap, one click at a time.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition">Find Aid</a></li>
                            <li><a href="#" className="hover:text-primary transition">NGO Directory</a></li>
                            <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Help Line: 1800-123-4567</li>
                            <li>Email: support@aryanaid.org</li>
                            <li>Delhi, India</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    © 2025 ARYAN Inc. All rights reserved. | Built for Advanced Agentic Coding.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
