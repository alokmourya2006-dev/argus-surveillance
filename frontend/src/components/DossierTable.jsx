import React, { useState } from 'react';
import { Database, AlertTriangle, FileText, Download, CheckCircle, Eye, X } from 'lucide-react';

export default function DossierTable() {
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      plate: 'UP32AB1234',
      firNo: 'FIR-2026/892',
      reason: 'Stolen Hyundai Creta (Armed Robbery)',
      station: 'Hazratganj Kotwali, Lucknow',
      ioName: 'SI R.K. Singh',
      ioContact: '+91 94150 11223',
      registeredAt: 'Fri, 16 Oct 2026 • 11:45 AM',
      status: 'ACTIVE HOTLIST',
      firDoc: 'FIR_892_Hazratganj.pdf'
    },
    {
      id: 2,
      plate: 'UP32XY9876',
      firNo: 'FIR-2026/410',
      reason: 'Hit & Run Fatality Suspect',
      station: 'Naka Hindola Thana, Lucknow',
      ioName: 'Inspector V.K. Sharma',
      ioContact: '+91 94150 99887',
      registeredAt: 'Thu, 15 Oct 2026 • 09:15 PM',
      status: 'ACTIVE HOTLIST',
      firDoc: 'FIR_410_Naka.pdf'
    },
    {
      id: 3,
      plate: 'UP32CK5555',
      firNo: 'FIR-2026/102',
      reason: 'Seized Vehicle / Case Closed',
      station: 'Gomti Nagar Thana, Lucknow',
      ioName: 'SI Amit Verma',
      ioContact: '+91 94150 33445',
      registeredAt: 'Wed, 14 Oct 2026 • 04:30 PM',
      status: 'SEIZED / CLOSED',
      firDoc: 'FIR_102_Gomti.pdf'
    }
  ]);

  const [previewDoc, setPreviewDoc] = useState(null);

  // STATUS TOGGLE (ACTIVE HOTLIST <-> SEIZED / CASE CLOSED)
  const toggleStatus = (id) => {
    setWatchlist(watchlist.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'ACTIVE HOTLIST' ? 'SEIZED / CLOSED' : 'ACTIVE HOTLIST';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  // PDF DOSSIER DOWNLOAD SIMULATION
  const downloadDossier = (row) => {
    alert(`Generating Single-Page Official Audit Dossier PDF for ${row.plate} (${row.firNo})...\nDownloading Court Evidence Sheet...`);
  };

  return (
    <div style={{ backgroundColor: '#060d1e', border: '1px solid #1e293b', borderRadius: '6px', padding: '16px', fontFamily: 'monospace', flex: 1, overflowY: 'auto' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '13px', fontWeight: 'bold' }}>
          <Database size={16} /> ACTIVE CRITICAL TARGET WATCHLIST & EVIDENCE DOSSIER TABLE
        </div>
        <div style={{ fontSize: '11px', color: '#ff0055', fontWeight: 'bold' }}>
          {watchlist.filter(w => w.status === 'ACTIVE HOTLIST').length} ACTIVE TARGET ALERTS LOADED
        </div>
      </div>

      {/* WATCHLIST TABLE */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#020612', color: '#64748b', borderBottom: '1px solid #1e293b' }}>
            <th style={{ padding: '10px' }}>#</th>
            <th style={{ padding: '10px' }}>TARGET PLATE</th>
            <th style={{ padding: '10px' }}>FIR / CASE NO.</th>
            <th style={{ padding: '10px' }}>JURISDICTION & IO</th>
            <th style={{ padding: '10px' }}>ENTRY TIMESTAMP</th>
            <th style={{ padding: '10px' }}>STATUS TOGGLE</th>
            <th style={{ padding: '10px' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((row, idx) => {
            const isActive = row.status === 'ACTIVE HOTLIST';
            return (
              <tr key={row.id} style={{ borderBottom: '1px solid #0f172a', backgroundColor: idx % 2 === 0 ? '#060d1e' : '#091024' }}>
                <td style={{ padding: '10px', color: '#64748b' }}>{idx + 1}</td>
                <td style={{ padding: '10px' }}>
                  <div style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}>{row.plate}</div>
                  <div style={{ fontSize: '9px', color: '#38bdf8' }}>{row.reason}</div>
                </td>
                <td style={{ padding: '10px', color: '#e2e8f0', fontWeight: 'bold' }}>{row.firNo}</td>
                <td style={{ padding: '10px' }}>
                  <div style={{ color: '#cbd5e1' }}>{row.station}</div>
                  <div style={{ fontSize: '9px', color: '#94a3b8' }}>IO: {row.ioName} ({row.ioContact})</div>
                </td>
                <td style={{ padding: '10px', color: '#64748b', fontSize: '10px' }}>{row.registeredAt}</td>
                
                {/* STATUS TOGGLE BUTTON */}
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => toggleStatus(row.id)}
                    style={{ 
                      backgroundColor: isActive ? 'rgba(255, 0, 85, 0.15)' : 'rgba(16, 185, 129, 0.15)', 
                      color: isActive ? '#ff0055' : '#10b981', 
                      border: isActive ? '1px solid #ff0055' : '1px solid #10b981', 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '10px', 
                      fontWeight: 'bold', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isActive ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                    {row.status}
                  </button>
                </td>

                {/* ACTIONS: PREVIEW FIR & EXPORT PDF */}
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setPreviewDoc(row)}
                      style={{ backgroundColor: '#0f172a', border: '1px solid #38bdf8', color: '#38bdf8', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}
                      title="View FIR Scanned Copy"
                    >
                      <Eye size={12} /> FIR
                    </button>

                    <button 
                      onClick={() => downloadDossier(row)}
                      style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', color: '#10b981', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}
                      title="Export Court Evidence PDF Dossier"
                    >
                      <Download size={12} /> PDF
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* FIR DOCUMENT PREVIEW MODAL */}
      {previewDoc && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 6, 18, 0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '550px', backgroundColor: '#060d1e', border: '1px solid #00f0ff', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', pb: '10px' }}>
              <div style={{ color: '#00f0ff', fontWeight: 'bold', fontSize: '13px' }}>
                OFFICIAL FIR DOCUMENT EVIDENCE PREVIEW
              </div>
              <button onClick={() => setPreviewDoc(null)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ backgroundColor: '#020612', border: '1px dashed #1e293b', padding: '20px', borderRadius: '4px', color: '#cbd5e1', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong style={{ color: '#00f0ff' }}>FIR No:</strong> {previewDoc.firNo}</div>
              <div><strong style={{ color: '#00f0ff' }}>Target Vehicle:</strong> {previewDoc.plate}</div>
              <div><strong style={{ color: '#00f0ff' }}>Police Station:</strong> {previewDoc.station}</div>
              <div><strong style={{ color: '#00f0ff' }}>Investigation Officer:</strong> {previewDoc.ioName} ({previewDoc.ioContact})</div>
              <div><strong style={{ color: '#00f0ff' }}>Crime Offence:</strong> {previewDoc.reason}</div>
              <div><strong style={{ color: '#00f0ff' }}>Timestamp:</strong> {previewDoc.registeredAt}</div>
              <div style={{ marginTop: '12px', borderTop: '1px dashed #1e293b', paddingTop: '10px', color: '#10b981', fontStyle: 'italic' }}>
                ✓ Official Police Scanned Record Attached ({previewDoc.firDoc})
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}