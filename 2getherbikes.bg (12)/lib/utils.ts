// Helper to format currency consistently across the app
export const formatCurrency = (priceInBgn: number): string => {
  const priceInEur = priceInBgn / 1.95583;
  return `€${priceInEur.toFixed(2)} (${priceInBgn.toFixed(2)} лв.)`;
};

// Re-export everything from the standard router library
// This fixes the "loading errors" caused by the manual shim
export * from 'react-router-dom';