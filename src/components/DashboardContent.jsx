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

export default function DashboardContent({ activeRoute }) {
  switch (activeRoute) {
    case "/cadastros/clientes":
      return <Clientes />;
    case "/cadastros/produtos":
      return <Produtos />;
    case "/cadastros/fornecedores":
      return <Fornecedores />;
    case "/servicos/ordens":
      return <Ordens />;
    case "/servicos/chamados":
      return <Chamados />;
    case "/relatorios/faturamento":
      return <Faturamento />;
    case "/relatorios/auditoria":
      return <Auditoria />;
    case "/estoque/posicao":
      return <Posicao />;
    case "/estoque/alertas":
      return <Alertas />;
    case "/utilitarios/parametros":
      return <Parametros />;
    case "/utilitarios/manutencao":
      return <Manutencao />;
    default:
      return (
        <div className="glass-panel" style={{ textAlign: "center", padding: "3rem" }}>
          <h3>Caminho não configurado</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            A rota {activeRoute} ainda não foi mapeada para renderização física.
          </p>
        </div>
      );
  }
}
