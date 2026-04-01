import { useState } from "react";
import { positions, excelDateToDisplay } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

function fmtPct(n: number, showSign = true) {
  const val = (n * 100).toFixed(2) + "%";
  return showSign && n >= 0 ? "+" + val : val;
}
function fmtDollar(n: number) {
  return (n >= 0 ? "" : "-") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type SortKey = keyof typeof positions[0];

export default function Holdings() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("currentValue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = positions
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ticker.toLowerCase().includes(search.toLowerCase()) ||
      p.sector.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey] as number | string;
      const bv = b[sortKey] as number | string;
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp className={cn("w-2.5 h-2.5", sortKey === k && sortDir === "asc" ? "text-primary" : "text-muted-foreground/40")} />
      <ChevronDown className={cn("w-2.5 h-2.5 -mt-0.5", sortKey === k && sortDir === "desc" ? "text-primary" : "text-muted-foreground/40")} />
    </span>
  );

  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0);
  const totalCost = positions.reduce((s, p) => s + p.costBasis, 0);
  const totalPnl = positions.reduce((s, p) => s + p.unrealizedGainLoss, 0);

  const Col = ({ label, k, className }: { label: string; k: SortKey; className?: string }) => (
    <th
      className={cn("px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none whitespace-nowrap hover:text-foreground transition-colors", className)}
      onClick={() => handleSort(k)}
    >
      <span className="flex items-center gap-0.5">{label}<SortIcon k={k} /></span>
    </th>
  );

  return (
    <div className="p-6 space-y-5 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Holdings</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{filtered.length} positions</p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring placeholder-muted-foreground"
            placeholder="Search ticker, name, sector..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Market Value</p>
          <p className="text-lg font-bold text-foreground">${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Cost Basis</p>
          <p className="text-lg font-bold text-foreground">${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Unrealized P&L</p>
          <p className={cn("text-lg font-bold", totalPnl >= 0 ? "text-green-600" : "text-red-500")}>
            {fmtDollar(totalPnl)}
          </p>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <Col label="Company" k="name" className="min-w-[160px]" />
                <Col label="Ticker" k="ticker" />
                <Col label="Sector" k="sector" className="hidden lg:table-cell" />
                <Col label="Qty" k="quantity" />
                <Col label="Price" k="currentPrice" />
                <Col label="Day %" k="dayChange" />
                <Col label="Cost Basis" k="costBasis" className="hidden md:table-cell" />
                <Col label="Mkt Value" k="currentValue" />
                <Col label="Unr. P&L" k="unrealizedGainLoss" />
                <Col label="% Return" k="percentReturn" />
                <Col label="Weight" k="weight" className="hidden xl:table-cell" />
                <Col label="Ann. Ret." k="annualizedReturn" className="hidden xl:table-cell" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.ticker} className="hover:bg-muted/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <div>
                      <p className="font-medium text-foreground text-xs leading-tight truncate max-w-[160px]">{p.name}</p>
                      <p className="text-muted-foreground text-xs">{p.industry.slice(0, 30)}</p>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded">{p.ticker}</span>
                  </td>
                  <td className="px-3 py-2.5 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">{p.sector}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="text-xs text-foreground">{p.quantity}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="text-xs font-medium text-foreground">${p.currentPrice.toFixed(2)}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className={cn("text-xs font-medium", p.dayChange >= 0 ? "text-green-600" : "text-red-500")}>
                      {fmtPct(p.dayChange)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right hidden md:table-cell">
                    <span className="text-xs text-foreground">${p.costBasis.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="text-xs font-medium text-foreground">${p.currentValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className={cn("text-xs font-medium", p.unrealizedGainLoss >= 0 ? "text-green-600" : "text-red-500")}>
                      {fmtDollar(p.unrealizedGainLoss)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className={cn(
                      "text-xs font-bold px-1.5 py-0.5 rounded",
                      p.percentReturn >= 0.1 ? "bg-green-100 text-green-700" :
                      p.percentReturn >= 0 ? "bg-green-50 text-green-600" :
                      p.percentReturn >= -0.1 ? "bg-red-50 text-red-500" : "bg-red-100 text-red-700"
                    )}>
                      {fmtPct(p.percentReturn)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right hidden xl:table-cell">
                    <span className="text-xs text-muted-foreground">{(p.weight * 100).toFixed(2)}%</span>
                  </td>
                  <td className="px-3 py-2.5 text-right hidden xl:table-cell">
                    <span className={cn("text-xs font-medium", p.annualizedReturn >= 0 ? "text-green-600" : "text-red-500")}>
                      {fmtPct(p.annualizedReturn)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
