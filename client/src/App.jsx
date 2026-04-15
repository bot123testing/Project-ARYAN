import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import LiveMap from './pages/LiveMap';
import Login from './pages/Login';
import EligibilityScanner from './pages/EligibilityScanner';
import Header from './components/Header';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import AidRequestFlow from './pages/AidRequestFlow';
import NGOInventory from './pages/NGOInventory';
import NGOAidRequests from './pages/NGOAidRequests';
import About from './pages/About';
import Footer from './components/Footer';
import SahayaBot from './components/Chatbot/SahayaBot'; // Added Chatbot

// Simplified Admin Route wrapper for secure access
const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) return null; // Or a loading spinner

    if (user && user.role === 'Admin') {
        return children;
    }
    return <Navigate to="/" replace />;
};

function App() {
    const { user } = useAuth();
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            {!isLogin && !isAdmin && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/eligibility" element={<EligibilityScanner />} />
                    <Route path="/map" element={<LiveMap />} />
                    <Route path="/ngo-dashboard" element={<NGODashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/aid-request/:id" element={<AidRequestFlow />} />
                    <Route path="/ngo-inventory" element={<NGOInventory />} />
                    <Route path="/ngo-aid-requests" element={<NGOAidRequests />} />
                    
                    {/* Admin Protected Route */}
                    <Route path="/admin" element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    } />
                </Routes>
            </main>
            {!isLogin && !isAdmin && <SahayaBot />}
            {!isLogin && !isAdmin && <Footer />}
        </div>
    )
}

export default App
