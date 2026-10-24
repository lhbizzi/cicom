import { useState } from "react";
import { createPortal } from "react-dom";
import OrdemServicoTabs from "../../components/OrdemServicoTabs";

const INITIAL_VINCULOS = [
  {
    id: 1,
    osNumero: "1042",
    cliente: "Usina Santa Rita S/A",
    notaNumero: "000.041.829",
    serie: "1",
    chaveAcesso: "35261012345678000190550010000418291000418291",
    dataEmissao: "24/10/2026",
    valorNF: "R$ 2.450,00",
    tipoNota: "NFe Mercantil",
    statusFiscal: "Autorizada (SEFAZ)",
  },
  {
    id: 2,
    osNumero: "1040",
    cliente: "Transportes Silva & Filhos",
    notaNumero: "000.041.828",
    serie: "1",
    chaveAcesso: "35261045123789000155550010000418281000418288",
    dataEmissao: "23/10/2026",
    valorNF: "R$ 3.100,00",
    tipoNota: "NFSe Serviço",
    statusFiscal: "Transmitida (Prefeitura)",
  },
];

export default function VincularNota({ currentRoute, setCurrentRoute }) {
  const [vinculos, setVinculos] = useState(INITIAL_VINCULOS);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [selectedNota, setSelectedNota] = useState(null);

  const [form, setForm] = useState({
    osNumero: "",
    cliente: "",
    notaNumero: "",
    serie: "1",
    chaveAcesso: "",
    valorNF: "",
    tipoNota: "NFe Mercantil",
  });

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!form.osNumero || !form.notaNumero) return;

    const novo = {
      id: Date.now(),
      osNumero: form.osNumero,
      cliente: form.cliente || "Cliente O.S.",
      notaNumero: form.notaNumero,
      serie: form.serie,
      chaveAcesso:
        form.chaveAcesso || `352610${Math.floor(10000000 + Math.random() * 90000000)}00010055001`,
      dataEmissao: new Date().toLocaleDateString("pt-BR"),
      valorNF: form.valorNF ? `R$ ${form.valorNF}` : "R$ 0,00",
      tipoNota: form.tipoNota,
      statusFiscal: "Autorizada (SEFAZ)",
    };

    setVinculos([novo, ...vinculos]);
    setShowModal(false);
    setForm({
      osNumero: "",
      cliente: "",
      notaNumero: "",
      serie: "1",
      chaveAcesso: "",
      valorNF: "",
      tipoNota: "NFe Mercantil",
    });
  };

  const filtrados = vinculos.filter(
    (v) =>
      v.osNumero.includes(filtro) ||
      v.notaNumero.includes(filtro) ||
      v.cliente.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      {/* Submenu de Navegação entre os menus de OS */}
      <OrdemServicoTabs
        activeTab="vincular-nota"
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="glass-panel">
        <div className="control-bar">
          <div>
            <h4 style={{ fontWeight: 600 }}>🔗 Vincular Nota a Ordem de Sv.</h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Associação e conciliação de faturamento fiscal (NFe e NFSe) com as Ordens de Serviço
            </span>
          </div>

          <div className="flex-gap">
            <input
              type="text"
              placeholder="Buscar por Nº OS, Nota ou Cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-search"
              style={{ minWidth: "280px" }}
            />
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Vincular Nova Nota
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Cliente</th>
                <th>Nº Nota Fiscal</th>
                <th>Série</th>
                <th>Tipo de Nota</th>
                <th>Data Emissão</th>
                <th>Valor Total NF</th>
                <th>Status Fiscal</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600, color: "var(--accent-primary)" }}>
                    #{v.osNumero}
                  </td>
                  <td style={{ fontWeight: 500 }}>{v.cliente}</td>
                  <td style={{ fontWeight: 600 }}>{v.notaNumero}</td>
                  <td>{v.serie}</td>
                  <td>
                    <span className="status-pill info">{v.tipoNota}</span>
                  </td>
                  <td>{v.dataEmissao}</td>
                  <td style={{ fontWeight: 600 }}>{v.valorNF}</td>
                  <td>
                    <span className="status-pill success">{v.statusFiscal}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <button
                        className="btn-primary"
                        style={{
                          padding: "0.25rem 0.55rem",
                          fontSize: "0.75rem",
                          backgroundColor: "var(--bg-hover)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-color)",
                        }}
                        onClick={() => setSelectedNota(v)}
                      >
                        Espelho
                      </button>
                      <button
                        className="btn-primary"
                        style={{
                          padding: "0.25rem 0.55rem",
                          fontSize: "0.75rem",
                          backgroundColor: "transparent",
                          color: "var(--accent-danger)",
                          border: "1px solid var(--accent-danger)",
                        }}
                        onClick={() =>
                          setVinculos(vinculos.filter((item) => item.id !== v.id))
                        }
                      >
                        Desvincular
                      </button>
                    </div>
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
                    Nenhum vínculo de nota fiscal encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Vincular Nota */}
        {showModal &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setShowModal(false)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <h3 style={{ marginBottom: "1.25rem" }}>
                🔗 Vincular Nota Fiscal à Ordem de Serviço
              </h3>
              <form onSubmit={handleSalvar}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Nº da O.S.:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 1042"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={form.osNumero}
                      onChange={(e) => setForm({ ...form, osNumero: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Nº da Nota Fiscal:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 000.041.830"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={form.notaNumero}
                      onChange={(e) => setForm({ ...form, notaNumero: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.4rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Cliente / Razão Social:
                  </label>
                  <input
                    type="text"
                    placeholder="Razão Social do Cliente"
                    className="input-search"
                    style={{ width: "100%" }}
                    value={form.cliente}
                    onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.4rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Chave de Acesso (44 dígitos NFe / Protocolo NFSe):
                  </label>
                  <input
                    type="text"
                    placeholder="352610... (opcional)"
                    className="input-search"
                    style={{ width: "100%" }}
                    value={form.chaveAcesso}
                    onChange={(e) => setForm({ ...form, chaveAcesso: e.target.value })}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Tipo da Nota:
                    </label>
                    <select
                      className="select-filter"
                      style={{ width: "100%" }}
                      value={form.tipoNota}
                      onChange={(e) => setForm({ ...form, tipoNota: e.target.value })}
                    >
                      <option value="NFe Mercantil">NFe Mercantil (Extintores / Peças)</option>
                      <option value="NFSe Serviço">NFSe Serviço (Manutenção / Ensaio)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Valor Total (R$):
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 1.850,00"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={form.valorNF}
                      onChange={(e) => setForm({ ...form, valorNF: e.target.value })}
                    />
                  </div>
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
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    Gravar Vínculo Fiscal
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

        {/* Modal Espelho Fiscal */}
        {selectedNota &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setSelectedNota(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <h3 style={{ marginBottom: "1rem" }}>Espelho da Nota Fiscal #{selectedNota.notaNumero}</h3>
              <div
                style={{
                  backgroundColor: "var(--bg-hover)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                }}
              >
                <div><strong>Ordem de Serviço:</strong> #{selectedNota.osNumero}</div>
                <div><strong>Cliente:</strong> {selectedNota.cliente}</div>
                <div><strong>Data de Emissão:</strong> {selectedNota.dataEmissao}</div>
                <div><strong>Modelo:</strong> {selectedNota.tipoNota} (Série {selectedNota.serie})</div>
                <div><strong>Chave de Acesso:</strong> <code style={{ fontSize: "0.75rem", wordBreak: "break-all" }}>{selectedNota.chaveAcesso}</code></div>
                <div><strong>Valor Faturado:</strong> <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>{selectedNota.valorNF}</span></div>
                <div><strong>Status:</strong> <span className="status-pill success">{selectedNota.statusFiscal}</span></div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setSelectedNota(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
