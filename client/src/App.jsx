import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import FindAid from './pages/FindAid';
import Header from './components/Header';
import Footer from './components/Footer';
import SahayaBot from './components/Chatbot/SahayaBot'; // Added Chatbot

function App() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/find-aid" element={<FindAid />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/about" element={<div className="p-10 text-center text-2xl">About ARYAN Network: Building a stronger nation.</div>} />
                </Routes>
            </main>
            <SahayaBot />
            <Footer />
        </div>
    )
}

export default App
