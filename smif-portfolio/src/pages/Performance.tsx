import { positions, ytdPerformers, fiveDayPerformers, recentlySold } from "@/data/portfolio";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Award, AlertTriangle, Package } from "lucide-react";

function fmtPct(n: number) {
  return (n >= 0 ? "+" : "") + (n * 100).toFixed(2) + "%";
}

export default function Performance() {
  const allByReturn = [...positions].sort((a, b) => b.percentReturn - a.percentReturn);
  const topWinners = allByReturn.slice(0, 10);
  const topLosers = allByReturn.slice(-10).reverse();

  const dayChangeData = [...positions]
    .sort((a, b) => b.dayChange - a.dayChange)
    .map(p => ({ name: p.ticker, pct: +(p.dayChange * 100).toFixed(2) }));

  const returnBarData = [...positions]
    .sort((a, b) => b.percentReturn - a.percentReturn)
    .map(p => ({ name: p.ticker, pct: +(p.percentReturn * 100).toFixed(1) }));

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Performance</h1>
        <p className="text-muted-foreground text-sm mt-1">Winners, losers, and returns across the portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-green-600" />
            <h2 className="text-sm font-semibold text-foreground">Top 10 Winners (Total Return)</h2>
          </div>
          <div className="space-y-2">
            {topWinners.map((p, i) => (
              <div key={p.ticker} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 text-right shrink-0">{i + 1}</span>
                <span className="text-xs font-bold text-foreground w-12 shrink-0">{p.ticker}</span>
                <div className="flex-1 relative">
                  <div
                    className="h-5 rounded bg-green-500/80 flex items-center px-2"
                    style={{ width: `${Math.min((p.percentReturn / topWinners[0].percentReturn) * 100, 100)}%`, minWidth: 40 }}
                  >
                    <span className="text-white text-xs font-medium">{fmtPct(p.percentReturn)}</span>
                  </div>
                </div>
                <div className="text-right w-24 shrink-0">
                  <p className="text-xs text-muted-foreground truncate">{p.name.split(" ")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-semibold text-foreground">Top 10 Losers (Total Return)</h2>
          </div>
          <div className="space-y-2">
            {topLosers.map((p, i) => (
              <div key={p.ticker} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 text-right shrink-0">{i + 1}</span>
                <span className="text-xs font-bold text-foreground w-12 shrink-0">{p.ticker}</span>
                <div className="flex-1 relative">
                  <div
                    className="h-5 rounded bg-red-500/80 flex items-center px-2"
                    style={{ width: `${Math.min((Math.abs(p.percentReturn) / Math.abs(topLosers[0].percentReturn)) * 100, 100)}%`, minWidth: 40 }}
                  >
                    <span className="text-white text-xs font-medium">{fmtPct(p.percentReturn)}</span>
                  </div>
                </div>
                <div className="text-right w-24 shrink-0">
                  <p className="text-xs text-muted-foreground truncate">{p.name.split(" ")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Total Return by Position</h2>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={returnBarData} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" interval={0} />
              <YAxis tickFormatter={v => v + "%"} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => [(v >= 0 ? "+" : "") + v.toFixed(1) + "%", "Return"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <ReferenceLine y={0} stroke="#94a3b8" />
              <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
                {returnBarData.map((d, i) => (
                  <Cell key={i} fill={d.pct >= 0 ? "#16a34a" : "#dc2626"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">YTD Performers</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-green-600 mb-2">Outperformers</p>
              <div className="space-y-1.5">
                {ytdPerformers.outperformers.map(p => (
                  <div key={p.ticker} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{p.ticker}</span>
                    <span className="text-xs font-bold text-green-600">+{(p.return * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 mb-2">Underperformers</p>
              <div className="space-y-1.5">
                {ytdPerformers.underperformers.map(p => (
                  <div key={p.ticker} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{p.ticker}</span>
                    <span className="text-xs font-bold text-red-500">{(p.return * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">5-Day Performers</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-green-600 mb-2">Outperformers</p>
              <div className="space-y-1.5">
                {fiveDayPerformers.outperformers.map(p => (
                  <div key={p.ticker} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{p.ticker}</span>
                    <span className="text-xs font-bold text-green-600">+{(p.return * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 mb-2">Underperformers</p>
              <div className="space-y-1.5">
                {fiveDayPerformers.underperformers.map(p => (
                  <div key={p.ticker} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{p.ticker}</span>
                    <span className="text-xs font-bold text-red-500">{(p.return * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Recently Sold Securities</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {recentlySold.map(s => (
            <div key={s.ticker} className="bg-muted/40 rounded-lg p-3 text-center">
              <p className="text-sm font-bold text-foreground">{s.ticker}</p>
              <p className="text-xs text-muted-foreground mt-1">Proceeds</p>
              <p className="text-xs font-semibold text-green-600">${s.cashReceived.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          ))}
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <p className="text-sm font-bold text-foreground">TOTAL</p>
            <p className="text-xs text-muted-foreground mt-1">Proceeds</p>
            <p className="text-xs font-semibold text-green-600">
              ${recentlySold.reduce((s, x) => s + x.cashReceived, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Day Change by Position</h2>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayChangeData} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" interval={0} />
              <YAxis tickFormatter={v => v + "%"} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => [(v >= 0 ? "+" : "") + v.toFixed(2) + "%", "Day Change"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <ReferenceLine y={0} stroke="#94a3b8" />
              <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
                {dayChangeData.map((d, i) => (
                  <Cell key={i} fill={d.pct >= 0 ? "#16a34a" : "#dc2626"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
