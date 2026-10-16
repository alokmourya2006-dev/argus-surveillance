import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CameraWall from './components/CameraWall';
import MapView from './components/MapView';
import DossierForm from './components/DossierForm';
import DossierTable from './components/DossierTable';

const initialCameras = [
  { id: 'cam_1', name: 'Hazratganj Sec-A', lat: 26.8467, lng: 80.9462 },
  { id: 'cam_2', name: 'Charbagh Station', lat: 26.8322, lng: 80.9231 },
  { id: 'cam_3', name: 'Alambagh Terminal', lat: 26.8145, lng: 80.9012 },
  { id: 'cam_4', name: 'Gomti Nagar Cyber', lat: 26.8520, lng: 80.9980 }
];

export default function App() {
  const [alerts, setAlerts] = useState([]);
  const [wsStatus, setWsStatus] = useState('connecting');
  const [activeTab, setActiveTab] = useState('live_matrix');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch('http://localhost:8000/alerts');
        if (res.ok) {
          const data = await res.json();
          setAlerts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Initial alerts fetch error:", err);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket('ws://localhost:8000/ws/alerts');
      ws.onopen = () => setWsStatus('connected');
      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && payload.type === 'HOTLIST_ALERT') {
            setAlerts((prev) => [payload.data, ...prev]);
          }
        } catch (err) {
          console.error("WS Parse error:", err);
        }
      };
      ws.onerror = () => setWsStatus('error');
      ws.onclose = () => setWsStatus('disconnected');
    } catch (err) {
      console.error("WebSocket init error:", err);
      setWsStatus('error');
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#020612', color: '#f8fafc', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: 0, padding: 0 }}>
      
      {/* 1. TOP HEADER HUD */}
      <Header wsStatus={wsStatus} alertCount={alerts.length || 1} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', width: '100%' }}>
        
        {/* 2. SIDEBAR */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 3. CENTER DYNAMIC AREA */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {activeTab === 'live_matrix' && (
            <>
              <div style={{ padding: '8px 12px', backgroundColor: '#030712', borderBottom: '1px solid #1e293b', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {initialCameras.map((cam, idx) => (
                    <div key={cam.id} style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '4px', padding: '6px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#f8fafc', fontFamily: 'monospace' }}>
                          CAM-0{idx + 1}
                        </span>
                        <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold' }}>● ONLINE</span>
                      </div>
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>{cam.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden', width: '100%', height: '100%' }}>
                <MapView cameras={initialCameras} />
              </div>
            </>
          )}

          {activeTab === 'cameras' && (
            <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
              <CameraWall cameras={initialCameras} />
            </div>
          )}

          {activeTab === 'hotlist' && (
            <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#020612', width: '100%' }}>
              <DossierForm />
              <DossierTable />
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{ flex: 1, padding: '20px', color: '#38bdf8', fontFamily: 'monospace' }}>
              <h3>ARGUS INTELLIGENCE ENGINE SPECS</h3>
              <p style={{ color: '#94a3b8', fontSize: '12px' }}>AI Model: ANPR Edge Detection v2.4 • WebSocket Live Stream Active</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}