import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LiveMap from './pages/LiveMap';
import Login from './pages/Login';
import EligibilityScanner from './pages/EligibilityScanner';
import Header from './components/Header';
import NGODashboard from './pages/NGODashboard';
import About from './pages/About';
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
                    <Route path="/eligibility" element={<EligibilityScanner />} />
                    <Route path="/map" element={<LiveMap />} />
                    <Route path="/ngo-dashboard" element={<NGODashboard />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            {!isLogin && <SahayaBot />}
            {!isLogin && <Footer />}
        </div>
    )
}

export default App
