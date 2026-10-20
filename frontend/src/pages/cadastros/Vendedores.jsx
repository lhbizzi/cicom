import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_VENDORS = [
  {
    id: "VEN-01",
    name: "Roberto Carlos Silveira",
    commissionRate: 5.0,
    phone: "(31) 99888-1122",
    email: "roberto.vendas@cicom.com.br",
    region: "Belo Horizonte / Região Metropolitana",
    status: "Ativo",
  },
  {
    id: "VEN-02",
    name: "Ana Paula Mendes",
    commissionRate: 4.5,
    phone: "(31) 99777-3344",
    email: "ana.mendes@cicom.com.br",
    region: "Contagem e Betim / Industrial",
    status: "Ativo",
  },
  {
    id: "VEN-03",
    name: "Marcos Vinícius Costa",
    commissionRate: 5.0,
    phone: "(31) 99666-5566",
    email: "marcos.costa@cicom.com.br",
    region: "Interior MG / Zona da Mata",
    status: "Ativo",
  },
];

const EMPTY_VENDOR = {
  id: "",
  name: "",
  commissionRate: 5.0,
  phone: "",
  email: "",
  region: "",
  status: "Ativo",
};

export default function Vendedores() {
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_VENDOR);

  const deleteVendor = (id) => {
    if (window.confirm(`Confirma a exclusão do vendedor ${id}?`)) {
      setVendors(vendors.filter((v) => v.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_VENDOR,
      id: `VEN-0${vendors.length + 1}`,
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
      [name]: name === "commissionRate" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Por favor, informe o nome do vendedor.");
      return;
    }

    if (modalMode === "add") {
      setVendors([formData, ...vendors]);
    } else {
      setVendors(vendors.map((v) => (v.id === formData.id ? formData : v)));
    }
    setIsModalOpen(false);
  };

  const filteredData = vendors.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
    },
    {
      header: "Nome do Vendedor / Representante",
      accessor: "name",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.email}</div>
        </div>
      ),
    },
    {
      header: "Região de Atuação",
      accessor: "region",
    },
    {
      header: "Comissão (%)",
      accessor: "commissionRate",
      render: (item) => (
        <span style={{ fontWeight: 700, color: "var(--color-success)" }}>
          {item.commissionRate.toFixed(1)}%
        </span>
      ),
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
          <button className="btn-table-action delete" onClick={() => deleteVendor(item.id)}>
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
            💼 Cadastro de Vendedores & Representantes
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Controle de vendedores comerciais e percentuais de comissão
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar Vendedor..."
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
            Incluir Vendedor
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "✨ Novo Vendedor Comercial" : `✏️ Editar Vendedor ${formData.id}`}
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
                <label>Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Roberto Carlos Silveira"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Comissão (%)</label>
                <input
                  type="number"
                  step="0.5"
                  name="commissionRate"
                  value={formData.commissionRate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Telefone / WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(31) 99888-1122"
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

            <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <label>Região de Atuação Comercial</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Ex: Belo Horizonte / Região Metropolitana"
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
              Salvar Vendedor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
