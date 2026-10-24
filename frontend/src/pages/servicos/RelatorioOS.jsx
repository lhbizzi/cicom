import { useState } from "react";
import OrdemServicoTabs from "../../components/OrdemServicoTabs";

const INITIAL_RELATORIO = [
  {
    id: "1042",
    cliente: "Usina Santa Rita S/A",
    entrada: "15/10/2026",
    saida: "24/10/2026",
    extintores: 15,
    tipoServico: "Ensaio Hidrostático N3",
    valor: "R$ 2.450,00",
    status: "Pronto",
    tecnico: "Carlos Eduardo",
  },
  {
    id: "1041",
    cliente: "Condomínio Solar das Flores",
    entrada: "18/10/2026",
    saida: "23/10/2026",
    extintores: 4,
    tipoServico: "Recarga Nível 2",
    valor: "R$ 680,00",
    status: "Pronto",
    tecnico: "Marcos Vinicius",
  },
  {
    id: "1040",
    cliente: "Transportes Silva & Filhos",
    entrada: "10/10/2026",
    saida: "22/10/2026",
    extintores: 20,
    tipoServico: "Inspeção + Pintura",
    valor: "R$ 3.100,00",
    status: "Faturado",
    tecnico: "Roberto Santos",
  },
  {
    id: "1039",
    cliente: "Comercial de Bebidas União",
    entrada: "08/10/2026",
    saida: "19/10/2026",
    extintores: 8,
    tipoServico: "Recarga Anual ABC",
    valor: "R$ 1.120,00",
    status: "Faturado",
    tecnico: "Carlos Eduardo",
  },
  {
    id: "1038",
    cliente: "Hospital Geral São Lucas",
    entrada: "05/10/2026",
    saida: "14/10/2026",
    extintores: 32,
    tipoServico: "Manutenção Geral Lote",
    valor: "R$ 4.890,00",
    status: "Faturado",
    tecnico: "Marcos Vinicius",
  },
];

export default function RelatorioOS({ currentRoute, setCurrentRoute }) {
  const [dados, setDados] = useState(INITIAL_RELATORIO);
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [tecnicoFiltro, setTecnicoFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");

  const filtrados = dados.filter((item) => {
    const matchStatus = statusFiltro === "Todos" || item.status === statusFiltro;
    const matchTecnico = tecnicoFiltro === "Todos" || item.tecnico === tecnicoFiltro;
    const matchBusca =
      item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      item.id.includes(busca) ||
      item.tipoServico.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchTecnico && matchBusca;
  });

  const totalExtintores = filtrados.reduce((acc, curr) => acc + curr.extintores, 0);

  return (
    <div>
      {/* Submenu de Navegação entre os menus de OS */}
      <OrdemServicoTabs
        activeTab="relatorio"
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="glass-panel">
        <div className="control-bar">
          <div>
            <h4 style={{ fontWeight: 600 }}>📊 Relatorio de Ordem em Servico</h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Relatórios gerenciais, conformidade Inmetro e controle histórico de manutenção
            </span>
          </div>

          <div className="flex-gap">
            <select
              className="select-filter"
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option value="Todos">Status: Todos</option>
              <option value="Pronto">Pronto</option>
              <option value="Faturado">Faturado</option>
            </select>

            <select
              className="select-filter"
              value={tecnicoFiltro}
              onChange={(e) => setTecnicoFiltro(e.target.value)}
            >
              <option value="Todos">Técnico: Todos</option>
              <option value="Carlos Eduardo">Carlos Eduardo</option>
              <option value="Marcos Vinicius">Marcos Vinicius</option>
              <option value="Roberto Santos">Roberto Santos</option>
            </select>

            <input
              type="text"
              placeholder="Filtrar por Cliente, Nº OS ou Serviço..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input-search"
              style={{ minWidth: "240px" }}
            />

            <button
              className="btn-primary"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
              onClick={() => window.print()}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Imprimir Relatório
            </button>
          </div>
        </div>

        {/* KPI Cards Resumo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Total de O.S. Listadas
            </span>
            <h3 style={{ marginTop: "0.25rem", color: "var(--accent-primary)" }}>
              {filtrados.length}
            </h3>
          </div>
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Extintores Inspecionados
            </span>
            <h3 style={{ marginTop: "0.25rem", color: "var(--accent-success)" }}>
              {totalExtintores} un.
            </h3>
          </div>
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Faturamento Filtrado
            </span>
            <h3 style={{ marginTop: "0.25rem", color: "var(--text-primary)" }}>
              R$ 12.240,00
            </h3>
          </div>
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Tempo Médio de Bancada
            </span>
            <h3 style={{ marginTop: "0.25rem", color: "var(--accent-warning)" }}>
              3.5 Dias
            </h3>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Cliente</th>
                <th>Data Entrada</th>
                <th>Data Saída</th>
                <th>Extintores</th>
                <th>Serviço Predominante</th>
                <th>Técnico</th>
                <th>Valor Total</th>
                <th>Status Final</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>#{item.id}</td>
                  <td style={{ fontWeight: 500 }}>{item.cliente}</td>
                  <td>{item.entrada}</td>
                  <td>{item.saida}</td>
                  <td>{item.extintores} un.</td>
                  <td>
                    <span className="status-pill info">{item.tipoServico}</span>
                  </td>
                  <td>{item.tecnico}</td>
                  <td style={{ fontWeight: 600, color: "var(--accent-primary)" }}>
                    {item.valor}
                  </td>
                  <td>
                    <span
                      className={`status-pill ${
                        item.status === "Faturado" ? "success" : "info"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    Nenhuma ordem de serviço encontrada com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
