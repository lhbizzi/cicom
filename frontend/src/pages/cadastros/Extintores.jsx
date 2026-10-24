import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

// Catálogo com as especificações técnicas oficiais de extintores (ABNT NBR 15808 / 12962)
const TIPO_EXTINTORES_CATALOG = [
  {
    codTipo: 1,
    tipo: "Pó Químico Seco (PQS ABC)",
    capacidade: "4 kg",
    classe: "ABC",
    capExtintora: "2-A : 20-B:C",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-01",
  },
  {
    codTipo: 2,
    tipo: "Pó Químico Seco (PQS ABC)",
    capacidade: "6 kg",
    classe: "ABC",
    capExtintora: "3-A : 40-B:C",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-02",
  },
  {
    codTipo: 3,
    tipo: "Água Pressurizada (AP)",
    capacidade: "10 Litros",
    classe: "A",
    capExtintora: "2-A",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-03",
  },
  {
    codTipo: 4,
    tipo: "Gás Carbônico (CO2)",
    capacidade: "6 kg",
    classe: "BC",
    capExtintora: "5-B:C",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-04",
  },
  {
    codTipo: 5,
    tipo: "Pó Químico Seco (PQS BC)",
    capacidade: "6 kg",
    classe: "BC",
    capExtintora: "20-B:C",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-05",
  },
  {
    codTipo: 6,
    tipo: "Espuma Mecânica (EM)",
    capacidade: "10 Litros",
    classe: "AB",
    capExtintora: "2-A : 10-B",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-06",
  },
];

const MARCAS_OPTIONS = [
  "Kidde",
  "Mocelin",
  "Bucka",
  "Resgatest",
  "Extang",
  "Indext",
  "Metalcasty",
  "Cruzeiro",
  "Yanes",
];

const CLASSE_OPTIONS = ["ABC", "BC", "A", "AB", "K", "D"];

const CLIENTES_OPTIONS = [
  { cod: "52369", nome: "Alves & Cia Ltda" },
  { cod: "52370", nome: "Supermercado Silva" },
  { cod: "52371", nome: "Auto Mecânica Rápida" },
  { cod: "52372", nome: "Drogaria Bem Estar" },
  { cod: "52373", nome: "Doutor Marcelo Rezende" },
  { cod: "52374", nome: "Transportadora Gaúcha" },
];

