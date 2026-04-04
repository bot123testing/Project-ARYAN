import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import FindAid from './pages/FindAid';
import Login from './pages/Login';
import EligibilityScanner from './pages/EligibilityScanner';
import Header from './components/Header';
import Footer from './components/Footer';
import SahayaBot from './components/Chatbot/SahayaBot'; // Added Chatbot

function App() {
    const location = useLocation();
    const isLogin = location.pathname === '/' || location.pathname === '/login';

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            {!isLogin && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/find-aid" element={<FindAid />} />
                    <Route path="/eligibility" element={<EligibilityScanner />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/about" element={<div className="p-10 text-center text-2xl">About ARYAN Network: Building a stronger nation.</div>} />
                </Routes>
            </main>
            {!isLogin && <SahayaBot />}
            {!isLogin && <Footer />}
        </div>
    )
}

export default App
