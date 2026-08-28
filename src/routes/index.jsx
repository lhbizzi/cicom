import Clientes from "../pages/cadastros/Clientes";
import Produtos from "../pages/cadastros/Produtos";
import Fornecedores from "../pages/cadastros/Fornecedores";
import Ordens from "../pages/servicos/Ordens";
import Chamados from "../pages/servicos/Chamados";
import Faturamento from "../pages/relatorios/Faturamento";
import Auditoria from "../pages/relatorios/Auditoria";
import Posicao from "../pages/estoque/Posicao";
import Alertas from "../pages/estoque/Alertas";
import Parametros from "../pages/utilitarios/Parametros";
import Manutencao from "../pages/utilitarios/Manutencao";

// Central route mapping dictionary
export const routesMap = {
  "/cadastros/clientes": Clientes,
  "/cadastros/produtos": Produtos,
  "/cadastros/fornecedores": Fornecedores,
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
      <div className="glass-panel" style={{ textAlign: "center", padding: "3rem" }}>
        <h3>Caminho não configurado</h3>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          A rota {activeRoute} ainda não foi mapeada para renderização física.
        </p>
      </div>
    );
  }

  return <Component />;
}
