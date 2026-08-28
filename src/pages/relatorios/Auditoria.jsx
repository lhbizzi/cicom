export default function Auditoria() {
  return (
    <div className="glass-panel">
      <h4 style={{ marginBottom: "1rem", fontWeight: 600 }}>📜 Registro de Eventos e Auditoria (Clipper LOG)</h4>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Data / Hora</th>
              <th>Operador</th>
              <th>Módulo</th>
              <th>Descrição do Evento</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>06/08/2026 21:04</td>
              <td>lucas.admin</td>
              <td>Cadastros</td>
              <td>Criou novo cliente "Alves & Cia Ltda"</td>
              <td><span className="status-pill success" style={{ fontSize: "0.7rem" }}>Sucesso</span></td>
            </tr>
            <tr>
              <td>06/08/2026 20:30</td>
              <td>suporte.cicom</td>
              <td>Utilitários</td>
              <td>Backup completo da base de dados executado</td>
              <td><span className="status-pill success" style={{ fontSize: "0.7rem" }}>Sucesso</span></td>
            </tr>
            <tr>
              <td>06/08/2026 19:15</td>
              <td>vendedor.02</td>
              <td>Serviços</td>
              <td>Reabriu O.S. de Código OS-2026-04</td>
              <td><span className="status-pill success" style={{ fontSize: "0.7rem" }}>Sucesso</span></td>
            </tr>
            <tr>
              <td>05/08/2026 14:10</td>
              <td>lucas.admin</td>
              <td>Tabelas DBF</td>
              <td>Rodou PACK e INDEX na tabela CLIENTES.DBF</td>
              <td><span className="status-pill success" style={{ fontSize: "0.7rem" }}>Sucesso</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
