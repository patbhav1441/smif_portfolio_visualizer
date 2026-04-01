import { positions, cash, sectorWeights, ytdPerformers, portfolioStats } from "@/data/portfolio";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTOR_COLORS = [
  "#2563eb","#16a34a","#d97706","#dc2626","#7c3aed",
  "#0891b2","#db2777","#65a30d","#ea580c","#0d9488","#6366f1"
];

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
function fmtDollar(n: number) {
  return "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtPct(n: number) {
  return (n >= 0 ? "+" : "") + (n * 100).toFixed(2) + "%";
}

const sectorPieData = sectorWeights.map(s => ({
  name: s.sector.replace("Information Technology", "Info Tech").replace("Communication Services", "Comm Svcs").replace("Consumer Discretionary", "Cons Disc").replace("Consumer Staples", "Cons Stpl"),
  smif: +(s.smifWeight * 100).toFixed(2),
  sp500: +(s.sp500Weight * 100).toFixed(2),
}));

const topHoldings = [...positions]
  .sort((a, b) => b.currentValue - a.currentValue)
  .slice(0, 8);

const StatCard = ({
  label, value, sub, positive, icon: Icon
}: { label: string; value: string; sub?: string; positive?: boolean; icon?: React.ElementType }) => (
  <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      {Icon && <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>}
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {sub && (
      <p className={cn("text-xs font-medium", positive === undefined ? "text-muted-foreground" : positive ? "text-green-600" : "text-red-500")}>
        {sub}
      </p>
    )}
  </div>
);

export default function Overview() {
  const equityValue = cash.totalPortfolio - cash.cashValue - cash.moneyMarket;
  const cashPct = ((cash.cashValue + cash.moneyMarket) / cash.totalPortfolio * 100).toFixed(1);

  const totalCostBasis = positions.reduce((s, p) => s + p.costBasis, 0);
  const totalUnrealized = positions.reduce((s, p) => s + p.unrealizedGainLoss, 0);
  const overallReturn = totalUnrealized / totalCostBasis;

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portfolio Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Student Managed Investment Fund — as of March 30, 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Portfolio Value"
          value={`$${fmt(cash.totalPortfolio)}`}
          sub={`Day: ${fmtPct(portfolioStats.dayChange)}`}
          positive={portfolioStats.dayChange >= 0}
          icon={DollarSign}
        />
        <StatCard
          label="Equity Value"
          value={`$${fmt(equityValue)}`}
          sub={`${(100 - +cashPct).toFixed(1)}% of portfolio`}
          icon={BarChart2}
        />
        <StatCard
          label="Unrealized Gain/Loss"
          value={(totalUnrealized >= 0 ? "+" : "") + fmtDollar(totalUnrealized)}
          sub={fmtPct(overallReturn) + " total return"}
          positive={totalUnrealized >= 0}
          icon={totalUnrealized >= 0 ? TrendingUp : TrendingDown}
        />
        <StatCard
          label="Cash & Money Market"
          value={`$${fmt(cash.cashValue + cash.moneyMarket)}`}
          sub={`${cashPct}% of portfolio`}
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">SMIF Sector Allocation</h2>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorPieData}
                  dataKey="smif"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                >
                  {sectorPieData.map((_, i) => (
                    <Cell key={i} fill={SECTOR_COLORS[i % SECTOR_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v.toFixed(1)}%`, "Weight"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sectorPieData.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: SECTOR_COLORS[i % SECTOR_COLORS.length] }} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">SMIF vs S&P 500 Sector Weights</h2>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorPieData} layout="vertical" margin={{ left: 0, right: 10 }}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">Top 8 Holdings by Value</h2>
          <div className="space-y-2">
            {topHoldings.map((p) => (
              <div key={p.ticker} className="flex items-center gap-3">
                <div className="w-12 text-right shrink-0">
                  <span className="text-xs font-bold text-foreground">{p.ticker}</span>
                </div>
                <div className="flex-1 relative h-6 flex items-center">
                  <div
                    className="h-5 rounded bg-primary/80 flex items-center px-2"
                    style={{ width: `${(p.currentValue / topHoldings[0].currentValue) * 100}%`, minWidth: 30 }}
                  >
                    <span className="text-white text-xs font-medium whitespace-nowrap overflow-hidden">${Math.round(p.currentValue / 1000)}k</span>
                  </div>
                </div>
                <div className="w-16 text-right shrink-0">
                  <span className={cn("text-xs font-medium", p.percentReturn >= 0 ? "text-green-600" : "text-red-500")}>
                    {fmtPct(p.percentReturn)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">YTD Top Performers</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Outperformers</p>
              <div className="space-y-1.5">
                {ytdPerformers.outperformers.slice(0, 5).map(p => (
                  <div key={p.ticker} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{p.ticker}</span>
                    <span className="text-xs font-bold text-green-600">+{(p.return * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Underperformers</p>
              <div className="space-y-1.5">
                {ytdPerformers.underperformers.slice(0, 5).map(p => (
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
        <h2 className="text-sm font-semibold text-foreground mb-4">Portfolio vs SPY — Daily Comparison</h2>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">SMIF Daily Change</span>
            <span className={cn("text-2xl font-bold", portfolioStats.dayChange >= 0 ? "text-green-600" : "text-red-500")}>
              {fmtPct(portfolioStats.dayChange)}
            </span>
            <span className="text-xs text-muted-foreground">Port: ${fmt(cash.totalPortfolio)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">SPY Daily Change</span>
            <span className={cn("text-2xl font-bold", portfolioStats.spyDayChange >= 0 ? "text-green-600" : "text-red-500")}>
              {fmtPct(portfolioStats.spyDayChange)}
            </span>
            <span className="text-xs text-muted-foreground">SPY: {fmt(portfolioStats.spyLevel)} pts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Relative Performance</span>
            <span className={cn("text-2xl font-bold", portfolioStats.dayChange - portfolioStats.spyDayChange >= 0 ? "text-green-600" : "text-red-500")}>
              {fmtPct(portfolioStats.dayChange - portfolioStats.spyDayChange)}
            </span>
            <span className="text-xs text-muted-foreground">Alpha vs SPY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
