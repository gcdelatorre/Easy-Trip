import { memo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTravelPlan } from '@/contexts/TravelPlanContext';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export const MapView = memo(function MapView({ height = "h-full", trip, isOpen }) {

    const { currentHighlight, setCurrentHighlight, selectedItinerary, setSelectedItinerary } = useTravelPlan()

    useEffect(() => {
        if (isOpen === false) {
            setCurrentHighlight(null);
            setSelectedItinerary(null);
        }
    }, [isOpen, setCurrentHighlight, setSelectedItinerary]);

    const itineraryMarkers = selectedItinerary?.activities?.map((activity, idx) => {
        return (
            <Marker key={idx} position={[Number(activity?.coords?.lat || 0), Number(activity?.coords?.lng || 0)]}>
                <Popup>
                    Destination {idx + 1} <br /> {activity.name}
                </Popup>
            </Marker>
        )
    })

    const highlightPosition = currentHighlight?.coords
        ? [Number(currentHighlight.coords.lat), Number(currentHighlight.coords.lng)]
        : null;

    const destinationPosition = [Number(trip?.destinationCoords?.lat), Number(trip?.destinationCoords?.lng)]

    return (
        <div className={`${height} w-full rounded-lg overflow-hidden`}>
            <MapContainer
                center={highlightPosition || destinationPosition}
                zoom={currentHighlight ? 17 : 13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                doubleClickZoom={false}
                dragging={true}
            >

                {selectedItinerary && itineraryMarkers}

                {currentHighlight && (
                    <Marker position={highlightPosition}>
                        <Popup>
                            {currentHighlight?.name}
                        </Popup>
                    </Marker>
                )}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=tksxoHQuElfATvZGYR50'}
                />
            </MapContainer>
        </div>
    );
});
