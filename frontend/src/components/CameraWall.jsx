import React, { useState } from 'react';
import { Camera, Radio, X, Maximize2 } from 'lucide-react';

export default function CameraWall({ cameras }) {
  const [zoomedCam, setZoomedCam] = useState(null);

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#020612', flex: 1, overflowY: 'auto' }}>
      
      {/* SECTION HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '13px', fontWeight: 'bold' }}>
          <Camera size={16} /> ANPR EDGE CAMERA FEED MATRIX (4 LIVE STREAM FEEDS)
        </div>
        <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>
          ALL NODES ACTIVE ●
        </div>
      </div>

      {/* 4 LARGE VIDEO STREAM FEED CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {cameras && cameras.map((cam, idx) => {
          const isStandby = idx === 2; // CAM-03 Standby
          return (
            <div 
              key={cam.id || idx} 
              onClick={() => setZoomedCam({ ...cam, index: idx + 1, isStandby })}
              style={{ 
                backgroundColor: '#060d1e', 
                border: '1px solid #1e293b', 
                borderRadius: '6px', 
                padding: '12px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px', 
                position: 'relative',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00f0ff';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              
              {/* FEED TOP BAR */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'monospace' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f8fafc' }}>
                  CAM-0{idx + 1} <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 'normal' }}>// {cam.name}</span>
                </span>
                <span style={{ fontSize: '10px', backgroundColor: isStandby ? 'rgba(234, 179, 8, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: isStandby ? '#eab308' : '#10b981', border: isStandby ? '1px solid #eab308' : '1px solid #10b981', padding: '2px 8px', borderRadius: '3px', fontWeight: 'bold' }}>
                  {isStandby ? '● STANDBY' : '● ONLINE'}
                </span>
              </div>

              {/* VIDEO STREAM CONTAINER */}
              <div style={{ height: '170px', backgroundColor: '#020612', borderRadius: '4px', border: '1px solid #13284c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                
                <Radio size={28} color={isStandby ? '#eab308' : '#0284c7'} style={{ opacity: 0.6 }} />

                <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '9px', color: '#38bdf8', fontFamily: 'monospace', backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '2px 6px', borderRadius: '2px' }}>
                  GPS: {cam.lat}, {cam.lng}
                </div>

                <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '9px', color: isStandby ? '#eab308' : '#ef4444', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {isStandby ? 'IDLE' : 'REC ●'}
                </div>
              </div>

              {/* FEED FOOTER SPECS */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                <span>FRAME RATE: <strong style={{ color: '#cbd5e1' }}>30 FPS</strong></span>
                <span>RESOLUTION: <strong style={{ color: '#cbd5e1' }}>1080P HD</strong></span>
              </div>

            </div>
          );
        })}
      </div>

      {/* 100% FULLSCREEN EXPANDED CAMERA VIEW */}
      {zoomedCam && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#020612', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '16px', boxSizing: 'border-box' }}
        >
          {/* FULLSCREEN HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #13284c', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '1px' }}>
                CAM-0{zoomedCam.index} FULLSCREEN LIVE MONITOR // {zoomedCam.name}
              </div>
              <span style={{ fontSize: '11px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '3px', fontWeight: 'bold' }}>
                LIVE EDGE FEED ACTIVE
              </span>
            </div>
            
            <button 
              onClick={() => setZoomedCam(null)}
              style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '12px' }}
            >
              <X size={18} /> CLOSE FULLSCREEN
            </button>
          </div>

          {/* 100% FULL-HEIGHT STREAM DISPLAY AREA */}
          <div style={{ flex: 1, backgroundColor: '#01030a', borderRadius: '6px', border: '1px solid #00f0ff', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)' }}>
            
            <Radio size={72} color="#00f0ff" style={{ animation: 'pulse 2s infinite' }} />
            
            <div style={{ fontSize: '14px', color: '#38bdf8', fontFamily: 'monospace', marginTop: '16px', fontWeight: 'bold', letterSpacing: '1px' }}>
              ANPR REAL-TIME HIGH-DEFINITION VIDEO FEED • 1080P @ 60 FPS
            </div>

            {/* FLOATING HUD OVERLAYS */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '12px', color: '#00f0ff', fontFamily: 'monospace', backgroundColor: 'rgba(6, 15, 36, 0.9)', border: '1px solid #00f0ff', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>
              GPS COORDINATES: {zoomedCam.lat}, {zoomedCam.lng}
            </div>

            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', color: '#ef4444', fontWeight: 'bold', fontFamily: 'monospace', backgroundColor: 'rgba(6, 15, 36, 0.9)', border: '1px solid #ef4444', padding: '6px 12px', borderRadius: '4px' }}>
              REC STREAMING ●
            </div>

            <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
              ARGUS EDGE AI ENGINE v2.4 • OPTICAL CHARACTER RECOGNITION ACTIVE
            </div>
          </div>
        </div>
      )}

    </div>
  );
}