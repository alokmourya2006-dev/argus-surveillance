import React from 'react';
import { Video, X, Crosshair, Clock, FileText, Printer } from 'lucide-react';

export default function Modals({ fullScreenCamera, setFullScreenCamera, selectedAlert, setSelectedAlert, viewDossierModal, setViewDossierModal }) {
  return (
    <>
      {/* 1. FULL SCREEN CAMERA MODAL */}
      {fullScreenCamera && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#01040a', zIndex: 999999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #1a365d', background: 'rgba(6, 15, 36, 0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Video style={{ color: '#00f0ff' }} size={24} />
              <div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }}>{fullScreenCamera.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>{fullScreenCamera.location}</div>
              </div>
            </div>
            <button onClick={() => setFullScreenCamera(null)} style={{ background: 'rgba(255, 0, 85, 0.15)', color: '#ff0055', border: '1px solid #ff0055', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <X size={16} /> EXIT STREAM
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #13284c', margin: '20px', borderRadius: '8px', backgroundColor: '#020612' }}>
             <Crosshair size={120} style={{ color: '#00f0ff22' }} />
          </div>
        </div>
      )}

      {/* 2. INCIDENT ALERT MODAL */}
      {selectedAlert && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 18, 0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999998 }}>
          <div style={{ background: '#060f24', border: '1px solid #ff0055', borderRadius: '8px', width: '480px', padding: '20px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #13284c', paddingBottom: '12px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '9px', background: '#ff0055', color: '#fff', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold' }}>INCIDENT AUDIT FILE</span>
                <h4 style={{ margin: '4px 0 0 0', color: '#ffffff', fontSize: '16px' }}>CASE ID: #INC-{selectedAlert.id}90210</h4>
              </div>
              <X size={20} style={{ cursor: 'pointer', color: '#64748b' }} onClick={() => setSelectedAlert(null)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '11px', backgroundColor: '#020612', padding: '12px', borderRadius: '6px', border: '1px solid #13284c', marginBottom: '16px' }}>
              <div><span style={{ color: '#64748b' }}>PLATE NUMBER:</span><div style={{ fontSize: '16px', fontWeight: 'bold', color: '#00f0ff', marginTop: '2px', fontFamily: 'monospace' }}>{selectedAlert.plate}</div></div>
              <div><span style={{ color: '#64748b' }}>CONFIDENCE SCORE:</span><div style={{ fontSize: '16px', fontWeight: 'bold', color: '#00ff66', marginTop: '2px' }}>98.4% MATCH</div></div>
              <div><span style={{ color: '#64748b' }}>FLAG REASON:</span><div style={{ color: '#ffb700', marginTop: '2px' }}>{selectedAlert.reason}</div></div>
              <div><span style={{ color: '#64748b' }}>CAMERA SOURCE:</span><div style={{ color: '#ffffff', marginTop: '2px' }}>Hazratganj Sec-A</div></div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => window.print()} style={{ flex: 1, padding: '10px', background: '#00f0ff', color: '#020612', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Printer size={14} /> EXPORT AUDIT REPORT</button>
              <button onClick={() => setSelectedAlert(null)} style={{ padding: '10px 16px', background: '#13284c', color: '#94a3b8', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FULL DOSSIER AUDIT MODAL */}
      {viewDossierModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 18, 0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999998 }}>
          <div style={{ background: '#060f24', border: '1px solid #00f0ff', borderRadius: '8px', width: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative', boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #13284c', paddingBottom: '12px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '9px', background: '#ff0055', color: '#fff', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold' }}>OFFICIAL TARGET CASE DOSSIER</span>
                <h3 style={{ margin: '4px 0 0 0', color: '#ffffff', fontSize: '20px', fontFamily: 'monospace' }}>CASE: {viewDossierModal.caseId}</h3>
              </div>
              <X size={20} style={{ cursor: 'pointer', color: '#64748b' }} onClick={() => setViewDossierModal(null)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020612', padding: '10px 14px', borderRadius: '4px', border: '1px solid #13284c', marginBottom: '16px', fontSize: '11px' }}>
              <span style={{ color: '#00ff66', fontFamily: 'monospace' }}><Clock size={12} /> CREATED ON: {viewDossierModal.addedTimestamp}</span>
              <span style={{ color: '#ff0055', fontWeight: 'bold', background: 'rgba(255, 0, 85, 0.1)', border: '1px solid #ff0055', padding: '2px 8px', borderRadius: '3px', fontSize: '9px' }}>● {viewDossierModal.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '11px', background: '#020612', padding: '14px', borderRadius: '6px', border: '1px solid #13284c', marginBottom: '16px' }}>
              <div><span style={{ color: '#64748b' }}>TARGET PLATE NUMBER:</span><div style={{ fontSize: '18px', fontWeight: 'bold', color: '#00f0ff', marginTop: '2px', fontFamily: 'monospace' }}>{viewDossierModal.plate}</div></div>
              <div><span style={{ color: '#64748b' }}>FLAGGING REASON:</span><div style={{ color: '#ffb700', fontWeight: 'bold', marginTop: '2px' }}>{viewDossierModal.reason}</div></div>
              <div><span style={{ color: '#64748b' }}>POLICE STATION NAME:</span><div style={{ color: '#ffffff', marginTop: '2px' }}>{viewDossierModal.station}</div></div>
              <div><span style={{ color: '#64748b' }}>STATION ADDRESS:</span><div style={{ color: '#94a3b8', marginTop: '2px' }}>{viewDossierModal.stationAddress}</div></div>
              <div><span style={{ color: '#64748b' }}>INVESTIGATION OFFICER:</span><div style={{ color: '#00ff66', marginTop: '2px', fontFamily: 'monospace' }}>{viewDossierModal.officerId}</div></div>
              <div><span style={{ color: '#64748b' }}>IO CONTACT NUMBER:</span><div style={{ color: '#ffffff', marginTop: '2px', fontFamily: 'monospace' }}>{viewDossierModal.officerContact}</div></div>
            </div>

            <div style={{ fontSize: '11px', color: '#00f0ff', fontWeight: 'bold', marginBottom: '8px' }}>EVIDENCE & PROFILE IMAGES:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#020612', border: '1px solid #13284c', borderRadius: '4px', padding: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>VEHICLE PHOTO</span>
                <img src={viewDossierModal.vehicleImg} alt="Vehicle" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #1e3a5f' }} />
              </div>

              <div style={{ background: '#020612', border: '1px solid #ff005544', borderRadius: '4px', padding: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#ff0055', display: 'block', marginBottom: '6px' }}>SUSPECT / DRIVER</span>
                <img src={viewDossierModal.suspectImg} alt="Suspect" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ff005544' }} />
              </div>

              <div style={{ background: '#020612', border: '1px solid #ffb70044', borderRadius: '4px', padding: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#ffb700', display: 'block', marginBottom: '6px' }}>REGISTERED OWNER</span>
                <img src={viewDossierModal.ownerImg} alt="Owner" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ffb70044' }} />
              </div>
            </div>

            <div style={{ background: '#020612', border: '1px solid #00ff6644', padding: '10px 14px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00ff66', fontSize: '11px', fontFamily: 'monospace' }}>
                <FileText size={16} /> ATTACHED FIR LEGAL DOCUMENT: <strong>{viewDossierModal.firDoc}</strong>
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8', border: '1px solid #1e3a5f', padding: '2px 6px', borderRadius: '2px' }}>VERIFIED COPY</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', background: '#00f0ff', color: '#020612', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Printer size={16} /> EXPORT OFFICIAL PRINTABLE DOSSIER (PDF)
              </button>
              <button onClick={() => setViewDossierModal(null)} style={{ padding: '12px 20px', background: '#13284c', color: '#94a3b8', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}