import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_CARRIERS = [
  {
    id: "TRA-01",
    name: "Expresso Transfire Ltda",
    cnpj: "12.345.678/0001-90",
    city: "Belo Horizonte",
    uf: "MG",
    phone: "(31) 3388-1000",
    vehiclePlate: "HKT-9920",
    status: "Ativo",
  },
  {
    id: "TRA-02",
    name: "Frota Própria CICOM (Coleta Local)",
    cnpj: "98.765.432/0001-10",
    city: "Belo Horizonte",
    uf: "MG",
    phone: "(31) 3224-5566",
    vehiclePlate: "PUX-1042",
    status: "Ativo",
  },
  {
    id: "TRA-03",
    name: "Transportadora Rápido Soluções",
    cnpj: "45.678.901/0001-20",
    city: "Contagem",
    uf: "MG",
    phone: "(31) 3395-4040",
    vehiclePlate: "GVE-4410",
    status: "Ativo",
  },
];

const EMPTY_CARRIER = {
  id: "",
  name: "",
  cnpj: "",
  city: "Belo Horizonte",
  uf: "MG",
  phone: "",
  vehiclePlate: "",
  status: "Ativo",
};

export default function Transportadoras() {
  const [carriers, setCarriers] = useState(INITIAL_CARRIERS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_CARRIER);

  const deleteCarrier = (id) => {
    if (window.confirm(`Confirma a exclusão da transportadora ${id}?`)) {
      setCarriers(carriers.filter((c) => c.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_CARRIER,
      id: `TRA-0${carriers.length + 1}`,
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
      alert("Por favor, informe a razão social da transportadora.");
      return;
    }

    if (modalMode === "add") {
      setCarriers([formData, ...carriers]);
    } else {
      setCarriers(carriers.map((c) => (c.id === formData.id ? formData : c)));
    }
    setIsModalOpen(false);
  };

  const filteredData = carriers.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.cnpj.includes(search)
  );

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
    },
    {
      header: "Razão Social / Transportadora",
      accessor: "name",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>CNPJ: {item.cnpj || "-"}</div>
        </div>
      ),
    },
    {
      header: "Cidade / UF",
      accessor: "city",
      render: (item) => (
        <span>
          {item.city} - {item.uf}
        </span>
      ),
    },
    {
      header: "Placa do Veículo",
      accessor: "vehiclePlate",
      render: (item) => (
        <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{item.vehiclePlate || "-"}</span>
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
          <button className="btn-table-action delete" onClick={() => deleteCarrier(item.id)}>
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
            🚚 Cadastro de Transportadoras & Frota de Coleta
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Empresas e veículos de transporte de extintores para coleta e entrega técnica
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar Transportadora..."
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
            Incluir Transportadora
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "✨ Nova Transportadora" : `✏️ Editar Transportadora ${formData.id}`}
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
                <label>Razão Social / Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Expresso Transfire Ltda"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>CNPJ</label>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  placeholder="00.000.000/0001-00"
                />
              </div>

              <div className="form-group">
                <label>Placa do Veículo principal</label>
                <input
                  type="text"
                  name="vehiclePlate"
                  value={formData.vehiclePlate}
                  onChange={handleInputChange}
                  placeholder="Ex: HKT-9920"
                />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(31) 3388-1000"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>UF</label>
                <input
                  type="text"
                  name="uf"
                  value={formData.uf}
                  onChange={handleInputChange}
                  maxLength={2}
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
              Salvar Transportadora
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
