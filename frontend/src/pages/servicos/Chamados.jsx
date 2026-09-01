import { useState } from "react";

const INITIAL_TICKETS = [
  { id: "TK-4820", title: "Erro na emissão de NFC-e", author: "Supermercado Silva", category: "Fiscal", date: "06/08/2026 10:20", status: "Aberto" },
  { id: "TK-4821", title: "Cursor do clipper lento no terminal", author: "Drogaria Bem Estar", category: "Performance", date: "06/08/2026 11:15", status: "Aberto" },
  { id: "TK-4819", title: "Problemas na reindexação CDX", author: "Alves & Cia Ltda", category: "Banco de Dados", date: "05/08/2026 17:00", status: "Concluído" },
];

export default function Chamados() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [search, setSearch] = useState("");

  const addTicket = () => {
    const randomId = Math.floor(4800 + Math.random() * 200);
    const newTicket = {
      id: `TK-${randomId}`,
      title: "Problema com impressora de cupom não fiscal",
      author: "Novo Cliente S/A",
      category: "Hardware",
      date: "06/08/2026 21:00",
      status: "Aberto"
    };
    setTickets([newTicket, ...tickets]);
  };

  const filtered = tickets.filter(tk => 
    tk.title.toLowerCase().includes(search.toLowerCase()) ||
    tk.author.toLowerCase().includes(search.toLowerCase()) ||
    tk.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-panel">
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>🏷️ Chamados de Suporte Técnico</h4>
        <div className="flex-gap">
          <input 
            type="text" 
            placeholder="Pesquisar chamado..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
          <button className="btn-primary" onClick={addTicket}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Abrir Chamado
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Assunto do Chamado</th>
              <th>Autor (Cliente)</th>
              <th>Categoria</th>
              <th>Data/Hora de Entrada</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tk) => (
              <tr key={tk.id}>
                <td style={{ fontWeight: 600 }}>{tk.id}</td>
                <td>{tk.title}</td>
                <td>{tk.author}</td>
                <td>{tk.category}</td>
                <td>{tk.date}</td>
                <td>
                  <span className={`status-pill ${tk.status === "Aberto" ? "warning" : "success"}`}>
                    {tk.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  Nenhum chamado correspondente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
