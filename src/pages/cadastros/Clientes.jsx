import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_CLIENTS = [
  {
    id: "52369",
    name: "Alves & Cia Ltda",
    address: "Av. Afonso Pena",
    number: "1500",
    neighborhood: "Centro",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30130-003",
    email: "alves@cia.com.br",
    phone: "(31) 3224-5566",
    fax: "(31) 3224-5567",
    personType: "J",
    document: "12.345.678/0001-90",
    stateRegistration: "001.234.567.0008",
    contactName: "Geraldo Alves",
    contactEmail: "geraldo@alves.com.br",
    supervisor: "Carlos Silva",
    extinguisherQty: 15,
    replacementMonth: "Outubro",
    status: "Ativo",
  },
  {
    id: "52370",
    name: "Supermercado Silva",
    address: "Rua das Flores",
    number: "45",
    neighborhood: "Eldorado",
    city: "Contagem",
    state: "MG",
    cep: "32310-000",
    email: "contato@silvasuper.com.br",
    phone: "(31) 3351-9988",
    fax: "",
    personType: "J",
    document: "98.765.432/0001-10",
    stateRegistration: "002.987.654.0011",
    contactName: "Antônio Silva",
    contactEmail: "compras@silvasuper.com.br",
    supervisor: "Marcos Souza",
    extinguisherQty: 32,
    replacementMonth: "Dezembro",
    status: "Ativo",
  },
  {
    id: "52371",
    name: "Auto Mecânica Rápida",
    address: "Av. Amazonas",
    number: "3200",
    neighborhood: "Prado",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30410-000",
    email: "contato@mecanicarapida.com.br",
    phone: "(31) 3333-4444",
    fax: "",
    personType: "J",
    document: "45.678.901/0002-20",
    stateRegistration: "ISENTO",
    contactName: "Roberto Carlos",
    contactEmail: "roberto@mecanicarapida.com.br",
    supervisor: "Lucas Santos",
    extinguisherQty: 8,
    replacementMonth: "Março",
    status: "Inativo",
  },
  {
    id: "52372",
    name: "Drogaria Bem Estar",
    address: "Av. do Contorno",
    number: "8950",
    neighborhood: "Barro Preto",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30110-060",
    email: "contato@drogarisbemestar.com.br",
    phone: "(31) 3295-1212",
    fax: "(31) 3295-1213",
    personType: "J",
    document: "23.456.789/0001-30",
    stateRegistration: "003.456.789.0022",
    contactName: "Márcia Oliveira",
    contactEmail: "marcia@drogarisbemestar.com.br",
    supervisor: "Fernanda Lima",
    extinguisherQty: 5,
    replacementMonth: "Julho",
    status: "Ativo",
  },
  {
    id: "52373",
    name: "Doutor Marcelo Rezende (Consultório)",
    address: "Rua Paraíba",
    number: "1000",
    neighborhood: "Savassi",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30130-141",
    email: "marcelo@rezende.med.br",
    phone: "(31) 98877-6655",
    fax: "",
    personType: "F",
    document: "123.456.789-00",
    stateRegistration: "ISENTO",
    contactName: "Patrícia Rezende",
    contactEmail: "patricia@rezende.med.br",
    supervisor: "Marcelo Rezende",
    extinguisherQty: 3,
    replacementMonth: "Janeiro",
    status: "Ativo",
  },
];

const EMPTY_CLIENT = {
  id: "",
  name: "",
  address: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "MG",
  cep: "",
  email: "",
  phone: "",
  fax: "",
  personType: "J",
  document: "",
  stateRegistration: "",
  contactName: "",
  contactEmail: "",
  supervisor: "",
  extinguisherQty: 0,
  replacementMonth: "Janeiro",
  status: "Ativo",
};

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

// Helper formatting functions
const formatDocument = (value, type) => {
  const clean = value.replace(/\D/g, "");
  if (type === "F") {
    // CPF: 999.999.999-99
    return clean
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  } else {
    // CNPJ: 99.999.999/9999-99
    return clean
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
      .substring(0, 18);
  }
};

const formatCEP = (value) => {
  const clean = value.replace(/\D/g, "");
  return clean.replace(/(\d{5})(\d)/, "$1-$2").substring(0, 9);
};

