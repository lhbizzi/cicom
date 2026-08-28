import { useState } from "react";

const INITIAL_SERVICES = [
  { id: "OS-2026-01", client: "Supermercado Silva", description: "Configuração de rede e backup local", status: "execucao", priority: "alta", value: "R$ 350,00" },
  { id: "OS-2026-02", client: "Drogaria Bem Estar", description: "Instalação do PDV Fiscal / Impressora", status: "triagem", priority: "media", value: "R$ 180,00" },
  { id: "OS-2026-03", client: "Alves & Cia Ltda", description: "Manutenção preventiva em servidor", status: "concluido", priority: "baixa", value: "R$ 600,00" },
  { id: "OS-2026-04", client: "Auto Mecânica Rápida", description: "Ajuste na integração de notas fiscais", status: "peca", priority: "alta", value: "R$ 450,00" },
];

export default function Ordens() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [priorityFilter, setPriorityFilter] = useState("todos");

  const addService = () => {
    const randomId = Math.floor(10 + Math.random() * 90);
    const newService = {
      id: `OS-2026-${randomId}`,
      client: "Cliente Teste",
      description: "Nova Solicitação de Suporte Técnico Registrada",
      status: "triagem",
      priority: Math.random() > 0.5 ? "alta" : "media",
      value: "R$ 220,00"
    };
    setServices([newService, ...services]);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta": return "danger";
      case "media": return "warning";
      case "baixa": return "success";
      default: return "info";
    }
  };

  const filteredServices = services.filter(service => 
    priorityFilter === "todos" || service.priority === priorityFilter
  );

  const getColumnServices = (status) => {
    return filteredServices.filter(s => s.status === status);
  };

  return (
    <div className="glass-panel">
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>🛠️ Painel de Acompanhamento (Ordens de Serviço)</h4>
        <div className="flex-gap">
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>Prioridade:</label>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="select-filter"
          >
            <option value="todos">Todas</option>
            <option value="alta">Alta 🔥</option>
            <option value="media">Média ⚡</option>
            <option value="baixa">Baixa 🛡️</option>
          </select>
          <button className="btn-primary" onClick={addService}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Abrir O.S.
          </button>
        </div>
      </div>

      <div className="kanban-board">
        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">📥 Triagem</span>
            <span className="column-count">{getColumnServices("triagem").length}</span>
          </div>
          {getColumnServices("triagem").map(s => (
            <div key={s.id} className="kanban-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="card-tag">{s.id}</span>
                <span className={`status-pill ${getPriorityColor(s.priority)}`}>{s.priority}</span>
              </div>
              <div className="card-title">{s.client}</div>
              <div className="card-desc">{s.description}</div>
              <div className="card-footer">
                <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>{s.value}</span>
                <span>Aguardando</span>
              </div>
            </div>
          ))}
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">⚡ Em Execução</span>
            <span className="column-count">{getColumnServices("execucao").length}</span>
          </div>
          {getColumnServices("execucao").map(s => (
            <div key={s.id} className="kanban-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="card-tag">{s.id}</span>
                <span className={`status-pill ${getPriorityColor(s.priority)}`}>{s.priority}</span>
              </div>
              <div className="card-title">{s.client}</div>
              <div className="card-desc">{s.description}</div>
              <div className="card-footer">
                <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>{s.value}</span>
                <span className="status-pill info" style={{ fontSize: "0.65rem" }}>Progresso</span>
              </div>
            </div>
          ))}
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">⏳ Aguardando Peças</span>
            <span className="column-count">{getColumnServices("peca").length}</span>
          </div>
          {getColumnServices("peca").map(s => (
            <div key={s.id} className="kanban-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="card-tag">{s.id}</span>
                <span className={`status-pill ${getPriorityColor(s.priority)}`}>{s.priority}</span>
              </div>
              <div className="card-title">{s.client}</div>
              <div className="card-desc">{s.description}</div>
              <div className="card-footer">
                <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>{s.value}</span>
                <span className="status-pill warning" style={{ fontSize: "0.65rem" }}>Pendente</span>
              </div>
            </div>
          ))}
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">✅ Concluído</span>
            <span className="column-count">{getColumnServices("concluido").length}</span>
          </div>
          {getColumnServices("concluido").map(s => (
            <div key={s.id} className="kanban-card" style={{ opacity: 0.8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="card-tag" style={{ textDecoration: "line-through" }}>{s.id}</span>
                <span className="status-pill success" style={{ fontSize: "0.65rem" }}>OK</span>
              </div>
              <div className="card-title" style={{ textDecoration: "line-through" }}>{s.client}</div>
              <div className="card-desc">{s.description}</div>
              <div className="card-footer">
                <span style={{ color: "var(--accent-success)", fontWeight: 600 }}>{s.value}</span>
                <span className="status-pill success">Faturado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