// Dados iniciais fiéis à tela apresentada no sistema
const INITIAL_EXTINGUISHERS = [
  {
    numero: 884920,
    sequencia: 1,
    codCliente: "52369",
    proprietario: "Alves & Cia Ltda",
    marca: "Kidde",
    tipo: "PQS ABC",
    capacidade: "4 kg",
    classe: "ABC",
    codTipo: 1,
    codNoCliente: "PAT-014",
    dataUltTeste: "2026-09-17",
    vencimentoTeste: "2031-09-17",
    dataFabricacao: "2021",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-01",
    capExtintora: "2-A : 20-B:C",
    // Bloco Inferior: Dados do Último Serviço
    nrOrdem: 1042,
    dataUltServico: "2026-09-18",
    numeroSelo: "18492019",
    decapagem: false,
    ensaio: true,
    pintura: false,
    carga: true,
    pressurizacao: true,
    inspecao: true,
    pesoVazio: 3.25,
    pesoCheio: 7.25,
  },
  {
    numero: 884921,
    sequencia: 2,
    codCliente: "52369",
    proprietario: "Alves & Cia Ltda",
    marca: "Mocelin",
    tipo: "CO2",
    capacidade: "6 kg",
    classe: "BC",
    codTipo: 4,
    codNoCliente: "PAT-015",
    dataUltTeste: "2024-05-09",
    vencimentoTeste: "2029-05-09",
    dataFabricacao: "2019",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-04",
    capExtintora: "5-B:C",
    // Bloco Inferior: Dados do Último Serviço
    nrOrdem: 1042,
    dataUltServico: "2026-09-18",
    numeroSelo: "18492020",
    decapagem: false,
    ensaio: false,
    pintura: true,
    carga: true,
    pressurizacao: false,
    inspecao: true,
    pesoVazio: 14.5,
    pesoCheio: 20.5,
  },
  {
    numero: 884922,
    sequencia: 1,
    codCliente: "52370",
    proprietario: "Supermercado Silva",
    marca: "Bucka",
    tipo: "Água Pressurizada",
    capacidade: "10 Litros",
    classe: "A",
    codTipo: 3,
    codNoCliente: "SLV-01",
    dataUltTeste: "2025-11-19",
    vencimentoTeste: "2030-11-19",
    dataFabricacao: "2022",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-03",
    capExtintora: "2-A",
    // Bloco Inferior: Dados do Último Serviço
    nrOrdem: 1055,
    dataUltServico: "2026-08-10",
    numeroSelo: "18492025",
    decapagem: true,
    ensaio: true,
    pintura: true,
    carga: true,
    pressurizacao: true,
    inspecao: true,
    pesoVazio: 4.8,
    pesoCheio: 14.8,
  },
  {
    numero: 884923,
    sequencia: 2,
    codCliente: "52370",
    proprietario: "Supermercado Silva",
    marca: "Kidde",
    tipo: "PQS BC",
    capacidade: "6 kg",
    classe: "BC",
    codTipo: 5,
    codNoCliente: "SLV-02",
    dataUltTeste: "2023-08-14",
    vencimentoTeste: "2028-08-14",
    dataFabricacao: "2018",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-05",
    capExtintora: "20-B:C",
    // Bloco Inferior: Dados do Último Serviço
    nrOrdem: 1055,
    dataUltServico: "2026-08-10",
    numeroSelo: "18492026",
    decapagem: false,
    ensaio: false,
    pintura: false,
    carga: true,
    pressurizacao: true,
    inspecao: true,
    pesoVazio: 3.4,
    pesoCheio: 7.4,
  },
  {
    numero: 884924,
    sequencia: 1,
    codCliente: "52371",
    proprietario: "Auto Mecânica Rápida",
    marca: "Resgatest",
    tipo: "PQS ABC",
    capacidade: "12 kg",
    classe: "ABC",
    codTipo: 2,
    codNoCliente: "MEC-09",
    dataUltTeste: "2021-02-28",
    vencimentoTeste: "2026-02-28",
    dataFabricacao: "2017",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-02",
    capExtintora: "3-A : 40-B:C",
    // Bloco Inferior: Dados do Último Serviço
    nrOrdem: 980,
    dataUltServico: "2025-01-20",
    numeroSelo: "18491002",
    decapagem: false,
    ensaio: false,
    pintura: false,
    carga: false,
    pressurizacao: false,
    inspecao: true,
    pesoVazio: 4.1,
    pesoCheio: 10.1,
  },
  {
    numero: 884925,
    sequencia: 1,
    codCliente: "52372",
    proprietario: "Drogaria Bem Estar",
    marca: "Extang",
    tipo: "CO2",
    capacidade: "4 kg",
    classe: "BC",
    codTipo: 4,
    codNoCliente: "DRG-01",
    dataUltTeste: "2026-01-14",
    vencimentoTeste: "2031-01-14",
    dataFabricacao: "2023",
    numeroNbr: "NBR 15808",
    codProjeto: "PROJ-01",
    capExtintora: "2-A : 20-B:C",
    // Bloco Inferior: Dados do Último Serviço
    nrOrdem: 1089,
    dataUltServico: "2026-10-02",
    numeroSelo: "18492090",
    decapagem: false,
    ensaio: true,
    pintura: false,
    carga: true,
    pressurizacao: true,
    inspecao: true,
    pesoVazio: 3.3,
    pesoCheio: 7.3,
  },
];

