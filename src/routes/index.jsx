import Clientes from "../pages/cadastros/Clientes";
import Marcas from "../pages/cadastros/Marcas";
import Alertas from "../pages/estoque/Alertas";
import Posicao from "../pages/estoque/Posicao";
import Auditoria from "../pages/relatorios/Auditoria";
import Faturamento from "../pages/relatorios/Faturamento";
import Chamados from "../pages/servicos/Chamados";
import Ordens from "../pages/servicos/Ordens";
import Manutencao from "../pages/utilitarios/Manutencao";
import Parametros from "../pages/utilitarios/Parametros";

// Central route mapping dictionary
export const routesMap = {
  "/cadastros/clientes": Clientes,
  "/cadastros/marcas": Marcas,
  "/servicos/ordens": Ordens,
  "/servicos/chamados": Chamados,
  "/relatorios/faturamento": Faturamento,
  "/relatorios/auditoria": Auditoria,
  "/estoque/posicao": Posicao,
  "/estoque/alertas": Alertas,
  "/utilitarios/parametros": Parametros,
  "/utilitarios/manutencao": Manutencao,
};

export default function AppRoutes({ activeRoute }) {
  const Component = routesMap[activeRoute];

  if (!Component) {
    return (
      <div
        className="glass-panel"
        style={{ textAlign: "center", padding: "3rem" }}
      >
        <h3>Caminho não configurado</h3>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          A rota {activeRoute} ainda não foi mapeada para renderização física.
        </p>
      </div>
    );
  }

  return <Component />;
}
