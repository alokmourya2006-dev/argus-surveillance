import React, { useState } from 'react';
import { LayoutGrid, Camera, AlertTriangle, Cpu } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { id: 'live_matrix', label: 'LIVE MATRIX', icon: LayoutGrid },
    { id: 'cameras', label: 'CAMERAS (4)', icon: Camera },
    { id: 'hotlist', label: 'HOTLIST', icon: AlertTriangle },
    { id: 'specs', label: 'SPECS', icon: Cpu },
  ];

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isHovered ? '170px' : '54px',
        backgroundColor: '#030712',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 6px',
        gap: '8px',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100,
        overflow: 'hidden',
        boxShadow: isHovered ? '4px 0 20px rgba(0, 0, 0, 0.5)' : 'none'
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '4px',
              border: isActive ? '1px solid #0284c7' : '1px solid transparent',
              backgroundColor: isActive ? 'rgba(2, 132, 199, 0.15)' : 'transparent',
              color: isActive ? '#38bdf8' : '#64748b',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            <Icon size={18} color={isActive ? '#38bdf8' : '#64748b'} style={{ flexShrink: 0 }} />
            {isHovered && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}