import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_CARRIERS = [
  {
    codigo: 1,
    nome: "Expresso Transfire Ltda",
    endereco: "Av. Amazonas, 4500 - Prado",
    cidade: "Belo Horizonte",
    estado: "MG",
    cep: "30411-000",
    telefone: "(31) 3388-1000",
    fax: "(31) 3388-1001",
    cnpj: "12.345.678/0001-90",
    inscr: "062.123.456.0078",
    contato: "Marcos Andrade",
    obs: "Coleta diária às 16h para extintores industriais",
  },
  {
    codigo: 2,
    nome: "Frota Própria CICOM (Coleta Local)",
    endereco: "Rua Carijós, 120 - Centro",
    cidade: "Belo Horizonte",
    estado: "MG",
    cep: "30120-060",
    telefone: "(31) 3224-5566",
    fax: "",
    cnpj: "98.765.432/0001-10",
    inscr: "Isento",
    contato: "Geraldo (Motorista)",
    obs: "Veículo próprio para transporte de extintores sob recarga",
  },
  {
    codigo: 3,
    nome: "Transportadora Rápido Soluções",
    endereco: "Via Expressa de Contagem, 2100",
    cidade: "Contagem",
    estado: "MG",
    cep: "32370-485",
    telefone: "(31) 3395-4040",
    fax: "(31) 3395-4041",
    cnpj: "45.678.901/0001-20",
    inscr: "062.987.654.0012",
    contato: "Renata Viana",
    obs: "Entrega em toda a região metropolitana de BH e Betim",
  },
];

const UF_OPTIONS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO"
];

const EMPTY_CARRIER = {
  codigo: "",
  nome: "",
  endereco: "",
  cidade: "Belo Horizonte",
  estado: "MG",
  cep: "",
  telefone: "",
  fax: "",
  cnpj: "",
  inscr: "",
  contato: "",
  obs: "",
};

export default function Transportadoras() {
  const [carriers, setCarriers] = useState(INITIAL_CARRIERS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_CARRIER);
  const [editingCodigo, setEditingCodigo] = useState(null);

  const deleteCarrier = (codigo) => {
    if (window.confirm(`Confirma a exclusão da transportadora de código ${codigo}?`)) {
      setCarriers(carriers.filter((c) => c.codigo !== codigo));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingCodigo(null);
    // Sugere sempre o último Id cadastrado mais 1
    const nextCodigo =
      carriers.length > 0
        ? Math.max(...carriers.map((c) => Number(c.codigo) || 0)) + 1
        : 1;
    setFormData({
      ...EMPTY_CARRIER,
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.codigo === "" || formData.codigo === null || formData.codigo === undefined) {
      alert("Por favor, informe o código da transportadora (apenas números).");
      return;
    }

    const codNum = Number(formData.codigo);
    if (isNaN(codNum) || codNum <= 0) {
      alert("Por favor, informe um código numérico válido maior que zero.");
      return;
    }

    if (!formData.nome.trim()) {
      alert("Por favor, informe o nome / razão social da transportadora.");
      return;
    }

    if (modalMode === "add") {
      if (carriers.some((c) => Number(c.codigo) === codNum)) {
        alert(`Já existe uma transportadora cadastrada com o código ${codNum}.`);
        return;
      }
      setCarriers([...carriers, { ...formData, codigo: codNum }]);
    } else {
      if (
        codNum !== editingCodigo &&
        carriers.some((c) => Number(c.codigo) === codNum)
      ) {
        alert(`Já existe outra transportadora cadastrada com o código ${codNum}.`);
        return;
      }

      setCarriers(
        carriers.map((c) =>
          c.codigo === editingCodigo ? { ...formData, codigo: codNum } : c
        )
      );
    }
    setIsModalOpen(false);
  };

  const filteredData = carriers.filter((item) => {
    const q = search.toLowerCase();
    return (
      String(item.codigo).includes(q) ||
      item.nome.toLowerCase().includes(q) ||
      item.cidade.toLowerCase().includes(q) ||
      item.cnpj.toLowerCase().includes(q) ||
      item.contato.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      header: "Código",
      accessor: "codigo",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
      render: (item) => <span>#{item.codigo}</span>,
    },
    {
      header: "Razão Social / Transportadora",
      accessor: "nome",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.nome}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            CNPJ: <strong>{item.cnpj || "-"}</strong> • Inscr: {item.inscr || "-"}
          </div>
        </div>
      ),
    },
    {
      header: "Cidade / UF",
      accessor: "cidade",
      render: (item) => (
        <div>
          <div>{item.cidade} - <strong>{item.estado}</strong></div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.endereco || "-"}</div>
        </div>
      ),
    },
    {
      header: "Telefone / Contato",
      accessor: "telefone",
      render: (item) => (
        <div style={{ fontSize: "0.82rem" }}>
          <div>Tel: <strong>{item.telefone || "-"}</strong></div>
          <div style={{ color: "var(--text-muted)" }}>Contato: {item.contato || "-"}</div>
        </div>
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
          <button className="btn-table-action delete" onClick={() => deleteCarrier(item.codigo)}>
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
            🚚 Cadastro de Transportadoras
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Gerenciamento de empresas transportadoras para entrega e coleta de extintores
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Código, Nome, CNPJ ou Cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "320px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nova Transportadora
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
            ? "✨ Cadastro de Transportadoras - Nova"
            : `✏️ Cadastro de Transportadoras - Código ${formData.codigo}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Linha 1: Codigo & Nome */}
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem" }}>
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
                <label>Nome.....:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Razão Social / Nome da Transportadora"
                  required
                  autoFocus={modalMode === "edit"}
                />
              </div>
            </div>

            {/* Linha 2: Endereco */}
            <div className="form-group">
              <label>Endereco.:</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                placeholder="Logradouro, número e bairro"
              />
            </div>

            {/* Linha 3: Cidade, Estado, CEP */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 100px 140px", gap: "1rem" }}>
              <div className="form-group">
                <label>Cidade...:</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Nome da cidade"
                />
              </div>

              <div className="form-group">
                <label>Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  style={{ fontWeight: 700 }}
                >
                  {UF_OPTIONS.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>CEP:</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  placeholder="30000-000"
                />
              </div>
            </div>

            {/* Linha 4: Telefone & Fax */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Telefone.:</label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(31) 3388-1000"
                />
              </div>

              <div className="form-group">
                <label>Fax...:</label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  placeholder="(31) 3388-1001"
                />
              </div>
            </div>

            {/* Linha 5: CNPJ & Inscr */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>CNPJ.....:</label>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  placeholder="00.000.000/0001-00"
                />
              </div>

              <div className="form-group">
                <label>Inscr.:</label>
                <input
                  type="text"
                  name="inscr"
                  value={formData.inscr}
                  onChange={handleInputChange}
                  placeholder="Inscrição Estadual ou Isento"
                />
              </div>
            </div>

            {/* Linha 6: Contato */}
            <div className="form-group">
              <label>Contato..:</label>
              <input
                type="text"
                name="contato"
                value={formData.contato}
                onChange={handleInputChange}
                placeholder="Nome da pessoa de contato / atendente"
              />
            </div>

            {/* Linha 7: Obs */}
            <div className="form-group">
              <label>Obs......:</label>
              <textarea
                name="obs"
                rows={2}
                value={formData.obs}
                onChange={handleInputChange}
                placeholder="Observações adicionais sobre transporte, horários de coleta, etc."
              />
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
              Salvar Transportadora
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
