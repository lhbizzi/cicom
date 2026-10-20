import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_CITIES = [
  {
    ibgeCode: "3106200",
    cityName: "Belo Horizonte",
    uf: "MG",
    aliquotIss: 5.0,
    status: "Ativo",
  },
  {
    ibgeCode: "3118601",
    cityName: "Contagem",
    uf: "MG",
    aliquotIss: 3.0,
    status: "Ativo",
  },
  {
    ibgeCode: "3106705",
    cityName: "Betim",
    uf: "MG",
    aliquotIss: 3.0,
    status: "Ativo",
  },
  {
    ibgeCode: "3162500",
    cityName: "São João del Rei",
    uf: "MG",
    aliquotIss: 2.5,
    status: "Ativo",
  },
  {
    ibgeCode: "3550308",
    cityName: "São Paulo",
    uf: "SP",
    aliquotIss: 5.0,
    status: "Ativo",
  },
];

const EMPTY_CITY = {
  ibgeCode: "",
  cityName: "",
  uf: "MG",
  aliquotIss: 3.0,
  status: "Ativo",
};

export default function CidadesNfe() {
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_CITY);

  const deleteCity = (ibgeCode) => {
    if (window.confirm(`Confirma a exclusão da cidade código IBGE ${ibgeCode}?`)) {
      setCities(cities.filter((c) => c.ibgeCode !== ibgeCode));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({ ...EMPTY_CITY });
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
      [name]: name === "aliquotIss" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ibgeCode.trim() || !formData.cityName.trim()) {
      alert("Por favor, preencha o código IBGE e o nome da cidade.");
      return;
    }

    if (modalMode === "add") {
      setCities([formData, ...cities]);
    } else {
      setCities(cities.map((c) => (c.ibgeCode === formData.ibgeCode ? formData : c)));
    }
    setIsModalOpen(false);
  };

  const filteredData = cities.filter(
    (item) =>
      item.ibgeCode.includes(search) ||
      item.cityName.toLowerCase().includes(search.toLowerCase()) ||
      item.uf.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Código IBGE",
      accessor: "ibgeCode",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", fontFamily: "monospace", width: "130px" },
    },
    {
      header: "Nome do Município",
      accessor: "cityName",
      render: (item) => <span style={{ fontWeight: 600 }}>{item.cityName}</span>,
    },
    {
      header: "UF",
      accessor: "uf",
      render: (item) => <span className="badge badge-info">{item.uf}</span>,
    },
    {
      header: "Alíquota ISS (%)",
      accessor: "aliquotIss",
      render: (item) => <span style={{ fontWeight: 700 }}>{item.aliquotIss.toFixed(1)}%</span>,
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
          <button className="btn-table-action delete" onClick={() => deleteCity(item.ibgeCode)}>
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
            🏙️ Cadastro de Cidades & Códigos IBGE (NFe / NFSe)
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tabela de municípios homologados para emissão fiscal e alíquotas de ISS
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar Cidade ou IBGE..."
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
            Incluir Cidade
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "✨ Nova Cidade NFe" : `✏️ Editar Cidade IBGE ${formData.ibgeCode}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Código IBGE (7 Dígitos)</label>
                <input
                  type="text"
                  name="ibgeCode"
                  value={formData.ibgeCode}
                  readOnly={modalMode === "edit"}
                  onChange={handleInputChange}
                  maxLength={7}
                  placeholder="Ex: 3106200"
                  required
                  style={modalMode === "edit" ? { background: "var(--bg-hover)", cursor: "not-allowed", fontWeight: 700 } : { fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Nome do Município</label>
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  placeholder="Ex: Belo Horizonte"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
              <div className="form-group">
                <label>UF (Estado)</label>
                <input
                  type="text"
                  name="uf"
                  value={formData.uf}
                  onChange={handleInputChange}
                  maxLength={2}
                  required
                />
              </div>

              <div className="form-group">
                <label>Alíquota ISS (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="aliquotIss"
                  value={formData.aliquotIss}
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
              style={{ padding: "0.5rem 1rem" }}
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
