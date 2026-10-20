import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_LOTS = [
  {
    id: "LOT-2026-01",
    clientName: "Usina Santa Rita S/A",
    entryDate: "2026-09-20",
    extinguisherQty: 45,
    status: "Em Processamento",
    notes: "Lote de extintores de alta pressão para ensaio quinquenal ABNT",
  },
  {
    id: "LOT-2026-02",
    clientName: "Condomínio Solar das Palmeiras",
    entryDate: "2026-09-22",
    extinguisherQty: 12,
    status: "Concluído",
    notes: "Inspeção Nível 2 e recarga de PQS 4kg",
  },
  {
    id: "LOT-2026-03",
    clientName: "Supermercado Silva",
    entryDate: "2026-09-25",
    extinguisherQty: 28,
    status: "Aguardando Triagem",
    notes: "Recepção de extintores de água pressurizada e CO2",
  },
];

const EMPTY_LOT = {
  id: "",
  clientName: "",
  entryDate: new Date().toISOString().split("T")[0],
  extinguisherQty: 1,
  status: "Aguardando Triagem",
  notes: "",
};

export default function Lotes() {
  const [lots, setLots] = useState(INITIAL_LOTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_LOT);

  const deleteLot = (id) => {
    if (window.confirm(`Confirma a exclusão do lote ${id}?`)) {
      setLots(lots.filter((l) => l.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_LOT,
      id: `LOT-2026-0${lots.length + 1}`,
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
      [name]: name === "extinguisherQty" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName.trim()) {
      alert("Por favor, selecione o cliente do lote.");
      return;
    }

    if (modalMode === "add") {
      setLots([formData, ...lots]);
    } else {
      setLots(lots.map((item) => (item.id === formData.id ? formData : item)));
    }
    setIsModalOpen(false);
  };

  const filteredData = lots.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Código Lote",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "130px" },
    },
    {
      header: "Cliente Proprietário",
      accessor: "clientName",
      render: (item) => <span style={{ fontWeight: 600 }}>{item.clientName}</span>,
    },
    {
      header: "Data de Entrada",
      accessor: "entryDate",
      render: (item) => <span>{new Date(item.entryDate).toLocaleDateString("pt-BR")}</span>,
    },
    {
      header: "Qtd. Extintores",
      accessor: "extinguisherQty",
      render: (item) => (
        <span className="badge badge-info" style={{ fontWeight: 700 }}>
          {item.extinguisherQty} Unidades
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => {
        if (item.status === "Concluído") return <span className="badge badge-success">🟢 Concluído</span>;
        if (item.status === "Em Processamento") return <span className="badge badge-warning">⏳ Em Oficina</span>;
        return <span className="badge">📥 {item.status}</span>;
      },
    },
    {
      header: "Ações",
      headerStyle: { width: "160px", textAlign: "right" },
      cellStyle: { textAlign: "right" },
      render: (item) => (
        <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
          <button className="btn-table-action" onClick={() => openEditModal(item)}>
            Editar
          </button>
          <button className="btn-table-action delete" onClick={() => deleteLot(item.id)}>
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel">
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h4 style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            📦 Cadastro e Recepção de Lotes
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Agrupamento de extintores recolhidos por cliente para ensaios e recargas em lote
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar Lote ou Cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "260px" }}
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
        title={modalMode === "add" ? "✨ Novo Lote de Extintores" : `✏️ Editar Lote ${formData.id}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Código do Lote</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly
                  style={{ background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Cliente Proprietário</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Ex: Usina Santa Rita S/A"
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Data de Recebimento</label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantidade de Extintores</label>
                <input
                  type="number"
                  name="extinguisherQty"
                  value={formData.extinguisherQty}
                  onChange={handleInputChange}
                  min={1}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status do Lote</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Aguardando Triagem">Aguardando Triagem</option>
                  <option value="Em Processamento">Em Processamento na Oficina</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Observações / Instruções da OS</label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Ex: Extintores da área de moagem, prioridade de entrega"
              />
            </div>
          </div>

          <div className="modal-footer">
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
