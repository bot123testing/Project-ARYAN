import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon not found
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons would go here (Blue, Green, Red)

const GeoMap = ({ ngos = [] }) => {
    // Default center (India)
    const position = [20.5937, 78.9629];

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Simulated User Location */}
                <Marker position={[28.6139, 77.2090]}>
                    <Popup>
                        Your Location <br /> New Delhi
                    </Popup>
                </Marker>

                {/* NGO Markers */}
                {ngos.map(ngo => (
                    <Marker key={ngo.id} position={[ngo.location.lat, ngo.location.lng]}>
                        <Popup>
                            <strong>{ngo.name}</strong> <br />
                            {ngo.description} <br />
                            <span className="text-secondary font-bold">{ngo.services[0]?.type}: {ngo.services[0]?.quantity}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default GeoMap;
