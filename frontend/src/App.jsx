import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import "./App.css";

function App() {
  const [currentRoute, setCurrentRoute] = useState("/cadastros/clientes");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("light"); // Default dark mode for premium look

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Get dynamic titles based on the sub-route path
  const getHeaderDetails = () => {
    switch (currentRoute) {
      case "/cadastros/clientes":
        return {
          title: "Clientes",
          subtitle: "Fichário e Gerenciamento Geral de Clientes",
        };
      case "/cadastros/marcas":
        return {
          title: "Marcas",
          subtitle: "Controle e Cadastro de Marcas de Extintores",
        };
      case "/cadastros/lotes":
        return {
          title: "Lotes",
          subtitle: "Recepção e Agrupamento de Extintores em Lote",
        };
      case "/cadastros/pecas":
        return {
          title: "Serviços / Materiais",
          subtitle: "Cadastro de Insumos, Peças e Tabela de Serviços",
        };
      case "/cadastros/vendedores":
        return {
          title: "Vendedores",
          subtitle: "Cadastro de Vendedores Comerciais e Comissões",
        };
      case "/cadastros/funcionarios":
        return {
          title: "Funcionários",
          subtitle: "Cadastro da Equipe Operacional e de Oficina",
        };
      case "/cadastros/tipo-extintores":
        return {
          title: "Tipo Extintores",
          subtitle: "Agentes Extintores, Pressões e Normas ABNT",
        };
      case "/cadastros/cidades-nfe":
        return {
          title: "Cidades NFe",
          subtitle: "Códigos IBGE dos Municípios e Alíquotas de ISS",
        };
      case "/cadastros/transportadoras":
        return {
          title: "Transportadoras",
          subtitle: "Frota de Veículos, Coleta e Entrega Técnica",
        };
      case "/cadastros/extintores":
        return {
          title: "Extintores",
          subtitle: "Fichário Geral por Número de Série e Vencimentos ABNT",
        };
      case "/servicos/ordens":
      case "/servicos/ordens/montagem":
        return {
          title: "Montagem de Ordem Servico",
          subtitle: "Fluxo de Trabalho, Composição e Abertura de OS",
        };
      case "/servicos/ordens/avulsa":
        return {
          title: "Ordem de Servico Avulsa",
          subtitle: "Abertura Rápida de OS Avulsa para Atendimento Imediato",
        };
      case "/servicos/ordens/baixa":
        return {
          title: "Baixa Servico Feito OS",
          subtitle: "Apontamento e Baixa Operacional de Serviços Realizados",
        };
      case "/servicos/ordens/vincular-nota":
        return {
          title: "Vincular Nota a Ordem de Sv.",
          subtitle: "Associação de Notas Fiscais às Ordens de Serviço",
        };
      case "/servicos/ordens/vincular-oc":
        return {
          title: "Vincular OC a Ordem de Sv.",
          subtitle: "Vinculação de Ordens de Compra e Autorizações de Fornecimento",
        };
      case "/servicos/ordens/relatorio":
        return {
          title: "Relatorio de Ordem em Servico",
          subtitle: "Listagem Analítica, Filtros e Relatórios Operacionais de OS",
        };
      case "/servicos/chamados":
        return {
          title: "Chamados",
          subtitle: "Acompanhamento de Incidentes e Suporte Técnico",
        };
      case "/relatorios/faturamento":
        return {
          title: "Faturamento",
          subtitle: "Indicadores Gráficos de Vendas e Receitas",
        };
      case "/relatorios/auditoria":
        return {
          title: "Auditoria",
          subtitle: "Logs e Histórico Geral de Operações (DBF)",
        };
      case "/estoque/posicao":
        return {
          title: "Posição de Estoque",
          subtitle: "Saldos Físicos de Inventário",
        };
      case "/estoque/alertas":
        return {
          title: "Alertas de Estoque",
          subtitle: "Itens com Nível de Estoque Baixo ou Crítico",
        };
      case "/utilitarios/parametros":
        return {
          title: "Parâmetros",
          subtitle: "Configurações Gerais de Operação do Sistema",
        };
      case "/utilitarios/manutencao":
        return {
          title: "Manutenção",
          subtitle: "Utilitários de Backup e PACK do Banco de Dados",
        };
      default:
        return { title: "CICOM", subtitle: "Painel Administrativo" };
    }
  };

  const { title, subtitle } = getHeaderDetails();

  return (
    <div className="app-container">
      {/* Sidebar navigation */}
      <Sidebar
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main viewport */}
      <main className="main-content">
        {/* Top Header */}
        <header className="content-header">
          <div className="header-title-section">
            <h1 className="header-title">{title}</h1>
            <span className="header-subtitle">{subtitle}</span>
          </div>

          <div className="header-actions">
            {/* Search Box Simulation */}
            <div className="search-bar">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Pesquisar..." />
            </div>

            {/* Notification Simulation */}
            <button className="btn-icon" title="Notificações">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="badge-dot"></span>
            </button>
          </div>
        </header>

        {/* Dynamic content rendering zone */}
        <div className="page-container">
          <AppRoutes activeRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
        </div>
      </main>
    </div>
  );
}

export default App;
