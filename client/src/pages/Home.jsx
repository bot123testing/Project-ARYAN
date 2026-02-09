import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Hero />
                {/* Feature Overview Section would go here */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-dark mb-4">How It Works</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto mb-16">Simple steps to access the help you need.</p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "1. Check Eligibility", desc: "Enter basic details or upload a document." },
                                { title: "2. Get Matched", desc: "Our AI finds the best Govt schemes for you." },
                                { title: "3. Locate Help", desc: "Find nearby NGOs for immediate support." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                                    <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
