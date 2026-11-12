export default async function handler(req, res) {
  const cityRates = {
    indore:    { petrol: 114.61, ethanol: 112.00, diesel: 99.70, cng: 89.00, ev: 7.5 },
    delhi:     { petrol: 94.72,  ethanol: 92.50,  diesel: 87.62, cng: 74.09, ev: 8.0 },
    mumbai:    { petrol: 104.21, ethanol: 102.00, diesel: 92.15, cng: 83.00, ev: 9.5 },
    bengaluru: { petrol: 99.84,  ethanol: 97.50,  diesel: 85.93, cng: 82.50, ev: 8.5 },
    chennai:   { petrol: 100.75, ethanol: 98.40,  diesel: 92.34, cng: 82.00, ev: 8.0 },
    kolkata:   { petrol: 104.95, ethanol: 102.80, diesel: 91.76, cng: 85.50, ev: 8.5 }
  };

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  return res.status(200).json(cityRates);
}
