import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import OrdemServicoTabs from "../../components/OrdemServicoTabs";

const BANCO_ORDENS_HISTORICO = [
  {
    numeroOS: "108",
    id: "OSA-108",
    tipo: "Avulsa",
    dataAbertura: "24/10/2026",
    codCliente: "52368",
    client: "Auto Posto Alvorada Ltda",
    cnpj: "08.991.234/0001-77",
    codVendedor: "001",
    vendedor: "Lucas Comercial",
    tecnico: "Carlos Eduardo",
    tipoExtintor: "PQS ABC 4kg",
    servico: "Carga e Ensaio Hidrostático em 2 Extintores ABC 4kg",
    valor: "280,00",
  },
  {
    numeroOS: "107",
    id: "OSA-107",
    tipo: "Avulsa",
    dataAbertura: "23/10/2026",
    codCliente: "52376",
    client: "Condomínio Edifício Mirante",
    cnpj: "98.765.432/0001-22",
    codVendedor: "002",
    vendedor: "Marcos Vendas",
    tecnico: "Marcos Vinicius",
    tipoExtintor: "AP 10L",
    servico: "Inspeção Nível 2 e Substituição de Manômetro",
    valor: "145,00",
  },
  {
    numeroOS: "106",
    id: "OSA-106",
    tipo: "Avulsa",
    dataAbertura: "22/10/2026",
    codCliente: "52375",
    client: "Restaurante Sabor Gaúcho",
    cnpj: "21.432.654/0001-99",
    codVendedor: "003",
    vendedor: "Roberto Souza",
    tecnico: "Carlos Eduardo",
    tipoExtintor: "CO2 6kg",
    servico: "Recarga Extintor CO2 6kg Avulso",
    valor: "190,00",
  },
  {
    numeroOS: "1042",
    id: "OS-1042",
    tipo: "Oficina/Bancada",
    dataAbertura: "24/10/2026",
    codCliente: "52369",
    client: "Usina Santa Rita S/A",
    cnpj: "12.345.678/0001-90",
    codVendedor: "001",
    vendedor: "Lucas Comercial",
    tecnico: "Carlos Eduardo",
    tipoExtintor: "PQS ABC 4kg",
    servico: "Ensaio Hidrostático Nível 3 + Carga (5 anos ABNT)",
    valor: "2.450,00",
  },
  {
    numeroOS: "1041",
    id: "OS-1041",
    tipo: "Oficina/Bancada",
    dataAbertura: "23/10/2026",
    codCliente: "52370",
    client: "Condomínio Solar das Flores",
    cnpj: "98.765.432/0001-11",
    codVendedor: "002",
    vendedor: "Marcos Vendas",
    tecnico: "Marcos Vinicius",
    tipoExtintor: "PQS ABC 4kg",
    servico: "Recarga Nível 2 + Selo Inmetro (Anual)",
    valor: "680,00",
  },
  {
    numeroOS: "1040",
    id: "OS-1040",
    tipo: "Oficina/Bancada",
    dataAbertura: "22/10/2026",
    codCliente: "52371",
    client: "Transportes Silva & Filhos",
    cnpj: "45.123.789/0001-55",
    codVendedor: "001",
    vendedor: "Lucas Comercial",
    tecnico: "Roberto Santos",
    tipoExtintor: "AP 10L",
    servico: "Inspeção Nível 1 + Limpeza Técnica",
    valor: "3.100,00",
  },
];

