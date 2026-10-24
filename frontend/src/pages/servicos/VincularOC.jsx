import { useState } from "react";
import { createPortal } from "react-dom";
import OrdemServicoTabs from "../../components/OrdemServicoTabs";

const INITIAL_VINCULOS_OC = [
  {
    id: 1,
    osNumero: "1042",
    cliente: "Usina Santa Rita S/A",
    ocNumero: "OC-2026/8892",
    comprador: "Depto. Suprimentos (Eng. Fernando)",
    condicao: "30 Dias Boleto",
    dataAprovacao: "20/10/2026",
    valorAprovado: "R$ 2.450,00",
    status: "Aprovada",
  },
  {
    id: 2,
    osNumero: "1040",
    cliente: "Transportes Silva & Filhos",
    ocNumero: "PO-7741",
    comprador: "Gerência Operacional (Juliana)",
    condicao: "28 DDL Transferência",
    dataAprovacao: "22/10/2026",
    valorAprovado: "R$ 3.100,00",
    status: "Aprovada",
  },
  {
    id: 3,
    osNumero: "1039",
    cliente: "Auto Mecânica Rápida Ltda",
    ocNumero: "AUT-552",
    comprador: "Sr. Carlos Alberto (Gerente)",
    condicao: "À Vista na Entrega",
    dataAprovacao: "24/10/2026",
    valorAprovado: "R$ 890,00",
    status: "Em Análise",
  },
];

export default function VincularOC({ currentRoute, setCurrentRoute }) {
  const [vinculos, setVinculos] = useState(INITIAL_VINCULOS_OC);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [selectedOC, setSelectedOC] = useState(null);

  const [form, setForm] = useState({
    osNumero: "",
    cliente: "",
    ocNumero: "",
    comprador: "",
    condicao: "30 Dias Boleto",
    valorAprovado: "",
  });

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!form.osNumero || !form.ocNumero) return;

    const novo = {
      id: Date.now(),
      osNumero: form.osNumero,
      cliente: form.cliente || "Cliente",
      ocNumero: form.ocNumero,
      comprador: form.comprador || "Setor Compras",
      condicao: form.condicao,
      dataAprovacao: new Date().toLocaleDateString("pt-BR"),
      valorAprovado: form.valorAprovado ? `R$ ${form.valorAprovado}` : "R$ 0,00",
      status: "Aprovada",
    };

    setVinculos([novo, ...vinculos]);
    setShowModal(false);
    setForm({
      osNumero: "",
      cliente: "",
      ocNumero: "",
      comprador: "",
      condicao: "30 Dias Boleto",
      valorAprovado: "",
    });
  };

  const filtrados = vinculos.filter(
    (v) =>
      v.osNumero.includes(filtro) ||
      v.ocNumero.toLowerCase().includes(filtro.toLowerCase()) ||
      v.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      v.comprador.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      {/* Submenu de Navegação entre os menus de OS */}
      <OrdemServicoTabs
        activeTab="vincular-oc"
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="glass-panel">
        <div className="control-bar">
          <div>
            <h4 style={{ fontWeight: 600 }}>📑 Vincular OC a Ordem de Sv.</h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Vínculo de Ordens de Compra e Autorizações de Fornecimento emitidas pelos clientes
            </span>
          </div>

          <div className="flex-gap">
            <input
              type="text"
              placeholder="Buscar por Nº OS, Nº OC ou Cliente..."
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
              Vincular Nova OC
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Cliente</th>
                <th>Nº Ordem de Compra (OC)</th>
                <th>Contato / Comprador</th>
                <th>Condição</th>
                <th>Data Aprovação</th>
                <th>Valor Aprovado</th>
                <th>Status</th>
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
                  <td style={{ fontWeight: 600 }}>{v.ocNumero}</td>
                  <td>{v.comprador}</td>
                  <td>
                    <span className="status-pill info">{v.condicao}</span>
                  </td>
                  <td>{v.dataAprovacao}</td>
                  <td style={{ fontWeight: 600 }}>{v.valorAprovado}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        v.status === "Aprovada" ? "success" : "warning"
                      }`}
                    >
                      {v.status}
                    </span>
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
                        onClick={() => setSelectedOC(v)}
                      >
                        Ver Detalhes
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
                    Nenhum vínculo de ordem de compra encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Vincular OC */}
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
                📑 Vincular Ordem de Compra (OC) à OS
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
                      Nº da OC (Cliente):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: OC-2026/8900"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={form.ocNumero}
                      onChange={(e) => setForm({ ...form, ocNumero: e.target.value })}
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
                    Cliente / Empresa:
                  </label>
                  <input
                    type="text"
                    placeholder="Nome do Cliente"
                    className="input-search"
                    style={{ width: "100%" }}
                    value={form.cliente}
                    onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                  />
                </div>

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
                      Contato / Comprador:
                    </label>
                    <input
                      type="text"
                      placeholder="Nome do Comprador"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={form.comprador}
                      onChange={(e) => setForm({ ...form, comprador: e.target.value })}
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
                      Valor Aprovado (R$):
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 2.450,00"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={form.valorAprovado}
                      onChange={(e) =>
                        setForm({ ...form, valorAprovado: e.target.value })
                      }
                    />
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
                    Condição de Pagamento Aprovada:
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: "100%" }}
                    value={form.condicao}
                    onChange={(e) => setForm({ ...form, condicao: e.target.value })}
                  >
                    <option value="30 Dias Boleto">30 Dias Boleto Bancário</option>
                    <option value="28 DDL Transferência">28 DDL Transferência / PIX</option>
                    <option value="À Vista na Entrega">À Vista na Entrega Técnica</option>
                    <option value="15 / 30 / 45 DDL">15 / 30 / 45 DDL Parcelado</option>
                  </select>
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
                    Salvar Vínculo OC
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

        {/* Modal Detalhes OC */}
        {selectedOC &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setSelectedOC(null)}
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
              <h3 style={{ marginBottom: "1rem" }}>
                Detalhes da Ordem de Compra #{selectedOC.ocNumero}
              </h3>
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
                <div><strong>Ordem de Serviço Vinculada:</strong> #{selectedOC.osNumero}</div>
                <div><strong>Cliente / Solicitante:</strong> {selectedOC.cliente}</div>
                <div><strong>Responsável / Comprador:</strong> {selectedOC.comprador}</div>
                <div><strong>Data de Aprovação da OC:</strong> {selectedOC.dataAprovacao}</div>
                <div><strong>Condição de Pagamento:</strong> {selectedOC.condicao}</div>
                <div><strong>Valor Autorizado:</strong> <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>{selectedOC.valorAprovado}</span></div>
                <div><strong>Status:</strong> <span className="status-pill success">{selectedOC.status}</span></div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setSelectedOC(null)}
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
