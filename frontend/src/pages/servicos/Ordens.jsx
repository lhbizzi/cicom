import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import OrdemServicoTabs from "../../components/OrdemServicoTabs";

const CLIENTES_DISPONIVEIS = [
  { cod: "52369", nome: "Usina Santa Rita S/A", cnpj: "12.345.678/0001-90", codVendedor: "001" },
  { cod: "52370", nome: "Condomínio Solar das Flores", cnpj: "98.765.432/0001-11", codVendedor: "002" },
  { cod: "52371", nome: "Transportes Silva & Filhos", cnpj: "45.123.789/0001-55", codVendedor: "001" },
  { cod: "52372", nome: "Auto Mecânica Rápida Ltda", cnpj: "33.222.111/0001-88", codVendedor: "003" },
  { cod: "52373", nome: "Hospital Geral São Lucas", cnpj: "11.222.333/0001-44", codVendedor: "002" },
  { cod: "52374", nome: "Comercial de Bebidas União", cnpj: "77.888.999/0001-22", codVendedor: "001" },
];

const VENDEDORES_DISPONIVEIS = [
  { cod: "001", nome: "Lucas Comercial" },
  { cod: "002", nome: "Marcos Vendas" },
  { cod: "003", nome: "Roberto Souza" },
];

const INITIAL_SERVICES = [
  {
    id: "OS-1042",
    numeroOS: "1042",
    client: "Usina Santa Rita S/A",
    codCliente: "52369",
    cnpj: "12.345.678/0001-90",
    codVendedor: "001",
    vendedor: "Lucas Comercial",
    description: "15 x Extintor PQS ABC 4kg (Ensaio Hidrostático Nível 3 + Carga)",
    extintores: 15,
    tipoServico: "Ensaio Hidrostático Nível 3 + Carga",
    status: "execucao",
    priority: "alta",
    value: "R$ 2.450,00",
    tecnico: "Carlos Eduardo",
    dataAbertura: "24/10/2026",
    dataEntrada: "24/10/2026",
  },
  {
    id: "OS-1041",
    numeroOS: "1041",
    client: "Condomínio Solar das Flores",
    codCliente: "52370",
    cnpj: "98.765.432/0001-11",
    codVendedor: "002",
    vendedor: "Marcos Vendas",
    description: "4 x Extintor CO2 6kg (Recarga Nível 2 + Selo Inmetro)",
    extintores: 4,
    tipoServico: "Recarga Nível 2 + Selo Inmetro",
    status: "triagem",
    priority: "media",
    value: "R$ 680,00",
    tecnico: "Marcos Vinicius",
    dataAbertura: "23/10/2026",
    dataEntrada: "23/10/2026",
  },
  {
    id: "OS-1040",
    numeroOS: "1040",
    client: "Transportes Silva & Filhos",
    codCliente: "52371",
    cnpj: "45.123.789/0001-55",
    codVendedor: "001",
    vendedor: "Lucas Comercial",
    description: "20 x Extintor Água Pressurizada AP 10L (Inspeção + Pintura)",
    extintores: 20,
    tipoServico: "Inspeção Nível 1 + Limpeza Técnica",
    status: "concluido",
    priority: "baixa",
    value: "R$ 3.100,00",
    tecnico: "Roberto Santos",
    dataAbertura: "22/10/2026",
    dataEntrada: "22/10/2026",
  },
  {
    id: "OS-1039",
    numeroOS: "1039",
    client: "Auto Mecânica Rápida Ltda",
    codCliente: "52372",
    cnpj: "33.222.111/0001-88",
    codVendedor: "003",
    vendedor: "Roberto Souza",
    description: "6 x Extintor Pó BC 8kg (Troca de Válvula e Mangueira)",
    extintores: 6,
    tipoServico: "Revisão Completa + Pintura Eletrostática",
    status: "peca",
    priority: "alta",
    value: "R$ 890,00",
    tecnico: "Carlos Eduardo",
    dataAbertura: "21/10/2026",
    dataEntrada: "21/10/2026",
  },
  {
    id: "OS-0980",
    numeroOS: "980",
    client: "Hospital Geral São Lucas",
    codCliente: "52373",
    cnpj: "11.222.333/0001-44",
    codVendedor: "002",
    vendedor: "Marcos Vendas",
    description: "32 x Extintores Diversos (Carga e Ensaio Hidrostático)",
    extintores: 32,
    tipoServico: "Ensaio Hidrostático Nível 3 + Carga",
    status: "concluido",
    priority: "baixa",
    value: "R$ 4.890,00",
    tecnico: "Marcos Vinicius",
    dataAbertura: "05/10/2026",
    dataEntrada: "05/10/2026",
  },
];