const INITIAL_AVULSAS = [
  {
    id: "OSA-108",
    data: "24/10/2026",
    cliente: "Auto Posto Alvorada Ltda",
    tecnico: "Carlos Eduardo",
    servico: "Carga e Ensaio Hidrostático em 2 Extintores ABC 4kg",
    tipoExtintor: "PQS ABC 4kg",
    selo: "INMETRO-781290",
    valor: "R$ 280,00",
    status: "Emitida",
  },
  {
    id: "OSA-107",
    data: "23/10/2026",
    cliente: "Condomínio Edifício Mirante",
    tecnico: "Marcos Vinicius",
    servico: "Inspeção Nível 2 e Substituição de Manômetro",
    tipoExtintor: "AP 10L",
    selo: "INMETRO-781289",
    valor: "R$ 145,00",
    status: "Finalizada",
  },
  {
    id: "OSA-106",
    data: "22/10/2026",
    cliente: "Restaurante Sabor Gaúcho",
    tecnico: "Carlos Eduardo",
    servico: "Recarga Extintor CO2 6kg Avulso",
    tipoExtintor: "CO2 6kg",
    selo: "INMETRO-781288",
    valor: "R$ 190,00",
    status: "Paga",
  },
];

export default function OrdemAvulsa({ currentRoute, setCurrentRoute }) {
  const [lista, setLista] = useState(INITIAL_AVULSAS);
  const [filtro, setFiltro] = useState("");
  const [selectedRecibo, setSelectedRecibo] = useState(null);

  // Estados do fluxo de criação baseado no DOS
  // wizardStep: null | 'pergunta_antiga' | 'busca_antiga' | 'form_nova_os_avulsa'
  const [wizardStep, setWizardStep] = useState(null);
  const [searchNumeroOS, setSearchNumeroOS] = useState("");
  const [foundOldOS, setFoundOldOS] = useState(null);
  const [searchFeedback, setSearchFeedback] = useState(null);

  const [formData, setFormData] = useState({
    cliente: "",
    tecnico: "Carlos Eduardo",
    tipoExtintor: "PQS ABC 4kg",
    selo: "",
    servico: "",
    valor: "150,00",
    baseadaEmOS: null,
  });

  // Atalhos de teclado no fluxo estilo DOS (S = SIM, N = NÃO, ESC = Sair)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!wizardStep) return;

      if (e.key === "Escape") {
        setWizardStep(null);
        setFoundOldOS(null);
        setSearchFeedback(null);
        return;
      }

      // Atalhos no passo 1: "Possui ordem antiga.?"
      if (wizardStep === "pergunta_antiga") {
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          handleRespostaPerguntaAntiga(true);
        } else if (e.key === "n" || e.key === "N") {
          e.preventDefault();
          handleRespostaPerguntaAntiga(false);
        }
      }

      // Atalhos no passo 2: "Deseja criar uma Nova OS baseada nesta?" (quando já encontrou)
      if (wizardStep === "busca_antiga" && foundOldOS) {
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          handleRespostaBasearNesta(true);
        } else if (e.key === "n" || e.key === "N") {
          e.preventDefault();
          handleRespostaBasearNesta(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [wizardStep, foundOldOS]);

  // 1. Inicia o processo de criação de OS Avulsa com a pergunta do DOS
  const handleIniciarCriacao = () => {
    setSearchNumeroOS("");
    setFoundOldOS(null);
    setSearchFeedback(null);
    setWizardStep("pergunta_antiga");
  };

  // 2. Resposta à pergunta: "Possui ordem antiga.?"
  const handleRespostaPerguntaAntiga = (possui) => {
    if (possui) {
      setWizardStep("busca_antiga");
      setSearchNumeroOS("");
      setFoundOldOS(null);
      setSearchFeedback(null);
    } else {
      iniciarNovaOSAvulsaDireta();
    }
  };

  // 3. Busca por Ordem Antiga pelo número
  const handleBuscarOSAntiga = (e) => {
    if (e) e.preventDefault();
    const buscaLimpa = searchNumeroOS.trim().replace(/^(OSA-|OS-)/i, "");
    if (!buscaLimpa) return;

    // Busca nas avulsas já criadas
    const naLista = lista.find(
      (item) =>
        item.id.replace(/^(OSA-|OS-)/i, "").toLowerCase() === buscaLimpa.toLowerCase() ||
        item.id.toLowerCase() === searchNumeroOS.trim().toLowerCase()
    );

    if (naLista) {
      const encontrada = {
        numeroOS: naLista.id.replace(/^(OSA-|OS-)/i, ""),
        id: naLista.id,
        tipo: "Avulsa",
        dataAbertura: naLista.data,
        codCliente: "52368",
        client: naLista.cliente,
        codVendedor: "001",
        vendedor: "Lucas Comercial",
        tecnico: naLista.tecnico,
        tipoExtintor: naLista.tipoExtintor,
        servico: naLista.servico,
        valor: naLista.valor ? naLista.valor.replace("R$ ", "") : "150,00",
      };
      setFoundOldOS(encontrada);
      setSearchFeedback({ type: "success", text: `✓ Ordem Avulsa nº ${encontrada.numeroOS} localizada com sucesso!` });
      return;
    }

    // Busca no banco histórico de ordens
    const historico = BANCO_ORDENS_HISTORICO.find(
      (s) =>
        s.numeroOS === buscaLimpa ||
        s.id.toLowerCase() === searchNumeroOS.trim().toLowerCase() ||
        s.numeroOS === String(Number(buscaLimpa))
    );

    if (historico) {
      setFoundOldOS(historico);
      setSearchFeedback({ type: "success", text: `✓ Ordem nº ${historico.numeroOS} (${historico.tipo}) localizada com sucesso!` });
    } else {
      setFoundOldOS(null);
      setSearchFeedback({
        type: "error",
        text: `⚠️ Ordem nº ${buscaLimpa} não foi encontrada no banco de dados. Verifique o número digitado.`,
      });
    }
  };

  // 4. Resposta à pergunta: "Deseja criar uma Nova OS baseada nesta?"
  const handleRespostaBasearNesta = (basear) => {
    if (basear && foundOldOS) {
      setFormData({
        cliente: foundOldOS.client || foundOldOS.cliente,
        tecnico: foundOldOS.tecnico || "Carlos Eduardo",
        tipoExtintor: foundOldOS.tipoExtintor || "PQS ABC 4kg",
        selo: `INMETRO-${Math.floor(781300 + Math.random() * 500)}`,
        servico: foundOldOS.servico || "Recarga e revisão de extintor avulso",
        valor: foundOldOS.valor ? String(foundOldOS.valor).replace("R$ ", "") : "150,00",
        baseadaEmOS: foundOldOS.numeroOS || foundOldOS.id,
      });
      setWizardStep("form_nova_os_avulsa");
    } else {
      setFoundOldOS(null);
      setSearchFeedback(null);
      setSearchNumeroOS("");
    }
  };

  // Criação direta de OS Avulsa do zero
  const iniciarNovaOSAvulsaDireta = () => {
    setFormData({
      cliente: "",
      tecnico: "Carlos Eduardo",
      tipoExtintor: "PQS ABC 4kg",
      selo: "",
      servico: "",
      valor: "150,00",
      baseadaEmOS: null,
    });
    setWizardStep("form_nova_os_avulsa");
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!formData.cliente || !formData.servico) return;

    const novaOS = {
      id: `OSA-${Math.floor(110 + Math.random() * 50)}`,
      data: new Date().toLocaleDateString("pt-BR"),
      cliente: formData.cliente,
      tecnico: formData.tecnico,
      tipoExtintor: formData.tipoExtintor,
      selo: formData.selo || `INMETRO-${Math.floor(781300 + Math.random() * 500)}`,
      servico: formData.servico,
      valor: formData.valor ? `R$ ${formData.valor}` : "R$ 150,00",
      status: "Emitida",
      baseadaEmOS: formData.baseadaEmOS || null,
    };

    setLista([novaOS, ...lista]);
    setWizardStep(null);
    setFormData({
      cliente: "",
      tecnico: "Carlos Eduardo",
      tipoExtintor: "PQS ABC 4kg",
      selo: "",
      servico: "",
      valor: "150,00",
      baseadaEmOS: null,
    });
  };

  const listaFiltrada = lista.filter(
    (item) =>
      item.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      item.id.toLowerCase().includes(filtro.toLowerCase()) ||
      item.servico.toLowerCase().includes(filtro.toLowerCase()) ||
      item.tipoExtintor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      {/* Submenu de Navegação entre os menus de OS */}
      <OrdemServicoTabs
        activeTab="avulsa"
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="glass-panel">
        <div className="control-bar">
          <div>
            <h4 style={{ fontWeight: 600 }}>⚡ Ordem de Servico Avulsa</h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Atendimento rápido de balcão, recarga imediata e serviços individuais
            </span>
          </div>

          <div className="flex-gap">
            <input
              type="text"
              placeholder="Pesquisar OS Avulsa, Selo ou Cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-search"
              style={{ minWidth: "260px" }}
            />
            <button className="btn-primary" onClick={handleIniciarCriacao}>
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
              Nova OS Avulsa
            </button>
          </div>
        </div>

        {/* Resumo Rápido */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total OSs Avulsas</span>
            <h3 style={{ marginTop: "0.2rem", color: "var(--accent-primary)" }}>{lista.length}</h3>
          </div>
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Atendimentos Emitidos</span>
            <h3 style={{ marginTop: "0.2rem", color: "var(--accent-warning)" }}>
              {lista.filter((i) => i.status === "Emitida").length}
            </h3>
          </div>
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Finalizadas / Pagas</span>
            <h3 style={{ marginTop: "0.2rem", color: "var(--accent-success)" }}>
              {lista.filter((i) => i.status !== "Emitida").length}
            </h3>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Tipo Extintor</th>
                <th>Selo Inmetro</th>
                <th>Descrição do Atendimento</th>
                <th>Técnico</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>
                    {item.id}
                    {item.baseadaEmOS && (
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.7rem",
                          color: "var(--accent-success)",
                          fontWeight: 500,
                        }}
                      >
                        baseada em #{item.baseadaEmOS}
                      </span>
                    )}
                  </td>
                  <td>{item.data}</td>
                  <td style={{ fontWeight: 500 }}>{item.cliente}</td>
                  <td>
                    <span className="status-pill info">{item.tipoExtintor}</span>
                  </td>
                  <td style={{ fontSize: "0.78rem", color: "var(--accent-primary)" }}>
                    {item.selo}
                  </td>
                  <td>{item.servico}</td>
                  <td>{item.tecnico}</td>
                  <td style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                    {item.valor}
                  </td>
                  <td>
                    <span
                      className={`status-pill ${
                        item.status === "Emitida"
                          ? "warning"
                          : item.status === "Finalizada"
                          ? "info"
                          : "success"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn-primary"
                      style={{
                        padding: "0.25rem 0.6rem",
                        fontSize: "0.75rem",
                        backgroundColor: "var(--bg-hover)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-color)",
                      }}
                      onClick={() => setSelectedRecibo(item)}
                    >
                      Recibo
                    </button>
                  </td>
                </tr>
              ))}
              {listaFiltrada.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    Nenhuma ordem avulsa encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ======================================================== */}
        {/* PASSO 1: PERGUNTA ESTILO DOS - "Possui ordem antiga.?" */}
        {/* ======================================================== */}
        {wizardStep === "pergunta_antiga" &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setWizardStep(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "460px",
                  padding: "2rem",
                  textAlign: "center",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    backgroundColor: "rgba(var(--accent-primary-rgb), 0.1)",
                    color: "var(--accent-primary)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  CICOM SISTEMAS • ORDEM DE SERVIÇO AVULSA
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Possui ordem antiga.?
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.75rem" }}>
                  Deseja localizar uma Ordem de Serviço anterior para reaproveitar os dados do cliente e especificações?
                </p>

                {/* Botões SIM / NÃO conforme fluxo original */}
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      minWidth: "120px",
                      padding: "0.65rem 1.5rem",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      backgroundColor: "var(--accent-primary)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                    }}
                    onClick={() => handleRespostaPerguntaAntiga(true)}
                    autoFocus
                  >
                    <span>SIM</span>
                    <span style={{ opacity: 0.7, fontSize: "0.75rem", fontWeight: 400 }}>(S)</span>
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      minWidth: "120px",
                      padding: "0.65rem 1.5rem",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      backgroundColor: "var(--bg-hover)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                    }}
                    onClick={() => handleRespostaPerguntaAntiga(false)}
                  >
                    <span>NÃO</span>
                    <span style={{ opacity: 0.7, fontSize: "0.75rem", fontWeight: 400 }}>(N)</span>
                  </button>
                </div>

                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "0.75rem",
                  }}
                >
                  Pressione <strong>S</strong> para Sim, <strong>N</strong> para Não ou <strong>ESC</strong> para Sair
                </div>
              </div>
            </div>,
            document.body
          )}

        {/* ======================================================== */}
        {/* PASSO 2: SEGUNDA TELA - BUSCA DA ORDEM ANTIGA */}
        {/* ======================================================== */}
        {wizardStep === "busca_antiga" &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setWizardStep(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "580px",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid var(--border-color)",
                    paddingBottom: "0.75rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                      Ordem de Servico Avulsa
                    </h3>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Consulta e clonagem de Ordem de Serviço anterior
                    </span>
                  </div>
                  <button
                    className="btn-icon"
                    style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "1.2rem" }}
                    onClick={() => setWizardStep(null)}
                    title="Fechar (ESC)"
                  >
                    ✕
                  </button>
                </div>

                {/* Feedback de busca */}
                {searchFeedback && (
                  <div
                    style={{
                      padding: "0.65rem 1rem",
                      borderRadius: "6px",
                      marginBottom: "1.25rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      backgroundColor:
                        searchFeedback.type === "success"
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(239, 68, 68, 0.15)",
                      border: `1px solid ${
                        searchFeedback.type === "success"
                          ? "var(--accent-success)"
                          : "var(--accent-danger)"
                      }`,
                      color:
                        searchFeedback.type === "success"
                          ? "var(--accent-success)"
                          : "var(--accent-danger)",
                    }}
                  >
                    {searchFeedback.text}
                  </div>
                )}

                {/* Formulário com os campos do PRINT */}
                <form onSubmit={handleBuscarOSAntiga}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.1rem",
                      backgroundColor: "var(--bg-hover)",
                      padding: "1.25rem",
                      borderRadius: "8px",
                      marginBottom: "1.5rem",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {/* Campo 1: Numero O.S. (com busca) */}
                    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "0.75rem" }}>
                      <label style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        Numero O.S.:
                      </label>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          type="text"
                          autoFocus
                          placeholder="Ex: 108 ou 1042"
                          value={searchNumeroOS}
                          onChange={(e) => setSearchNumeroOS(e.target.value)}
                          className="input-search"
                          style={{
                            width: "140px",
                            fontWeight: 700,
                            fontSize: "1rem",
                            textAlign: "center",
                            backgroundColor: "var(--bg-card)",
                          }}
                        />
                        <button type="submit" className="btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.82rem" }}>
                          Buscar Ordem
                        </button>
                      </div>
                    </div>

                    {/* Campo 2: Data Abertura */}
                    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "0.75rem" }}>
                      <label style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        Data Abertura:
                      </label>
                      <div
                        style={{
                          padding: "0.45rem 0.75rem",
                          backgroundColor: "var(--bg-card)",
                          borderRadius: "6px",
                          border: "1px solid var(--border-color)",
                          minHeight: "36px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.9rem",
                          color: foundOldOS ? "var(--text-primary)" : "var(--text-muted)",
                          fontWeight: foundOldOS ? 600 : 400,
                        }}
                      >
                        {foundOldOS ? foundOldOS.dataAbertura : "  /  /    "}
                      </div>
                    </div>

                    {/* Campo 3: Cod. Cliente */}
                    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "0.75rem" }}>
                      <label style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        Cod. Cliente:
                      </label>
                      <div
                        style={{
                          padding: "0.45rem 0.75rem",
                          backgroundColor: "var(--bg-card)",
                          borderRadius: "6px",
                          border: "1px solid var(--border-color)",
                          minHeight: "36px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.9rem",
                          color: foundOldOS ? "var(--text-primary)" : "var(--text-muted)",
                          fontWeight: foundOldOS ? 600 : 400,
                        }}
                      >
                        {foundOldOS ? `${foundOldOS.codCliente} — ${foundOldOS.client}` : ""}
                      </div>
                    </div>

                    {/* Campo 4: Cod. Vendedor */}
                    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "0.75rem" }}>
                      <label style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        Cod. Vendedor:
                      </label>
                      <div
                        style={{
                          padding: "0.45rem 0.75rem",
                          backgroundColor: "var(--bg-card)",
                          borderRadius: "6px",
                          border: "1px solid var(--border-color)",
                          minHeight: "36px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.9rem",
                          color: foundOldOS ? "var(--text-primary)" : "var(--text-muted)",
                          fontWeight: foundOldOS ? 600 : 400,
                        }}
                      >
                        {foundOldOS ? `${foundOldOS.codVendedor} — ${foundOldOS.vendedor}` : ""}
                      </div>
                    </div>
                  </div>
                </form>

                {/* Se a ordem foi encontrada, exibe a pergunta com botões SIM / NÃO */}
                {foundOldOS ? (
                  <div
                    style={{
                      backgroundColor: "rgba(var(--accent-primary-rgb), 0.08)",
                      border: "1.5px solid var(--accent-primary)",
                      borderRadius: "8px",
                      padding: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-primary)" }}>
                      Deseja criar uma Nova OS Avulsa baseada nesta?
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                      Os dados do cliente e especificações de #{foundOldOS.numeroOS} ({foundOldOS.tipo}) serão importados.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{
                          minWidth: "110px",
                          padding: "0.6rem 1.4rem",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          backgroundColor: "var(--accent-primary)",
                        }}
                        onClick={() => handleRespostaBasearNesta(true)}
                        autoFocus
                      >
                        SIM (S)
                      </button>

                      <button
                        type="button"
                        className="btn-primary"
                        style={{
                          minWidth: "110px",
                          padding: "0.6rem 1.4rem",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          backgroundColor: "var(--bg-card)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-color)",
                        }}
                        onClick={() => handleRespostaBasearNesta(false)}
                      >
                        NÃO (N)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-color)",
                      }}
                      onClick={() => setWizardStep("pergunta_antiga")}
                    >
                      ← Voltar à Pergunta
                    </button>

                    <button
                      type="button"
                      className="btn-primary"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--accent-primary)",
                        border: "1px solid var(--accent-primary)",
                      }}
                      onClick={iniciarNovaOSAvulsaDireta}
                    >
                      Criar Nova OS Avulsa em Branco
                    </button>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}

        {/* ======================================================== */}
        {/* PASSO 3: FORMULÁRIO DE EMISSÃO DA OS AVULSA */}
        {/* ======================================================== */}
        {wizardStep === "form_nova_os_avulsa" &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setWizardStep(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "540px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid var(--border-color)",
                    paddingBottom: "0.75rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
                      ⚡ Emitir Ordem de Servico Avulsa
                    </h3>
                    {formData.baseadaEmOS ? (
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: "0.25rem",
                          fontSize: "0.78rem",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "4px",
                          backgroundColor: "rgba(16, 185, 129, 0.15)",
                          color: "var(--accent-success)",
                          fontWeight: 600,
                        }}
                      >
                        ✓ Clonada com base na O.S. Antiga #{formData.baseadaEmOS}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Nova Ordem Avulsa gerada em branco
                      </span>
                    )}
                  </div>

                  <button
                    className="btn-icon"
                    style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "1.2rem" }}
                    onClick={() => setWizardStep(null)}
                    title="Fechar (ESC)"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSalvar}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Cliente / Razão Social:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome do cliente ou empresa"
                      className="input-search"
                      style={{ width: "100%" }}
                      value={formData.cliente}
                      onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.4rem",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Tipo de Extintor:
                      </label>
                      <select
                        className="select-filter"
                        style={{ width: "100%" }}
                        value={formData.tipoExtintor}
                        onChange={(e) => setFormData({ ...formData, tipoExtintor: e.target.value })}
                      >
                        <option value="PQS ABC 4kg">PQS ABC 4kg</option>
                        <option value="CO2 6kg">CO2 6kg</option>
                        <option value="AP 10L">Água Pressurizada 10L</option>
                        <option value="Pó BC 6kg">Pó BC 6kg</option>
                        <option value="PQS ABC 2kg">PQS ABC 2kg Automotivo</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.4rem",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Nº Selo Inmetro (Alocado):
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: INMETRO-781310"
                        className="input-search"
                        style={{ width: "100%" }}
                        value={formData.selo}
                        onChange={(e) => setFormData({ ...formData, selo: e.target.value })}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.4rem",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Técnico Responsável:
                      </label>
                      <select
                        className="select-filter"
                        style={{ width: "100%" }}
                        value={formData.tecnico}
                        onChange={(e) => setFormData({ ...formData, tecnico: e.target.value })}
                      >
                        <option value="Carlos Eduardo">Carlos Eduardo (Inspetor)</option>
                        <option value="Marcos Vinicius">Marcos Vinicius (Oficina)</option>
                        <option value="Roberto Santos">Roberto Santos (Manutenção)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.4rem",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Valor Total (R$):
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 190,00"
                        className="input-search"
                        style={{ width: "100%" }}
                        value={formData.valor}
                        onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Descrição do Serviço Rápido Realizado:
                    </label>
                    <textarea
                      required
                      rows="2"
                      placeholder="Recarga de pó químico, troca de lacre e pressurização com N2..."
                      className="input-search"
                      style={{ width: "100%", resize: "vertical" }}
                      value={formData.servico}
                      onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                    ></textarea>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-color)",
                      }}
                      onClick={() => setWizardStep(formData.baseadaEmOS ? "busca_antiga" : "pergunta_antiga")}
                    >
                      ← Voltar
                    </button>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{
                          backgroundColor: "transparent",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-color)",
                        }}
                        onClick={() => setWizardStep(null)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn-primary">
                        Emitir OS Avulsa
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )}

        {/* Modal Recibo da OS Avulsa */}
        {selectedRecibo &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setSelectedRecibo(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <div style={{ textAlign: "center", marginBottom: "1.25rem", borderBottom: "1px dashed var(--border-color)", paddingBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem" }}>CICOM — COMPROVANTE DE ATENDIMENTO</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Oficina Credenciada Inmetro</span>
              </div>

              <div style={{ fontSize: "0.85rem", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                <div><strong>Nº O.S. Avulsa:</strong> {selectedRecibo.id}</div>
                {selectedRecibo.baseadaEmOS && (
                  <div><strong>Baseada na O.S. Antiga:</strong> #{selectedRecibo.baseadaEmOS}</div>
                )}
                <div><strong>Data:</strong> {selectedRecibo.data}</div>
                <div><strong>Cliente:</strong> {selectedRecibo.cliente}</div>
                <div><strong>Extintor:</strong> {selectedRecibo.tipoExtintor}</div>
                <div><strong>Selo Inmetro:</strong> {selectedRecibo.selo}</div>
                <div><strong>Serviço:</strong> {selectedRecibo.servico}</div>
                <div><strong>Técnico:</strong> {selectedRecibo.tecnico}</div>
                <div style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                  <strong>Valor Pago:</strong>{" "}
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>{selectedRecibo.valor}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => window.print()}
                >
                  Imprimir Comprovante
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                  onClick={() => setSelectedRecibo(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
