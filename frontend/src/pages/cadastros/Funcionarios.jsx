import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_EMPLOYEES = [
  {
    id: "FUNC-01",
    name: "Carlos Eduardo Santos",
    role: "Técnico de Oficina",
    department: "Oficina - Ensaio Hidrostático",
    cpf: "123.456.789-00",
    phone: "(31) 99881-2233",
    status: "Ativo",
  },
  {
    id: "FUNC-02",
    name: "Geraldo Magela de Oliveira",
    role: "Técnico de Recarga",
    department: "Oficina - Cargas CO2/PQS",
    cpf: "234.567.890-11",
    phone: "(31) 99772-4455",
    status: "Ativo",
  },
  {
    id: "FUNC-03",
    name: "Juliana Maria Fonseca",
    role: "Atendente de Recepção",
    department: "Comercial / Atendimento",
    cpf: "345.678.901-22",
    phone: "(31) 3224-5566",
    status: "Ativo",
  },
];

const ROLES = [
  "Técnico de Oficina",
  "Técnico de Recarga",
  "Inspetor de Qualidade Inmetro",
  "Atendente de Recepção",
  "Motorista / Coletor",
  "Gerente Operacional",
];

const EMPTY_EMPLOYEE = {
  id: "",
  name: "",
  role: "Técnico de Oficina",
  department: "Oficina",
  cpf: "",
  phone: "",
  status: "Ativo",
};

export default function Funcionarios() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_EMPLOYEE);

  const deleteEmployee = (id) => {
    if (window.confirm(`Confirma a exclusão do funcionário ${id}?`)) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_EMPLOYEE,
      id: `FUNC-0${employees.length + 1}`,
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
      alert("Por favor, informe o nome do funcionário.");
      return;
    }

    if (modalMode === "add") {
      setEmployees([formData, ...employees]);
    } else {
      setEmployees(employees.map((e) => (e.id === formData.id ? formData : e)));
    }
    setIsModalOpen(false);
  };

  const filteredData = employees.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Matrícula",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
    },
    {
      header: "Nome Completo",
      accessor: "name",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>CPF: {item.cpf || "-"}</div>
        </div>
      ),
    },
    {
      header: "Cargo / Função",
      accessor: "role",
      render: (item) => <span style={{ fontWeight: 600 }}>{item.role}</span>,
    },
    {
      header: "Setor / Departamento",
      accessor: "department",
    },
    {
      header: "Telefone",
      accessor: "phone",
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
          <button className="btn-table-action delete" onClick={() => deleteEmployee(item.id)}>
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
            👤 Cadastro de Funcionários
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fichário de colaboradores, equipe de oficina e atendimento
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Nome ou Cargo..."
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
            Incluir Funcionário
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "✨ Novo Funcionário" : `✏️ Editar Funcionário ${formData.id}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Matrícula</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly
                  style={{ background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Nome Completo</label>
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
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Cargo / Função</label>
                <select name="role" value={formData.role} onChange={handleInputChange}>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Setor / Departamento</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Ex: Oficina - Ensaio Hidrostático"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(31) 99999-8888"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
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
              Salvar Funcionário
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
