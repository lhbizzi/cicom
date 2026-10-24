import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_CITIES = [
  { codigo: 1, cidade: "Belo Horizonte", estado: "MG" },
  { codigo: 2, cidade: "Contagem", estado: "MG" },
  { codigo: 3, cidade: "Betim", estado: "MG" },
  { codigo: 4, cidade: "São João del Rei", estado: "MG" },
  { codigo: 5, cidade: "São Paulo", estado: "SP" },
  { codigo: 6, cidade: "Rio de Janeiro", estado: "RJ" },
];

const UF_OPTIONS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO"
];

const EMPTY_CITY = {
  codigo: "",
  cidade: "",
  estado: "MG",
};

export default function CidadesNfe() {
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_CITY);
  const [editingCodigo, setEditingCodigo] = useState(null);

  const deleteCity = (codigo) => {
    if (window.confirm(`Confirma a exclusão da cidade código ${codigo}?`)) {
      setCities(cities.filter((c) => c.codigo !== codigo));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingCodigo(null);
    // Sugere sempre o último Id cadastrado mais 1
    const nextCodigo =
      cities.length > 0
        ? Math.max(...cities.map((c) => Number(c.codigo) || 0)) + 1
        : 1;
    setFormData({
      ...EMPTY_CITY,
      codigo: nextCodigo,
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
    if (name === "estado") {
      setFormData((prev) => ({
        ...prev,
        estado: value.toUpperCase().slice(0, 2),
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
      alert("Por favor, informe o código da cidade (apenas números).");
      return;
    }

    const codNum = Number(formData.codigo);
    if (isNaN(codNum) || codNum <= 0) {
      alert("Por favor, informe um código numérico válido maior que zero.");
      return;
    }

    if (!formData.cidade.trim()) {
      alert("Por favor, preencha o nome da cidade.");
      return;
    }

    if (!formData.estado.trim()) {
      alert("Por favor, preencha a sigla do estado.");
      return;
    }

    if (modalMode === "add") {
      if (cities.some((c) => Number(c.codigo) === codNum)) {
        alert(`Já existe uma cidade cadastrada com o código ${codNum}.`);
        return;
      }
      setCities([...cities, { ...formData, codigo: codNum }]);
    } else {
      if (
        codNum !== editingCodigo &&
        cities.some((c) => Number(c.codigo) === codNum)
      ) {
        alert(`Já existe outra cidade cadastrada com o código ${codNum}.`);
        return;
      }

      setCities(
        cities.map((c) =>
          c.codigo === editingCodigo ? { ...formData, codigo: codNum } : c
        )
      );
    }
    setIsModalOpen(false);
  };

  const filteredData = cities.filter((item) => {
    const q = search.toLowerCase();
    return (
      String(item.codigo).includes(q) ||
      item.cidade.toLowerCase().includes(q) ||
      item.estado.toLowerCase().includes(q)
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
      header: "Cidade",
      accessor: "cidade",
      render: (item) => <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.cidade}</span>,
    },
    {
      header: "Estado (UF)",
      accessor: "estado",
      render: (item) => (
        <span
          style={{
            fontWeight: 700,
            background: "var(--bg-hover)",
            padding: "3px 8px",
            borderRadius: "4px",
            color: "var(--accent-primary)",
          }}
        >
          {item.estado}
        </span>
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
          <button className="btn-table-action delete" onClick={() => deleteCity(item.codigo)}>
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
            🏙️ Cadastro de Cidades
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tabela de municípios e unidades federativas (UF) para faturamento e ordens de serviço
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Código, Cidade ou Estado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "290px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nova Cidade
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
            ? "✨ Cadastro de Cidades - Nova Cidade"
            : `✏️ Cadastro de Cidades - Código ${formData.codigo}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 100px", gap: "1rem" }}>
              <div className="form-group">
                <label>Codigo...:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  placeholder="Ex: 1"
                  required
                  style={{ fontWeight: 700 }}
                  autoFocus={modalMode === "add"}
                />
              </div>

              <div className="form-group">
                <label>Cidade...:</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Nome do município"
                  required
                  autoFocus={modalMode === "edit"}
                />
              </div>

              <div className="form-group">
                <label>Estado...:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                  style={{ fontWeight: 700 }}
                >
                  {UF_OPTIONS.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
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
              Salvar Cidade
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
