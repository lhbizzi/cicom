import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_TYPES = [
  {
    id: "TP-01",
    agentName: "Pó Químico Seco (PQS ABC)",
    capacities: "4 kg, 6 kg, 12 kg",
    pressureTest: "25.0 kgf/cm²",
    normRef: "ABNT NBR 15808",
    status: "Ativo",
  },
  {
    id: "TP-02",
    agentName: "Gás Carbônico (CO2)",
    capacities: "4 kg, 6 kg, 10 kg, 25 kg",
    pressureTest: "190.0 kgf/cm²",
    normRef: "ABNT NBR 15808",
    status: "Ativo",
  },
  {
    id: "TP-03",
    agentName: "Água Pressurizada (AP)",
    capacities: "10 Litros",
    pressureTest: "25.0 kgf/cm²",
    normRef: "ABNT NBR 15808",
    status: "Ativo",
  },
  {
    id: "TP-04",
    agentName: "Pó Químico Seco (PQS BC)",
    capacities: "4 kg, 6 kg, 12 kg, 20 kg, 50 kg",
    pressureTest: "25.0 kgf/cm²",
    normRef: "ABNT NBR 15808",
    status: "Ativo",
  },
  {
    id: "TP-05",
    agentName: "Espuma Mecânica (EM)",
    capacities: "10 Litros, 50 Litros",
    pressureTest: "25.0 kgf/cm²",
    normRef: "ABNT NBR 15808",
    status: "Ativo",
  },
  {
    id: "TP-06",
    agentName: "Agente Químico Úmido (Classe K)",
    capacities: "6 Litros",
    pressureTest: "25.0 kgf/cm²",
    normRef: "ABNT NBR 15808",
    status: "Ativo",
  },
];

const EMPTY_TYPE = {
  id: "",
  agentName: "",
  capacities: "",
  pressureTest: "25.0 kgf/cm²",
  normRef: "ABNT NBR 15808",
  status: "Ativo",
};

export default function TipoExtintores() {
  const [types, setTypes] = useState(INITIAL_TYPES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_TYPE);

  const deleteType = (id) => {
    if (window.confirm(`Confirma a exclusão do tipo ${id}?`)) {
      setTypes(types.filter((t) => t.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_TYPE,
      id: `TP-0${types.length + 1}`,
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
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agentName.trim()) {
      alert("Por favor, informe a descrição do tipo de extintor.");
      return;
    }

    if (modalMode === "add") {
      setTypes([formData, ...types]);
    } else {
      setTypes(types.map((t) => (t.id === formData.id ? formData : t)));
    }
    setIsModalOpen(false);
  };

  const filteredData = types.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.agentName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
    },
    {
      header: "Agente Extintor / Tipo",
      accessor: "agentName",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.agentName}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Norma: {item.normRef}</div>
        </div>
      ),
    },
    {
      header: "Capacidades Homologadas",
      accessor: "capacities",
    },
    {
      header: "Pressão de Ensaio Hydro",
      accessor: "pressureTest",
      render: (item) => (
        <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{item.pressureTest}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span className={item.status === "Ativo" ? "badge badge-success" : "badge"}>
          {item.status === "Ativo" ? "🟢 Ativo" : "Inativo"}
        </span>
      ),
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
          <button className="btn-table-action delete" onClick={() => deleteType(item.id)}>
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
            🔥 Cadastro de Tipos de Extintores & Especificações
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tipagem homologada de agentes extintores, pressões de ensaio e normas ABNT
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Agente ou Código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "250px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Incluir Tipo
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "✨ Novo Tipo de Extintor" : `✏️ Editar Tipo ${formData.id}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly
                  style={{ background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Agente Extintor / Tipo</label>
                <input
                  type="text"
                  name="agentName"
                  value={formData.agentName}
                  onChange={handleInputChange}
                  placeholder="Ex: Pó Químico Seco (PQS ABC)"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Capacidades Homologadas (separadas por vírgula)</label>
              <input
                type="text"
                name="capacities"
                value={formData.capacities}
                onChange={handleInputChange}
                placeholder="Ex: 4 kg, 6 kg, 12 kg"
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Pressão de Ensaio Hydro</label>
                <input
                  type="text"
                  name="pressureTest"
                  value={formData.pressureTest}
                  onChange={handleInputChange}
                  placeholder="Ex: 25.0 kgf/cm² ou 190.0 kgf/cm²"
                  required
                />
              </div>

              <div className="form-group">
                <label>Norma ABNT de Referência</label>
                <input
                  type="text"
                  name="normRef"
                  value={formData.normRef}
                  onChange={handleInputChange}
                  placeholder="Ex: ABNT NBR 15808"
                  required
                />
              </div>
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
              Salvar Tipo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
