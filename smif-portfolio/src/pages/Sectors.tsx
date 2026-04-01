import { positions, sectorWeights } from "@/data/portfolio";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Legend
} from "recharts";
import { cn } from "@/lib/utils";

const SECTOR_COLORS: Record<string, string> = {
  "Information Technology": "#2563eb",
  "Financials": "#16a34a",
  "Health Care": "#7c3aed",
  "Consumer Discretionary": "#d97706",
  "Communication Services": "#0891b2",
  "Industrials": "#db2777",
  "Consumer Staples": "#65a30d",
  "Energy": "#ea580c",
  "Real Estate": "#0d9488",
  "Materials": "#6366f1",
  "Utilities": "#f59e0b",
};

function fmtPct(n: number, showSign = false) {
  return (showSign && n >= 0 ? "+" : "") + (n * 100).toFixed(2) + "%";
}

export default function Sectors() {
  const sectorMap: Record<string, { holdings: typeof positions; totalValue: number }> = {};

  positions.forEach(p => {
    if (!p.sector) return;
    if (!sectorMap[p.sector]) sectorMap[p.sector] = { holdings: [], totalValue: 0 };
    sectorMap[p.sector].holdings.push(p);
    sectorMap[p.sector].totalValue += p.currentValue;
  });

  const owUwData = sectorWeights.map(s => ({
    name: s.sector
      .replace("Information Technology", "Info Tech")
      .replace("Communication Services", "Comm Svcs")
      .replace("Consumer Discretionary", "Cons Disc")
      .replace("Consumer Staples", "Cons Stpl"),
    owUw: +(s.owUw * 100).toFixed(2),
    smif: +(s.smifWeight * 100).toFixed(2),
    sp500: +(s.sp500Weight * 100).toFixed(2),
  })).sort((a, b) => b.owUw - a.owUw);

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sector Analysis</h1>
        <p className="text-muted-foreground text-sm mt-1">SMIF sector weights vs S&P 500 benchmark</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">Over/Underweight vs S&P 500</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={owUwData} layout="vertical" margin={{ right: 16, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={v => v.toFixed(1) + "%"} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={62} />
                <Tooltip
                  formatter={(v: number) => [(v >= 0 ? "+" : "") + v.toFixed(2) + "%", "OW/UW"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={1} />
                <Bar dataKey="owUw" name="OW/UW" radius={[0, 3, 3, 0]}>
                  {owUwData.map((d, i) => (
                    <Cell key={i} fill={d.owUw >= 0 ? "#16a34a" : "#dc2626"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">SMIF vs S&P 500 Weights</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={owUwData} layout="vertical" margin={{ right: 16, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={v => v + "%"} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={62} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="smif" name="SMIF" fill="#2563eb" radius={[0, 3, 3, 0]} />
                <Bar dataKey="sp500" name="S&P 500" fill="#94a3b8" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Sector Summary Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Sector</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase">Holdings</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase">Mkt Value</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase">SMIF Wt</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase">S&P 500 Wt</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase">OW/UW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sectorWeights.map(sw => {
                const s = sectorMap[sw.sector];
                const color = SECTOR_COLORS[sw.sector] || "#94a3b8";
                return (
                  <tr key={sw.sector} className="hover:bg-muted/30">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                        <span className="text-xs font-medium text-foreground">{sw.sector}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right text-xs text-muted-foreground">{s?.holdings.length ?? 0}</td>
                    <td className="px-3 py-2.5 text-right text-xs text-foreground">${(s?.totalValue ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}</td>
                    <td className="px-3 py-2.5 text-right text-xs text-foreground">{fmtPct(sw.smifWeight)}</td>
                    <td className="px-3 py-2.5 text-right text-xs text-muted-foreground">{fmtPct(sw.sp500Weight)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", sw.owUw >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600")}>
                        {fmtPct(sw.owUw, true)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Holdings by Sector</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.entries(sectorMap)
            .filter(([, v]) => v.holdings.length > 0)
            .sort((a, b) => b[1].totalValue - a[1].totalValue)
            .map(([sector, data]) => {
              const color = SECTOR_COLORS[sector] || "#94a3b8";
              const sortedHoldings = [...data.holdings].sort((a, b) => b.currentValue - a.currentValue);
              return (
                <div key={sector} className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: color }} />
                    <span className="text-xs font-bold text-foreground">{sector}</span>
                    <span className="ml-auto text-xs text-muted-foreground">${data.totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="space-y-1.5">
                    {sortedHoldings.map(p => (
                      <div key={p.ticker} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground w-12">{p.ticker}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[100px]">{p.name.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-foreground">${p.currentValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                          <span className={cn("text-xs font-medium", p.percentReturn >= 0 ? "text-green-600" : "text-red-500")}>
                            {p.percentReturn >= 0 ? "+" : ""}{(p.percentReturn * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
