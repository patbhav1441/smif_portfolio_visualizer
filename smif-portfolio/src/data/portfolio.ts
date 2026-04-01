export interface Position {
  name: string;
  ticker: string;
  quantity: number;
  prevClose: number;
  currentPrice: number;
  dayChange: number;
  purchasePrice: number;
  costBasis: number;
  currentValue: number;
  unrealizedGainLoss: number;
  percentReturn: number;
  weightExCash: number;
  weight: number;
  sector: string;
  industry: string;
  purchaseDateSerial: number;
  holdingPeriod: number;
  annualizedReturn: number;
}

export interface SectorData {
  sector: string;
  sp500Weight: number;
  smifWeight: number;
  owUw: number;
}

export interface SoldSecurity {
  ticker: string;
  cashReceived: number;
}

function excelDateToISO(serial: number): string {
  const msPerDay = 86400000;
  const excelEpoch = new Date(1899, 11, 30).getTime();
  return new Date(excelEpoch + serial * msPerDay).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const positions: Position[] = [
  { name: "Sprouts Farmers Market Inc", ticker: "SFM", quantity: 95, prevClose: 77.13, currentPrice: 75.93, dayChange: -0.015558, purchasePrice: 140.34, costBasis: 13332.3, currentValue: 7213.35, unrealizedGainLoss: -6118.95, percentReturn: -0.4590, weightExCash: 0.01636, weight: 0.01372, sector: "Consumer Staples", industry: "Consumer Staples Distribution", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: -0.3725 },
  { name: "Amazon.com Inc", ticker: "AMZN", quantity: 50, prevClose: 208.27, currentPrice: 212.29, dayChange: 0.019302, purchasePrice: 227.35, costBasis: 11367.4, currentValue: 10614.5, unrealizedGainLoss: -752.9, percentReturn: -0.0662, weightExCash: 0.02407, weight: 0.02018, sector: "Consumer Discretionary", industry: "Broadline Retail", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: -0.0538 },
  { name: "Fortinet Inc", ticker: "FTNT", quantity: 100, prevClose: 81.72, currentPrice: 81.235, dayChange: -0.005935, purchasePrice: 97.62, costBasis: 9762, currentValue: 8123.5, unrealizedGainLoss: -1638.5, percentReturn: -0.1678, weightExCash: 0.01842, weight: 0.01545, sector: "Information Technology", industry: "Software", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: -0.1362 },
  { name: "Zebra Technologies Corporation", ticker: "ZBRA", quantity: 30, prevClose: 209.08, currentPrice: 208.82, dayChange: -0.001244, purchasePrice: 312.66, costBasis: 9379.72, currentValue: 6264.6, unrealizedGainLoss: -3115.12, percentReturn: -0.3321, weightExCash: 0.01420, weight: 0.01191, sector: "Information Technology", industry: "Electronic Equipment", purchaseDateSerial: 44967, holdingPeriod: 1146, annualizedReturn: -0.1058 },
  { name: "Accenture PLC", ticker: "ACN", quantity: 26, prevClose: 198.29, currentPrice: 196.69, dayChange: -0.008069, purchasePrice: 217.98, costBasis: 5667.5, currentValue: 5113.94, unrealizedGainLoss: -553.56, percentReturn: -0.0977, weightExCash: 0.01160, weight: 0.00972, sector: "Information Technology", industry: "IT Services", purchaseDateSerial: 43924, holdingPeriod: 2189, annualizedReturn: -0.0163 },
  { name: "Equinix Inc", ticker: "EQIX", quantity: 11, prevClose: 980.24, currentPrice: 994.745, dayChange: 0.014797, purchasePrice: 943.07, costBasis: 10373.72, currentValue: 10942.2, unrealizedGainLoss: 568.48, percentReturn: 0.0548, weightExCash: 0.02481, weight: 0.02081, sector: "Real Estate", industry: "Specialized REITs", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: 0.0445 },
  { name: "Entegris Inc", ticker: "ENTG", quantity: 90, prevClose: 117.24, currentPrice: 121.04, dayChange: 0.032412, purchasePrice: 120.18, costBasis: 10816.14, currentValue: 10893.6, unrealizedGainLoss: 77.46, percentReturn: 0.0072, weightExCash: 0.02470, weight: 0.02072, sector: "Information Technology", industry: "Semiconductors", purchaseDateSerial: 44406, holdingPeriod: 1707, annualizedReturn: 0.0015 },
  { name: "Tractor Supply", ticker: "TSCO", quantity: 35, prevClose: 45.3, currentPrice: 44.9, dayChange: -0.00883, purchasePrice: 53.54, costBasis: 1873.86, currentValue: 1571.5, unrealizedGainLoss: -302.36, percentReturn: -0.1614, weightExCash: 0.00356, weight: 0.00299, sector: "Consumer Discretionary", industry: "Specialty Retail", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: -0.1310 },
  { name: "Qualcomm Inc", ticker: "QCOM", quantity: 93, prevClose: 128.78, currentPrice: 128.555, dayChange: -0.001747, purchasePrice: 128.31, costBasis: 11932.58, currentValue: 11955.62, unrealizedGainLoss: 23.04, percentReturn: 0.0019, weightExCash: 0.02711, weight: 0.02273, sector: "Information Technology", industry: "Semiconductors", purchaseDateSerial: 44967, holdingPeriod: 1146, annualizedReturn: 0.0006 },
  { name: "IntercontinentalExchange Inc", ticker: "ICE", quantity: 88, prevClose: 157.28, currentPrice: 157.81, dayChange: 0.00337, purchasePrice: 146.28, costBasis: 12873.06, currentValue: 13887.28, unrealizedGainLoss: 1014.22, percentReturn: 0.0788, weightExCash: 0.03149, weight: 0.02641, sector: "Financials", industry: "Capital Markets", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: 0.0639 },
  { name: "Merck & Co Inc", ticker: "MRK", quantity: 85, prevClose: 120.29, currentPrice: 121.23, dayChange: 0.007814, purchasePrice: 88.18, costBasis: 7495.2, currentValue: 10304.55, unrealizedGainLoss: 2809.35, percentReturn: 0.3748, weightExCash: 0.02337, weight: 0.01960, sector: "Health Care", industry: "Pharmaceuticals", purchaseDateSerial: 44047, holdingPeriod: 2066, annualizedReturn: 0.0663 },
  { name: "Lennar Corporation", ticker: "LEN", quantity: 60, prevClose: 86.84, currentPrice: 86.81, dayChange: -0.000346, purchasePrice: 83.93, costBasis: 5035.77, currentValue: 5208.6, unrealizedGainLoss: 172.83, percentReturn: 0.0343, weightExCash: 0.01181, weight: 0.00990, sector: "Consumer Discretionary", industry: "Household Durables", purchaseDateSerial: 44217, holdingPeriod: 1896, annualizedReturn: 0.0066 },
  { name: "Snap-on Inc", ticker: "SNA", quantity: 19, prevClose: 363.22, currentPrice: 367.54, dayChange: 0.011894, purchasePrice: 333.41, costBasis: 6334.7, currentValue: 6983.26, unrealizedGainLoss: 648.56, percentReturn: 0.1024, weightExCash: 0.01583, weight: 0.01328, sector: "Industrials", industry: "Machinery", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: 0.0831 },
  { name: "Adobe Inc", ticker: "ADBE", quantity: 30, prevClose: 283.82, currentPrice: 281.23, dayChange: -0.009126, purchasePrice: 486.16, costBasis: 14584.8, currentValue: 8436.9, unrealizedGainLoss: -6147.9, percentReturn: -0.4216, weightExCash: 0.01913, weight: 0.01604, sector: "Information Technology", industry: "Software", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: -0.3422 },
  { name: "NextEra Energy Inc", ticker: "NEE", quantity: 76, prevClose: 92.88, currentPrice: 92.97, dayChange: 0.000969, purchasePrice: 82.0, costBasis: 3280.36, currentValue: 6232.0, unrealizedGainLoss: 2951.64, percentReturn: 0.8999, weightExCash: 0.01413, weight: 0.01184, sector: "Utilities", industry: "Electric Utilities", purchaseDateSerial: 43378, holdingPeriod: 3211, annualizedReturn: 0.0825 },
  { name: "Lockheed Martin Corporation", ticker: "LMT", quantity: 23, prevClose: 604.39, currentPrice: 618.75, dayChange: 0.023759, purchasePrice: 468.92, costBasis: 8897.09, currentValue: 14231.25, unrealizedGainLoss: 5334.16, percentReturn: 0.5995, weightExCash: 0.02706, weight: 0.02270, sector: "Industrials", industry: "Aerospace & Defense", purchaseDateSerial: 44307, holdingPeriod: 1848, annualizedReturn: 0.1073 },
  { name: "KKR & Co LP", ticker: "KKR", quantity: 54, prevClose: 92.5, currentPrice: 91.12, dayChange: -0.014919, purchasePrice: 59.93, costBasis: 3236.22, currentValue: 4920.48, unrealizedGainLoss: 1684.26, percentReturn: 0.5204, weightExCash: 0.01116, weight: 0.00936, sector: "Financials", industry: "Capital Markets", purchaseDateSerial: 44652, holdingPeriod: 1481, annualizedReturn: 0.1177 },
  { name: "Grupo Aeroportuario del Centro Norte", ticker: "OMAB", quantity: 150, prevClose: 114.73, currentPrice: 115.18, dayChange: 0.003922, purchasePrice: 70.88, costBasis: 10631.32, currentValue: 17277.0, unrealizedGainLoss: 6645.68, percentReturn: 0.6252, weightExCash: 0.03918, weight: 0.03285, sector: "Industrials", industry: "Transportation Infrastructure", purchaseDateSerial: 45366, holdingPeriod: 747, annualizedReturn: 0.3057 },
  { name: "Chubb Ltd", ticker: "CB", quantity: 60, prevClose: 264.79, currentPrice: 269.44, dayChange: 0.017562, purchasePrice: 208.67, costBasis: 12520.2, currentValue: 16166.4, unrealizedGainLoss: 3646.2, percentReturn: 0.2912, weightExCash: 0.03667, weight: 0.03074, sector: "Financials", industry: "Insurance", purchaseDateSerial: 44307, holdingPeriod: 1848, annualizedReturn: 0.0528 },
  { name: "Walmart Inc", ticker: "WMT", quantity: 100, prevClose: 97.44, currentPrice: 98.21, dayChange: 0.007904, purchasePrice: 68.68, costBasis: 6868.0, currentValue: 9821.0, unrealizedGainLoss: 2953.0, percentReturn: 0.4299, weightExCash: 0.02228, weight: 0.01868, sector: "Consumer Staples", industry: "Retail", purchaseDateSerial: 44307, holdingPeriod: 1848, annualizedReturn: 0.0781 },
  { name: "JPMorgan Chase & Co", ticker: "JPM", quantity: 56, prevClose: 294.16, currentPrice: 295.61, dayChange: 0.004929, purchasePrice: 104.67, costBasis: 5861.32, currentValue: 16554.16, unrealizedGainLoss: 10692.84, percentReturn: 1.8246, weightExCash: 0.03755, weight: 0.03150, sector: "Financials", industry: "Banks", purchaseDateSerial: 43077, holdingPeriod: 3117, annualizedReturn: 0.1957 },
  { name: "Microsoft Corporation", ticker: "MSFT", quantity: 34, prevClose: 370.17, currentPrice: 371.15, dayChange: 0.002647, purchasePrice: 111.28, costBasis: 3783.35, currentValue: 12619.1, unrealizedGainLoss: 8835.75, percentReturn: 2.3355, weightExCash: 0.02862, weight: 0.02400, sector: "Information Technology", industry: "Software", purchaseDateSerial: 43446, holdingPeriod: 2749, annualizedReturn: 0.3150 },
  { name: "Southern Copper Corporation", ticker: "SCCO", quantity: 98, prevClose: 172.06, currentPrice: 180.18, dayChange: 0.047193, purchasePrice: 97.95, costBasis: 9599.23, currentValue: 17657.64, unrealizedGainLoss: 8058.41, percentReturn: 0.8395, weightExCash: 0.04004, weight: 0.03358, sector: "Materials", industry: "Metals & Mining", purchaseDateSerial: 45366, holdingPeriod: 747, annualizedReturn: 0.4105 },
  { name: "Taiwan Semiconductor Manufacturing", ticker: "TSM", quantity: 79, prevClose: 337.95, currentPrice: 343.81, dayChange: 0.01734, purchasePrice: 219.84, costBasis: 17367.36, currentValue: 27160.99, unrealizedGainLoss: 9793.63, percentReturn: 0.5639, weightExCash: 0.06159, weight: 0.05165, sector: "Information Technology", industry: "Semiconductors", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: 0.4577 },
  { name: "Costco Wholesale Corporation", ticker: "COST", quantity: 12, prevClose: 996.43, currentPrice: 993.36, dayChange: -0.003081, purchasePrice: 116.58, costBasis: 1398.95, currentValue: 11920.32, unrealizedGainLoss: 10521.37, percentReturn: 7.5209, weightExCash: 0.02703, weight: 0.02267, sector: "Consumer Staples", industry: "Consumer Staples Distribution", purchaseDateSerial: 41789, holdingPeriod: 4324, annualizedReturn: 0.6353 },
  { name: "ASML Holdings NV", ticker: "ASML", quantity: 19, prevClose: 1320.83, currentPrice: 1375.225, dayChange: 0.041182, purchasePrice: 770.03, costBasis: 14630.57, currentValue: 26129.28, unrealizedGainLoss: 11498.71, percentReturn: 0.7859, weightExCash: 0.05925, weight: 0.04969, sector: "Information Technology", industry: "Semiconductors", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: 0.6379 },
  { name: "Alphabet Inc Class A", ticker: "GOOGL", quantity: 85, prevClose: 287.56, currentPrice: 299.685, dayChange: 0.042165, purchasePrice: 35.39, costBasis: 3008.02, currentValue: 25473.23, unrealizedGainLoss: 22465.21, percentReturn: 7.4684, weightExCash: 0.05776, weight: 0.04844, sector: "Communication Services", industry: "Interactive Media & Services", purchaseDateSerial: 42489, holdingPeriod: 3624, annualizedReturn: 0.7527 },
  { name: "Meta Platforms Inc Class A", ticker: "META", quantity: 22, prevClose: 572.13, currentPrice: 587.76, dayChange: 0.027319, purchasePrice: 174.39, costBasis: 3836.58, currentValue: 12930.72, unrealizedGainLoss: 9094.14, percentReturn: 2.3703, weightExCash: 0.02932, weight: 0.02459, sector: "Communication Services", industry: "Interactive Media & Services", purchaseDateSerial: 44967, holdingPeriod: 1146, annualizedReturn: 0.7555 },
  { name: "Cameco Corp", ticker: "CCJ", quantity: 230, prevClose: 108.61, currentPrice: 112.34, dayChange: 0.034343, purchasePrice: 55.03, costBasis: 12656.9, currentValue: 25838.2, unrealizedGainLoss: 13181.3, percentReturn: 1.0414, weightExCash: 0.05859, weight: 0.04913, sector: "Energy", industry: "Oil, Gas & Consumable Fuels", purchaseDateSerial: 45663, holdingPeriod: 450, annualizedReturn: 0.8453 },
  { name: "Apple Inc", ticker: "AAPL", quantity: 41, prevClose: 253.79, currentPrice: 255.175, dayChange: 0.005457, purchasePrice: 18.14, costBasis: 743.75, currentValue: 10462.18, unrealizedGainLoss: 9718.43, percentReturn: 13.0668, weightExCash: 0.02372, weight: 0.01989, sector: "Information Technology", industry: "Technology Hardware", purchaseDateSerial: 41564, holdingPeriod: 4549, annualizedReturn: 1.0492 },
  { name: "Lockheed Martin Corp", ticker: "LMT2", quantity: 0, prevClose: 0, currentPrice: 0, dayChange: 0, purchasePrice: 0, costBasis: 0, currentValue: 0, unrealizedGainLoss: 0, percentReturn: 0, weightExCash: 0, weight: 0, sector: "", industry: "", purchaseDateSerial: 0, holdingPeriod: 0, annualizedReturn: 0 },
  { name: "MILLROSE PROPERTIES INC", ticker: "MRP", quantity: 30, prevClose: 28.0, currentPrice: 28.695, dayChange: 0.024821, purchasePrice: 23.49, costBasis: 704.7, currentValue: 860.85, unrealizedGainLoss: 156.15, percentReturn: 0.2216, weightExCash: 0.00195, weight: 0.00163, sector: "Real Estate", industry: "Specialized REITs", purchaseDateSerial: 45695, holdingPeriod: 418, annualizedReturn: 0.1935 },
].filter(p => p.quantity > 0 && p.ticker !== "LMT2");

export const cash = {
  moneyMarket: 28595,
  cashValue: 56255.31,
  totalPortfolio: 525870.75,
};

export const sectorWeights: SectorData[] = [
  { sector: "Information Technology", sp500Weight: 0.35107, smifWeight: 0.23634, owUw: -0.11473 },
  { sector: "Financials", sp500Weight: 0.13199, smifWeight: 0.11976, owUw: -0.01223 },
  { sector: "Health Care", sp500Weight: 0.09244, smifWeight: 0.07381, owUw: -0.01863 },
  { sector: "Consumer Discretionary", sp500Weight: 0.10557, smifWeight: 0.03308, owUw: -0.07249 },
  { sector: "Communication Services", sp500Weight: 0.10063, smifWeight: 0.07303, owUw: -0.02760 },
  { sector: "Industrials", sp500Weight: 0.08160, smifWeight: 0.09178, owUw: 0.01018 },
  { sector: "Consumer Staples", sp500Weight: 0.04824, smifWeight: 0.06484, owUw: 0.01660 },
  { sector: "Energy", sp500Weight: 0.02911, smifWeight: 0.06529, owUw: 0.03619 },
  { sector: "Real Estate", sp500Weight: 0.01891, smifWeight: 0.02081, owUw: 0.00190 },
  { sector: "Materials", sp500Weight: 0.01651, smifWeight: 0.03358, owUw: 0.01707 },
  { sector: "Utilities", sp500Weight: 0.02394, smifWeight: 0.02633, owUw: 0.00239 },
];

export const recentlySold: SoldSecurity[] = [
  { ticker: "ALGN", cashReceived: 2851 },
  { ticker: "CCJ", cashReceived: 10506.44 },
  { ticker: "CVS", cashReceived: 6476.75 },
  { ticker: "XOM", cashReceived: 16401.94 },
  { ticker: "MRP", cashReceived: 920.39 },
  { ticker: "PYPL", cashReceived: 7531.35 },
];

export const portfolioStats = {
  portfolioValue: 525870.75,
  spyLevel: 6604.15,
  dayChange: 0.01137,
  spyDayChange: 0.011585,
  cashWeight: 0.16135,
};

export const ytdPerformers = {
  outperformers: [
    { ticker: "ENTG", return: 0.4367 },
    { ticker: "XOM", return: 0.3321 },
    { ticker: "EQIX", return: 0.2984 },
    { ticker: "ASML", return: 0.2854 },
    { ticker: "LMT", return: 0.2793 },
    { ticker: "SCCO", return: 0.2665 },
    { ticker: "CCJ", return: 0.2279 },
    { ticker: "NEE", return: 0.1581 },
    { ticker: "COST", return: 0.1519 },
    { ticker: "MRK", return: 0.1517 },
  ],
  underperformers: [
    { ticker: "ADBE", return: -0.3089 },
    { ticker: "KKR", return: -0.2852 },
    { ticker: "ACN", return: -0.2669 },
    { ticker: "QCOM", return: -0.2484 },
    { ticker: "MSFT", return: -0.2326 },
    { ticker: "TSCO", return: -0.0912 },
    { ticker: "SFM", return: -0.0855 },
    { ticker: "FTNT", return: -0.0748 },
    { ticker: "ZBRA", return: -0.0631 },
    { ticker: "AMZN", return: -0.0539 },
  ],
};

export const fiveDayPerformers = {
  outperformers: [
    { ticker: "SCCO", return: 0.1312 },
    { ticker: "ENTG", return: 0.1141 },
    { ticker: "ASML", return: 0.0967 },
    { ticker: "META", return: 0.0958 },
    { ticker: "GOOGL", return: 0.0957 },
    { ticker: "LLY", return: 0.0957 },
    { ticker: "CCJ", return: 0.0924 },
    { ticker: "TSM", return: 0.0863 },
    { ticker: "AMZN", return: 0.0564 },
    { ticker: "MRP", return: 0.0519 },
  ],
  underperformers: [
    { ticker: "XOM", return: -0.0651 },
    { ticker: "SFM", return: -0.0172 },
    { ticker: "TSCO", return: -0.0112 },
    { ticker: "ACN", return: -0.0044 },
    { ticker: "COST", return: -0.0032 },
  ],
};

export function excelDateToDisplay(serial: number): string {
  if (!serial) return "N/A";
  const msPerDay = 86400000;
  const excelEpoch = new Date(1899, 11, 30).getTime();
  return new Date(excelEpoch + serial * msPerDay).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
