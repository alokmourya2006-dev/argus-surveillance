import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, ZoomControl, useMap } from 'react-leaflet';
import { Layers, Compass } from 'lucide-react';
import L from 'leaflet';

// 1. DYNAMIC KEYFRAME ANIMATION FOR PURE BLINKING ARROW
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes arrowBlinkPulse {
      0% { opacity: 1; transform: scale(1) rotate(45deg); filter: drop-shadow(0 0 4px #ff0055); }
      50% { opacity: 0.15; transform: scale(1.35) rotate(45deg); filter: drop-shadow(0 0 16px #ff0055); }
      100% { opacity: 1; transform: scale(1) rotate(45deg); filter: drop-shadow(0 0 4px #ff0055); }
    }
    .clean-blinking-arrow {
      animation: arrowBlinkPulse 0.75s infinite ease-in-out !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

// PURE RED ARROW MARKER
const redLiveArrowIcon = L.divIcon({
  className: 'clean-blinking-arrow',
  html: `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="#ff0055" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
    </svg>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const cameraIcon = L.divIcon({
  className: 'custom-icon',
  html: `<div style="background-color: #00f0ff; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #030712; box-shadow: 0 0 12px #00f0ff;"></div>`
});

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timeout = setTimeout(() => { map.invalidateSize(); }, 300);
    return () => clearTimeout(timeout);
  }, [map]);
  return null;
}

export default function MapView({ cameras }) {
  const [roadRouteGeometry, setRoadRouteGeometry] = useState([]);
  const [waypointNodes, setWaypointNodes] = useState([]);

  // FETCH EXACT STREET GEOMETRY (DYNAMIC OSRM ROUTING)
  useEffect(() => {
    const fetchStreetRoute = async () => {
      // Inner Lucknow City Waypoints: Hazratganj ➔ Charbagh ➔ Alambagh ➔ Gomti Nagar
      const waypoints = "80.9462,26.8467;80.9231,26.8322;80.9012,26.8145;80.9980,26.8520";
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(pt => [pt[1], pt[0]]);
          setRoadRouteGeometry(coords);

          if (coords.length > 10) {
            const step = Math.floor(coords.length / 4);
            const nodes = [
              { pos: coords[0], color: '#f8fafc', label: 'ORIGIN: Hazratganj (Start)', stage: 'Light Gray' },
              { pos: coords[step], color: '#cbd5e1', label: 'Checkpoint 1: Charbagh', stage: 'Mid Gray' },
              { pos: coords[step * 2], color: '#64748b', label: 'Checkpoint 2: Alambagh', stage: 'Dark Gray' },
              { pos: coords[step * 3], color: '#334155', label: 'Checkpoint 3: Cantt', stage: 'Deep Gray' },
              { pos: coords[coords.length - 1], color: '#ff0055', label: 'CURRENT LIVE TARGET', stage: 'Live Red' }
            ];
            setWaypointNodes(nodes);
          }
        }
      } catch (err) {
        console.error("OSRM Route Fetch Error:", err);
      }
    };

    fetchStreetRoute();
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <div style={{ flex: 1, backgroundColor: '#060f24', borderRadius: '6px', border: '1px solid #13284c', overflow: 'hidden', position: 'relative' }}>
        
        <MapContainer 
          center={[26.8380, 80.9450]} 
          zoom={12} 
          zoomControl={false} 
          style={{ height: '100%', width: '100%', background: '#020612' }}
        >
          <MapResizer />
          
          {/* HIGH-RESOLUTION SATELLITE TILE LAYER */}
          <TileLayer 
            attribution='&copy; Esri World Imagery' 
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
          />

          {/* STREET LABELS OVERLAY */}
          <TileLayer 
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" 
          />

          <ZoomControl position="bottomright" />

          {/* DYNAMIC BY-ROAD BOLD BLUE ROUTE */}
          {roadRouteGeometry.length > 0 && (
            <>
              <Polyline positions={roadRouteGeometry} color="#1d4ed8" weight={10} opacity={0.35} />
              <Polyline positions={roadRouteGeometry} color="#2563eb" weight={6} opacity={0.95} />
            </>
          )}

          {/* GRADIENT WAYPOINT CIRCLES */}
          {waypointNodes.slice(0, -1).map((node, idx) => (
            <CircleMarker 
              key={idx} 
              center={node.pos} 
              radius={7} 
              pathOptions={{ fillColor: node.color, color: '#00f0ff', weight: 1.5, fillOpacity: 0.95 }}
            >
              <Popup uncloseable={false}>
                <div style={{ fontSize: '10px', color: '#0f172a', fontWeight: 'bold' }}>
                  {node.label}<br />
                  <span style={{ color: '#64748b' }}>Stage: {node.stage}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* TARGET LIVE POSITION - BLINKING RED ARROW (EXACT ROUTE ENDPOINT) */}
          {waypointNodes.length > 0 && (
            <Marker position={waypointNodes[waypointNodes.length - 1].pos} icon={redLiveArrowIcon}>
              <Popup uncloseable={false}>
                <div style={{ color: '#ff0055', fontSize: '11px', fontWeight: 'bold' }}>
                  TARGET LIVE POSITION<br />
                  <span style={{ color: '#0f172a', fontSize: '10px' }}>Gomti Nagar Cyber Tower</span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* ANPR CAMERAS */}
          {cameras && cameras.map((cam) => (
            <Marker key={cam.id} position={[cam.lat, cam.lng]} icon={cameraIcon}>
              <Popup uncloseable={false}>
                <div style={{ color: '#0f172a', fontSize: '11px', fontWeight: 'bold' }}>
                  {cam.name}<br />
                  <span style={{ color: '#0284c7', fontSize: '10px' }}>GPS: {cam.lat}, {cam.lng}</span>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
        
        {/* HUD OVERLAYS */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(2, 6, 18, 0.90)', border: '1px solid #00f0ff', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', color: '#00f0ff', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1000, fontWeight: 'bold' }}>
          <Layers size={14} /> DYNAMIC GRADIENT TARGET TRAIL
        </div>

        <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(2, 6, 18, 0.95)', border: '1px solid #2563eb', padding: '8px 14px', borderRadius: '4px', fontSize: '11px', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1000, fontWeight: 'bold' }}>
          <Compass size={14} color="#ff0055" /> DYNAMIC STREET NAVIGATION (REAL GPS ROUTE)
        </div>

      </div>
    </div>
  );
}