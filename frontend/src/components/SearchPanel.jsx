import React, { useState } from 'react';
import { Search, ShieldAlert, Car, MapPin } from 'lucide-react';

export default function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ padding: '16px', background: '#060d1e', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '0.5px' }}>
        VEHICLE TARGET INTEL & SEARCH
      </div>

      <div style={{ position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Enter Plate No (e.g. UP32AB1234)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px 12px 10px 36px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
        />
        <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
      </div>

      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#38bdf8', fontSize: '12px', fontWeight: 'bold' }}>
          <Car size={16} /> TARGET DETAILS
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><strong style={{ color: '#cbd5e1' }}>Plate:</strong> {searchTerm || "UP32AB1234"}</div>
          <div><strong style={{ color: '#cbd5e1' }}>Vehicle:</strong> HYUNDAI CRETA SX</div>
          <div><strong style={{ color: '#cbd5e1' }}>Color:</strong> PHANTOM BLACK</div>
          <div><strong style={{ color: '#cbd5e1' }}>Status:</strong> <span style={{ color: '#ff0055', fontWeight: 'bold' }}>HOTLIST MATCH</span></div>
        </div>
      </div>

      <div style={{ flex: 1, background: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', padding: '12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}>
          <MapPin size={16} /> RECENT TRAJECTORY HISTORY
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ borderLeft: '2px solid #00f0ff', paddingLeft: '8px' }}>
            <div style={{ color: '#f8fafc', fontWeight: 'bold' }}>Hazratganj Chauraha</div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>Today • 10:15 AM</div>
          </div>
          <div style={{ borderLeft: '2px solid #00f0ff', paddingLeft: '8px' }}>
            <div style={{ color: '#f8fafc', fontWeight: 'bold' }}>Charbagh Station Gate 1</div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>Today • 10:42 AM</div>
          </div>
          <div style={{ borderLeft: '2px solid #ff0055', paddingLeft: '8px' }}>
            <div style={{ color: '#ff0055', fontWeight: 'bold' }}>Gomti Nagar Cyber Tower</div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>Today • 11:30 AM (LIVE)</div>
          </div>
        </div>
      </div>
    </div>
  );
}