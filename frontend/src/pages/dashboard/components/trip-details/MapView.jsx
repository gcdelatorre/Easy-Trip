import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// This is the "Magic Fix" component from the guide
function InvalidateSize() {
    const map = useMap();
    useEffect(() => {
        // Wait 100ms for animations to finish, then tell Leaflet to check its size
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
}

export function MapView({ height = "h-full" }) {
    return (
        <div className={`${height} w-full rounded-lg overflow-hidden`}>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                doubleClickZoom={false}
                dragging={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=tksxoHQuElfATvZGYR50'}
                />
                <InvalidateSize />
            </MapContainer>
        </div>
    );
}
