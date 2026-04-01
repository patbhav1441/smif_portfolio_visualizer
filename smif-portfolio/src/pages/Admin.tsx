import { useState } from "react";
import { positions as initialPositions, Position } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Lock, Eye, EyeOff, Save, Plus, Trash2, RotateCcw, Shield, CheckCircle } from "lucide-react";

const ADMIN_PASSWORD = "1234";

function fmtPct(n: number) {
  return (n >= 0 ? "+" : "") + (n * 100).toFixed(2) + "%";
}

type EditablePosition = Omit<Position, "unrealizedGainLoss" | "percentReturn" | "weightExCash" | "weight"> & {
  unrealizedGainLoss?: number;
  percentReturn?: number;
  weightExCash?: number;
  weight?: number;
};

function computeDerived(p: EditablePosition): Position {
  const costBasis = p.quantity * p.purchasePrice;
  const currentValue = p.quantity * p.currentPrice;
  const unrealizedGainLoss = currentValue - costBasis;
  const percentReturn = costBasis > 0 ? unrealizedGainLoss / costBasis : 0;
  return {
    ...p,
    costBasis,
    currentValue,
    unrealizedGainLoss,
    percentReturn,
    weightExCash: p.weightExCash ?? 0,
    weight: p.weight ?? 0,
  };
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [editedPositions, setEditedPositions] = useState<Position[]>(JSON.parse(JSON.stringify(initialPositions)));
  const [saveMsg, setSaveMsg] = useState("");
  const [newRow, setNewRow] = useState<Partial<EditablePosition>>({});
  const [showNewRow, setShowNewRow] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const updateField = (ticker: string, field: keyof Position, value: string) => {
    setEditedPositions(prev => prev.map(p => {
      if (p.ticker !== ticker) return p;
      const numericFields: (keyof Position)[] = ["quantity", "currentPrice", "prevClose", "purchasePrice", "dayChange", "costBasis", "annualizedReturn", "holdingPeriod", "purchaseDateSerial"];
      const updated = {
        ...p,
        [field]: numericFields.includes(field) ? parseFloat(value) || 0 : value,
      };
      if (["quantity", "currentPrice", "purchasePrice"].includes(field)) {
        return computeDerived(updated);
      }
      return updated;
    }));
  };

  const deletePosition = (ticker: string) => {
    setEditedPositions(prev => prev.filter(p => p.ticker !== ticker));
  };

  const handleAddPosition = () => {
    if (!newRow.ticker || !newRow.name) return;
    const ep: EditablePosition = {
      name: newRow.name || "",
      ticker: newRow.ticker || "",
      quantity: newRow.quantity || 0,
      currentPrice: newRow.currentPrice || 0,
      prevClose: newRow.prevClose || 0,
      purchasePrice: newRow.purchasePrice || 0,
      costBasis: (newRow.quantity || 0) * (newRow.purchasePrice || 0),
      dayChange: newRow.dayChange || 0,
      sector: newRow.sector || "",
      industry: newRow.industry || "",
      purchaseDateSerial: newRow.purchaseDateSerial || 0,
      holdingPeriod: newRow.holdingPeriod || 0,
      annualizedReturn: newRow.annualizedReturn || 0,
    };
    setEditedPositions(prev => [...prev, computeDerived(ep)]);
    setNewRow({});
    setShowNewRow(false);
  };

  const handleSave = () => {
    setSaveMsg("Changes saved to session (refresh to reset).");
    setTimeout(() => setSaveMsg(""), 4000);
  };

  const handleReset = () => {
    setEditedPositions(JSON.parse(JSON.stringify(initialPositions)));
    setSaveMsg("Reset to original data.");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-card-border rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Admin Access</h1>
              <p className="text-muted-foreground text-sm mt-1 text-center">Enter the admin password to manage portfolio positions.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" /> Authenticated
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-0.5">Edit portfolio positions. Changes apply to this session.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>

      {saveMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {saveMsg}
        </div>
      )}

      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{editedPositions.length} Positions</span>
          <button
            onClick={() => setShowNewRow(v => !v)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Position
          </button>
        </div>

        {showNewRow && (
          <div className="border-b border-border bg-accent/30 p-4">
            <p className="text-xs font-semibold text-foreground mb-3">New Position</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {(["ticker", "name", "sector", "quantity", "currentPrice", "purchasePrice", "industry"] as const).map(field => (
                <div key={field}>
                  <label className="text-xs text-muted-foreground capitalize">{field}</label>
                  <input
                    className="w-full text-xs border border-border rounded px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                    value={String(newRow[field] ?? "")}
                    onChange={e => setNewRow(prev => ({ ...prev, [field]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="flex items-end">
                <button
                  onClick={handleAddPosition}
                  className="w-full text-xs bg-primary text-primary-foreground rounded px-2 py-1 font-medium hover:opacity-90"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Ticker</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground min-w-[140px]">Name</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground min-w-[120px]">Sector</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Qty</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Curr Price</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Purchase Price</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Cost Basis</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Mkt Value</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Unr. P&L</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">% Ret</th>
                <th className="px-3 py-2 text-center font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {editedPositions.map(p => (
                <tr key={p.ticker} className="hover:bg-muted/20">
                  <td className="px-3 py-1.5">
                    <span className="font-bold text-primary">{p.ticker}</span>
                  </td>
                  <td className="px-3 py-1.5">
                    <input
                      className="w-full border border-transparent hover:border-border focus:border-primary rounded px-1 py-0.5 bg-transparent focus:bg-background focus:outline-none min-w-[120px]"
                      value={p.name}
                      onChange={e => updateField(p.ticker, "name", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-1.5">
                    <input
                      className="w-full border border-transparent hover:border-border focus:border-primary rounded px-1 py-0.5 bg-transparent focus:bg-background focus:outline-none min-w-[100px]"
                      value={p.sector}
                      onChange={e => updateField(p.ticker, "sector", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    <input
                      type="number"
                      className="w-16 text-right border border-transparent hover:border-border focus:border-primary rounded px-1 py-0.5 bg-transparent focus:bg-background focus:outline-none"
                      value={p.quantity}
                      onChange={e => updateField(p.ticker, "quantity", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    <input
                      type="number"
                      step="0.01"
                      className="w-20 text-right border border-transparent hover:border-border focus:border-primary rounded px-1 py-0.5 bg-transparent focus:bg-background focus:outline-none"
                      value={p.currentPrice}
                      onChange={e => updateField(p.ticker, "currentPrice", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    <input
                      type="number"
                      step="0.01"
                      className="w-20 text-right border border-transparent hover:border-border focus:border-primary rounded px-1 py-0.5 bg-transparent focus:bg-background focus:outline-none"
                      value={p.purchasePrice}
                      onChange={e => updateField(p.ticker, "purchasePrice", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-1.5 text-right text-muted-foreground">
                    ${p.costBasis.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-3 py-1.5 text-right text-foreground font-medium">
                    ${p.currentValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    <span className={cn("font-medium", p.unrealizedGainLoss >= 0 ? "text-green-600" : "text-red-500")}>
                      {p.unrealizedGainLoss >= 0 ? "+$" : "-$"}{Math.abs(p.unrealizedGainLoss).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    <span className={cn("font-bold px-1.5 py-0.5 rounded", p.percentReturn >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600")}>
                      {fmtPct(p.percentReturn)}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <button
                      onClick={() => deletePosition(p.ticker)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
