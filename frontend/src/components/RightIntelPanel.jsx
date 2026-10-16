import React from 'react';
import { Search, X, Car, Calendar, Clock } from 'lucide-react';

export default function RightIntelPanel({
  isRightExpanded,
  activeTab, setActiveTab,
  alerts, setSelectedAlert,
  recentScans,
  handleSearch, searchQuery, setSearchQuery,
  searchResult, setSearchResult
}) {
  return (
    <div style={{ width: isRightExpanded ? '340px' : '0px', backgroundColor: '#060f24', borderLeft: isRightExpanded ? '1px solid #13284c' : 'none', display: 'flex', flexDirection: 'column', transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', overflowX: 'hidden' }}>
      <div style={{ width: '340px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        <div style={{ display: 'flex', borderBottom: '1px solid #13284c' }}>
          <button onClick={() => setActiveTab('alerts')} style={{ flex: 1, padding: '11px', background: activeTab === 'alerts' ? '#091838' : 'transparent', border: 'none', color: activeTab === 'alerts' ? '#ff0055' : '#64748b', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>ALERTS</button>
          <button onClick={() => setActiveTab('stream')} style={{ flex: 1, padding: '11px', background: activeTab === 'stream' ? '#091838' : 'transparent', border: 'none', color: activeTab === 'stream' ? '#00f0ff' : '#64748b', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>LOGS</button>
          <button onClick={() => setActiveTab('intel')} style={{ flex: 1, padding: '11px', background: activeTab === 'intel' ? '#091838' : 'transparent', border: 'none', color: activeTab === 'intel' ? '#ffb700' : '#64748b', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>INTEL</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
          
          {activeTab === 'alerts' && (
            alerts.length === 0 ? <div style={{ color: '#475569', fontSize: '11px', textAlign: 'center', marginTop: '40px' }}>No active hotlist alerts detected.</div> : (
              alerts.map((alert) => (
                <div key={alert.id} onClick={() => setSelectedAlert(alert)} style={{ backgroundColor: '#180712', borderLeft: '4px solid #ff0055', border: '1px solid #4a0d24', padding: '12px', borderRadius: '4px', marginBottom: '10px', cursor: 'pointer', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '8px', background: '#ff005533', color: '#ff0055', border: '1px solid #ff0055', padding: '2px 5px', borderRadius: '2px', fontWeight: 'bold' }}>BLACKISTED MATCH</span>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginTop: '4px' }}>{alert.plate}</div>
                    </div>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'stream' && (
            recentScans.map((scan) => (
              <div key={scan.id} style={{ backgroundColor: '#020612', border: '1px solid #13284c', padding: '8px 10px', borderRadius: '4px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#00f0ff' }}>{scan.plate}</div><div style={{ fontSize: '9px', color: '#64748b' }}>{scan.cam} • {scan.time}</div>
                </div>
              </div>
            ))
          )}

          {activeTab === 'intel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: '#01040a', border: '1px solid #1e3a5f', borderRadius: '4px', overflow: 'hidden', width: '100%' }}>
                <input type="text" placeholder="ENTER PLATE (e.g. UP32AB1234)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: '#ffb700', padding: '8px 12px', fontSize: '11px', outline: 'none', fontFamily: 'monospace' }} />
                <button type="submit" style={{ background: '#13284c', border: 'none', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Search size={14} color="#ffb700" /></button>
              </form>

              {!searchResult ? (
                <div style={{ color: '#475569', fontSize: '11px', textAlign: 'center', marginTop: '30px' }}>
                  <Search size={32} style={{ opacity: 0.3, margin: '0 auto 10px auto', display: 'block' }} />
                  No vehicle intel loaded.<br/><br/>Enter plate number above to begin target profiling.
                </div>
              ) : (
                <div style={{ background: '#0a101f', borderRadius: '6px', border: '1px solid #ffb70055', padding: '14px', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ffb70044', paddingBottom: '10px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffb700', fontWeight: 'bold', fontSize: '11px' }}><Search size={14} /> VEHICLE INTEL FILE</div>
                    <X size={16} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => { setSearchResult(null); setSearchQuery(''); }} />
                  </div>
                  
                  <h2 style={{ margin: '0 0 14px 0', color: '#ffffff', fontSize: '22px', fontFamily: 'monospace', letterSpacing: '1px' }}>{searchResult.plate}</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', marginBottom: '16px', background: '#020612', padding: '10px', borderRadius: '4px', border: '1px solid #13284c' }}>
                    <div><div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Car size={12} /> MODEL:</div><div style={{ color: '#00f0ff', fontWeight: 'bold', marginTop: '4px' }}>{searchResult.model}</div></div>
                    <div><div style={{ color: '#64748b' }}>COLOR:</div><div style={{ color: '#00f0ff', fontWeight: 'bold', marginTop: '4px' }}>{searchResult.color}</div></div>
                  </div>

                  <div style={{ fontSize: '10px', color: '#ffb700', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>DETECTION HISTORY:</div>
                  
                  <div style={{ maxHeight: 'calc(100vh - 380px)', overflowY: 'auto', paddingRight: '4px' }}>
                    {searchResult.history.map((h, i) => (
                      <div key={i} style={{ background: '#020612', borderLeft: '3px solid #ffb700', border: '1px solid #13284c', padding: '10px', borderRadius: '4px', marginBottom: '8px', fontSize: '11px' }}>
                        <div style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '6px' }}>{h.cam}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} style={{ color: '#00f0ff' }} /> {h.day}, {h.date} {h.year}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00ff66', fontWeight: 'bold' }}><Clock size={12} /> {h.time} {h.ampm}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}