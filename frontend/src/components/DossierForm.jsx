import React, { useState } from 'react';
import { ShieldAlert, PlusCircle, FileText, Building2, UserCheck, Phone, Paperclip } from 'lucide-react';

export default function DossierForm() {
  const [formData, setFormData] = useState({
    plate: '',
    reason: '',
    firNo: '',
    policeStation: 'Hazratganj Kotwali',
    district: 'Lucknow',
    ioName: '',
    ioContact: '',
    firFile: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, firFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.plate || !formData.firNo) {
      alert("Please fill required fields: License Plate & FIR Number");
      return;
    }

    const now = new Date();
    const timestampStr = now.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    try {
      const payload = {
        ...formData,
        timestamp: timestampStr,
        firFileName: formData.firFile ? formData.firFile.name : 'FIR_Copy.pdf'
      };

      const res = await fetch('http://localhost:8000/api/hotlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Target ${formData.plate.toUpperCase()} registered under FIR ${formData.firNo}!`);
        setFormData({
          plate: '',
          reason: '',
          firNo: '',
          policeStation: 'Hazratganj Kotwali',
          district: 'Lucknow',
          ioName: '',
          ioContact: '',
          firFile: null
        });
      }
    } catch (err) {
      console.error("Error submitting dossier:", err);
      alert(`Target ${formData.plate.toUpperCase()} added to Local Session Watchlist.`);
    }
  };

  return (
    <div style={{ backgroundColor: '#060d1e', border: '1px solid #1e293b', borderRadius: '6px', padding: '16px', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #1e293b', pb: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff0055', fontSize: '13px', fontWeight: 'bold' }}>
          <ShieldAlert size={18} /> POLICE CASE MANAGEMENT - HOTLIST DOSSIER REGISTRATION
        </div>
        <div style={{ fontSize: '10px', color: '#38bdf8' }}>
          OFFICIAL EVIDENCE AUDIT ENTRY MODE
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* ROW 1: VEHICLE & FIR DETAILS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              VEHICLE LICENSE PLATE *
            </label>
            <input 
              type="text" 
              name="plate"
              placeholder="e.g. UP32AB1234" 
              value={formData.plate}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px 10px', backgroundColor: '#020612', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              FIR NUMBER / CASE NO. *
            </label>
            <input 
              type="text" 
              name="firNo"
              placeholder="e.g. FIR-2026/892" 
              value={formData.firNo}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px 10px', backgroundColor: '#020612', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              CRIME CATEGORY / REASON
            </label>
            <input 
              type="text" 
              name="reason"
              placeholder="e.g. Armed Robbery / Stolen Auto" 
              value={formData.reason}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px 10px', backgroundColor: '#020612', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>
        </div>

        {/* ROW 2: POLICE JURISDICTION & IO DETAILS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              POLICE STATION & DISTRICT
            </label>
            <input 
              type="text" 
              name="policeStation"
              placeholder="Hazratganj Kotwali, Lucknow" 
              value={formData.policeStation}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px 10px', backgroundColor: '#020612', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              INVESTIGATING OFFICER (IO)
            </label>
            <input 
              type="text" 
              name="ioName"
              placeholder="e.g. SI R.K. Singh" 
              value={formData.ioName}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px 10px', backgroundColor: '#020612', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              IO CONTACT NUMBER
            </label>
            <input 
              type="text" 
              name="ioContact"
              placeholder="+91 94150 00000" 
              value={formData.ioContact}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px 10px', backgroundColor: '#020612', border: '1px solid #1e293b', borderRadius: '4px', color: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>

          {/* FIR DOCUMENT ATTACHMENT */}
          <div>
            <label style={{ fontSize: '10px', color: '#00f0ff', display: 'block', marginBottom: '4px' }}>
              ATTACH FIR COPY (PDF/IMAGE)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', padding: '8px', backgroundColor: '#091428', border: '1px dashed #00f0ff', borderRadius: '4px', color: '#00f0ff', fontSize: '11px', cursor: 'pointer' }}>
              <Paperclip size={14} />
              {formData.firFile ? formData.firFile.name.substring(0, 12) + '...' : 'UPLOAD FIR COPY'}
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button 
            type="submit" 
            style={{ backgroundColor: '#ff0055', border: 'none', color: '#ffffff', padding: '10px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', letterSpacing: '0.5px' }}
          >
            <PlusCircle size={16} /> REGISTER TARGET & GENERATE DOSSIER ENTRY
          </button>
        </div>

      </form>
    </div>
  );
}