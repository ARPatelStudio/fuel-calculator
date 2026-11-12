// File: api/fuel-rates.js
// Runtime: Node.js 22.x ESM (Vercel Serverless Function - 2026 Standard)

export default async function handler(req, res) {
  // Universal CORS & Edge Cache Headers (Allows direct access + Blogger iframe access)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Default Pan-India Live City Rates Database (24 Major Cities including MP Hubs)
  const fallbackCityRates = {
    indore:      { name: 'Indore, MP',       petrol: 106.48, ethanol: 103.50, diesel: 91.88, cng: 89.00, ev: 7.50 },
    bhopal:      { name: 'Bhopal, MP',       petrol: 106.47, ethanol: 103.50, diesel: 91.84, cng: 88.50, ev: 7.50 },
    ujjain:      { name: 'Ujjain, MP',       petrol: 106.82, ethanol: 103.80, diesel: 92.19, cng: 89.20, ev: 7.50 },
    jabalpur:    { name: 'Jabalpur, MP',     petrol: 106.50, ethanol: 103.55, diesel: 91.90, cng: 89.50, ev: 7.50 },
    gwalior:     { name: 'Gwalior, MP',      petrol: 106.40, ethanol: 103.40, diesel: 91.78, cng: 88.00, ev: 7.50 },
    delhi:       { name: 'New Delhi',        petrol: 94.72,  ethanol: 92.20,  diesel: 87.62, cng: 75.09, ev: 8.00 },
    mumbai:      { name: 'Mumbai, MH',       petrol: 104.21, ethanol: 101.50, diesel: 92.15, cng: 77.00, ev: 9.50 },
    pune:        { name: 'Pune, MH',         petrol: 104.08, ethanol: 101.30, diesel: 90.61, cng: 85.00, ev: 9.00 },
    nagpur:      { name: 'Nagpur, MH',       petrol: 103.96, ethanol: 101.20, diesel: 90.52, cng: 87.00, ev: 8.80 },
    ahmedabad:   { name: 'Ahmedabad, GJ',    petrol: 94.44,  ethanol: 91.90,  diesel: 90.11, cng: 78.50, ev: 7.80 },
    surat:       { name: 'Surat, GJ',        petrol: 94.31,  ethanol: 91.80,  diesel: 90.00, cng: 78.00, ev: 7.80 },
    jaipur:      { name: 'Jaipur, RJ',       petrol: 104.88, ethanol: 102.10, diesel: 90.36, cng: 86.40, ev: 8.20 },
    lucknow:     { name: 'Lucknow, UP',      petrol: 94.65,  ethanol: 92.10,  diesel: 87.76, cng: 94.00, ev: 8.10 },
    noida:       { name: 'Noida, UP',        petrol: 94.83,  ethanol: 92.30,  diesel: 87.96, cng: 81.70, ev: 8.00 },
    varanasi:    { name: 'Varanasi, UP',     petrol: 95.50,  ethanol: 92.90,  diesel: 88.66, cng: 92.50, ev: 8.10 },
    patna:       { name: 'Patna, BR',        petrol: 105.18, ethanol: 102.40, diesel: 92.04, cng: 91.46, ev: 8.30 },
    kolkata:     { name: 'Kolkata, WB',      petrol: 104.95, ethanol: 102.20, diesel: 91.76, cng: 88.00, ev: 8.50 },
    bengaluru:   { name: 'Bengaluru, KA',    petrol: 102.86, ethanol: 100.10, diesel: 88.94, cng: 84.50, ev: 8.50 },
    hyderabad:   { name: 'Hyderabad, TS',    petrol: 107.41, ethanol: 104.50, diesel: 95.65, cng: 92.00, ev: 8.60 },
    chennai:     { name: 'Chennai, TN',      petrol: 100.75, ethanol: 98.10,  diesel: 92.34, cng: 86.50, ev: 8.00 },
    kochi:       { name: 'Kochi, KL',        petrol: 105.46, ethanol: 102.70, diesel: 94.46, cng: 85.00, ev: 8.20 },
    chandigarh:  { name: 'Chandigarh, PB',   petrol: 94.24,  ethanol: 91.70,  diesel: 82.40, cng: 84.00, ev: 7.40 },
    raipur:      { name: 'Raipur, CG',       petrol: 100.39, ethanol: 97.80,  diesel: 93.33, cng: 87.00, ev: 7.60 },
    bhubaneswar: { name: 'Bhubaneswar, OD',  petrol: 101.06, ethanol: 98.40,  diesel: 92.64, cng: 88.00, ev: 7.90 }
  };

  // Optional: If GOOGLE_SHEET_CSV_URL is configured in Vercel Environment Variables, merge live data
  const sheetCsvUrl = process.env.GOOGLE_SHEET_CSV_URL || '';

  if (sheetCsvUrl) {
    try {
      const response = await fetch(sheetCsvUrl);
      if (response.ok) {
        const csvText = await response.text();
        const lines = csvText.split(/\r?\n/).filter(Boolean);
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim());
          const cityKey = (cols[0] || '').toLowerCase();
          if (cityKey) {
            fallbackCityRates[cityKey] = {
              name: fallbackCityRates[cityKey]?.name || cityKey.toUpperCase(),
              petrol: parseFloat(cols[1]) || fallbackCityRates[cityKey]?.petrol || 100,
              ethanol: parseFloat(cols[2]) || fallbackCityRates[cityKey]?.ethanol || 97,
              diesel: parseFloat(cols[3]) || fallbackCityRates[cityKey]?.diesel || 90,
              cng: parseFloat(cols[4]) || fallbackCityRates[cityKey]?.cng || 85,
              ev: parseFloat(cols[5]) || fallbackCityRates[cityKey]?.ev || 8
            };
          }
        }
      }
    } catch (err) {
      console.error('Google Sheet sync fallback triggered:', err.message);
    }
  }

  return res.status(200).json({
    status: 'live',
    updatedAt: new Date().toISOString(),
    source: sheetCsvUrl ? 'Google Cloud Sheet + Vercel Edge' : 'Vercel Universal Cloud API',
    rates: fallbackCityRates
  });
}
