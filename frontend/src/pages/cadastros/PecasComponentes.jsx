import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_PARTS = [
  {
    codigo: 698,
    nome: "Válvula de Latão para Cilindro PQS 4kg/6kg",
    quantidade: 145,
    unidadeCompra: "UN",
    unidadeConsumo: "UN",
    tipo: "P", // (P)eca
    hidraulico: false,
    controlaEstoque: true,
    controlaLote: false,
    precoCompra: 28.5,
    precoVenda: 55.0,
    percentualMargem: 92.98,
    comissaoBaseOC: 3.5,
    estoqueMinimo: 30,
    classificacaoTrib: "8481.80.99",
    codSubs: "10.001.00",
    indiceCST: "00",
  },
  {
    codigo: 102,
    nome: "Manômetro Wika 14 kgf/cm² Rosca 1/8 NPT",
    quantidade: 210,
    unidadeCompra: "UN",
    unidadeConsumo: "UN",
    tipo: "C", // (C)omponente
    hidraulico: false,
    controlaEstoque: true,
    controlaLote: false,
    precoCompra: 12.0,
    precoVenda: 28.0,
    percentualMargem: 133.33,
    comissaoBaseOC: 1.5,
    estoqueMinimo: 50,
    classificacaoTrib: "9026.20.10",
    codSubs: "10.002.00",
    indiceCST: "00",
  },
  {
    codigo: 103,
    nome: "Pó Químico Seco PQS ABC 90% Industrial",
    quantidade: 850,
    unidadeCompra: "CX",
    unidadeConsumo: "KG",
    tipo: "C", // (C)omponente
    hidraulico: false,
    controlaEstoque: true,
    controlaLote: true,
    precoCompra: 8.5,
    precoVenda: 18.0,
    percentualMargem: 111.76,
    comissaoBaseOC: 1.0,
    estoqueMinimo: 200,
    classificacaoTrib: "3813.00.00",
    codSubs: "01.005.00",
    indiceCST: "10",
  },
  {
    codigo: 104,
    nome: "Serviço de Ensaio Hidrostático Alta Pressão ABNT",
    quantidade: 0,
    unidadeCompra: "SV",
    unidadeConsumo: "SV",
    tipo: "E", // (E)nsaio
    hidraulico: true,
    controlaEstoque: false,
    controlaLote: false,
    precoCompra: 18.0,
    precoVenda: 65.0,
    percentualMargem: 261.11,
    comissaoBaseOC: 5.0,
    estoqueMinimo: 0,
    classificacaoTrib: "01.07",
    codSubs: "",
    indiceCST: "40",
  },
  {
    codigo: 105,
    nome: "Mangote de Borracha com Difusor para CO2 6kg",
    quantidade: 18,
    unidadeCompra: "UN",
    unidadeConsumo: "UN",
    tipo: "C", // (C)omponente
    hidraulico: true,
    controlaEstoque: true,
    controlaLote: false,
    precoCompra: 45.0,
    precoVenda: 95.0,
    percentualMargem: 111.11,
    comissaoBaseOC: 4.0,
    estoqueMinimo: 25,
    classificacaoTrib: "4009.22.00",
    codSubs: "10.004.00",
    indiceCST: "00",
  },
  {
    codigo: 106,
    nome: "Serviço de Inspeção e Recarga Nível 2 PQS 4kg",
    quantidade: 0,
    unidadeCompra: "SV",
    unidadeConsumo: "SV",
    tipo: "S", // (S)ervico
    hidraulico: false,
    controlaEstoque: false,
    controlaLote: false,
    precoCompra: 10.0,
    precoVenda: 45.0,
    percentualMargem: 350.0,
    comissaoBaseOC: 3.0,
    estoqueMinimo: 0,
    classificacaoTrib: "14.01",
    codSubs: "",
    indiceCST: "40",
  },
];

const TIPO_MAP = {
  C: { label: "Componente", badgeClass: "badge-info", sigla: "C" },
  P: { label: "Peça", badgeClass: "badge-primary", sigla: "P" },
  S: { label: "Serviço", badgeClass: "badge-success", sigla: "S" },
  E: { label: "Ensaio", badgeClass: "badge-warning", sigla: "E" },
};

const UNIDADES_MEDIDA = ["UN", "KG", "G", "L", "ML", "SV", "CX", "MT", "PC"];

