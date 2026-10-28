import { useState, useRef } from "react";
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

const capitalizeWords = (str) => {
  if (!str) return "";
  const lowercaseWords = new Set(["de", "da", "do", "das", "dos", "e", "em", "para", "com"]);
  const acronyms = new Set([
    "LTDA", "ME", "EPP", "EIRELI", "S.A.", "S/A", "SA", "CIA",
    "CNPJ", "CPF", "RG", "DF", "MG", "SP", "RJ", "ES", "PR",
    "SC", "RS", "MS", "MT", "GO", "BA", "SE", "AL", "PE",
    "PB", "RN", "CE", "PI", "MA", "PA", "AP", "AM", "RR",
    "RO", "AC", "TO"
  ]);

  return str
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const upper = word.toUpperCase();
      if (acronyms.has(upper)) return upper;
      const lower = word.toLowerCase();
      if (index > 0 && lowercaseWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
};

const formatPhone = (value) => {
  if (!value) return "";
  let clean = String(value).replace(/\D/g, "");
  if (clean.startsWith("0") && clean.length > 10) {
    clean = clean.replace(/^0+/, "");
  }
  if (clean.length < 8) return clean;
  if (clean.length === 8) {
    return clean.replace(/(\d{4})(\d{4})/, "$1-$2");
  }
  if (clean.length === 9) {
    return clean.replace(/(\d{5})(\d{4})/, "$1-$2");
  }
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return clean
    .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    .substring(0, 15);
};

export default function Clientes() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_CLIENT);
  const [isFetchingCnpj, setIsFetchingCnpj] = useState(false);
  const [cnpjFeedback, setCnpjFeedback] = useState(null);
  const lastFetchedCnpjRef = useRef("");

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
    setCnpjFeedback(null);
    setIsFetchingCnpj(false);
    lastFetchedCnpjRef.current = "";
    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setModalMode("edit");
    setFormData({ ...client });
    setCnpjFeedback(null);
    setIsFetchingCnpj(false);
    lastFetchedCnpjRef.current = (client.document || "").replace(/\D/g, "");
    setIsModalOpen(true);
  };

  const fetchCnpjData = async (rawCnpj) => {
    const cleanCnpj = (rawCnpj || "").replace(/\D/g, "");
    if (cleanCnpj.length !== 14) {
      setCnpjFeedback({
        type: "error",
        message: "Informe os 14 dígitos do CNPJ para buscar na BrasilAPI.",
      });
      return;
    }

    setIsFetchingCnpj(true);
    setCnpjFeedback(null);
    lastFetchedCnpjRef.current = cleanCnpj;

    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `CNPJ ${formatDocument(cleanCnpj, "J")} não foi encontrado na BrasilAPI.`
          );
        } else if (response.status === 400) {
          throw new Error("CNPJ inválido de acordo com a Receita Federal.");
        } else if (response.status === 429) {
          throw new Error("Muitas requisições à BrasilAPI. Aguarde alguns instantes.");
        } else {
          throw new Error(`Falha na consulta BrasilAPI (HTTP ${response.status}).`);
        }
      }

      const data = await response.json();

      // Monta logradouro completo com tipo (ex.: "Avenida Afonso Pena")
      let street = data.logradouro || "";
      if (data.descricao_tipo_de_logradouro && street) {
        const type = data.descricao_tipo_de_logradouro.trim();
        if (!street.toLowerCase().startsWith(type.toLowerCase())) {
          street = `${type} ${street}`;
        }
      }

      const formattedName = data.razao_social || data.nome_fantasia || "";
      const formattedCep = data.cep
        ? formatCEP(String(data.cep).padStart(8, "0"))
        : "";
      const formattedAddress = capitalizeWords(street);
      const formattedNeighborhood = capitalizeWords(data.bairro || "");
      const formattedCity = capitalizeWords(data.municipio || "");
      const formattedState = data.uf ? data.uf.toUpperCase() : "";

      // Nome do primeiro sócio/representante como contato padrão
      const contactSuggestion =
        data.qsa && data.qsa.length > 0 && data.qsa[0].nome_socio
          ? capitalizeWords(data.qsa[0].nome_socio)
          : "";

      // Telefones
      const phoneRaw = data.ddd_telefone_1 || data.ddd_telefone_2 || "";
      const formattedPhoneValue = phoneRaw ? formatPhone(String(phoneRaw)) : "";
      const formattedFaxValue = data.ddd_fax ? formatPhone(String(data.ddd_fax)) : "";

      // Situação cadastral
      const isAtivo = data.descricao_situacao_cadastral
        ? data.descricao_situacao_cadastral.toUpperCase() === "ATIVA"
        : true;

      setFormData((prev) => ({
        ...prev,
        name: formattedName || prev.name,
        cep: formattedCep || prev.cep,
        address: formattedAddress || prev.address,
        number: data.numero ? String(data.numero).trim() : prev.number,
        neighborhood: formattedNeighborhood || prev.neighborhood,
        city: formattedCity || prev.city,
        state:
          formattedState && STATES.includes(formattedState)
            ? formattedState
            : prev.state,
        email: data.email ? data.email.toLowerCase() : prev.email,
        phone: formattedPhoneValue || prev.phone,
        fax: formattedFaxValue || prev.fax,
        contactName: prev.contactName || contactSuggestion,
        status: isAtivo ? "Ativo" : "Inativo",
      }));

      setCnpjFeedback({
        type: "success",
        message: `Dados da empresa "${formattedName}" carregados via BrasilAPI (${data.descricao_situacao_cadastral || "Ativa"}).`,
      });
    } catch (err) {
      console.error("Erro ao consultar BrasilAPI:", err);
      setCnpjFeedback({
        type: "error",
        message: err.message || "Erro ao consultar CNPJ na BrasilAPI.",
      });
    } finally {
      setIsFetchingCnpj(false);
    }
  };

  const handleDocumentBlur = () => {
    if (formData.personType === "J") {
      const cleanDoc = formData.document.replace(/\D/g, "");
      if (cleanDoc.length === 14 && cleanDoc !== lastFetchedCnpjRef.current) {
        fetchCnpjData(cleanDoc);
      }
    }
  };

  const handleDocumentKeyDown = (e) => {
    if (e.key === "Enter" && formData.personType === "J") {
      e.preventDefault();
      const cleanDoc = formData.document.replace(/\D/g, "");
      if (cleanDoc.length === 14) {
        fetchCnpjData(cleanDoc);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "document") {
      formattedValue = formatDocument(value, formData.personType);
      const cleanDoc = value.replace(/\D/g, "");
      if (formData.personType === "J") {
        if (cleanDoc.length === 14) {
          if (cleanDoc !== lastFetchedCnpjRef.current) {
            fetchCnpjData(cleanDoc);
          }
        } else {
          if (cnpjFeedback) {
            setCnpjFeedback(null);
          }
        }
      }
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
    setCnpjFeedback(null);
    lastFetchedCnpjRef.current = "";
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
        .badge-api {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(var(--accent-primary-rgb), 0.12);
          border: 1px solid rgba(var(--accent-primary-rgb), 0.25);
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
          margin-left: 0.45rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
        }
        .cnpj-input-group {
          display: flex;
          position: relative;
          align-items: center;
          width: 100%;
        }
        .cnpj-input-group input {
          width: 100%;
          padding-right: 2.5rem !important;
        }
        .btn-cnpj-fetch {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          height: 28px;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-primary);
          color: #ffffff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }
        .btn-cnpj-fetch:hover:not(:disabled) {
          background: var(--accent-primary-hover);
          transform: translateY(-50%) scale(1.05);
        }
        .btn-cnpj-fetch:disabled {
          background: var(--border-color);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.55;
          transform: translateY(-50%);
          box-shadow: none;
        }
        .spinner-border-sm {
          width: 13px;
          height: 13px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: cnpj-spin 0.8s linear infinite;
        }
        .cnpj-alert {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.82rem;
          margin-top: 0.75rem;
          margin-bottom: 0.25rem;
          animation: cnpj-fadeIn 0.25s ease-out;
        }
        .cnpj-alert-loading {
          background: rgba(var(--accent-primary-rgb), 0.1);
          border: 1px solid rgba(var(--accent-primary-rgb), 0.25);
          color: var(--accent-primary);
        }
        .cnpj-alert-loading .spinner-border-sm {
          border-color: rgba(var(--accent-primary-rgb), 0.25);
          border-top-color: var(--accent-primary);
        }
        .cnpj-alert-success {
          background: rgba(var(--accent-success-rgb), 0.12);
          border: 1px solid rgba(var(--accent-success-rgb), 0.3);
          color: var(--accent-success);
        }
        .cnpj-alert-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--accent-danger);
        }
        .cnpj-alert-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }
        .cnpj-alert-close {
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          font-size: 1.15rem;
          line-height: 1;
          padding: 0 0.25rem;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .cnpj-alert-close:hover {
          opacity: 1;
        }
        @keyframes cnpj-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cnpj-fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
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
                <div className="cnpj-input-group">
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    onBlur={handleDocumentBlur}
                    onKeyDown={handleDocumentKeyDown}
                    placeholder={
                      formData.personType === "F"
                        ? "000.000.000-00"
                        : "00.000.000/0001-00"
                    }
                  />
                  {formData.personType === "J" && (
                    <button
                      type="button"
                      className="btn-cnpj-fetch"
                      onClick={() => fetchCnpjData(formData.document)}
                      disabled={
                        isFetchingCnpj ||
                        formData.document.replace(/\D/g, "").length !== 14
                      }
                      title="Consultar dados da empresa na BrasilAPI"
                    >
                      {isFetchingCnpj ? (
                        <div className="spinner-border-sm" />
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
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
                    (!formData.cep || formData.cep.replace(/\D/g, "").length < 8) &&
                    !formData.address
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
                    (!formData.cep || formData.cep.replace(/\D/g, "").length < 8) &&
                    !formData.address
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
                    (!formData.cep || formData.cep.replace(/\D/g, "").length < 8) &&
                    !formData.address
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
                    (!formData.cep || formData.cep.replace(/\D/g, "").length < 8) &&
                    !formData.address
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
                    (!formData.cep || formData.cep.replace(/\D/g, "").length < 8) &&
                    !formData.address
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
