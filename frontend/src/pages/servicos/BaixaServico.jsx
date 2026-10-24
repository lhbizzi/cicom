import { useState } from "react";
import { createPortal } from "react-dom";
import OrdemServicoTabs from "../../components/OrdemServicoTabs";

const INITIAL_PENDENCIAS = [
  {
    id: "OS-1042",
    cliente: "Usina Santa Rita S/A",
    extintores: 15,
    etapaAtual: "Bancada Hidrostática",
    tecnico: "Carlos Eduardo",
    dataEntrada: "24/10/2026",
    status: "Em Execução",
    itens: [
      { id: 1, serie: "EXT-8891", tipo: "PQS ABC 4kg", selo: "INMETRO-781201", testeHidro: true, recarga: true },
      { id: 2, serie: "EXT-8892", tipo: "PQS ABC 4kg", selo: "INMETRO-781202", testeHidro: true, recarga: true },
      { id: 3, serie: "EXT-8893", tipo: "CO2 6kg", selo: "INMETRO-781203", testeHidro: true, recarga: true },
    ],
  },
  {
    id: "OS-1041",
    cliente: "Condomínio Solar das Flores",
    extintores: 4,
    etapaAtual: "Pintura e Selagem",
    tecnico: "Marcos Vinicius",
    dataEntrada: "23/10/2026",
    status: "Em Execução",
    itens: [
      { id: 1, serie: "SOL-101", tipo: "CO2 6kg", selo: "INMETRO-781210", testeHidro: false, recarga: true },
      { id: 2, serie: "SOL-102", tipo: "PQS ABC 4kg", selo: "INMETRO-781211", testeHidro: false, recarga: true },
    ],
  },
  {
    id: "OS-1040",
    cliente: "Transportes Silva & Filhos",
    extintores: 20,
    etapaAtual: "Inspeção Nível 3",
    tecnico: "Roberto Santos",
    dataEntrada: "22/10/2026",
    status: "Em Execução",
    itens: [
      { id: 1, serie: "TRA-301", tipo: "AP 10L", selo: "INMETRO-781220", testeHidro: true, recarga: true },
    ],
  },
];