export default function Ordens({ currentRoute, setCurrentRoute }) {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [priorityFilter, setPriorityFilter] = useState("todos");
  const [selectedOS, setSelectedOS] = useState(null);

  // Estados do fluxo de criação baseado no DOS
  // wizardStep: null | 'pergunta_antiga' | 'busca_antiga' | 'form_nova_os'
  const [wizardStep, setWizardStep] = useState(null);
  const [searchNumeroOS, setSearchNumeroOS] = useState("");
  const [foundOldOS, setFoundOldOS] = useState(null);
  const [searchFeedback, setSearchFeedback] = useState(null);

  const [formOS, setFormOS] = useState({
    numeroOS: "",
    dataAbertura: "",
    codCliente: "",
    client: "",
    cnpj: "",
    codVendedor: "001",
    vendedor: "Lucas Comercial",
    extintores: 5,
    tipoServico: "Ensaio Hidrostático Nível 3 + Carga",
    tecnico: "Carlos Eduardo",
    priority: "media",
    value: "650,00",
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

  // 1. Inicia o processo de criação de OS com a pergunta do DOS
  const handleIniciarCriacao = () => {
    setSearchNumeroOS("");
    setFoundOldOS(null);
    setSearchFeedback(null);
    setWizardStep("pergunta_antiga");
  };

  // 2. Resposta à pergunta: "Possui ordem antiga.?"
  const handleRespostaPerguntaAntiga = (possui) => {
    if (possui) {
      // Se SIM: vai para a tela de buscar ordem antiga
      setWizardStep("busca_antiga");
      setSearchNumeroOS("");
      setFoundOldOS(null);
      setSearchFeedback(null);
    } else {
      // Se NÃO: cria nova OS em branco
      iniciarNovaOSDireta();
    }
  };

  // 3. Busca por Ordem Antiga pelo número
  const handleBuscarOSAntiga = (e) => {
    if (e) e.preventDefault();
    const buscaLimpa = searchNumeroOS.trim().replace(/^OS-/i, "");
    if (!buscaLimpa) return;

    const encontrada = services.find(
      (s) =>
        s.numeroOS === buscaLimpa ||
        s.id.toLowerCase() === `os-${buscaLimpa.toLowerCase()}` ||
        s.numeroOS === String(Number(buscaLimpa))
    );

    if (encontrada) {
      setFoundOldOS(encontrada);
      setSearchFeedback({ type: "success", text: `✓ Ordem nº ${encontrada.numeroOS} localizada com sucesso!` });
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
      // Gera novo número de OS sequencial (ex: 1043)
      const proximoNum = Math.max(...services.map((s) => Number(s.numeroOS || 0))) + 1;
      const dataHoje = new Date().toLocaleDateString("pt-BR");

      setFormOS({
        numeroOS: String(proximoNum),
        dataAbertura: dataHoje,
        codCliente: foundOldOS.codCliente || "52369",
        client: foundOldOS.client,
        cnpj: foundOldOS.cnpj || "",
        codVendedor: foundOldOS.codVendedor || "001",
        vendedor: foundOldOS.vendedor || "Lucas Comercial",
        extintores: foundOldOS.extintores || 5,
        tipoServico: foundOldOS.tipoServico || "Ensaio Hidrostático Nível 3 + Carga",
        tecnico: foundOldOS.tecnico || "Carlos Eduardo",
        priority: foundOldOS.priority || "media",
        value: foundOldOS.value ? foundOldOS.value.replace("R$ ", "") : "650,00",
        baseadaEmOS: foundOldOS.numeroOS,
      });

      setWizardStep("form_nova_os");
    } else {
      // Se NÃO: limpa a ordem encontrada para que a pessoa possa buscar outra ou cancelar
      setFoundOldOS(null);
      setSearchFeedback(null);
      setSearchNumeroOS("");
    }
  };

  // Inicia uma nova OS do zero (sem base antiga)
  const iniciarNovaOSDireta = () => {
    const proximoNum = Math.max(...services.map((s) => Number(s.numeroOS || 0))) + 1;
    const dataHoje = new Date().toLocaleDateString("pt-BR");

    setFormOS({
      numeroOS: String(proximoNum),
      dataAbertura: dataHoje,
      codCliente: "52369",
      client: "Usina Santa Rita S/A",
      cnpj: "12.345.678/0001-90",
      codVendedor: "001",
      vendedor: "Lucas Comercial",
      extintores: 5,
      tipoServico: "Ensaio Hidrostático Nível 3 + Carga",
      tecnico: "Carlos Eduardo",
      priority: "media",
      value: "650,00",
      baseadaEmOS: null,
    });

    setWizardStep("form_nova_os");
  };

  // Quando o operador troca o cliente no formulário
  const handleSelecionarCliente = (cod) => {
    const cli = CLIENTES_DISPONIVEIS.find((c) => c.cod === cod);
    if (cli) {
      const vend = VENDEDORES_DISPONIVEIS.find((v) => v.cod === cli.codVendedor) || VENDEDORES_DISPONIVEIS[0];
      setFormOS((prev) => ({
        ...prev,
        codCliente: cli.cod,
        client: cli.nome,
        cnpj: cli.cnpj,
        codVendedor: vend.cod,
        vendedor: vend.nome,
      }));
    }
  };

  // 5. Gravação final da Nova OS
  const handleSalvarNovaOS = (e) => {
    e.preventDefault();
    if (!formOS.client) return;

    const novaOS = {
      id: `OS-${formOS.numeroOS}`,
      numeroOS: formOS.numeroOS,
      client: formOS.client,
      codCliente: formOS.codCliente,
      cnpj: formOS.cnpj,
      codVendedor: formOS.codVendedor,
      vendedor: formOS.vendedor,
      description: `${formOS.extintores} x Extintores (${formOS.tipoServico})`,
      extintores: Number(formOS.extintores),
      tipoServico: formOS.tipoServico,
      status: "triagem",
      priority: formOS.priority,
      value: `R$ ${formOS.value}`,
      tecnico: formOS.tecnico,
      dataAbertura: formOS.dataAbertura,
      dataEntrada: formOS.dataAbertura,
    };

    setServices([novaOS, ...services]);
    setWizardStep(null);
    setFoundOldOS(null);
    setSearchFeedback(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "danger";
      case "media":
        return "warning";
      case "baixa":
        return "success";
      default:
        return "info";
    }
  };

  const filteredServices = services.filter(
    (service) => priorityFilter === "todos" || service.priority === priorityFilter
  );

  const getColumnServices = (status) => {
    return filteredServices.filter((s) => s.status === status);
  };

  return (
    <div>
      {/* Submenu de Navegação entre os menus de OS */}
      <OrdemServicoTabs
        activeTab="montagem"
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="glass-panel">
        <div className="control-bar">
          <div>
            <h4 style={{ fontWeight: 600 }}>🛠️ Montagem de Ordem Servico</h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Composição de lotes de extintores, abertura técnica e fluxo de oficina
            </span>
          </div>

          <div className="flex-gap">
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              Prioridade:
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="select-filter"
            >
              <option value="todos">Todas</option>
              <option value="alta">Alta 🔥</option>
              <option value="media">Média ⚡</option>
              <option value="baixa">Baixa 🛡️</option>
            </select>
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
              Montar Nova O.S.
            </button>
          </div>
        </div>

        {/* Quadro Kanban de Fluxo Operacional */}
        <div className="kanban-board">
          {/* Coluna 1: Triagem / Entrada */}
          <div className="kanban-column">
            <div className="column-header">
              <span className="column-title">📥 Recepção / Triagem</span>
              <span className="column-count">{getColumnServices("triagem").length}</span>
            </div>
            {getColumnServices("triagem").map((s) => (
              <div
                key={s.id}
                className="kanban-card"
                onClick={() => setSelectedOS(s)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="card-tag">#{s.numeroOS}</span>
                  <span className={`status-pill ${getPriorityColor(s.priority)}`}>
                    {s.priority}
                  </span>
                </div>
                <div className="card-title">{s.client}</div>
                <div className="card-desc">{s.description}</div>
                <div className="card-footer">
                  <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                    {s.value}
                  </span>
                  <span>{s.extintores} un.</span>
                </div>
              </div>
            ))}
          </div>

          {/* Coluna 2: Em Execução / Bancada */}
          <div className="kanban-column">
            <div className="column-header">
              <span className="column-title">⚡ Oficina / Bancada</span>
              <span className="column-count">{getColumnServices("execucao").length}</span>
            </div>
            {getColumnServices("execucao").map((s) => (
              <div
                key={s.id}
                className="kanban-card"
                onClick={() => setSelectedOS(s)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="card-tag">#{s.numeroOS}</span>
                  <span className={`status-pill ${getPriorityColor(s.priority)}`}>
                    {s.priority}
                  </span>
                </div>
                <div className="card-title">{s.client}</div>
                <div className="card-desc">{s.description}</div>
                <div className="card-footer">
                  <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                    {s.value}
                  </span>
                  <span className="status-pill info" style={{ fontSize: "0.65rem" }}>
                    Téc: {s.tecnico.split(" ")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coluna 3: Aguardando Peças / Insumos */}
          <div className="kanban-column">
            <div className="column-header">
              <span className="column-title">⏳ Aguardando Peças</span>
              <span className="column-count">{getColumnServices("peca").length}</span>
            </div>
            {getColumnServices("peca").map((s) => (
              <div
                key={s.id}
                className="kanban-card"
                onClick={() => setSelectedOS(s)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="card-tag">#{s.numeroOS}</span>
                  <span className={`status-pill ${getPriorityColor(s.priority)}`}>
                    {s.priority}
                  </span>
                </div>
                <div className="card-title">{s.client}</div>
                <div className="card-desc">{s.description}</div>
                <div className="card-footer">
                  <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                    {s.value}
                  </span>
                  <span className="status-pill warning" style={{ fontSize: "0.65rem" }}>
                    Pendente
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coluna 4: Concluído / Selagem Concluída */}
          <div className="kanban-column">
            <div className="column-header">
              <span className="column-title">✅ Pronto p/ Liberação</span>
              <span className="column-count">{getColumnServices("concluido").length}</span>
            </div>
            {getColumnServices("concluido").map((s) => (
              <div
                key={s.id}
                className="kanban-card"
                onClick={() => setSelectedOS(s)}
                style={{ cursor: "pointer", opacity: 0.9 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="card-tag">#{s.numeroOS}</span>
                  <span className="status-pill success" style={{ fontSize: "0.65rem" }}>
                    Pronto
                  </span>
                </div>
                <div className="card-title">{s.client}</div>
                <div className="card-desc">{s.description}</div>
                <div className="card-footer">
                  <span style={{ color: "var(--accent-success)", fontWeight: 600 }}>
                    {s.value}
                  </span>
                  <span className="status-pill success" style={{ fontSize: "0.65rem" }}>
                    Selo OK
                  </span>
                </div>
              </div>
            ))}
          </div>
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
                  CICOM SISTEMAS • MONTAGEM DE ORDEM SERVIÇO
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Possui ordem antiga.?
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.75rem" }}>
                  Deseja localizar uma Ordem de Serviço anterior para reaproveitar os dados do cliente e histórico?
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
        {/* PASSO 2: SEGUNDA TELA - BUSCA DA ORDEM ANTIGA (PRINT 2) */}
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
                    Montagem de Ordem Servico
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

              {/* Formulário com os campos do PRINT 2 */}
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
                        placeholder="Ex: 1042"
                        value={searchNumeroOS}
                        onChange={(e) => setSearchNumeroOS(e.target.value)}
                        className="input-search"
                        style={{
                          width: "120px",
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
                    Deseja criar uma Nova OS baseada nesta?
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                    Os dados do cliente, vendedor e especificações técnicas de #{foundOldOS.numeroOS} serão importados.
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
                    onClick={iniciarNovaOSDireta}
                  >
                    Criar Nova OS em Branco
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

        {/* ======================================================== */}
        {/* PASSO 3: FORMULÁRIO DE MONTAGEM DA NOVA OS */}
        {/* ======================================================== */}
        {wizardStep === "form_nova_os" &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setWizardStep(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "600px",
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
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                    Montagem de Nova Ordem de Serviço
                  </h3>
                  {formOS.baseadaEmOS ? (
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
                      ✓ Clonada com base na O.S. Antiga #{formOS.baseadaEmOS}
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Nova Ordem de Serviço gerada em branco
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

              <form onSubmit={handleSalvarNovaOS}>
                {/* Linha 1: Numero OS e Data Abertura */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Numero O.S. (Gerado):
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`#${formOS.numeroOS}`}
                      className="input-search"
                      style={{
                        width: "100%",
                        fontWeight: 700,
                        backgroundColor: "var(--bg-hover)",
                        color: "var(--accent-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Data Abertura:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formOS.dataAbertura}
                      className="input-search"
                      style={{ width: "100%", backgroundColor: "var(--bg-hover)", fontWeight: 600 }}
                    />
                  </div>
                </div>

                {/* Linha 2: Cod. Cliente e Seleção */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                    Cod. Cliente / Razão Social:
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: "100%" }}
                    value={formOS.codCliente}
                    onChange={(e) => handleSelecionarCliente(e.target.value)}
                  >
                    {CLIENTES_DISPONIVEIS.map((c) => (
                      <option key={c.cod} value={c.cod}>
                        {c.cod} — {c.nome} (CNPJ: {c.cnpj})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Linha 3: Cod. Vendedor */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                    Cod. Vendedor Responsável:
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: "100%" }}
                    value={formOS.codVendedor}
                    onChange={(e) => {
                      const vend = VENDEDORES_DISPONIVEIS.find((v) => v.cod === e.target.value);
                      if (vend) {
                        setFormOS({ ...formOS, codVendedor: vend.cod, vendedor: vend.nome });
                      }
                    }}
                  >
                    {VENDEDORES_DISPONIVEIS.map((v) => (
                      <option key={v.cod} value={v.cod}>
                        {v.cod} — {v.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Linha 4: Quantidade de Extintores e Tipo de Serviço */}
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Qtd. Extintores:
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="input-search"
                      style={{ width: "100%", fontWeight: 600 }}
                      value={formOS.extintores}
                      onChange={(e) => setFormOS({ ...formOS, extintores: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Tipo de Serviço Predominante:
                    </label>
                    <select
                      className="select-filter"
                      style={{ width: "100%" }}
                      value={formOS.tipoServico}
                      onChange={(e) => setFormOS({ ...formOS, tipoServico: e.target.value })}
                    >
                      <option value="Ensaio Hidrostático Nível 3 + Carga">
                        Ensaio Hidrostático Nível 3 + Carga (5 anos ABNT)
                      </option>
                      <option value="Recarga Nível 2 + Selo Inmetro">
                        Recarga Nível 2 + Selo Inmetro (Anual)
                      </option>
                      <option value="Inspeção Nível 1 + Limpeza Técnica">
                        Inspeção Nível 1 + Limpeza Técnica
                      </option>
                      <option value="Revisão Completa + Pintura Eletrostática">
                        Revisão Completa + Pintura Eletrostática
                      </option>
                    </select>
                  </div>
                </div>

                {/* Linha 5: Técnico, Prioridade e Valor */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Técnico Bancada:
                    </label>
                    <select
                      className="select-filter"
                      style={{ width: "100%" }}
                      value={formOS.tecnico}
                      onChange={(e) => setFormOS({ ...formOS, tecnico: e.target.value })}
                    >
                      <option value="Carlos Eduardo">Carlos Eduardo</option>
                      <option value="Marcos Vinicius">Marcos Vinicius</option>
                      <option value="Roberto Santos">Roberto Santos</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Prioridade:
                    </label>
                    <select
                      className="select-filter"
                      style={{ width: "100%" }}
                      value={formOS.priority}
                      onChange={(e) => setFormOS({ ...formOS, priority: e.target.value })}
                    >
                      <option value="baixa">Baixa 🛡️</option>
                      <option value="media">Média ⚡</option>
                      <option value="alta">Alta 🔥</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                      Valor Est. (R$):
                    </label>
                    <input
                      type="text"
                      className="input-search"
                      style={{ width: "100%", fontWeight: 600 }}
                      value={formOS.value}
                      onChange={(e) => setFormOS({ ...formOS, value: e.target.value })}
                    />
                  </div>
                </div>

                {/* Ações do formulário */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                    onClick={() => setWizardStep(formOS.baseadaEmOS ? "busca_antiga" : "pergunta_antiga")}
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
                      Gravar e Montar O.S.
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

        {/* Modal Detalhes da OS (quando clica em um card do Kanban) */}
        {selectedOS &&
          createPortal(
            <div
              className="modal-overlay"
              onClick={() => setSelectedOS(null)}
            >
              <div
                className="modal-dialog"
                style={{
                  width: "100%",
                  maxWidth: "560px",
                  padding: "2rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3>Ficha da Ordem de Serviço #{selectedOS.numeroOS}</h3>
                <span className={`status-pill ${getPriorityColor(selectedOS.priority)}`}>
                  {selectedOS.priority.toUpperCase()}
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "var(--bg-hover)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <strong>Cod. Cliente:</strong> {selectedOS.codCliente} — {selectedOS.client} ({selectedOS.cnpj})
                </div>
                <div>
                  <strong>Cod. Vendedor:</strong> {selectedOS.codVendedor} — {selectedOS.vendedor}
                </div>
                <div>
                  <strong>Data de Abertura:</strong> {selectedOS.dataAbertura || selectedOS.dataEntrada}
                </div>
                <div>
                  <strong>Extintores no Lote:</strong> {selectedOS.extintores} unidades
                </div>
                <div>
                  <strong>Técnico Responsável:</strong> {selectedOS.tecnico}
                </div>
                <div>
                  <strong>Descrição dos Serviços:</strong> {selectedOS.description}
                </div>
                <div>
                  <strong>Valor Total:</strong>{" "}
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
                    {selectedOS.value}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    backgroundColor: "var(--accent-success)",
                  }}
                  onClick={() => {
                    setSelectedOS(null);
                    if (setCurrentRoute) setCurrentRoute("/servicos/ordens/baixa");
                  }}
                >
                  Ir para Baixa de Serviço ➔
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                  onClick={() => setSelectedOS(null)}
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