const EMPTY_PART = {
  codigo: "",
  nome: "",
  quantidade: 0,
  unidadeCompra: "UN",
  unidadeConsumo: "UN",
  tipo: "C", // C, P, S, E
  hidraulico: false,
  controlaEstoque: true,
  controlaLote: false,
  precoCompra: 0.0,
  precoVenda: 0.0,
  percentualMargem: 0.0,
  comissaoBaseOC: 0.0,
  estoqueMinimo: 10,
  classificacaoTrib: "",
  codSubs: "",
  indiceCST: "00",
};

export default function PecasComponentes() {
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterHidraulico, setFilterHidraulico] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [formData, setFormData] = useState(EMPTY_PART);

  const deletePart = (codigo) => {
    if (window.confirm(`Confirma a exclusão do item código ${codigo}?`)) {
      setParts(parts.filter((p) => p.codigo !== codigo));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    const nextCodigo =
      parts.length > 0
        ? Math.max(...parts.map((p) => Number(p.codigo) || 0)) + 1
        : 101;
    setFormData({
      ...EMPTY_PART,
      codigo: nextCodigo,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Campos booleanos (checkbox/switch)
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // Atualização de Preços e Cálculo Dinâmico de Percentual %
    if (name === "precoCompra" || name === "precoVenda") {
      const numVal = parseFloat(value) || 0;
      setFormData((prev) => {
        const newForm = { ...prev, [name]: numVal };
        const compra = name === "precoCompra" ? numVal : prev.precoCompra;
        const venda = name === "precoVenda" ? numVal : prev.precoVenda;
        if (compra > 0) {
          newForm.percentualMargem = parseFloat(
            (((venda - compra) / compra) * 100).toFixed(2),
          );
        }
        return newForm;
      });
      return;
    }

    // Atualização de Percentual Margem com Recálculo de Preço de Venda
    if (name === "percentualMargem") {
      const margem = parseFloat(value) || 0;
      setFormData((prev) => {
        const venda = prev.precoCompra * (1 + margem / 100);
        return {
          ...prev,
          percentualMargem: margem,
          precoVenda: parseFloat(venda.toFixed(2)),
        };
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "codigo" ||
        name === "quantidade" ||
        name === "estoqueMinimo" ||
        name === "comissaoBaseOC"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      alert("Por favor, preencha o Nome / Descrição do item.");
      return;
    }

    const codNum = Number(formData.codigo);
    if (!codNum && codNum !== 0) {
      alert("Por favor, informe um código válido.");
      return;
    }

    if (modalMode === "add") {
      const exists = parts.some((item) => Number(item.codigo) === codNum);
      if (exists) {
        alert(`Já existe um item cadastrado com o código ${codNum}.`);
        return;
      }
      setParts([{ ...formData, codigo: codNum }, ...parts]);
    } else {
      setParts(
        parts.map((item) =>
          item.codigo === codNum ? { ...formData, codigo: codNum } : item,
        ),
      );
    }
    setIsModalOpen(false);
  };

  const filteredData = parts.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      String(item.codigo).includes(q) ||
      item.nome.toLowerCase().includes(q) ||
      (item.classificacaoTrib &&
        item.classificacaoTrib.toLowerCase().includes(q));

    const matchesTipo = filterTipo ? item.tipo === filterTipo : true;
    const matchesHidraulico =
      filterHidraulico !== ""
        ? String(item.hidraulico) === filterHidraulico
        : true;

    return matchesSearch && matchesTipo && matchesHidraulico;
  });

  const columns = [
    {
      header: "Código",
      accessor: "codigo",
      cellStyle: {
        fontWeight: 700,
        color: "var(--accent-primary)",
        width: "100px",
      },
      render: (item) => <span>#{item.codigo}</span>,
    },
    {
      header: "Nome / Descrição do Item",
      accessor: "nome",
      render: (item) => {
        const tInfo = TIPO_MAP[item.tipo] || {
          label: item.tipo,
          badgeClass: "badge",
        };
        return (
          <div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              {item.nome}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                marginTop: "2px",
              }}
            >
              <span
                style={{
                  background: "var(--bg-hover)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontWeight: 600,
                  marginRight: "6px",
                }}
              >
                ({item.tipo}) {tInfo.label}
              </span>
              Unid: <strong>{item.unidadeCompra}</strong> / Cons:{" "}
              <strong>{item.unidadeConsumo}</strong>
            </div>
          </div>
        );
      },
    },
    {
      header: "Indicadores",
      accessor: "hidraulico",
      render: (item) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            fontSize: "0.78rem",
          }}
        >
          <div>
            Hidráulico:{" "}
            <strong
              style={{
                color: item.hidraulico ? "#0284c7" : "var(--text-muted)",
              }}
            >
              {item.hidraulico ? "💧 Sim" : "Não"}
            </strong>
          </div>
          <div>
            Estoque:{" "}
            <strong
              style={{
                color: item.controlaEstoque ? "#10b981" : "var(--text-muted)",
              }}
            >
              {item.controlaEstoque ? "📦 Sim" : "Não"}
            </strong>
          </div>
          <div>
            Lote:{" "}
            <strong
              style={{
                color: item.controlaLote ? "#f59e0b" : "var(--text-muted)",
              }}
            >
              {item.controlaLote ? "🏷️ Sim" : "Não"}
            </strong>
          </div>
        </div>
      ),
    },
    {
      header: "Preços / Margem",
      accessor: "precoVenda",
      render: (item) => (
        <div style={{ fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "var(--color-success)" }}>
            Venda: R$ {Number(item.precoVenda).toFixed(2).replace(".", ",")}
          </div>
          <div style={{ color: "var(--text-muted)" }}>
            Compra: R$ {Number(item.precoCompra).toFixed(2).replace(".", ",")}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--accent-primary)",
              fontWeight: 600,
            }}
          >
            Margem: +{Number(item.percentualMargem).toFixed(1)}% | OC: R${" "}
            {Number(item.comissaoBaseOC).toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      header: "Quantidade",
      accessor: "quantidade",
      render: (item) => {
        if (!item.controlaEstoque) {
          return (
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Sem controle
            </span>
          );
        }
        const isLow = item.quantidade <= item.estoqueMinimo;
        return (
          <div>
            <div
              style={{
                fontWeight: 700,
                color: isLow ? "#ef4444" : "var(--text-primary)",
              }}
            >
              {item.quantidade} {item.unidadeConsumo}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: isLow ? "#ef4444" : "var(--text-muted)",
              }}
            >
              Mín: {item.estoqueMinimo} {isLow && "(Baixo!)"}
            </div>
          </div>
        );
      },
    },
    {
      header: "Fiscal / Trib",
      accessor: "classificacaoTrib",
      render: (item) => (
        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          <div>NCM: {item.classificacaoTrib || "-"}</div>
          <div>
            CEST: {item.codSubs || "-"} | CST: {item.indiceCST || "-"}
          </div>
        </div>
      ),
    },
    {
      header: "Ações",
      headerStyle: { width: "150px", textAlign: "right" },
      cellStyle: { textAlign: "right" },
      render: (item) => (
        <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
          <button
            className="btn-table-action"
            onClick={() => openEditModal(item)}
          >
            Editar
          </button>
          <button
            className="btn-table-action delete"
            onClick={() => deletePart(item.codigo)}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel">
      {/* Barra de Controle e Filtros */}
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h4
            style={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🔩 Componentes, Peças, Serviços & Ensaios
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Cadastro unificado de materiais, ensaios hidrostáticos, controle de
            estoque e parâmetros fiscais
          </span>
        </div>

        <div className="flex-gap" style={{ flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Pesquisar por Código, Nome ou NCM..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "260px" }}
          />

          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-input)",
              color: "var(--text-main)",
            }}
          >
            <option value="">Todos os Tipos</option>
            <option value="C">(C)omponente</option>
            <option value="P">(P)eça</option>
            <option value="S">(S)erviço</option>
            <option value="E">(E)nsaio</option>
          </select>

          <select
            value={filterHidraulico}
            onChange={(e) => setFilterHidraulico(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-input)",
              color: "var(--text-main)",
            }}
          >
            <option value="">Hidráulico (Todos)</option>
            <option value="true">Sim (Hidráulico)</option>
            <option value="false">Não</option>
          </select>

          <button className="btn-primary" onClick={openAddModal}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Cadastro
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      {/* Modal de Cadastro / Edição */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "✨ Novo Componente / Peça / Serviço / Ensaio"
            : `✏️ Editar Item - Código ${formData.codigo}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div
            className="modal-body"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Linha 1: Codigo & Nome */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Codigo</label>
                <input
                  type="number"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  placeholder="Ex: 698"
                  required
                  style={{ fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome ou descrição completa do item"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Linha 2: Quantidade, Unidade de Compra, Unidade de Consumo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>

              <div className="form-group">
                <label>Unidade de Compra</label>
                <select
                  name="unidadeCompra"
                  value={formData.unidadeCompra}
                  onChange={handleInputChange}
                >
                  {UNIDADES_MEDIDA.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Unidade de Consumo</label>
                <select
                  name="unidadeConsumo"
                  value={formData.unidadeConsumo}
                  onChange={handleInputChange}
                >
                  {UNIDADES_MEDIDA.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Linha 3: Tipo (Componente, Peça, Serviço, Ensaio) */}
            <div className="form-group">
              <label>Tipo (C)omponente (P)eca (S)ervico (E)nsaio</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0.5rem",
                  marginTop: "0.25rem",
                }}
              >
                {[
                  { value: "C", label: "(C)omponente" },
                  { value: "P", label: "(P)eca" },
                  { value: "S", label: "(S)ervico" },
                  { value: "E", label: "(E)nsaio" },
                ].map((t) => (
                  <label
                    key={t.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor:
                        formData.tipo === t.value
                          ? "var(--accent-primary)"
                          : "var(--border-color)",
                      background:
                        formData.tipo === t.value
                          ? "var(--bg-hover)"
                          : "var(--bg-input)",
                      cursor: "pointer",
                      fontWeight: formData.tipo === t.value ? 700 : 500,
                      color:
                        formData.tipo === t.value
                          ? "var(--accent-primary)"
                          : "var(--text-secondary)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="tipo"
                      value={t.value}
                      checked={formData.tipo === t.value}
                      onChange={handleInputChange}
                      style={{ display: "none" }}
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Linha 4: Booleans (Hidráulico ?, Controla Estoque ?, Controla Lote ?) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
                background: "var(--bg-hover)",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
              }}
            >
              {/* Hidraulico ? */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Hidraulico ?
                  </div>
                  <span
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    {formData.hidraulico ? "Sim" : "Não"}
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="hidraulico"
                    checked={formData.hidraulico}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Controla Estoque ? */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Controla Estoque ?
                  </div>
                  <span
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    {formData.controlaEstoque ? "Sim" : "Não"}
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="controlaEstoque"
                    checked={formData.controlaEstoque}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Controla Lote ? */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Controla Lote ?
                  </div>
                  <span
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    {formData.controlaLote ? "Sim" : "Não"}
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="controlaLote"
                    checked={formData.controlaLote}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            {/* Linha 5: Preco Compra, Preco Venda, Percentual % */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Preco Compra (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="precoCompra"
                  value={formData.precoCompra}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preco Venda (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="precoVenda"
                  value={formData.precoVenda}
                  onChange={handleInputChange}
                  min={0}
                  required
                  style={{ fontWeight: 700, color: "var(--color-success)" }}
                />
              </div>

              <div className="form-group">
                <label>Percentual % (Margem)</label>
                <input
                  type="number"
                  step="0.01"
                  name="percentualMargem"
                  value={formData.percentualMargem}
                  onChange={handleInputChange}
                  style={{ fontWeight: 600 }}
                />
              </div>
            </div>

            {/* Linha 6: Comissao Base OC, Estoque Minimo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Comissao Base OC (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="comissaoBaseOC"
                  value={formData.comissaoBaseOC}
                  onChange={handleInputChange}
                  min={0}
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Estoque Minimo</label>
                <input
                  type="number"
                  name="estoqueMinimo"
                  value={formData.estoqueMinimo}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>
            </div>

            {/* Linha 7: Tributação (Classificao Trib, Cod.Subs, Indice CST) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Classificao Trib: (NCM)</label>
                <input
                  type="text"
                  name="classificacaoTrib"
                  value={formData.classificacaoTrib}
                  onChange={handleInputChange}
                  placeholder="Ex: 8481.80.99"
                />
              </div>

              <div className="form-group">
                <label>Cod.Subs: (CEST)</label>
                <input
                  type="text"
                  name="codSubs"
                  value={formData.codSubs}
                  onChange={handleInputChange}
                  placeholder="Ex: 10.001.00"
                />
              </div>

              <div className="form-group">
                <label>Indice CST:</label>
                <input
                  type="text"
                  name="indiceCST"
                  value={formData.indiceCST}
                  onChange={handleInputChange}
                  placeholder="Ex: 00 ou 102"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn-table-action"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "0.5rem 1rem" }}
            >
              Salvar Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