export default function BaixaServico({ currentRoute, setCurrentRoute }) {
  const [pendencias, setPendencias] = useState(INITIAL_PENDENCIAS);
  const [selectedOS, setSelectedOS] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [baixasRealizadas, setBaixasRealizadas] = useState([
    {
      osId: "OS-1038",
      cliente: "Hospital Geral São Lucas",
      extintores: 32,
      dataBaixa: "24/10/2026 09:40",
      tecnico: "Marcos Vinicius",
    },
  ]);

  const handleDarBaixa = (os) => {
    setSelectedOS(os);
    setSucesso(false);
  };

  const handleConfirmarBaixa = (e) => {
    e.preventDefault();
    if (!selectedOS) return;

    setPendencias(pendencias.filter((item) => item.id !== selectedOS.id));
    setBaixasRealizadas([
      {
        osId: selectedOS.id,
        cliente: selectedOS.cliente,
        extintores: selectedOS.extintores,
        dataBaixa: new Date().toLocaleString("pt-BR"),
        tecnico: selectedOS.tecnico,
      },
      ...baixasRealizadas,
    ]);

    setSucesso(true);
    setTimeout(() => {
      setSelectedOS(null);
      setSucesso(false);
    }, 1800);
  };

  const filtrados = pendencias.filter(
    (item) =>
      item.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      item.id.toLowerCase().includes(filtro.toLowerCase()) ||
      item.tecnico.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      {/* Submenu de Navegação entre os menus de OS */}
      <OrdemServicoTabs
        activeTab="baixa"
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="glass-panel">
        <div className="control-bar">
          <div>
            <h4 style={{ fontWeight: 600 }}>✅ Baixa Servico Feito OS</h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Apontamento técnico, validação de selos Inmetro (RN-04) e encerramento de bancada
            </span>
          </div>

          <div className="flex-gap">
            <input
              type="text"
              placeholder="Buscar por Nº OS, Cliente ou Técnico..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-search"
              style={{ minWidth: "280px" }}
            />
          </div>
        </div>

        {sucesso && (
          <div
            style={{
              padding: "0.85rem 1.25rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid var(--accent-success)",
              color: "var(--accent-success)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ✓ Baixa de serviço confirmada com sucesso! A O.S. foi encerrada na bancada e liberada para faturamento.
          </div>
        )}

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Cliente</th>
                <th>Qtd. Extintores</th>
                <th>Etapa / Posto</th>
                <th>Técnico Responsável</th>
                <th>Data Entrada</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Ação Operacional</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.id}</td>
                  <td style={{ fontWeight: 500 }}>{item.cliente}</td>
                  <td>{item.extintores} un.</td>
                  <td>
                    <span className="status-pill info">{item.etapaAtual}</span>
                  </td>
                  <td>{item.tecnico}</td>
                  <td>{item.dataEntrada}</td>
                  <td>
                    <span className="status-pill warning">{item.status}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn-primary"
                      style={{
                        padding: "0.35rem 0.85rem",
                        fontSize: "0.8rem",
                        backgroundColor: "var(--accent-success)",
                      }}
                      onClick={() => handleDarBaixa(item)}
                    >
                      Dar Baixa na O.S.
                    </button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    Nenhuma ordem de serviço pendente de baixa no momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Histórico recente de baixas */}
        {baixasRealizadas.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h5 style={{ fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
              📋 Baixas Concluídas Recentemente
            </h5>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nº OS</th>
                    <th>Cliente</th>
                    <th>Extintores</th>
                    <th>Data / Hora da Baixa</th>
                    <th>Técnico</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {baixasRealizadas.map((b) => (
                    <tr key={b.osId}>
                      <td style={{ fontWeight: 600 }}>{b.osId}</td>
                      <td>{b.cliente}</td>
                      <td>{b.extintores} un.</td>
                      <td>{b.dataBaixa}</td>
                      <td>{b.tecnico}</td>
                      <td>
                        <span className="status-pill success">Baixada (Concluída)</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Confirmar Baixa */}
        {selectedOS && !sucesso &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setSelectedOS(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "560px",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <h3 style={{ marginBottom: "0.5rem" }}>
                Dar Baixa de Serviço — {selectedOS.id}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                Cliente: <strong>{selectedOS.cliente}</strong> | Total: <strong>{selectedOS.extintores} extintores</strong>
              </p>

              <form onSubmit={handleConfirmarBaixa}>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.4rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Inspetor / Técnico da Baixa:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedOS.tecnico}
                    className="input-search"
                    style={{ width: "100%", backgroundColor: "var(--bg-hover)" }}
                  />
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Checklist de Conformidade Técnica (Normas Inmetro / ABNT):
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      backgroundColor: "var(--bg-hover)",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.82rem",
                    }}
                  >
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked required />
                      <span>Ensaio Hidrostático Concluído e Registrado no Caderno 1</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked required />
                      <span>Carga e Pressurização Testadas em Manômetro Padrão</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked required />
                      <span>Selo Inmetro e Selagem de Trava de Segurança Aplicados</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked required />
                      <span>Anel Plástico de Identificação da Manutenção Afixado</span>
                    </label>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.4rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Laudo / Observações Técnicas de Liberação:
                  </label>
                  <textarea
                    rows="2"
                    defaultValue="Lote inspecionado e testado em conformidade com as normas Inmetro. Liberado para faturamento."
                    className="input-search"
                    style={{ width: "100%", resize: "vertical" }}
                  ></textarea>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                    onClick={() => setSelectedOS(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ backgroundColor: "var(--accent-success)" }}
                  >
                    Confirmar e Encerrar O.S.
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
