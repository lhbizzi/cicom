import { useState } from "react";

const DYNAMIC_MENUS = [
  {
    id: "cadastros",
    title: "Cadastros",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    ),
    children: [
      {
        id: "cad-cli",
        title: "Clientes",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        ),
        route: "/cadastros/clientes",
      },
      {
        id: "cad-pro",
        title: "Produtos",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="21 8 21 21 3 21 3 8"></polyline>
            <rect x="1" y="3" width="22" height="5"></rect>
            <line x1="10" y1="12" x2="14" y2="12"></line>
          </svg>
        ),
        route: "/cadastros/produtos",
      },
      {
        id: "cad-for",
        title: "Fornecedores",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        ),
        route: "/cadastros/fornecedores",
      },
    ],
  },
  {
    id: "servicos",
    title: "Serviços",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    children: [
      {
        id: "ser-ord",
        title: "Ordens de Serviço",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        ),
        route: "/servicos/ordens",
      },
      {
        id: "ser-cha",
        title: "Chamados",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        ),
        route: "/servicos/chamados",
      },
    ],
  },
  {
    id: "relatorios",
    title: "Relatórios",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    children: [
      {
        id: "rel-fat",
        title: "Faturamento",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        ),
        route: "/relatorios/faturamento",
      },
      {
        id: "rel-aud",
        title: "Auditoria",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="9"></line>
            <line x1="9" y1="13" x2="15" y2="13"></line>
            <line x1="9" y1="17" x2="15" y2="17"></line>
          </svg>
        ),
        route: "/relatorios/auditoria",
      },
    ],
  },
  {
    id: "estoque",
    title: "Estoque",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <polygon points="12 22.08 12 12 3 6.92 3 17.08 12 22.08"></polygon>
        <polygon points="12 22.08 21 17.08 21 6.92 12 12 12 22.08"></polygon>
        <polygon points="12 12 21 6.92 12 1.84 3 6.92 12 12"></polygon>
      </svg>
    ),
    children: [
      {
        id: "est-pos",
        title: "Posição Atual",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        ),
        route: "/estoque/posicao",
      },
      {
        id: "est-ale",
        title: "Alertas",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        ),
        route: "/estoque/alertas",
      },
    ],
  },
  {
    id: "utilitarios",
    title: "Utilitários",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
    children: [
      {
        id: "ut-par",
        title: "Parâmetros",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        ),
        route: "/utilitarios/parametros",
      },
      {
        id: "ut-dbf",
        title: "Manutenção DBF",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
          </svg>
        ),
        route: "/utilitarios/manutencao",
      },
    ],
  },
];

export default function Sidebar({ currentRoute, setCurrentRoute, collapsed, setCollapsed, theme, toggleTheme }) {
  // Store expanded state for each parent module (Accordion folder)
  const [expandedMenus, setExpandedMenus] = useState({
    cadastros: true, // Default open
    servicos: false,
    relatorios: false,
    estoque: false,
    utilitarios: false,
  });

  const toggleAccordion = (menuId) => {
    if (collapsed) {
      setCollapsed(false); // Auto expand sidebar if collapsed
    }
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isRouteActive = (route) => {
    return currentRoute === route;
  };

  const isParentActive = (menu) => {
    if (menu.children) {
      return menu.children.some((child) => isRouteActive(child.route));
    }
    return isRouteActive(menu.route);
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Brand Logo Header */}
      <div className="sidebar-header">
        <div className="logo-icon">C</div>
        <span className="logo-text">CICOM</span>
      </div>

      {/* Accordion Navigation Items */}
      <nav className="sidebar-menu">
        {DYNAMIC_MENUS.map((menu) => {
          const hasChildren = !!menu.children;
          const isExpanded = expandedMenus[menu.id];
          const activeClass = isParentActive(menu) ? "active" : "";
          
          return (
            <div key={menu.id} className={`menu-item-group ${isExpanded ? "expanded" : ""}`}>
              {/* Parent Toggle Button */}
              <button
                className={`menu-item ${activeClass}`}
                style={{ border: "none", background: "none", width: "100%", textAlign: "left" }}
                onClick={() => {
                  if (hasChildren) {
                    toggleAccordion(menu.id);
                  } else if (menu.route) {
                    setCurrentRoute(menu.route);
                  }
                }}
              >
                <span className="menu-item-icon">{menu.icon}</span>
                <span className="menu-item-label">{menu.title}</span>
                {hasChildren && (
                  <span className="menu-arrow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                )}
              </button>

              {/* Submenu Accordion Items */}
              {hasChildren && (
                <div className="submenu-container">
                  {menu.children.map((child) => (
                    <button
                      key={child.id}
                      className={`submenu-item ${isRouteActive(child.route) ? "active" : ""}`}
                      onClick={() => setCurrentRoute(child.route)}
                    >
                      <span className="submenu-item-icon">{child.icon}</span>
                      <span>{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer User Details and Buttons */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">L</div>
          <div className="user-info">
            <span className="user-name">Lucas</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>

        <div className="footer-buttons">
          {/* Light/Dark Toggle */}
          <button 
            className="btn-sidebar-control" 
            title={theme === "light" ? "Mudar para Modo Escuro" : "Mudar para Modo Claro"}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          {/* Collapse sidebar button */}
          <button 
            className="btn-sidebar-control" 
            title={collapsed ? "Expandir Menu" : "Recolher Menu"}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
