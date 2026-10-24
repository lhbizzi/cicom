import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_EMPLOYEES = [
  { codigo: 1, nome: "Carlos Eduardo Santos" },
  { codigo: 2, nome: "Geraldo Magela de Oliveira" },
  { codigo: 3, nome: "Juliana Maria Fonseca" },
];

const EMPTY_EMPLOYEE = {
  codigo: "",
  nome: "",
};

export default function Funcionarios() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_EMPLOYEE);
  const [editingCodigo, setEditingCodigo] = useState(null);

  const deleteEmployee = (codigo) => {
    if (window.confirm(`Confirma a exclusão do funcionário de código ${codigo}?`)) {
      setEmployees(employees.filter((e) => e.codigo !== codigo));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingCodigo(null);
    // Sugere sempre o último Id cadastrado mais 1 (ex: se foi 70, sugere 71)
    const nextCodigo =
      employees.length > 0
        ? Math.max(...employees.map((e) => Number(e.codigo) || 0)) + 1
        : 1;
    setFormData({
      codigo: nextCodigo,
      nome: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setEditingCodigo(item.codigo);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "codigo") {
      // Aceita apenas números (remove qualquer letra ou caractere especial)
      const numericOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        codigo: numericOnly,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.codigo === "" || formData.codigo === null || formData.codigo === undefined) {
      alert("Por favor, informe o código do funcionário (apenas números).");
      return;
    }

    const codNum = Number(formData.codigo);
    if (isNaN(codNum) || codNum <= 0) {
      alert("Por favor, informe um código numérico válido maior que zero.");
      return;
    }

    if (!formData.nome.trim()) {
      alert("Por favor, preencha o nome do funcionário.");
      return;
    }

    if (modalMode === "add") {
      if (employees.some((e) => Number(e.codigo) === codNum)) {
        alert(`Já existe um funcionário cadastrado com o código ${codNum}.`);
        return;
      }
      setEmployees([...employees, { codigo: codNum, nome: formData.nome.trim() }]);
    } else {
      // Se o código foi alterado na edição, valida se o novo código já existe em outro funcionário
      if (
        codNum !== editingCodigo &&
        employees.some((e) => Number(e.codigo) === codNum)
      ) {
        alert(`Já existe outro funcionário cadastrado com o código ${codNum}.`);
        return;
      }

      setEmployees(
        employees.map((e) =>
          e.codigo === editingCodigo
            ? { codigo: codNum, nome: formData.nome.trim() }
            : e
        )
      );
    }
    setIsModalOpen(false);
  };

  const filteredData = employees.filter((item) => {
    const q = search.toLowerCase();
    return (
      String(item.codigo).includes(q) ||
      item.nome.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      header: "Código",
      accessor: "codigo",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "120px" },
      render: (item) => <span>#{item.codigo}</span>,
    },
    {
      header: "Nome do Funcionário",
      accessor: "nome",
      render: (item) => (
        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.nome}</span>
      ),
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
          <button className="btn-table-action delete" onClick={() => deleteEmployee(item.codigo)}>
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel">
      {/* Control Bar */}
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h4 style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            👷 Cadastro de Funcionários
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Controle simplificado de códigos e nomes dos colaboradores da oficina e atendimento
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Código ou Nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "280px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Funcionário
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
            ? "✨ Cadastro de Novo Funcionário"
            : `✏️ Editar Funcionário - Código ${formData.codigo}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Codigo:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  placeholder="Ex: 71"
                  required
                  style={{ fontWeight: 700 }}
                  autoFocus={modalMode === "add"}
                />
              </div>

              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Funcionário"
                  required
                  autoFocus={modalMode === "edit"}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn-table-action"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
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
