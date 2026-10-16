import axios from 'axios';

const API_BASE = "http://localhost:8000";

export const fetchHealth = async () => {
  const response = await axios.get(`${API_BASE}/health`);
  return response.data;
};

export const fetchAlerts = async () => {
  const response = await axios.get(`${API_BASE}/alerts`);
  return response.data;
};

export const addToHotlist = async (plate, reason) => {
  const response = await axios.post(`${API_BASE}/api/hotlist?plate=${plate}&reason=${encodeURIComponent(reason)}`);
  return response.data;
};