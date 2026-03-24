export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Andaman & Nicobar Islands', 'Dadra & Nagar Haveli', 'Daman & Diu', 'Lakshadweep'
];

export const STATE_ABBREVIATIONS = {
  'Bihar': 'BR', 'Uttar Pradesh': 'UP', 'Maharashtra': 'MH', 'Delhi': 'DL',
  'West Bengal': 'WB', 'Rajasthan': 'RJ', 'Tamil Nadu': 'TN', 'Karnataka': 'KA',
  'Gujarat': 'GJ', 'Andhra Pradesh': 'AP', 'Telangana': 'TG', 'Kerala': 'KL',
  'Madhya Pradesh': 'MP', 'Punjab': 'PB', 'Haryana': 'HR', 'Odisha': 'OD',
  'Assam': 'AS', 'Jharkhand': 'JH', 'Chhattisgarh': 'CG', 'Uttarakhand': 'UK',
  'Himachal Pradesh': 'HP', 'Goa': 'GA', 'Manipur': 'MN', 'Meghalaya': 'ML',
  'Mizoram': 'MZ', 'Nagaland': 'NL', 'Tripura': 'TR', 'Sikkim': 'SK',
  'Arunachal Pradesh': 'AR', 'Jammu & Kashmir': 'JK', 'Ladakh': 'LA',
  'Puducherry': 'PY', 'Chandigarh': 'CH', 'Andaman & Nicobar Islands': 'AN',
  'Dadra & Nagar Haveli': 'DN', 'Daman & Diu': 'DD', 'Lakshadweep': 'LD'
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