const EMPTY_EXTINGUISHER = {
  numero: "",
  sequencia: 1,
  marca: "Kidde",
  tipo: "PQS ABC",
  codTipo: 1,
  codNoCliente: "",
  capacidade: "4 kg",
  classe: "ABC",
  dataUltTeste: new Date().toISOString().split("T")[0],
  vencimentoTeste: "",
  dataFabricacao: String(new Date().getFullYear()),
  numeroNbr: "NBR 15808",
  codProjeto: "PROJ-01",
  capExtintora: "2-A : 20-B:C",
  proprietario: "",
  codCliente: "",
  // Bloco Inferior: Dados do Último Serviço
  nrOrdem: "",
  dataUltServico: new Date().toISOString().split("T")[0],
  numeroSelo: "",
  decapagem: false,
  ensaio: true,
  pintura: false,
  carga: true,
  pressurizacao: true,
  inspecao: true,
  pesoVazio: "",
  pesoCheio: "",
};

export default function Extintores() {
  const [extinguishers, setExtinguishers] = useState(INITIAL_EXTINGUISHERS);
  const [search, setSearch] = useState("");
  const [filterAgente, setFilterAgente] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_EXTINGUISHER);
  const [editingNumero, setEditingNumero] = useState(null);

  // Regra ABNT NBR 12962: Soma exatos 5 anos à data do teste hidrostático
  const calculateFiveYearsABNT = (testDateStr) => {
    if (!testDateStr) return "";
    const parts = testDateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10) + 5;
      return `${year}-${parts[1]}-${parts[2]}`;
    }
    const date = new Date(testDateStr);
    if (isNaN(date.getTime())) return "";
    date.setFullYear(date.getFullYear() + 5);
    return date.toISOString().split("T")[0];
  };

  const handleTestDateChange = (e) => {
    const val = e.target.value;
    const nextVal = calculateFiveYearsABNT(val);
    setFormData((prev) => ({
      ...prev,
      dataUltTeste: val,
      vencimentoTeste: nextVal,
    }));
  };

  // Preenchimento inteligente ao trocar o Cod Tipo
  const handleCodTipoChange = (cod) => {
    const selected = TIPO_EXTINTORES_CATALOG.find((t) => t.codTipo === Number(cod));
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        codTipo: selected.codTipo,
        tipo: selected.tipo,
        capacidade: selected.capacidade,
        classe: selected.classe,
        capExtintora: selected.capExtintora,
        numeroNbr: selected.numeroNbr,
        codProjeto: selected.codProjeto,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        codTipo: cod,
      }));
    }
  };

  const handleProprietarioChange = (e) => {
    const val = e.target.value;
    const client = CLIENTES_OPTIONS.find((c) => c.nome.toLowerCase() === val.toLowerCase());
    setFormData((prev) => ({
      ...prev,
      proprietario: val,
      codCliente: client ? client.cod : prev.codCliente,
    }));
  };

  const deleteExtinguisher = (numero) => {
    if (window.confirm(`Confirma a exclusão do extintor EXT-${numero}?`)) {
      setExtinguishers(extinguishers.filter((e) => e.numero !== numero));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingNumero(null);
    const today = new Date().toISOString().split("T")[0];

    const nextNumero =
      extinguishers.length > 0
        ? Math.max(...extinguishers.map((e) => Number(e.numero) || 0)) + 1
        : 884926;

    setFormData({
      ...EMPTY_EXTINGUISHER,
      numero: nextNumero,
      dataUltTeste: today,
      vencimentoTeste: calculateFiveYearsABNT(today),
      dataUltServico: today,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setEditingNumero(item.numero);
    setFormData({
      ...item,
      vencimentoTeste: item.vencimentoTeste || calculateFiveYearsABNT(item.dataUltTeste),
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    if (name === "numero" || name === "sequencia" || name === "nrOrdem" || name === "codTipo") {
      const numericOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericOnly,
      }));

      if (name === "codTipo") {
        handleCodTipoChange(numericOnly);
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.numero === "" || formData.numero === null || formData.numero === undefined) {
      alert("Por favor, informe o Número do extintor.");
      return;
    }

    const numFormatado = Number(formData.numero);
    if (isNaN(numFormatado) || numFormatado <= 0) {
      alert("Por favor, informe um número de cilindro válido maior que zero.");
      return;
    }

    if (!formData.proprietario.trim()) {
      alert("Por favor, selecione ou informe o Proprietário do extintor.");
      return;
    }

    const savedData = {
      ...formData,
      numero: numFormatado,
      sequencia: Number(formData.sequencia) || 1,
      nrOrdem: formData.nrOrdem ? Number(formData.nrOrdem) : "",
      codTipo: formData.codTipo ? Number(formData.codTipo) : 1,
      pesoVazio: formData.pesoVazio !== "" ? Number(formData.pesoVazio) : "",
      pesoCheio: formData.pesoCheio !== "" ? Number(formData.pesoCheio) : "",
      vencimentoTeste: formData.vencimentoTeste || calculateFiveYearsABNT(formData.dataUltTeste),
    };

    if (modalMode === "add") {
      const exists = extinguishers.some((item) => Number(item.numero) === numFormatado);
      if (exists) {
        alert(`Já existe um extintor cadastrado com o número ${numFormatado}.`);
        return;
      }
      setExtinguishers([savedData, ...extinguishers]);
    } else {
      if (
        numFormatado !== editingNumero &&
        extinguishers.some((item) => Number(item.numero) === numFormatado)
      ) {
        alert(`Já existe outro extintor cadastrado com o número ${numFormatado}.`);
        return;
      }

      setExtinguishers(
        extinguishers.map((item) => (item.numero === editingNumero ? savedData : item))
      );
    }
    setIsModalOpen(false);
  };

  // Filtragem da tabela
  const filteredData = extinguishers.filter((item) => {
    const q = search.toLowerCase();
    const isVencido = item.vencimentoTeste && new Date(item.vencimentoTeste) < new Date();

    const matchesSearch =
      String(item.numero).includes(q) ||
      `ext-${item.numero}`.toLowerCase().includes(q) ||
      (item.proprietario && item.proprietario.toLowerCase().includes(q)) ||
      (item.codCliente && String(item.codCliente).includes(q)) ||
      (item.marca && item.marca.toLowerCase().includes(q)) ||
      (item.tipo && item.tipo.toLowerCase().includes(q)) ||
      (item.numeroSelo && String(item.numeroSelo).includes(q)) ||
      (item.codNoCliente && item.codNoCliente.toLowerCase().includes(q));

    const matchesAgente = filterAgente
      ? item.tipo.toLowerCase().includes(filterAgente.toLowerCase())
      : true;

    let matchesStatus = true;
    if (filterStatus === "vencido") matchesStatus = isVencido;
    if (filterStatus === "vigente") matchesStatus = !isVencido;

    return matchesSearch && matchesAgente && matchesStatus;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // Colunas idênticas à visualização do sistema original
  const columns = [
    {
      header: "Nº de Série",
      accessor: "numero",
      cellStyle: { width: "130px" },
      render: (item) => (
        <span style={{ fontWeight: 700, color: "var(--accent-primary)", fontSize: "0.92rem" }}>
          EXT-{item.numero}
        </span>
      ),
    },
    {
      header: "Cliente Proprietário",
      accessor: "proprietario",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.proprietario}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {item.codCliente ? `Cod. ${item.codCliente}` : item.codNoCliente ? `Cod. ${item.codNoCliente}` : ""}
          </div>
        </div>
      ),
    },
    {
      header: "Marca / Agente",
      accessor: "tipo",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
            {item.tipo} <span style={{ color: "var(--accent-primary)" }}>({item.capacidade})</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Marca: <strong>{item.marca}</strong>
          </div>
        </div>
      ),
    },
    {
      header: "Último Ensaio",
      accessor: "dataUltTeste",
      cellStyle: { fontSize: "0.88rem" },
      render: (item) => formatDate(item.dataUltTeste),
    },
    {
      header: "Vencimento ABNT (5 Anos)",
      accessor: "vencimentoTeste",
      render: (item) => {
        const isVencido = item.vencimentoTeste && new Date(item.vencimentoTeste) < new Date();
        return (
          <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>
            {formatDate(item.vencimentoTeste)}{" "}
            {isVencido && (
              <span style={{ color: "var(--accent-danger)", fontWeight: 700, fontSize: "0.78rem" }}>
                (Vencido)
              </span>
            )}
          </span>
        );
      },
    },
    {
      header: "Selo Inmetro",
      accessor: "numeroSelo",
      cellStyle: { fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem" },
      render: (item) => item.numeroSelo || "-",
    },
    {
      header: "Status",
      accessor: "status",
      cellStyle: { width: "110px", textAlign: "center" },
      render: (item) => {
        const isVencido = item.vencimentoTeste && new Date(item.vencimentoTeste) < new Date();
        return (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.22rem 0.65rem",
              borderRadius: "20px",
              fontSize: "0.74rem",
              fontWeight: 600,
              position: "static",
              backgroundColor: isVencido ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
              color: isVencido ? "var(--accent-danger)" : "var(--accent-success)",
              border: `1px solid ${isVencido ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.25)"}`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: isVencido ? "var(--accent-danger)" : "var(--accent-success)",
                display: "inline-block",
              }}
            />
            {isVencido ? "Vencido" : "Vigente"}
          </div>
        );
      },
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
          <button className="btn-table-action delete" onClick={() => deleteExtinguisher(item.numero)}>
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel" style={{ position: "relative" }}>
      {/* Top Header Controls */}
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div>
          <h4 style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
            🧯 Fichário Geral de Extintores
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Cadastro por número de série, normas ABNT NBR 12962/15808 e controle de selos
          </span>
        </div>

        <div className="flex-gap" style={{ flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Pesquisar por Série, Cliente ou Selo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "260px" }}
          />

          <select
            value={filterAgente}
            onChange={(e) => setFilterAgente(e.target.value)}
            className="select-filter"
            style={{ minWidth: "140px" }}
          >
            <option value="">Todos Agentes</option>
            <option value="PQS ABC">Pó Químico (PQS ABC)</option>
            <option value="CO2">Gás Carbônico (CO2)</option>
            <option value="Água">Água Pressurizada (AP)</option>
            <option value="PQS BC">Pó Químico (PQS BC)</option>
            <option value="Espuma">Espuma Mecânica (EM)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-filter"
            style={{ minWidth: "130px" }}
          >
            <option value="">Todos Status</option>
            <option value="vigente">Vigente / Válido</option>
            <option value="vencido">Vencido</option>
          </select>

          <button className="btn-primary" onClick={openAddModal}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Extintor
          </button>
        </div>
      </div>

      {/* Grid de Dados */}
      <Grid data={filteredData} columns={columns} />

      {/* Modal estruturado fielmente conforme a tela original do Clipper */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "✨ Ficha Cadastral do Extintor"
            : `✏️ Editar Extintor - Nº ${formData.numero}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* Bloco 1: Identificação (Numero, Sequencia e Marca) */}
            <div
              style={{
                background: "var(--bg-hover)",
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="form-group" style={{ width: "220px" }}>
                  <label style={{ fontWeight: 600 }}>Numero</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    placeholder="Ex: 884920"
                    required
                    autoFocus
                    style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "0.5px" }}
                  />
                </div>

                <div className="form-group" style={{ width: "120px" }}>
                  <label style={{ fontWeight: 600 }}>Sequência</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="sequencia"
                    value={formData.sequencia}
                    onChange={handleInputChange}
                    placeholder="1"
                    style={{ textAlign: "center", fontWeight: 600 }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 600 }}>Marca</label>
                <input
                  type="text"
                  name="marca"
                  list="marcas-cad-list"
                  value={formData.marca}
                  onChange={handleInputChange}
                  placeholder="Ex: Kidde, Mocelin, Bucka, Resgatest, Extang..."
                  required
                />
                <datalist id="marcas-cad-list">
                  {MARCAS_OPTIONS.map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Bloco 2: Especificações Técnicas (Conforme a disposição do print original em 3 colunas) */}
            <div
              style={{
                background: "var(--bg-hover)",
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Grid de 3 Colunas fiel ao layout do sistema Clipper */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1.2fr",
                  columnGap: "1.25rem",
                  rowGap: "0.75rem",
                }}
              >
                {/* Linha 1 */}
                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Tipo</label>
                  <input
                    type="text"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    placeholder="Pó Químico Seco (PQS ABC)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Cod Tipo:</label>
                  <select
                    name="codTipo"
                    value={formData.codTipo}
                    onChange={handleInputChange}
                    style={{ fontWeight: 600 }}
                  >
                    {TIPO_EXTINTORES_CATALOG.map((t) => (
                      <option key={t.codTipo} value={t.codTipo}>
                        {t.codTipo} - {t.classe}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Cod no Cliente:</label>
                  <input
                    type="text"
                    name="codNoCliente"
                    value={formData.codNoCliente}
                    onChange={handleInputChange}
                    placeholder="Ex: PAT-014"
                  />
                </div>

                {/* Linha 2 */}
                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Capacidade</label>
                  <input
                    type="text"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleInputChange}
                    placeholder="Ex: 4 kg, 6 kg, 10 Litros"
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Classe:</label>
                  <select
                    name="classe"
                    value={formData.classe}
                    onChange={handleInputChange}
                    style={{ fontWeight: 600 }}
                  >
                    {CLASSE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        Classe {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  {/* Espaço reservado para manter o alinhamento da 3ª coluna */}
                </div>

                {/* Linha 3 */}
                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Data Ult Teste</label>
                  <input
                    type="date"
                    name="dataUltTeste"
                    value={formData.dataUltTeste}
                    onChange={handleTestDateChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600, color: "var(--accent-primary)" }}>
                    Vencimento Teste (5 Anos ABNT)
                  </label>
                  <input
                    type="date"
                    name="vencimentoTeste"
                    value={formData.vencimentoTeste}
                    onChange={handleInputChange}
                    style={{ fontWeight: 600, color: "var(--accent-primary)" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  {/* Espaço reservado */}
                </div>

                {/* Linha 4 */}
                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Data Fabricacao</label>
                  <input
                    type="text"
                    name="dataFabricacao"
                    value={formData.dataFabricacao}
                    onChange={handleInputChange}
                    placeholder="Ex: 2021"
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Cod. Projeto</label>
                  <input
                    type="text"
                    name="codProjeto"
                    value={formData.codProjeto}
                    onChange={handleInputChange}
                    placeholder="Ex: PROJ-01"
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Cap. Extintora</label>
                  <input
                    type="text"
                    name="capExtintora"
                    value={formData.capExtintora}
                    onChange={handleInputChange}
                    placeholder="Ex: 2-A : 20-B:C"
                  />
                </div>

                {/* Linha 5 */}
                <div className="form-group">
                  <label style={{ fontWeight: 600 }}>Numero NBR</label>
                  <input
                    type="text"
                    name="numeroNbr"
                    value={formData.numeroNbr}
                    onChange={handleInputChange}
                    placeholder="Ex: NBR 15808"
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  {/* Espaço reservado */}
                </div>
              </div>

              {/* Linha 6: Proprietário (Full width) */}
              <div className="form-group" style={{ marginTop: "0.25rem" }}>
                <label style={{ fontWeight: 600 }}>Proprietario</label>
                <input
                  type="text"
                  name="proprietario"
                  list="proprietarios-cad-list"
                  value={formData.proprietario}
                  onChange={handleProprietarioChange}
                  placeholder="Nome ou Razão Social do Cliente Proprietário..."
                  required
                />
                <datalist id="proprietarios-cad-list">
                  {CLIENTES_OPTIONS.map((c) => (
                    <option key={c.cod} value={c.nome}>
                      {c.nome} (Cod. {c.cod})
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            {/* Bloco 3: Dados do Último Serviço & Vistoria (Manutenção Inferior) */}
            <div
              style={{
                background: "var(--bg-hover)",
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "1.5rem" }}>
                {/* Lado Esquerdo: Nr Ordem, Data Ult Servico, Numero do Selo */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <div className="form-group">
                    <label style={{ fontWeight: 600 }}>Nr Ordem:</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="nrOrdem"
                      value={formData.nrOrdem}
                      onChange={handleInputChange}
                      placeholder="Ex: 1042"
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: 600 }}>Data Ult Servico</label>
                    <input
                      type="date"
                      name="dataUltServico"
                      value={formData.dataUltServico}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: 600 }}>Numero do Selo</label>
                    <input
                      type="text"
                      name="numeroSelo"
                      value={formData.numeroSelo}
                      onChange={handleInputChange}
                      placeholder="Ex: 18492019"
                      style={{ fontFamily: "monospace", letterSpacing: "0.5px", fontWeight: 700 }}
                    />
                  </div>
                </div>

                {/* Lado Direito: Dec:Ens:Pin:Car:Pre:Ins: e P.Vazio:P.Cheio: */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", display: "block" }}>
                      Serviços Executados (Dec : Ens : Pin : Car : Pre : Ins)
                    </label>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: "0.4rem",
                      }}
                    >
                      {[
                        { key: "decapagem", label: "Dec", title: "Decapagem" },
                        { key: "ensaio", label: "Ens", title: "Ensaio Hidrostático" },
                        { key: "pintura", label: "Pin", title: "Pintura" },
                        { key: "carga", label: "Car", title: "Carga / Recarga" },
                        { key: "pressurizacao", label: "Pre", title: "Pressurização" },
                        { key: "inspecao", label: "Ins", title: "Inspeção Técnica" },
                      ].map((item) => (
                        <label
                          key={item.key}
                          title={item.title}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0.5rem 0.25rem",
                            borderRadius: "8px",
                            border: `1.5px solid ${formData[item.key] ? "var(--accent-primary)" : "var(--border-color)"}`,
                            background: formData[item.key] ? "rgba(var(--accent-primary-rgb), 0.1)" : "var(--bg-secondary)",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            userSelect: "none",
                          }}
                        >
                          <input
                            type="checkbox"
                            name={item.key}
                            checked={!!formData[item.key]}
                            onChange={handleInputChange}
                            style={{ display: "none" }}
                          />
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "0.85rem",
                              color: formData[item.key] ? "var(--accent-primary)" : "var(--text-secondary)",
                            }}
                          >
                            {item.label}:
                          </span>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              color: formData[item.key] ? "var(--accent-primary)" : "var(--text-muted)",
                              marginTop: "2px",
                            }}
                          >
                            {formData[item.key] ? "SIM" : "NÃO"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pesagens: P.Vazio e P.Cheio */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.25rem" }}>
                    <div className="form-group">
                      <label style={{ fontWeight: 600 }}>P.Vazio: (kg - Tara)</label>
                      <input
                        type="number"
                        step="0.001"
                        name="pesoVazio"
                        value={formData.pesoVazio}
                        onChange={handleInputChange}
                        placeholder="Ex: 3.250"
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ fontWeight: 600 }}>P.Cheio: (kg - Peso Bruto)</label>
                      <input
                        type="number"
                        step="0.001"
                        name="pesoCheio"
                        value={formData.pesoCheio}
                        onChange={handleInputChange}
                        placeholder="Ex: 7.250"
                      />
                    </div>
                  </div>
                </div>
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
            <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1.25rem" }}>
              Salvar Extintor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
