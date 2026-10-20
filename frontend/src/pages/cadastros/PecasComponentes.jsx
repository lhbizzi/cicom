import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_PARTS = [
  {
    id: "PEC-001",
    name: "Válvula de Latão para Extintor PQS 4kg/6kg",
    category: "Válvulas",
    unit: "UN",
    costPrice: 28.5,
    salePrice: 55.0,
    stockQty: 145,
    minStock: 30,
    status: "Ativo",
  },
  {
    id: "PEC-002",
    name: "Manômetro Wika 14 kgf/cm² (Rosca 1/8 NPT)",
    category: "Manômetros",
    unit: "UN",
    costPrice: 12.0,
    salePrice: 28.0,
    stockQty: 210,
    minStock: 50,
    status: "Ativo",
  },
  {
    id: "PEC-003",
    name: "Mangote de Borracha com Difusor para CO2 6kg",
    category: "Mangotes",
    unit: "UN",
    costPrice: 45.0,
    salePrice: 95.0,
    stockQty: 18,
    minStock: 25, // Alert low stock
    status: "Ativo",
  },
  {
    id: "PEC-004",
    name: "Pó Químico Seco PQS ABC 90% (Saco 25kg)",
    category: "Agente Extintor",
    unit: "KG",
    costPrice: 8.5,
    salePrice: 18.0,
    stockQty: 850,
    minStock: 200,
    status: "Ativo",
  },
  {
    id: "PEC-005",
    name: "Carga de Gás Carbônico CO2 Industrial",
    category: "Agente Extintor",
    unit: "KG",
    costPrice: 6.0,
    salePrice: 15.0,
    stockQty: 420,
    minStock: 100,
    status: "Ativo",
  },
  {
    id: "PEC-006",
    name: "Anel de Vedação O-ring de Borracha Nitrílica",
    category: "Vedações",
    unit: "UN",
    costPrice: 0.5,
    salePrice: 3.5,
    stockQty: 1200,
    minStock: 300,
    status: "Ativo",
  },
  {
    id: "SRV-001",
    name: "Serviço de Ensaio Hidrostático (Nível 3 ABNT)",
    category: "Serviços",
    unit: "SV",
    costPrice: 30.0,
    salePrice: 85.0,
    stockQty: 9999,
    minStock: 0,
    status: "Ativo",
  },
];

const CATEGORIES = [
  "Válvulas",
  "Manômetros",
  "Mangotes",
  "Agente Extintor",
  "Vedações",
  "Serviços",
  "Acessórios",
];

const EMPTY_PART = {
  id: "",
  name: "",
  category: "Válvulas",
  unit: "UN",
  costPrice: 0.0,
  salePrice: 0.0,
  stockQty: 0,
  minStock: 10,
  status: "Ativo",
};

export default function PecasComponentes() {
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_PART);

  const deletePart = (id) => {
    if (window.confirm(`Confirma a exclusão da peça/serviço código ${id}?`)) {
      setParts(parts.filter((p) => p.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_PART,
      id: `PEC-${Math.floor(100 + Math.random() * 900)}`,
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
      [name]: name === "costPrice" || name === "salePrice" || name === "stockQty" || name === "minStock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Por favor, preencha a descrição da peça.");
      return;
    }

    if (modalMode === "add") {
      const exists = parts.some((item) => item.id.toUpperCase() === formData.id.toUpperCase());
      if (exists) {
        alert(`Já existe um item cadastrado com o código "${formData.id}".`);
        return;
      }
      setParts([formData, ...parts]);
    } else {
      setParts(parts.map((item) => (item.id === formData.id ? formData : item)));
    }
    setIsModalOpen(false);
  };

  const filteredData = parts.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;

    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
    },
    {
      header: "Descrição da Peça / Componente",
      accessor: "name",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Categoria: {item.category} | Unidade: {item.unit}
          </div>
        </div>
      ),
    },
    {
      header: "Preço de Custo",
      accessor: "costPrice",
      render: (item) => (
        <span style={{ color: "var(--text-muted)" }}>
          R$ {Number(item.costPrice).toFixed(2).replace(".", ",")}
        </span>
      ),
    },
    {
      header: "Preço de Tabela (Venda)",
      accessor: "salePrice",
      render: (item) => (
        <span style={{ fontWeight: 700, color: "var(--color-success)" }}>
          R$ {Number(item.salePrice).toFixed(2).replace(".", ",")}
        </span>
      ),
    },
    {
      header: "Estoque Atual",
      accessor: "stockQty",
      render: (item) => {
        const isLow = item.category !== "Serviços" && item.stockQty <= item.minStock;
        return (
          <div>
            <span style={{ fontWeight: 700, color: isLow ? "var(--color-danger)" : "var(--text-main)" }}>
              {item.stockQty} {item.unit}
            </span>
            {isLow && <span style={{ marginLeft: "8px", fontSize: "0.75rem", color: "var(--color-danger)" }}>(Estoque Baixo!)</span>}
          </div>
        );
      },
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
          <button className="btn-table-action delete" onClick={() => deletePart(item.id)}>
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
            🔩 Cadastro de Peças, Componentes e Tabela de Preços
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Gerenciamento de insumos para manutenção de extintores e tabela de serviços
          </span>
        </div>

        <div className="flex-gap" style={{ flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Pesquisar por Código ou Nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "250px" }}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-input)",
              color: "var(--text-main)",
            }}
          >
            <option value="">Todas Categorias</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Incluir Peça/Serviço
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
            ? "✨ Cadastro de Nova Peça / Serviço"
            : `✏️ Editar Peça - Código ${formData.id}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Código da Peça</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly={modalMode === "edit"}
                  onChange={handleInputChange}
                  placeholder="Ex: PEC-001"
                  required
                  style={modalMode === "edit" ? { background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 } : { fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Descrição do Item / Componente</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Válvula de Latão para Extintor PQS 4kg"
                required
                autoFocus
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Unidade de Medida</label>
                <select name="unit" value={formData.unit} onChange={handleInputChange}>
                  <option value="UN">UN (Unidade)</option>
                  <option value="KG">KG (Quilograma)</option>
                  <option value="L">L (Litro)</option>
                  <option value="SV">SV (Serviço)</option>
                  <option value="CX">CX (Caixa)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preço de Custo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preço de Tabela Venda (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  required
                  style={{ fontWeight: 700, color: "var(--color-success)" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Estoque Atual</label>
                <input
                  type="number"
                  name="stockQty"
                  value={formData.stockQty}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Estoque Mínimo (Alerta)</label>
                <input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleInputChange}
                  required
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
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>
              Salvar Peça
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
