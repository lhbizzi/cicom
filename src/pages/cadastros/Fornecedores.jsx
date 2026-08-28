import { useState } from "react";

const INITIAL_PROVIDERS = [
  { id: "F001", name: "Distribuidora Nacional S/A", document: "11.111.111/0001-11", contact: "Geraldo Santos", status: "Ativo" },
  { id: "F002", name: "Metalúrgica Central", document: "22.222.222/0001-22", contact: "Maria Souza", status: "Ativo" },
];

export default function Fornecedores() {
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [search, setSearch] = useState("");

  const deleteProvider = (id) => {
    setProviders(providers.filter(f => f.id !== id));
  };

  const addProvider = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const newProvider = {
      id: `F${randomId}`,
      name: `Fornecedor Industrial ${randomId}`,
      document: "33.333.333/0001-33",
      contact: "Carlos Lima",
      status: "Ativo"
    };
    setProviders([newProvider, ...providers]);
  };

  const filtered = providers.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.id.toLowerCase().includes(search.toLowerCase()) ||
    f.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-panel">
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>🚚 Cadastro de Fornecedores</h4>
        <div className="flex-gap">
          <input 
            type="text" 
            placeholder="Pesquisar fornecedor..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
          <button className="btn-primary" onClick={addProvider}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Incluir Fornecedor
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Contato Principal</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td style={{ fontWeight: 600 }}>{f.id}</td>
                <td>{f.name}</td>
                <td>{f.document}</td>
                <td>{f.contact}</td>
                <td>
                  <span className={`status-pill ${f.status === "Ativo" ? "success" : "danger"}`}>
                    {f.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-table-action">Editar</button>
                    <button className="btn-table-action delete" onClick={() => deleteProvider(f.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  Nenhum fornecedor correspondente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
