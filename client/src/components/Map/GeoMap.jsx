import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
            <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapUpdater center={center} />

                {/* NGO Markers */}
                {ngos.map(ngo => (
                    <Marker key={ngo.id} position={[ngo.location.lat, ngo.location.lng]}>
                        <Popup>
                            <strong>{ngo.name}</strong> <br />
                            <span className="text-gray-500 text-xs block mb-1">{ngo.locationName}</span>
                            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{ngo.type}</span><br />
                            <p className="my-1 text-sm">{ngo.description}</p>
                            <span className="text-secondary font-bold text-sm">{ngo.services[0]?.type}: {ngo.services[0]?.quantity} Available</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default GeoMap;
