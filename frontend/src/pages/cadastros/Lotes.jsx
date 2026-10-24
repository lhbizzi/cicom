import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_LOTS = [
  {
    nrLote: 101,
    tipo: "D",
    empresa: "Extincal Indústria Química Ltda",
    dtFabricacao: "2026-01-15",
    validade: "2031-01-15",
    batelada: "BAT-9942",
    nrLoteEmp: "LT-88410",
    folhaNr: "142",
    nrNotaFiscal: "18540",
    dataCompra: "2026-01-25",
    qtde: 1000,
    codigoProd: "PQS-ABC-90",
    tipoExtint: "PQS ABC",
    classe: "ABC",
    qtdeLancada: 340,
  },
  {
    nrLote: 102,
    tipo: "D",
    empresa: "Química Resil Minas S/A",
    dtFabricacao: "2025-10-10",
    validade: "2030-10-10",
    batelada: "BAT-7718",
    nrLoteEmp: "RES-4011",
    folhaNr: "145",
    nrNotaFiscal: "12309",
    dataCompra: "2025-10-22",
    qtde: 500,
    codigoProd: "PQS-BC-70",
    tipoExtint: "PQS BC",
    classe: "BC",
    qtdeLancada: 500,
  },
  {
    nrLote: 103,
    tipo: "D",
    empresa: "White Martins Gases Industriais",
    dtFabricacao: "2026-03-01",
    validade: "2031-03-01",
    batelada: "WM-4490",
    nrLoteEmp: "WM-9921",
    folhaNr: "150",
    nrNotaFiscal: "33100",
    dataCompra: "2026-03-10",
    qtde: 800,
    codigoProd: "CO2-IND",
    tipoExtint: "CO2",
    classe: "BC",
    qtdeLancada: 120,
  },
  {
    nrLote: 104,
    tipo: "D",
    empresa: "Kidde Brasil Proteção Contra Incêndio",
    dtFabricacao: "2026-02-18",
    validade: "2031-02-18",
    batelada: "KD-1102",
    nrLoteEmp: "KB-2026-B",
    folhaNr: "153",
    nrNotaFiscal: "27890",
    dataCompra: "2026-02-28",
    qtde: 600,
    codigoProd: "EM-AFFF-6",
    tipoExtint: "Espuma Mecânica",
    classe: "AB",
    qtdeLancada: 45,
  },
];

const TIPO_EXTINT_OPTIONS = [
  "PQS ABC",
  "PQS BC",
  "CO2",
  "Água Pressurizada (AP)",
  "Espuma Mecânica (EM)",
  "Classe K",
];

const CLASSE_OPTIONS = ["ABC", "BC", "A", "AB", "K", "D"];

const EMPTY_LOT = {
  nrLote: "",
  tipo: "D",
  empresa: "",
  dtFabricacao: "",
  validade: "",
  batelada: "",
  nrLoteEmp: "",
  folhaNr: "",
  nrNotaFiscal: "",
  dataCompra: new Date().toISOString().split("T")[0],
  qtde: 0,
  codigoProd: "",
  tipoExtint: "PQS ABC",
  classe: "ABC",
  qtdeLancada: 0,
};

