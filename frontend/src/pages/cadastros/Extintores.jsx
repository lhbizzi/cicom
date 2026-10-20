import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_EXTINGUISHERS = [
  {
    id: "EXT-884920",
    clientName: "Alves & Cia Ltda",
    clientId: "52369",
    brand: "Kidde",
    agent: "PQS ABC",
    capacity: "4 kg",
    pressure: "10.5 kgf/cm²",
    fabYear: 2021,
    lastTestDate: "2026-09-18",
    nextValDate: "2031-09-18",
    seloInmetro: "18492019",
    status: "Em Manutenção",
    location: "Galpão Principal - Setor 02",
  },
  {
    id: "EXT-884921",
    clientName: "Alves & Cia Ltda",
    clientId: "52369",
    brand: "Mocelin",
    agent: "CO2",
    capacity: "6 kg",
    pressure: "12.0 kgf/cm²",
    fabYear: 2019,
    lastTestDate: "2024-05-10",
    nextValDate: "2029-05-10",
    seloInmetro: "18492020",
    status: "Ativo",
    location: "Recepção / Escritório",
  },
  {
    id: "EXT-884922",
    clientName: "Supermercado Silva",
    clientId: "52370",
    brand: "Bucka",
    agent: "Água Pressurizada",
    capacity: "10 Litros",
    pressure: "10.0 kgf/cm²",
    fabYear: 2022,
    lastTestDate: "2025-11-20",
    nextValDate: "2030-11-20",
    seloInmetro: "18492025",
    status: "Ativo",
    location: "Corredor Central Hortifruti",
  },
  {
    id: "EXT-884923",
    clientName: "Supermercado Silva",
    clientId: "52370",
    brand: "Kidde",
    agent: "PQS BC",
    capacity: "6 kg",
    pressure: "10.5 kgf/cm²",
    fabYear: 2018,
    lastTestDate: "2023-08-15",
    nextValDate: "2028-08-15",
    seloInmetro: "18492026",
    status: "Ativo",
    location: "Depósito de Mercadorias",
  },
  {
    id: "EXT-884924",
    clientName: "Auto Mecânica Rápida",
    clientId: "52371",
    brand: "Resgatest",
    agent: "PQS ABC",
    capacity: "12 kg",
    pressure: "14.0 kgf/cm²",
    fabYear: 2017,
    lastTestDate: "2021-03-01",
    nextValDate: "2026-03-01",
    seloInmetro: "18491002",
    status: "Vencido / Ensaio Pendente",
    location: "Oficina Mecânica - Elevador 1",
  },
  {
    id: "EXT-884925",
    clientName: "Drogaria Bem Estar",
    clientId: "52372",
    brand: "Extang",
    agent: "CO2",
    capacity: "4 kg",
    pressure: "12.0 kgf/cm²",
    fabYear: 2023,
    lastTestDate: "2026-01-15",
    nextValDate: "2031-01-15",
    seloInmetro: "18492090",
    status: "Ativo",
    location: "Área de Atendimento",
  },
];

const AGENT_OPTIONS = [
  "PQS ABC",
  "PQS BC",
  "CO2",
  "Água Pressurizada",
  "Espuma Mecânica",
  "Extintor Classe K",
];

const BRAND_OPTIONS = [
  "Kidde",
  "Mocelin",
  "Bucka",
  "Resgatest",
  "Extang",
  "Indext",
  "Metalcasty",
  "Cruzeiro",
];

const EMPTY_EXTINGUISHER = {
  id: "",
  clientName: "",
  clientId: "52369",
  brand: "Kidde",
  agent: "PQS ABC",
  capacity: "4 kg",
  pressure: "10.5 kgf/cm²",
  fabYear: new Date().getFullYear(),
  lastTestDate: new Date().toISOString().split("T")[0],
  nextValDate: "",
  seloInmetro: "",
  status: "Ativo",
  location: "",
};

