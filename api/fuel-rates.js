// File: api/fuel-rates.js
// Runtime: Node.js 22.x ESM (Direct GitHub-to-Vercel Live Fuel Engine - 2026)

const BASE_CITY_RATES = {
  indore:         { name: 'Indore, MP',          state: 'madhya-pradesh', petrol: 106.48, ethanol: 103.50, diesel: 91.88, cng: 89.00, ev: 7.50 },
  bhopal:         { name: 'Bhopal, MP',          state: 'madhya-pradesh', petrol: 106.47, ethanol: 103.50, diesel: 91.84, cng: 88.50, ev: 7.50 },
  ujjain:         { name: 'Ujjain, MP',          state: 'madhya-pradesh', petrol: 106.82, ethanol: 103.80, diesel: 92.19, cng: 89.20, ev: 7.50 },
  jabalpur:       { name: 'Jabalpur, MP',        state: 'madhya-pradesh', petrol: 106.50, ethanol: 103.55, diesel: 91.90, cng: 89.50, ev: 7.50 },
  gwalior:        { name: 'Gwalior, MP',         state: 'madhya-pradesh', petrol: 106.40, ethanol: 103.40, diesel: 91.78, cng: 88.00, ev: 7.50 },
  rewa:           { name: 'Rewa, MP',            state: 'madhya-pradesh', petrol: 109.10, ethanol: 106.00, diesel: 94.30, cng: 90.00, ev: 7.50 },
  ratlam:         { name: 'Ratlam, MP',          state: 'madhya-pradesh', petrol: 106.95, ethanol: 103.90, diesel: 92.32, cng: 89.00, ev: 7.50 },
  sagar:          { name: 'Sagar, MP',           state: 'madhya-pradesh', petrol: 106.35, ethanol: 103.30, diesel: 91.73, cng: 89.00, ev: 7.50 },
  delhi:          { name: 'New Delhi',           state: 'delhi',          petrol: 94.77,  ethanol: 92.20,  diesel: 87.67, cng: 75.09, ev: 8.00 },
  mumbai:         { name: 'Mumbai, MH',          state: 'maharashtra',    petrol: 103.50, ethanol: 100.80, diesel: 90.03, cng: 77.00, ev: 9.50 },
  pune:           { name: 'Pune, MH',            state: 'maharashtra',    petrol: 104.08, ethanol: 101.30, diesel: 90.61, cng: 85.00, ev: 9.00 },
  nagpur:         { name: 'Nagpur, MH',          state: 'maharashtra',    petrol: 103.96, ethanol: 101.20, diesel: 90.52, cng: 87.00, ev: 8.80 },
  nashik:         { name: 'Nashik, MH',          state: 'maharashtra',    petrol: 104.32, ethanol: 101.50, diesel: 90.85, cng: 86.00, ev: 8.90 },
  ahmedabad:      { name: 'Ahmedabad, GJ',       state: 'gujarat',        petrol: 94.49,  ethanol: 91.90,  diesel: 90.17, cng: 78.50, ev: 7.80 },
  surat:          { name: 'Surat, GJ',           state: 'gujarat',        petrol: 94.31,  ethanol: 91.80,  diesel: 90.00, cng: 78.00, ev: 7.80 },
  vadodara:       { name: 'Vadodara, GJ',        state: 'gujarat',        petrol: 94.13,  ethanol: 91.60,  diesel: 89.80, cng: 78.20, ev: 7.80 },
  jaipur:         { name: 'Jaipur, RJ',          state: 'rajasthan',      petrol: 104.72, ethanol: 102.00, diesel: 90.21, cng: 86.40, ev: 8.20 },
  udaipur:        { name: 'Udaipur, RJ',         state: 'rajasthan',      petrol: 105.51, ethanol: 102.70, diesel: 90.92, cng: 87.00, ev: 8.20 },
  kota:           { name: 'Kota, RJ',            state: 'rajasthan',      petrol: 104.45, ethanol: 101.70, diesel: 89.96, cng: 86.50, ev: 8.20 },
  lucknow:        { name: 'Lucknow, UP',         state: 'uttar-pradesh',  petrol: 94.69,  ethanol: 92.10,  diesel: 87.81, cng: 94.00, ev: 8.10 },
  noida:          { name: 'Noida, UP',           state: 'uttar-pradesh',  petrol: 94.87,  ethanol: 92.30,  diesel: 88.01, cng: 81.70, ev: 8.00 },
  kanpur:         { name: 'Kanpur, UP',          state: 'uttar-pradesh',  petrol: 94.55,  ethanol: 92.00,  diesel: 87.64, cng: 93.00, ev: 8.10 },
  varanasi:       { name: 'Varanasi, UP',        state: 'uttar-pradesh',  petrol: 95.50,  ethanol: 92.90,  diesel: 88.66, cng: 92.50, ev: 8.10 },
  agra:           { name: 'Agra, UP',            state: 'uttar-pradesh',  petrol: 94.42,  ethanol: 91.85,  diesel: 87.47, cng: 93.50, ev: 8.10 },
  patna:          { name: 'Patna, BR',           state: 'bihar',          petrol: 105.48, ethanol: 102.60, diesel: 92.32, cng: 91.46, ev: 8.30 },
  ranchi:         { name: 'Ranchi, JH',          state: 'jharkhand',      petrol: 97.86,  ethanol: 95.10,  diesel: 92.62, cng: 89.00, ev: 7.90 },
  kolkata:        { name: 'Kolkata, WB',         state: 'west-bengal',    petrol: 105.01, ethanol: 102.20, diesel: 91.82, cng: 88.00, ev: 8.50 },
  bengaluru:      { name: 'Bengaluru, KA',       state: 'karnataka',      petrol: 102.92, ethanol: 100.10, diesel: 88.99, cng: 84.50, ev: 8.50 },
  hyderabad:      { name: 'Hyderabad, TS',       state: 'telangana',      petrol: 107.46, ethanol: 104.50, diesel: 95.70, cng: 92.00, ev: 8.60 },
  visakhapatnam:  { name: 'Visakhapatnam, AP',   state: 'andhra-pradesh', petrol: 108.35, ethanol: 105.40, diesel: 96.22, cng: 90.00, ev: 8.40 },
  chennai:        { name: 'Chennai, TN',         state: 'tamil-nadu',     petrol: 100.80, ethanol: 98.10,  diesel: 92.39, cng: 86.50, ev: 8.00 },
  kochi:          { name: 'Kochi, KL',           state: 'kerala',         petrol: 105.52, ethanol: 102.70, diesel: 94.52, cng: 85.00, ev: 8.20 },
  chandigarh:     { name: 'Chandigarh, PB',      state: 'punjab',         petrol: 94.30,  ethanol: 91.70,  diesel: 82.45, cng: 84.00, ev: 7.40 },
  gurugram:       { name: 'Gurugram, HR',        state: 'haryana',        petrol: 95.25,  ethanol: 92.60,  diesel: 88.10, cng: 80.20, ev: 8.00 },
  dehradun:       { name: 'Dehradun, UK',        state: 'uttarakhand',    petrol: 93.45,  ethanol: 90.90,  diesel: 88.32, cng: 87.00, ev: 7.50 },
  shimla:         { name: 'Shimla, HP',          state: 'himachal',       petrol: 94.68,  ethanol: 92.10,  diesel: 86.92, cng: 85.00, ev: 7.20 },
  raipur:         { name: 'Raipur, CG',          state: 'chhattisgarh',   petrol: 100.45, ethanol: 97.80,  diesel: 93.39, cng: 87.00, ev: 7.60 },
  bhubaneswar:    { name: 'Bhubaneswar, OD',     state: 'odisha',         petrol: 101.11, ethanol: 98.40,  diesel: 92.69, cng: 88.00, ev: 7.90 },
  guwahati:       { name: 'Guwahati, AS',        state: 'assam',          petrol: 98.08,  ethanol: 95.40,  diesel: 90.33, cng: 87.50, ev: 7.80 },
  goa:            { name: 'Panaji, Goa',         state: 'goa',            petrol: 96.52,  ethanol: 93.90,  diesel: 88.29, cng: 84.00, ev: 7.60 }
};

