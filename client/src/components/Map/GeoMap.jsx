import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Phone, Globe, MessageSquare } from 'lucide-react';

// Color Mapping for Markers
const getIconColor = (type) => {
    if (type.includes('Clinic') || type.includes('Medicine')) return '#ef4444'; // Red
    if (type.includes('Food') || type.includes('Ration')) return '#22c55e'; // Green
    if (type.includes('Fertilizer') || type.includes('Agriculture')) return '#92400e'; // Brown
    if (type.includes('Bank') || type.includes('Loan')) return '#3b82f6'; // Blue
    return '#6b7280'; // Gray default
};

const createCustomIcon = (type) => {
    const color = getIconColor(type);
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    `;
    return L.divIcon({
        html: svgIcon,
        className: "custom-leaflet-icon",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// Helper component to update map's center dynamically
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, map.getZoom(), {
                duration: 1.5,
            });
        }
    }, [center, map]);
    return null;
};

const GeoMap = ({ ngos = [], center = [20.5937, 78.9629] }) => {
    const navigate = useNavigate();

    return (
        <div className="h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative z-0">
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapUpdater center={center} />

                {/* NGO Markers */}
                {ngos.map(ngo => (
                    <Marker 
                        key={ngo.id} 
                        position={[ngo.location.lat, ngo.location.lng]}
                        icon={createCustomIcon(ngo.type)}
                    >
                        <Popup minWidth={250}>
                            <div className="p-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{ngo.name}</h3>
                                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getIconColor(ngo.type) }}></span>
                                    {ngo.type} • {ngo.locationName}
                                </p>
                                <p className="text-sm text-gray-700 mb-3">{ngo.description}</p>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                                        <Phone size={14} /> {ngo.contactPhone || "Contact Not Available"}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                                        <Globe size={14} /> 
                                        <a href={ngo.websiteURL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Visit Website
                                        </a>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate(`/aid-request/${ngo.id}`)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <MessageSquare size={16} />
                                    Request Consultation / Aid
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default GeoMap;
