import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useTravelPlan } from '@/contexts/TravelPlanContext';

export function MapView({ height = "h-full", trip }) {

    const { currentHighlight } = useTravelPlan()

    const highlightPosition = currentHighlight?.coords
        ? [Number(currentHighlight.coords.lat), Number(currentHighlight.coords.lng)]
        : null;

    const destinationPosition = [Number(trip?.destinationCoords?.lat), Number(trip?.destinationCoords?.lng)]

    return (
        <div className={`${height} w-full rounded-lg overflow-hidden`}>
            <MapContainer
                center={highlightPosition || destinationPosition}
                zoom={currentHighlight ? 17 :13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                doubleClickZoom={false}
                dragging={true}
            >
                {highlightPosition && (
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
}
