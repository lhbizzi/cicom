import { useState } from "react";

export default function Faturamento() {
  const [activeRange, setActiveRange] = useState("mes");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const stats = {
    mes: { sales: "R$ 45.230,00", orders: "87", growth: "+12.4%" },
    semestre: { sales: "R$ 254.910,00", orders: "490", growth: "+8.2%" },
  };

  const currentStats = stats[activeRange] || stats.mes;

  const lineData = [
    { label: "Fev", value: 120, display: "R$ 12.000" },
    { label: "Mar", value: 180, display: "R$ 18.000" },
    { label: "Abr", value: 160, display: "R$ 16.000" },
    { label: "Mai", value: 220, display: "R$ 22.000" },
    { label: "Jun", value: 290, display: "R$ 29.000" },
    { label: "Jul", value: 340, display: "R$ 34.000" },
  ];

  return (
    <div className="page-container" style={{ padding: 0 }}>
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>📊 Análise de Faturamento Mensal</h4>
        <div className="flex-gap">
          <button 
            className={`btn-table-action ${activeRange === "mes" ? "btn-primary active" : ""}`}
            style={activeRange === "mes" ? {backgroundColor: "var(--accent-primary)", color: "white"} : {}}
            onClick={() => setActiveRange("mes")}
          >
            Este Mês
          </button>
          <button 
            className={`btn-table-action ${activeRange === "semestre" ? "btn-primary active" : ""}`}
            style={activeRange === "semestre" ? {backgroundColor: "var(--accent-primary)", color: "white"} : {}}
            onClick={() => setActiveRange("semestre")}
          >
            Este Semestre
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Faturamento Total</span>
            <span className="kpi-value">{currentStats.sales}</span>
            <span className="kpi-trend positive">📈 {currentStats.growth} vs período ant.</span>
          </div>
          <div className="kpi-icon-wrapper indigo">💰</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Faturas Processadas</span>
            <span className="kpi-value">{currentStats.orders} un</span>
            <span className="kpi-trend positive">📈 +4.2%</span>
          </div>
          <div className="kpi-icon-wrapper emerald">🧾</div>
        </div>
      </div>

      <div className="chart-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>Curva de Faturamento Semestral (R$)</span>
          {hoveredPoint !== null && (
            <span className="status-pill info" style={{ textTransform: "none", fontSize: "0.75rem" }}>
              {lineData[hoveredPoint].label}: {lineData[hoveredPoint].display}
            </span>
          )}
        </div>
        <svg className="svg-chart" viewBox="0 0 500 200">
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line x1="40" y1="30" x2="480" y2="30" className="grid-line" />
          <line x1="40" y1="80" x2="480" y2="80" className="grid-line" />
          <line x1="40" y1="130" x2="480" y2="130" className="grid-line" />
          <line x1="40" y1="170" x2="480" y2="170" className="grid-line" />

          <path d="M 40 170 Q 120 120 200 130 T 360 80 T 480 50 L 480 170 Z" className="chart-area" />
          <path d="M 40 170 Q 120 120 200 130 T 360 80 T 480 50" className="chart-line" />

          {lineData.map((d, index) => {
            const xPositions = [40, 120, 200, 280, 360, 480];
            const yPositions = [170, 125, 130, 105, 80, 50];
            return (
              <g key={index}>
                <circle 
                  cx={xPositions[index]} 
                  cy={yPositions[index]} 
                  r={hoveredPoint === index ? 6 : 4} 
                  className="chart-dot"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text x={xPositions[index]} y="190" textAnchor="middle" className="chart-axis-text">{d.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