export default function Lotes() {
  const [lots, setLots] = useState(INITIAL_LOTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_LOT);

  const deleteLot = (nrLote) => {
    if (window.confirm(`Confirma a exclusão do Lote Nº ${nrLote}?`)) {
      setLots(lots.filter((l) => l.nrLote !== nrLote));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    const nextNr = lots.length > 0 ? Math.max(...lots.map((l) => Number(l.nrLote) || 0)) + 1 : 1;
    setFormData({
      ...EMPTY_LOT,
      nrLote: nextNr,
      dataCompra: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "nrLote" || name === "qtde" || name === "qtdeLancada"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.empresa.trim()) {
      alert("Por favor, preencha o campo Empresa / Fornecedor.");
      return;
    }

    if (modalMode === "add") {
      if (lots.some((l) => Number(l.nrLote) === Number(formData.nrLote))) {
        alert(`Já existe um lote cadastrado com o Nr ${formData.nrLote}.`);
        return;
      }
      setLots([{ ...formData, nrLote: Number(formData.nrLote) }, ...lots]);
    } else {
      setLots(
        lots.map((item) =>
          item.nrLote === formData.nrLote ? { ...formData, nrLote: Number(formData.nrLote) } : item
        )
      );
    }
    setIsModalOpen(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const filteredData = lots.filter((item) => {
    const q = search.toLowerCase();
    return (
      String(item.nrLote).includes(q) ||
      item.empresa.toLowerCase().includes(q) ||
      item.batelada.toLowerCase().includes(q) ||
      item.nrNotaFiscal.toLowerCase().includes(q) ||
      item.codigoProd.toLowerCase().includes(q) ||
      item.tipoExtint.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      header: "Nr Lote",
      accessor: "nrLote",
      cellStyle: { width: "110px", fontWeight: 700, color: "var(--accent-primary)" },
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>#{item.nrLote}</span>
          <span
            style={{
              fontSize: "0.7rem",
              background: "var(--bg-hover)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: 600,
              color: "var(--text-muted)",
            }}
          >
            {item.tipo || "D"}
          </span>
        </div>
      ),
    },
    {
      header: "Empresa",
      accessor: "empresa",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.empresa}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Batelada: <strong>{item.batelada || "-"}</strong> • Lote Emp: <strong>{item.nrLoteEmp || "-"}</strong>
          </div>
        </div>
      ),
    },
    {
      header: "Produto / Tipo / Classe",
      accessor: "codigoProd",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>
            {item.codigoProd || "S/ Cód"} — <span style={{ color: "var(--accent-primary)" }}>{item.tipoExtint}</span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Classe: <strong>{item.classe}</strong>
          </div>
        </div>
      ),
    },
    {
      header: "Fabricação / Validade",
      accessor: "dtFabricacao",
      render: (item) => (
        <div style={{ fontSize: "0.82rem" }}>
          <div>Fab: {formatDate(item.dtFabricacao)}</div>
          <div style={{ color: "var(--text-muted)" }}>Val: {formatDate(item.validade)}</div>
        </div>
      ),
    },
    {
      header: "Doc / NF / Folha",
      accessor: "nrNotaFiscal",
      render: (item) => (
        <div style={{ fontSize: "0.82rem" }}>
          <div>NF: <strong>{item.nrNotaFiscal || "-"}</strong></div>
          <div style={{ color: "var(--text-muted)" }}>Folha: {item.folhaNr || "-"}</div>
        </div>
      ),
    },
    {
      header: "Qtde / Lançada / Saldo",
      accessor: "qtde",
      render: (item) => {
        const saldo = (item.qtde || 0) - (item.qtdeLancada || 0);
        const percent = item.qtde > 0 ? Math.min(100, Math.round((item.qtdeLancada / item.qtde) * 100)) : 0;
        const isEsgotado = saldo <= 0;

        return (
          <div style={{ minWidth: "150px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "3px" }}>
              <span>Lançado: <strong>{item.qtdeLancada}</strong> / {item.qtde}</span>
              <span
                style={{
                  fontWeight: 700,
                  color: isEsgotado ? "#ef4444" : saldo < item.qtde * 0.2 ? "#f59e0b" : "#10b981",
                }}
              >
                {isEsgotado ? "Esgotado" : `Saldo: ${saldo}`}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "var(--bg-hover)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  backgroundColor: isEsgotado ? "#ef4444" : percent > 80 ? "#f59e0b" : "var(--accent-primary)",
                  borderRadius: "3px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: "Ações",
      headerStyle: { width: "150px", textAlign: "right" },
      cellStyle: { textAlign: "right" },
      render: (item) => (
        <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
          <button className="btn-table-action" onClick={() => openEditModal(item)}>
            Editar
          </button>
          <button className="btn-table-action delete" onClick={() => deleteLot(item.nrLote)}>
            Excluir
          </button>
        </div>
      ),
    },
  ];

  const saldoCalculado = (Number(formData.qtde) || 0) - (Number(formData.qtdeLancada) || 0);

  return (
    <div className="glass-panel">
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h4 style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            🧪 Cadastro de Lotes de Matéria-Prima & Agentes Extintores
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Controle de lotes, bateladas, fornecedores, notas fiscais e rastreabilidade Inmetro
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Nr Lote, Empresa, Batelada, NF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "320px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Lote
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "✨ Novo Lote de Insumo / Matéria-Prima" : `✏️ Editar Lote Nº ${formData.nrLote}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Linha 1: Nr Lote + D (Tipo) & Empresa */}
            <div style={{ display: "grid", gridTemplateColumns: "130px 90px 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Nr Lote</label>
                <input
                  type="number"
                  name="nrLote"
                  value={formData.nrLote}
                  onChange={handleInputChange}
                  required
                  min={0}
                  style={{ fontWeight: 700 }}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Tipo</label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  maxLength={3}
                  style={{ textAlign: "center", fontWeight: 700 }}
                  placeholder="D"
                />
              </div>

              <div className="form-group">
                <label>Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  placeholder="Nome / Razão Social da Empresa Fornecedora"
                  required
                />
              </div>
            </div>

            {/* Linha 2: Dt Fabricacao & Validade */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Dt Fabricacao</label>
                <input
                  type="date"
                  name="dtFabricacao"
                  value={formData.dtFabricacao}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Validade</label>
                <input
                  type="date"
                  name="validade"
                  value={formData.validade}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Linha 3: Batelada... & Nr Lote emp.: */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Batelada...</label>
                <input
                  type="text"
                  name="batelada"
                  value={formData.batelada}
                  onChange={handleInputChange}
                  placeholder="Ex: BAT-9942"
                />
              </div>

              <div className="form-group">
                <label>Nr Lote emp.:</label>
                <input
                  type="text"
                  name="nrLoteEmp"
                  value={formData.nrLoteEmp}
                  onChange={handleInputChange}
                  placeholder="Ex: LT-88410"
                />
              </div>
            </div>

            {/* Linha 4: Folha Nº... & Nr N. Fiscal: */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Folha Nº...</label>
                <input
                  type="text"
                  name="folhaNr"
                  value={formData.folhaNr}
                  onChange={handleInputChange}
                  placeholder="Ex: 142"
                />
              </div>

              <div className="form-group">
                <label>Nr N. Fiscal:</label>
                <input
                  type="text"
                  name="nrNotaFiscal"
                  value={formData.nrNotaFiscal}
                  onChange={handleInputChange}
                  placeholder="Ex: 18540"
                />
              </div>
            </div>

            {/* Linha 5: Data Compra & Codigo Prod */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Data Compra</label>
                <input
                  type="date"
                  name="dataCompra"
                  value={formData.dataCompra}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Codigo Prod:</label>
                <input
                  type="text"
                  name="codigoProd"
                  value={formData.codigoProd}
                  onChange={handleInputChange}
                  placeholder="Ex: PQS-ABC-90 ou 004"
                />
              </div>
            </div>

            {/* Linha 6: Tipo Extint & Classe */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Tipo Extint:</label>
                <select
                  name="tipoExtint"
                  value={formData.tipoExtint}
                  onChange={handleInputChange}
                >
                  {TIPO_EXTINT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Classe:</label>
                <select
                  name="classe"
                  value={formData.classe}
                  onChange={handleInputChange}
                >
                  {CLASSE_OPTIONS.map((cls) => (
                    <option key={cls} value={cls}>
                      Classe {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Linha 7: Qtde & Qtde Lancada + Card Saldo */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", alignItems: "center" }}>
              <div className="form-group">
                <label>Qtde (Total):</label>
                <input
                  type="number"
                  name="qtde"
                  value={formData.qtde}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>

              <div className="form-group">
                <label>Qtde Lancada:</label>
                <input
                  type="number"
                  name="qtdeLancada"
                  value={formData.qtdeLancada}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>

              <div
                style={{
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Saldo Restante
                </div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: saldoCalculado < 0 ? "#ef4444" : saldoCalculado === 0 ? "#f59e0b" : "#10b981",
                  }}
                >
                  {saldoCalculado}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn-table-action"
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>
              Salvar Lote
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
