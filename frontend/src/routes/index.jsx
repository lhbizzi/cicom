import Clientes from "../pages/cadastros/Clientes";
import Marcas from "../pages/cadastros/Marcas";
import Lotes from "../pages/cadastros/Lotes";
import PecasComponentes from "../pages/cadastros/PecasComponentes";
import Vendedores from "../pages/cadastros/Vendedores";
import Funcionarios from "../pages/cadastros/Funcionarios";
import TipoExtintores from "../pages/cadastros/TipoExtintores";
import CidadesNfe from "../pages/cadastros/CidadesNfe";
import Transportadoras from "../pages/cadastros/Transportadoras";
import Extintores from "../pages/cadastros/Extintores";
import Alertas from "../pages/estoque/Alertas";
import Posicao from "../pages/estoque/Posicao";
import Auditoria from "../pages/relatorios/Auditoria";
import Faturamento from "../pages/relatorios/Faturamento";
import Chamados from "../pages/servicos/Chamados";
import Ordens from "../pages/servicos/Ordens";
import OrdemAvulsa from "../pages/servicos/OrdemAvulsa";
import BaixaServico from "../pages/servicos/BaixaServico";
import VincularNota from "../pages/servicos/VincularNota";
import VincularOC from "../pages/servicos/VincularOC";
import RelatorioOS from "../pages/servicos/RelatorioOS";
import Manutencao from "../pages/utilitarios/Manutencao";
import Parametros from "../pages/utilitarios/Parametros";

// Central route mapping dictionary
export const routesMap = {
  "/cadastros/clientes": Clientes,
  "/cadastros/marcas": Marcas,
  "/cadastros/lotes": Lotes,
  "/cadastros/pecas": PecasComponentes,
  "/cadastros/vendedores": Vendedores,
  "/cadastros/funcionarios": Funcionarios,
  "/cadastros/tipo-extintores": TipoExtintores,
  "/cadastros/cidades-nfe": CidadesNfe,
  "/cadastros/transportadoras": Transportadoras,
  "/cadastros/extintores": Extintores,
  "/servicos/ordens": Ordens,
  "/servicos/ordens/montagem": Ordens,
  "/servicos/ordens/avulsa": OrdemAvulsa,
  "/servicos/ordens/baixa": BaixaServico,
  "/servicos/ordens/vincular-nota": VincularNota,
  "/servicos/ordens/vincular-oc": VincularOC,
  "/servicos/ordens/relatorio": RelatorioOS,
  "/servicos/chamados": Chamados,
  "/relatorios/faturamento": Faturamento,
  "/relatorios/auditoria": Auditoria,
  "/estoque/posicao": Posicao,
  "/estoque/alertas": Alertas,
  "/utilitarios/parametros": Parametros,
  "/utilitarios/manutencao": Manutencao,
};

export default function AppRoutes({ activeRoute, setCurrentRoute }) {
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

  return <Component setCurrentRoute={setCurrentRoute} currentRoute={activeRoute} />;
}
