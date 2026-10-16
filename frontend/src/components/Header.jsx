import React from 'react';
import { Shield, Activity, Database, AlertTriangle, Radio } from 'lucide-react';

export default function Header({ wsStatus, alertCount = 1 }) {
  return (
    <div style={{ height: '52px', backgroundColor: '#030712', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontFamily: 'monospace' }}>
      
      {/* BRAND LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ backgroundColor: '#0284c7', padding: '6px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={18} color="#ffffff" />
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#f8fafc', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ARGUS <span style={{ color: '#38bdf8', fontSize: '13px' }}>// COMMAND CENTER</span>
        </div>
      </div>

      {/* TOP SYSTEM HUD METRICS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '11px', color: '#94a3b8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: '4px', border: '1px solid #1e293b' }}>
          <Activity size={13} color="#10b981" />
          <span>SYS: <strong style={{ color: '#10b981' }}>OK</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: '4px', border: '1px solid #1e293b' }}>
          <Radio size={13} color={wsStatus === 'connected' ? '#10b981' : '#ef4444'} />
          <span>WS: <strong style={{ color: wsStatus === 'connected' ? '#10b981' : '#ef4444', textTransform: 'uppercase' }}>{wsStatus}</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: '4px', border: '1px solid #1e293b' }}>
          <Database size={13} color="#38bdf8" />
          <span>FEEDS: <strong style={{ color: '#f8fafc' }}>4 LIVE</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '4px 12px', borderRadius: '4px', border: '1px solid #ef4444' }}>
          <AlertTriangle size={13} color="#ef4444" />
          <span>HOTLIST: <strong style={{ color: '#ef4444' }}>{alertCount}</strong></span>
        </div>
      </div>

    </div>
  );
}