export default function Extintores() {
  const [extinguishers, setExtinguishers] = useState(INITIAL_EXTINGUISHERS);
  const [search, setSearch] = useState("");
  const [filterAgent, setFilterAgent] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_EXTINGUISHER);

  // Auto calculate exact 5 years ABNT validity when test date changes
  const calculateFiveYearsABNT = (testDateStr) => {
    if (!testDateStr) return "";
    const date = new Date(testDateStr);
    date.setFullYear(date.getFullYear() + 5);
    return date.toISOString().split("T")[0];
  };

  const handleTestDateChange = (e) => {
    const val = e.target.value;
    const nextVal = calculateFiveYearsABNT(val);
    setFormData((prev) => ({
      ...prev,
      lastTestDate: val,
      nextValDate: nextVal,
    }));
  };

  const deleteExtinguisher = (id) => {
    if (window.confirm(`Confirma a exclusão do extintor código ${id}?`)) {
      setExtinguishers(extinguishers.filter((e) => e.id !== id));
    }
  };

  const openAddModal = () => {
    const today = new Date().toISOString().split("T")[0];
    setModalMode("add");
    setFormData({
      ...EMPTY_EXTINGUISHER,
      id: `EXT-${Math.floor(100000 + Math.random() * 900000)}`,
      lastTestDate: today,
      nextValDate: calculateFiveYearsABNT(today),
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
    if (!formData.id.trim()) {
      alert("Por favor, informe o número de série do casco.");
      return;
    }

    if (modalMode === "add") {
      const exists = extinguishers.some((item) => item.id.toUpperCase() === formData.id.toUpperCase());
      if (exists) {
        alert(`Já existe um extintor cadastrado com o número de série "${formData.id}".`);
        return;
      }
      setExtinguishers([formData, ...extinguishers]);
    } else {
      setExtinguishers(extinguishers.map((item) => (item.id === formData.id ? formData : item)));
    }
    setIsModalOpen(false);
  };

  const filteredData = extinguishers.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.clientName.toLowerCase().includes(search.toLowerCase()) ||
      item.seloInmetro.includes(search);

    const matchesAgent = filterAgent ? item.agent === filterAgent : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;

    return matchesSearch && matchesAgent && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === "Ativo") return <span className="badge badge-success">🟢 Ativo</span>;
    if (status === "Em Manutenção") return <span className="badge badge-warning">⏳ Em Manutenção</span>;
    if (status.includes("Vencido")) return <span className="badge badge-danger">🔴 Ensaio Vencido</span>;
    return <span className="badge">{status}</span>;
  };

  const columns = [
    {
      header: "Nº de Série",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "130px" },
    },
    {
      header: "Cliente Proprietário",
      accessor: "clientName",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.clientName}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Cod. {item.clientId}</div>
        </div>
      ),
    },
    {
      header: "Marca / Agente",
      accessor: "agent",
      render: (item) => (
        <div>
          <span style={{ fontWeight: 600 }}>{item.agent}</span> ({item.capacity})
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Marca: {item.brand}</div>
        </div>
      ),
    },
    {
      header: "Último Ensaio",
      accessor: "lastTestDate",
      render: (item) => (
        <div>
          <span>{item.lastTestDate ? new Date(item.lastTestDate).toLocaleDateString("pt-BR") : "-"}</span>
        </div>
      ),
    },
    {
      header: "Vencimento ABNT (5 Anos)",
      accessor: "nextValDate",
      render: (item) => {
        const isVencido = new Date(item.nextValDate) < new Date();
        return (
          <div style={{ fontWeight: 600, color: isVencido ? "var(--color-danger)" : "var(--color-success)" }}>
            {item.nextValDate ? new Date(item.nextValDate).toLocaleDateString("pt-BR") : "-"}
            {isVencido && <span style={{ marginLeft: "6px", fontSize: "0.75rem" }}>(Vencido)</span>}
          </div>
        );
      },
    },
    {
      header: "Selo Inmetro",
      accessor: "seloInmetro",
      render: (item) => (
        <span style={{ fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.5px" }}>
          {item.seloInmetro || "Sem Selo"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => getStatusBadge(item.status),
    },
    {
      header: "Ações",
      headerStyle: { width: "180px", textAlign: "right" },
      cellStyle: { textAlign: "right" },
      render: (item) => (
        <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
          <button className="btn-table-action" onClick={() => openEditModal(item)}>
            Editar
          </button>
          <button className="btn-table-action delete" onClick={() => deleteExtinguisher(item.id)}>
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel">
      {/* Top Header Controls */}
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h4 style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            🧯 Fichário Geral de Extintores
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Cadastro por número de série, normas ABNT NBR 12962/15808 e controle de selos
          </span>
        </div>

        <div className="flex-gap" style={{ flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Pesquisar por Série, Cliente ou Selo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "240px" }}
          />

          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-input)",
              color: "var(--text-main)",
            }}
          >
            <option value="">Todos Agentes</option>
            {AGENT_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-input)",
              color: "var(--text-main)",
            }}
          >
            <option value="">Todos Status</option>
            <option value="Ativo">Ativos</option>
            <option value="Em Manutenção">Em Manutenção</option>
            <option value="Vencido / Ensaio Pendente">Ensaio Vencido</option>
          </select>

          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Extintor
          </button>
        </div>
      </div>

      {/* Grid Component */}
      <Grid data={filteredData} columns={columns} />

      {/* Include/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "✨ Cadastro de Novo Extintor de Incêndio"
            : `✏️ Editar Extintor - Série ${formData.id}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Nº de Série (Número do Casco)</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly={modalMode === "edit"}
                  onChange={handleInputChange}
                  placeholder="Ex: EXT-884920"
                  required
                  style={modalMode === "edit" ? { background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 } : { fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Cliente Proprietário</label>
                <select name="clientName" value={formData.clientName} onChange={handleInputChange} required>
                  <option value="">Selecione o Cliente...</option>
                  <option value="Alves & Cia Ltda">Alves & Cia Ltda (Cod. 52369)</option>
                  <option value="Supermercado Silva">Supermercado Silva (Cod. 52370)</option>
                  <option value="Auto Mecânica Rápida">Auto Mecânica Rápida (Cod. 52371)</option>
                  <option value="Drogaria Bem Estar">Drogaria Bem Estar (Cod. 52372)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Marca / Fabricante</label>
                <select name="brand" value={formData.brand} onChange={handleInputChange}>
                  {BRAND_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Agente Extintor</label>
                <select name="agent" value={formData.agent} onChange={handleInputChange}>
                  {AGENT_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Capacidade de Carga</label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="Ex: 4 kg, 10 Litros"
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Ano de Fabricação</label>
                <input
                  type="number"
                  name="fabYear"
                  value={formData.fabYear}
                  onChange={handleInputChange}
                  min={1950}
                  max={2030}
                  required
                />
              </div>

              <div className="form-group">
                <label>Pressão de Trabalho</label>
                <input
                  type="text"
                  name="pressure"
                  value={formData.pressure}
                  onChange={handleInputChange}
                  placeholder="Ex: 10.5 kgf/cm²"
                />
              </div>

              <div className="form-group">
                <label>Número do Selo Inmetro</label>
                <input
                  type="text"
                  name="seloInmetro"
                  value={formData.seloInmetro}
                  onChange={handleInputChange}
                  placeholder="Ex: 18492019"
                  style={{ fontFamily: "monospace" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Data do Último Ensaio</label>
                <input
                  type="date"
                  name="lastTestDate"
                  value={formData.lastTestDate}
                  onChange={handleTestDateChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Vencimento (5 Anos ABNT)</label>
                <input
                  type="date"
                  name="nextValDate"
                  value={formData.nextValDate}
                  onChange={handleInputChange}
                  required
                  style={{ fontWeight: 700, color: "var(--accent-primary)" }}
                />
              </div>

              <div className="form-group">
                <label>Status do Equipamento</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Ativo">Ativo</option>
                  <option value="Em Manutenção">Em Manutenção</option>
                  <option value="Vencido / Ensaio Pendente">Vencido / Ensaio Pendente</option>
                  <option value="Condenado / Descartado">Condenado / Descartado</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Localização / Setor no Cliente</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ex: Galpão Principal - Setor de Usinagem"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-table-action"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>
              Salvar Extintor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
