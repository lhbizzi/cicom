export const OS_TABS = [
  {
    id: "montagem",
    label: "Montagem de Ordem Servico",
    route: "/servicos/ordens/montagem",
    altRoute: "/servicos/ordens",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
  },
  {
    id: "avulsa",
    label: "Ordem de Servico Avulsa",
    route: "/servicos/ordens/avulsa",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
        <line x1="12" y1="13" x2="12" y2="17"></line>
        <line x1="10" y1="15" x2="14" y2="15"></line>
      </svg>
    ),
  },
  {
    id: "baixa",
    label: "Baixa Servico Feito OS",
    route: "/servicos/ordens/baixa",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    id: "vincular-nota",
    label: "Vincular Nota a Ordem de Sv.",
    route: "/servicos/ordens/vincular-nota",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    ),
  },
  {
    id: "vincular-oc",
    label: "Vincular OC a Ordem de Sv.",
    route: "/servicos/ordens/vincular-oc",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    id: "relatorio",
    label: "Relatorio de Ordem em Servico",
    route: "/servicos/ordens/relatorio",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
  },
];

export default function OrdemServicoTabs({ activeTab, currentRoute, setCurrentRoute }) {
  const isTabActive = (tab) => {
    if (activeTab && tab.id === activeTab) return true;
    if (currentRoute) {
      if (currentRoute === tab.route) return true;
      if (tab.altRoute && currentRoute === tab.altRoute) return true;
    }
    return false;
  };

  return (
    <div className="os-tabs-bar">
      {OS_TABS.map((tab) => {
        const active = isTabActive(tab);
        return (
          <button
            key={tab.id}
            type="button"
            className={`os-tab-btn ${active ? "active" : ""}`}
            onClick={() => {
              if (setCurrentRoute) {
                setCurrentRoute(tab.route);
              }
            }}
            title={tab.label}
          >
            <span className="os-tab-icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
