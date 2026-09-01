import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_BRANDS = [
  { id: "01", name: "Kidde" },
  { id: "02", name: "Mocelin" },
  { id: "03", name: "Bucka" },
  { id: "04", name: "Resil" },
  { id: "05", name: "Extang" },
  { id: "06", name: "Indext" },
  { id: "07", name: "Metalcasty" },
  { id: "08", name: "Cruzeiro" }
];

const EMPTY_BRAND = {
  id: "",
  name: ""
};

export default function Marcas() {
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_BRAND);

  const deleteBrand = (id) => {
    if (window.confirm(`Confirma a exclusão da marca de código ${id}?`)) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      id: "",
      name: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (brand) => {
    setModalMode("edit");
    setFormData({ ...brand });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "id") {
      finalValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 4);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id.trim()) {
      alert("Por favor, preencha o código da marca.");
      return;
    }
    if (!formData.name.trim()) {
      alert("Por favor, preencha o nome da marca.");
      return;
    }

    if (modalMode === "add") {
      const exists = brands.some((b) => b.id.toUpperCase() === formData.id.toUpperCase());
      if (exists) {
        alert(`Já existe uma marca cadastrada com o código "${formData.id}".`);
        return;
      }
      setBrands([formData, ...brands]);
    } else {
      setBrands(brands.map((b) => (b.id === formData.id ? formData : b)));
    }
    setIsModalOpen(false);
  };

  const filtered = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.id.includes(search)
  );

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 600, color: "var(--accent-primary)", width: "120px" }
    },
    {
      header: "Nome da Marca",
      accessor: "name"
    },
    {
      header: "Ações",
      headerStyle: { width: "180px", textAlign: "right" },
      cellStyle: { textAlign: "right" },
      render: (b) => (
        <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
          <button className="btn-table-action" onClick={() => openEditModal(b)}>
            Editar
          </button>
          <button
            className="btn-table-action delete"
            onClick={() => deleteBrand(b.id)}
          >
            Excluir
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="glass-panel">
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>🏷️ Cadastro de Marcas</h4>
        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por nome ou código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "260px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
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
            Incluir Marca
          </button>
        </div>
      </div>

      <Grid data={filtered} columns={columns} />

      {/* Include/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "✨ Novo Cadastro de Marca"
            : `✏️ Editar Marca - Código ${formData.id}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group" style={{ maxWidth: "200px" }}>
              <label>Código</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                readOnly={modalMode === "edit"}
                onChange={handleInputChange}
                maxLength={4}
                placeholder="Ex: A123"
                required
                style={
                  modalMode === "edit"
                    ? {
                        background: "var(--bg-hover)",
                        cursor: "not-allowed",
                        fontWeight: 600
                      }
                    : { fontWeight: 600 }
                }
              />
            </div>
            
            <div className="form-group">
              <label>Nome da Marca</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Kidde, Mocelin, Bucka"
                required
                autoFocus
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
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "0.5rem 1rem" }}
            >
              Salvar Marca
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
