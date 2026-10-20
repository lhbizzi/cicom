import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_TECHNICIANS = [
  {
    id: "TEC-01",
    name: "Carlos Eduardo Santos",
    registrationInmetro: "INM-IPEM-48291",
    specialty: "Ensaios Hidrostáticos (Nível 3)",
    workbench: "Bancada 01 (Pressão Hydro)",
    phone: "(31) 99881-2233",
    status: "Ativo",
  },
  {
    id: "TEC-02",
    name: "Geraldo Magela de Oliveira",
    registrationInmetro: "INM-IPEM-48292",
    specialty: "Carga CO2 e PQS",
    workbench: "Bancada 02 (Extintores CO2)",
    phone: "(31) 99772-4455",
    status: "Ativo",
  },
  {
    id: "TEC-03",
    name: "Marcelo Ribeiro Viana",
    registrationInmetro: "INM-IPEM-48295",
    specialty: "Inspeção e Selagem Inmetro",
    workbench: "Bancada 03 (Qualidade e Selos)",
    phone: "(31) 99663-7788",
    status: "Ativo",
  },
  {
    id: "TEC-04",
    name: "Fernando Antônio Silva",
    registrationInmetro: "INM-IPEM-32100",
    specialty: "Manutenção Geral e Pintura",
    workbench: "Bancada Auxiliar 04",
    phone: "(31) 99112-9900",
    status: "Inativo",
  },
];

const SPECIALTIES = [
  "Ensaios Hidrostáticos (Nível 3)",
  "Carga CO2 e PQS",
  "Inspeção e Selagem Inmetro",
  "Manutenção Geral e Pintura",
  "Inspetor Técnico Responsável",
];

const EMPTY_TECHNICIAN = {
  id: "",
  name: "",
  registrationInmetro: "",
  specialty: "Ensaios Hidrostáticos (Nível 3)",
  workbench: "Bancada 01",
  phone: "",
  status: "Ativo",
};

export default function Tecnicos() {
  const [technicians, setTechnicians] = useState(INITIAL_TECHNICIANS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_TECHNICIAN);

  const deleteTechnician = (id) => {
    if (window.confirm(`Confirma a exclusão do técnico código ${id}?`)) {
      setTechnicians(technicians.filter((t) => t.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_TECHNICIAN,
      id: `TEC-0${technicians.length + 1}`,
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
    if (!formData.name.trim()) {
      alert("Por favor, preencha o nome completo do técnico.");
      return;
    }

    if (modalMode === "add") {
      const exists = technicians.some((item) => item.id.toUpperCase() === formData.id.toUpperCase());
      if (exists) {
        alert(`Já existe um técnico cadastrado com o código "${formData.id}".`);
        return;
      }
      setTechnicians([formData, ...technicians]);
    } else {
      setTechnicians(technicians.map((item) => (item.id === formData.id ? formData : item)));
    }
    setIsModalOpen(false);
  };

  const filteredData = technicians.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.registrationInmetro.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
    },
    {
      header: "Nome do Técnico de Bancada",
      accessor: "name",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Telefone: {item.phone || "-"}</div>
        </div>
      ),
    },
    {
      header: "Registro Inmetro / IPEM",
      accessor: "registrationInmetro",
      render: (item) => (
        <span style={{ fontFamily: "monospace", fontWeight: 600, color: "var(--accent-primary)" }}>
          {item.registrationInmetro}
        </span>
      ),
    },
    {
      header: "Especialidade & Bancada",
      accessor: "specialty",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.specialty}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.workbench}</div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span className={item.status === "Ativo" ? "badge badge-success" : "badge"}>
          {item.status === "Ativo" ? "🟢 Habilitado" : "Inativo"}
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
          <button className="btn-table-action delete" onClick={() => deleteTechnician(item.id)}>
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
            👷‍♂️ Cadastro de Técnicos & Operadores de Bancada
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Registro de técnicos habilitados perante o Inmetro/IPEM para ensaios e selagens
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Nome ou Registro..."
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
            Incluir Técnico
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "✨ Cadastro de Novo Técnico Operacional"
            : `✏️ Editar Técnico - Código ${formData.id}`
        }
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
                  readOnly={modalMode === "edit"}
                  onChange={handleInputChange}
                  placeholder="Ex: TEC-01"
                  required
                  style={modalMode === "edit" ? { background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 } : { fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Registro no Inmetro / IPEM</label>
                <input
                  type="text"
                  name="registrationInmetro"
                  value={formData.registrationInmetro}
                  onChange={handleInputChange}
                  placeholder="Ex: INM-IPEM-48291"
                  required
                  style={{ fontFamily: "monospace", fontWeight: 600 }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Nome Completo do Técnico</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Carlos Eduardo Santos"
                required
                autoFocus
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Especialidade Principal</label>
                <select name="specialty" value={formData.specialty} onChange={handleInputChange}>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Bancada / Posto de Trabalho</label>
                <input
                  type="text"
                  name="workbench"
                  value={formData.workbench}
                  onChange={handleInputChange}
                  placeholder="Ex: Bancada 01 (Pressão Hydro)"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Telefone / WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(31) 99999-8888"
                />
              </div>

              <div className="form-group">
                <label>Status de Habilitação</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Ativo">Ativo / Habilitado</option>
                  <option value="Inativo">Inativo / Afastado</option>
                </select>
              </div>
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
              Salvar Técnico
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
