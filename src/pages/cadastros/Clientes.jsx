import { useState } from "react";

const INITIAL_CLIENTS = [
  { id: "0001", name: "Alves & Cia Ltda", document: "12.345.678/0001-90", city: "Belo Horizonte", status: "Ativo" },
  { id: "0002", name: "Supermercado Silva", document: "98.765.432/0001-10", city: "Contagem", status: "Ativo" },
  { id: "0003", name: "Auto Mecânica Rápida", document: "45.678.901/0002-20", city: "Betim", status: "Inativo" },
  { id: "0004", name: "Construtora Alfa", document: "23.456.789/0001-30", city: "Nova Lima", status: "Ativo" },
  { id: "0005", name: "Drogaria Bem Estar", document: "89.012.345/0001-40", city: "Belo Horizonte", status: "Inativo" },
];

export default function Clientes() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");

  const deleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addClient = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newClient = {
      id: `0${randomId.toString().substring(1)}`,
      name: `Novo Cliente S/A ${randomId}`,
      document: "00.000.000/0001-00",
      city: "Belo Horizonte",
      status: "Ativo"
    };
    setClients([newClient, ...clients]);
  };

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-panel">
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>👥 Cadastro de Clientes</h4>
        <div className="flex-gap">
          <input 
            type="text" 
            placeholder="Pesquisar cliente..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
          <button className="btn-primary" onClick={addClient}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Incluir Cliente
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome Razão</th>
              <th>CNPJ / CPF</th>
              <th>Cidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.document}</td>
                <td>{c.city}</td>
                <td>
                  <span className={`status-pill ${c.status === "Ativo" ? "success" : "danger"}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-table-action">Editar</button>
                    <button className="btn-table-action delete" onClick={() => deleteClient(c.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  Nenhum cliente correspondente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
