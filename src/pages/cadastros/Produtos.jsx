import { useState } from "react";

const INITIAL_PRODUCTS = [
  { id: "P001", name: "Suporte Articulado TV", category: "Ferragens", price: "R$ 129,90", stock: 45 },
  { id: "P002", name: "Cabo HDMI 2.0 3 metros", category: "Eletrônicos", price: "R$ 39,90", stock: 120 },
  { id: "P003", name: "Lâmpada LED Inteligente 10W", category: "Iluminação", price: "R$ 54,90", stock: 8 },
  { id: "P004", name: "Filtro de Linha 5 Tomadas", category: "Elétrica", price: "R$ 45,00", stock: 67 },
];

export default function Produtos() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addProduct = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const newProduct = {
      id: `P${randomId}`,
      name: `Novo Item de Informática ${randomId}`,
      category: "Acessórios",
      price: "R$ 89,90",
      stock: 15
    };
    setProducts([newProduct, ...products]);
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-panel">
      <div className="control-bar">
        <h4 style={{ fontWeight: 600 }}>📦 Fichário de Produtos</h4>
        <div className="flex-gap">
          <input 
            type="text" 
            placeholder="Pesquisar produto..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
          <button className="btn-primary" onClick={addProduct}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Incluir Produto
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição do Item</th>
              <th>Categoria</th>
              <th>Preço Unitário</th>
              <th>Estoque Atual</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td style={{ color: "var(--accent-primary)", fontWeight: 600 }}>{p.price}</td>
                <td>{p.stock} un</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-table-action">Editar</button>
                    <button className="btn-table-action delete" onClick={() => deleteProduct(p.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  Nenhum produto correspondente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
