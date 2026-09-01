import { useState } from "react";

const INITIAL_STOCK = [
  { id: "EST-01", name: "Cabo HDMI 2.0 3 metros", current: 120, max: 200, unit: "un" },
  { id: "EST-03", name: "Filtro de Linha 5 Tomadas", current: 67, max: 150, unit: "un" },
  { id: "EST-05", name: "Teclado Mecânico RGB", current: 24, max: 30, unit: "un" },
];

export default function Posicao() {
  const [stock, setStock] = useState(INITIAL_STOCK);

  const simulateTransaction = (id, amount) => {
    setStock(stock.map(item => {
      if (item.id === id) {
        return { ...item, current: Math.max(0, Math.min(item.current + amount, item.max)) };
      }
      return item;
    }));
  };

  return (
    <div className="glass-panel">
      <h4 style={{ marginBottom: "1rem", fontWeight: 600 }}>📦 Posição Atual do Estoque</h4>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição do Item</th>
              <th>Estoque Disponível</th>
              <th>Capacidade Máxima</th>
              <th>Ações de Simulação</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => {
              const percentage = Math.round((item.current / item.max) * 100);
              return (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.id}</td>
                  <td>{item.name}</td>
                  <td><span style={{ fontWeight: 600, color: "var(--accent-primary)" }}>{item.current}</span> {item.unit}</td>
                  <td>{item.max} {item.unit} ({percentage}%)</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-table-action" onClick={() => simulateTransaction(item.id, 10)}>📥 Entrada (+10)</button>
                      <button className="btn-table-action delete" disabled={item.current === 0} onClick={() => simulateTransaction(item.id, -10)}>📤 Retirada (-10)</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
