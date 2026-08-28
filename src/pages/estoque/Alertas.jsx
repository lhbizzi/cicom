import { useState } from "react";

const INITIAL_ALERTS = [
  { id: "EST-02", name: "Lâmpada LED Inteligente 10W", current: 8, min: 15, max: 80, unit: "un" },
  { id: "EST-04", name: "Suporte Articulado TV", current: 5, min: 10, max: 50, unit: "un" },
  { id: "EST-06", name: "Mouse Óptico Sem Fio", current: 3, min: 8, max: 40, unit: "un" },
];

export default function Alertas() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const simulateReplenish = (id) => {
    setAlerts(alerts.map(item => {
      if (item.id === id) {
        return { ...item, current: item.min + 10 }; // Fill above minimum
      }
      return item;
    }));
  };

  return (
    <div className="glass-panel">
      <h4 style={{ marginBottom: "1.25rem", fontWeight: 600 }}>⚠️ Alertas de Estoque Mínimo Atingido</h4>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {alerts.map((item) => {
          const percentage = Math.round((item.current / item.max) * 100);
          const isCritical = item.current <= item.min * 0.5;
          
          return (
            <div 
              key={item.id} 
              className="kpi-card" 
              style={{ 
                flexDirection: "column", 
                alignItems: "stretch", 
                gap: "0.75rem",
                borderLeft: `4px solid var(--accent-${isCritical ? 'danger' : 'warning'})`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span className="card-tag">{item.id}</span>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", marginLeft: "0.5rem" }}>{item.name}</span>
                </div>
                <span className={`status-pill ${isCritical ? 'danger' : 'warning'}`}>
                  {isCritical ? 'Crítico 🚨' : 'Baixo ⚠️'}
                </span>
              </div>

              <div className="progress-container">
                <div className="progress-label-bar" style={{ fontSize: "0.75rem" }}>
                  <span>Estoque Atual: {item.current} {item.unit} (Mínimo: {item.min})</span>
                  <span>Capacidade: {percentage}%</span>
                </div>
                <div className="progress-bar-bg" style={{ height: "6px" }}>
                  <div 
                    className={`progress-bar-fill ${isCritical ? 'danger' : 'warning'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button 
                  className="btn-table-action" 
                  style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                  onClick={() => simulateReplenish(item.id)}
                >
                  📦 Solicitar Compra / Abastecer
                </button>
              </div>
            </div>
          );
        })}

        {alerts.filter(i => i.current <= i.min).length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
            Todos os itens estão com nível de estoque regular.
          </div>
        )}
      </div>
    </div>
  );
}