const formatPhone = (value) => {
  const clean = value.replace(/\D/g, "");
  if (clean.length <= 10) {
    // (99) 9999-9999
    return clean
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 14);
  } else {
    // (99) 99999-9999
    return clean
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  }
};

export default function Clientes() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_CLIENT);

  const getNextId = () => {
    const ids = clients
      .map((c) => parseInt(c.id, 10))
      .filter((id) => !isNaN(id));
    if (ids.length === 0) return "52369";
    const max = Math.max(...ids);
    return (max + 1).toString();
  };

  const deleteClient = (id) => {
    if (window.confirm(`Confirma a exclusão do cliente de código ${id}?`)) {
      setClients(clients.filter((c) => c.id !== id));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      ...EMPTY_CLIENT,
      id: getNextId(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setModalMode("edit");
    setFormData({ ...client });
    setIsOpenModalDirectly(client);
  };

  const setIsOpenModalDirectly = (client) => {
    setFormData({ ...client });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "document") {
      formattedValue = formatDocument(value, formData.personType);
    } else if (name === "cep") {
      formattedValue = formatCEP(value);
      const cleanCep = value.replace(/\D/g, "");
      if (cleanCep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.erro) {
              setFormData((prev) => ({
                ...prev,
                address: data.logradouro || prev.address,
                neighborhood: data.bairro || prev.neighborhood,
                city: data.localidade || prev.city,
                state: data.uf || prev.state,
              }));
            }
          })
          .catch((err) => console.error("Erro ao buscar CEP:", err));
      } else {
        setFormData((prev) => ({
          ...prev,
          address: "",
          neighborhood: "",
          city: "",
          state: "",
        }));
      }
    } else if (name === "phone" || name === "fax") {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handlePersonTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      personType: newType,
      document: formatDocument(prev.document, newType),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Por favor, preencha o nome do cliente.");
      return;
    }

    if (modalMode === "add") {
      setClients([formData, ...clients]);
    } else {
      setClients(clients.map((c) => (c.id === formData.id ? formData : c)));
    }
    setIsModalOpen(false);
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      (c.document && c.document.includes(search)),
  );

  const columns = [
    {
      header: "Código",
      accessor: "id",
      cellStyle: { fontWeight: 600, color: "var(--accent-primary)" },
    },
    {
      header: "Nome / Razão",
      accessor: "name",
    },
    {
      header: "CNPJ / CPF",
      render: (c) => (
        <span>
          {c.document || (
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Não inf.
            </span>
          )}
        </span>
      ),
    },
    {
      header: "Cidade / UF",
      render: (c) => (
        <span>
          {c.city} - {c.state}
        </span>
      ),
    },
    {
      header: "Contato",
      render: (c) => (
        <span>
          {c.contactName || (
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              -
            </span>
          )}
        </span>
      ),
    },
    {
      header: "Mês Troca",
      render: (c) => (
        <span style={{ fontWeight: 500, color: "var(--accent-warning)" }}>
          {c.replacementMonth}
        </span>
      ),
    },
    {
      header: "Status",
      render: (c) => (
        <span
          className={`status-pill ${c.status === "Ativo" ? "success" : "danger"}`}
        >
          {c.status}
        </span>
      ),
    },
    {
      header: "Ações",
      render: (c) => (
        <div className="action-buttons">
          <button className="btn-table-action" onClick={() => openEditModal(c)}>
            Editar
          </button>
          <button
            className="btn-table-action delete"
            onClick={() => deleteClient(c.id)}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel">
      <style>{`
        .form-section-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent-primary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.4rem;
          margin-top: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-grid-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .form-grid-3col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .form-grid-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .form-grid-custom-address {
          display: grid;
          grid-template-columns: 1.5fr 2.5fr 1fr 2fr;
          gap: 1rem;
        }
        .form-group input:disabled,
        .form-group select:disabled {
          background-color: var(--bg-hover) !important;
          opacity: 0.6;
          cursor: not-allowed;
          border-color: var(--border-color);
        }
        .form-grid-custom-city {
          display: grid;
          grid-template-columns: 3fr 1fr 3fr;
          gap: 1rem;
        }
        .form-grid-custom-contact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .form-grid-4col, .form-grid-3col, .form-grid-2col, 
          .form-grid-custom-address, .form-grid-custom-city, .form-grid-custom-contact {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>👥 Cadastro de Clientes</h4>
        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por nome, código, cidade..."
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
            Incluir Cliente
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
            ? "✨ Novo Cadastro de Cliente"
            : `✏️ Editar Cliente - Código ${formData.id}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* IDENTIFICAÇÃO BÁSICA */}
            <div className="form-section-title">Identificação Básica</div>
            <div className="form-grid-4col">
              <div className="form-group">
                <label>Código Nº</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly
                  style={{
                    background: "var(--bg-hover)",
                    cursor: "not-allowed",
                    fontWeight: 600,
                  }}
                />
              </div>
              <div className="form-group">
                <label>Pessoa</label>
                <select
                  name="personType"
                  value={formData.personType}
                  onChange={handlePersonTypeChange}
                >
                  <option value="J">Jurídica (J)</option>
                  <option value="F">Física (F)</option>
                </select>
              </div>
              <div className="form-group">
                <label>CPF/CNPJ</label>
                <input
                  type="text"
                  name="document"
                  value={formData.document}
                  onChange={handleInputChange}
                  placeholder={
                    formData.personType === "F"
                      ? "000.000.000-00"
                      : "00.000.000/0001-00"
                  }
                />
              </div>
              <div className="form-group">
                <label>Insc. (Estadual / RG)</label>
                <input
                  type="text"
                  name="stateRegistration"
                  value={formData.stateRegistration}
                  onChange={handleInputChange}
                  placeholder="Inscrição Estadual ou RG"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nome / Razão Social</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome completo ou Razão Social"
                required
              />
            </div>

            {/* LOCALIZAÇÃO */}
            <div className="form-section-title">Endereço e Localização</div>
            <div className="form-grid-custom-address">
              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  placeholder="00000-000"
                />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rua, Avenida, etc."
                  disabled={
                    !formData.cep || formData.cep.replace(/\D/g, "").length < 8
                  }
                />
              </div>
              <div className="form-group">
                <label>Número (Nr.)</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="S/N"
                  disabled={
                    !formData.cep || formData.cep.replace(/\D/g, "").length < 8
                  }
                />
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  placeholder="Bairro"
                  disabled={
                    !formData.cep || formData.cep.replace(/\D/g, "").length < 8
                  }
                />
              </div>
            </div>

            <div className="form-grid-custom-city">
              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Cidade"
                  disabled={
                    !formData.cep || formData.cep.replace(/\D/g, "").length < 8
                  }
                />
              </div>
              <div className="form-group">
                <label>UF</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={
                    !formData.cep || formData.cep.replace(/\D/g, "").length < 8
                  }
                >
                  {STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>E-mail Geral</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@empresa.com"
                />
              </div>
            </div>

            {/* CONTATOS */}
            <div className="form-section-title">Telefones e Contatos</div>
            <div className="form-grid-3col">
              <div className="form-group">
                <label>Telefone (Fone)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div className="form-group">
                <label>Fax</label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div className="form-group">
                <label>Contato</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Nome do contato principal"
                />
              </div>
            </div>

            <div className="form-grid-2col">
              <div className="form-group">
                <label>E-mail do Contato</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="contato@empresa.com"
                />
              </div>
              <div className="form-group">
                <label>Encarregado</label>
                <input
                  type="text"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  placeholder="Nome do encarregado/supervisor"
                />
              </div>
            </div>

            {/* INFORMAÇÕES OPERACIONAIS */}
            <div className="form-section-title">Informações Operacionais</div>
            <div className="form-grid-3col">
              <div className="form-group">
                <label>Qtde Ext. (Qtd. Extintores)</label>
                <input
                  type="number"
                  name="extinguisherQty"
                  value={formData.extinguisherQty}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Mês Troca</label>
                <select
                  name="replacementMonth"
                  value={formData.replacementMonth}
                  onChange={handleInputChange}
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
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
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "0.5rem 1rem" }}
            >
              Salvar Cadastro
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