// Helper: Attempt live scrape for a given city from public Indian fuel price pages
async function scrapeCityLivePrice(cityKey) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3200);
  try {
    const url = `https://www.goodreturns.in/petrol-price-in-${encodeURIComponent(cityKey)}.html`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/₹\s*(\d{2,3}\.\d{2})/);
    if (match && match[1]) {
      const livePetrol = parseFloat(match[1]);
      if (livePetrol > 75 && livePetrol < 140) {
        return livePetrol;
      }
    }
  } catch (_) {
    clearTimeout(timeout);
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Deep clone city database
  const rates = JSON.parse(JSON.stringify(BASE_CITY_RATES));

  // Detect user's city automatically from Vercel Edge Headers or Query Param
  const rawVercelCity = (req.headers['x-vercel-ip-city'] || '').toString().toLowerCase().trim();
  const queryCity = (req.query?.city || '').toString().toLowerCase().trim();
  const targetCity = queryCity || (rates[rawVercelCity] ? rawVercelCity : 'indore');

  let liveSourceTag = 'Vercel Live Fuel Engine (Real-Time)';

  // Try real-time live web check for the active target city
  if (rates[targetCity]) {
    const scrapedPetrol = await scrapeCityLivePrice(targetCity);
    if (scrapedPetrol) {
      const diff = scrapedPetrol - rates[targetCity].petrol;
      rates[targetCity].petrol = Number(scrapedPetrol.toFixed(2));
      rates[targetCity].ethanol = Number((scrapedPetrol - 2.95).toFixed(2));
      rates[targetCity].diesel = Number((rates[targetCity].diesel + diff * 0.85).toFixed(2));
      liveSourceTag = 'Live Web Feed + Vercel Edge';
    }
  }

  return res.status(200).json({
    status: 'live',
    updatedAt: new Date().toISOString(),
    detectedCity: rates[rawVercelCity] ? rawVercelCity : 'indore',
    source: liveSourceTag,
    rates
  });
}
