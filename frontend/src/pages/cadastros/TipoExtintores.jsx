import { useState } from "react";
import Modal from "../../components/Modal";
import Grid from "../../components/Grid";

const INITIAL_TYPES = [
  {
    codigo: 1,
    tipo: "D",
    tpExtintor: "Pó Químico Seco (PQS ABC)",
    capacidade: "4 kg",
    classe: "ABC",
    capExtintora: "2-A : 20-B:C",
    nbrAntiga: "NBR 11715",
    nbrNova: "NBR 15808",
  },
  {
    codigo: 2,
    tipo: "D",
    tpExtintor: "Pó Químico Seco (PQS ABC)",
    capacidade: "6 kg",
    classe: "ABC",
    capExtintora: "3-A : 40-B:C",
    nbrAntiga: "NBR 11715",
    nbrNova: "NBR 15808",
  },
  {
    codigo: 3,
    tipo: "D",
    tpExtintor: "Água Pressurizada (AP)",
    capacidade: "10 Litros",
    classe: "A",
    capExtintora: "2-A",
    nbrAntiga: "NBR 11715",
    nbrNova: "NBR 15808",
  },
  {
    codigo: 4,
    tipo: "D",
    tpExtintor: "Gás Carbônico (CO2)",
    capacidade: "6 kg",
    classe: "BC",
    capExtintora: "5-B:C",
    nbrAntiga: "NBR 10721",
    nbrNova: "NBR 15808",
  },
  {
    codigo: 5,
    tipo: "D",
    tpExtintor: "Pó Químico Seco (PQS BC)",
    capacidade: "4 kg",
    classe: "BC",
    capExtintora: "20-B:C",
    nbrAntiga: "NBR 11715",
    nbrNova: "NBR 15808",
  },
  {
    codigo: 6,
    tipo: "D",
    tpExtintor: "Espuma Mecânica (EM)",
    capacidade: "10 Litros",
    classe: "AB",
    capExtintora: "2-A : 10-B",
    nbrAntiga: "NBR 11751",
    nbrNova: "NBR 15808",
  },
];

const CLASSE_OPTIONS = ["ABC", "BC", "A", "AB", "K", "D"];

const TP_EXTINTOR_SUGGESTIONS = [
  "Pó Químico Seco (PQS ABC)",
  "Pó Químico Seco (PQS BC)",
  "Água Pressurizada (AP)",
  "Gás Carbônico (CO2)",
  "Espuma Mecânica (EM)",
  "Agente Químico Úmido (Classe K)",
  "Pó Especial (Classe D)",
];

const EMPTY_TYPE = {
  codigo: "",
  tipo: "D",
  tpExtintor: "",
  capacidade: "",
  classe: "ABC",
  capExtintora: "",
  nbrAntiga: "",
  nbrNova: "NBR 15808",
};

export default function TipoExtintores() {
  const [types, setTypes] = useState(INITIAL_TYPES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(EMPTY_TYPE);
  const [editingCodigo, setEditingCodigo] = useState(null);

  const deleteType = (codigo) => {
    if (window.confirm(`Confirma a exclusão do tipo de extintor código ${codigo}?`)) {
      setTypes(types.filter((t) => t.codigo !== codigo));
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingCodigo(null);
    // Sugere sempre o último Id cadastrado mais 1
    const nextCodigo =
      types.length > 0
        ? Math.max(...types.map((t) => Number(t.codigo) || 0)) + 1
        : 1;
    setFormData({
      ...EMPTY_TYPE,
      codigo: nextCodigo,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setEditingCodigo(item.codigo);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "codigo") {
      // Aceita apenas números (remove qualquer letra ou caractere especial)
      const numericOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        codigo: numericOnly,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.codigo === "" || formData.codigo === null || formData.codigo === undefined) {
      alert("Por favor, informe o código numérico.");
      return;
    }

    const codNum = Number(formData.codigo);
    if (isNaN(codNum) || codNum <= 0) {
      alert("Por favor, informe um código numérico válido maior que zero.");
      return;
    }

    if (!formData.tpExtintor.trim()) {
      alert("Por favor, preencha o tipo de extintor (Tp Extintor).");
      return;
    }

    if (modalMode === "add") {
      if (types.some((t) => Number(t.codigo) === codNum)) {
        alert(`Já existe um tipo de extintor cadastrado com o código ${codNum}.`);
        return;
      }
      setTypes([...types, { ...formData, codigo: codNum }]);
    } else {
      // Se o código foi alterado na edição, valida duplicidade
      if (
        codNum !== editingCodigo &&
        types.some((t) => Number(t.codigo) === codNum)
      ) {
        alert(`Já existe outro tipo de extintor cadastrado com o código ${codNum}.`);
        return;
      }

      setTypes(
        types.map((t) =>
          t.codigo === editingCodigo ? { ...formData, codigo: codNum } : t
        )
      );
    }
    setIsModalOpen(false);
  };

  const filteredData = types.filter((item) => {
    const q = search.toLowerCase();
    return (
      String(item.codigo).includes(q) ||
      item.tpExtintor.toLowerCase().includes(q) ||
      item.capacidade.toLowerCase().includes(q) ||
      item.classe.toLowerCase().includes(q) ||
      item.capExtintora.toLowerCase().includes(q) ||
      item.nbrNova.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      header: "Código",
      accessor: "codigo",
      cellStyle: { fontWeight: 700, color: "var(--accent-primary)", width: "110px" },
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>#{item.codigo}</span>
          <span
            style={{
              fontSize: "0.7rem",
              background: "var(--bg-hover)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: 600,
              color: "var(--text-muted)",
            }}
          >
            {item.tipo || "D"}
          </span>
        </div>
      ),
    },
    {
      header: "Tipo de Extintor",
      accessor: "tpExtintor",
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.tpExtintor}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Capacidade: <strong>{item.capacidade || "-"}</strong>
          </div>
        </div>
      ),
    },
    {
      header: "Classe / Cap. Extintora",
      accessor: "classe",
      render: (item) => (
        <div>
          <span
            style={{
              fontWeight: 700,
              color: "var(--accent-primary)",
              marginRight: "6px",
            }}
          >
            Classe {item.classe}
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            • {item.capExtintora || "-"}
          </span>
        </div>
      ),
    },
    {
      header: "Normas ABNT",
      accessor: "nbrNova",
      render: (item) => (
        <div style={{ fontSize: "0.82rem" }}>
          <div>Nova: <strong>{item.nbrNova || "-"}</strong></div>
          <div style={{ color: "var(--text-muted)" }}>Antiga: {item.nbrAntiga || "-"}</div>
        </div>
      ),
    },
    {
      header: "Ações",
      headerStyle: { width: "150px", textAlign: "right" },
      cellStyle: { textAlign: "right" },
      render: (item) => (
        <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
          <button className="btn-table-action" onClick={() => openEditModal(item)}>
            Editar
          </button>
          <button className="btn-table-action delete" onClick={() => deleteType(item.codigo)}>
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="glass-panel">
      {/* Control Bar */}
      <div className="control-bar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h4 style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            🧯 Cadastro de Tipos de Extintores
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Especificação de tipos, capacidades, classes de fogo, capacidades extintoras e normas ABNT
          </span>
        </div>

        <div className="flex-gap">
          <input
            type="text"
            placeholder="Pesquisar por Tipo, Capacidade, Classe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
            style={{ width: "300px" }}
          />
          <button className="btn-primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Tipo
          </button>
        </div>
      </div>

      <Grid data={filteredData} columns={columns} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "add"
            ? "✨ Cadastro de Novo Tipo de Extintor"
            : `✏️ Editar Tipo de Extintor - Código ${formData.codigo}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Linha 1: Codigo & D */}
            <div style={{ display: "grid", gridTemplateColumns: "140px 90px 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Codigo:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  placeholder="Ex: 1"
                  required
                  style={{ fontWeight: 700 }}
                  autoFocus={modalMode === "add"}
                />
              </div>

              <div className="form-group">
                <label>Tipo</label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  maxLength={3}
                  style={{ textAlign: "center", fontWeight: 700 }}
                  placeholder="D"
                />
              </div>

              <div className="form-group">
                <label>Tp Extintor:</label>
                <input
                  type="text"
                  name="tpExtintor"
                  list="tpExtintorList"
                  value={formData.tpExtintor}
                  onChange={handleInputChange}
                  placeholder="Ex: Pó Químico Seco (PQS ABC)"
                  required
                  autoFocus={modalMode === "edit"}
                />
                <datalist id="tpExtintorList">
                  {TP_EXTINTOR_SUGGESTIONS.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Linha 2: Capacidade & Classe */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Capacidade :</label>
                <input
                  type="text"
                  name="capacidade"
                  value={formData.capacidade}
                  onChange={handleInputChange}
                  placeholder="Ex: 4 kg, 6 kg, 10 Litros"
                  required
                />
              </div>

              <div className="form-group">
                <label>Classe :</label>
                <select name="classe" value={formData.classe} onChange={handleInputChange}>
                  {CLASSE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      Classe {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Linha 3: Cap.Extintora */}
            <div className="form-group">
              <label>Cap.Extintora:</label>
              <input
                type="text"
                name="capExtintora"
                value={formData.capExtintora}
                onChange={handleInputChange}
                placeholder="Ex: 2-A : 20-B:C ou 5-B:C"
              />
            </div>

            {/* Linha 4: N B R antiga. & N B R nova */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>N B R antiga.:</label>
                <input
                  type="text"
                  name="nbrAntiga"
                  value={formData.nbrAntiga}
                  onChange={handleInputChange}
                  placeholder="Ex: NBR 11715"
                />
              </div>

              <div className="form-group">
                <label>N B R nova :</label>
                <input
                  type="text"
                  name="nbrNova"
                  value={formData.nbrNova}
                  onChange={handleInputChange}
                  placeholder="Ex: NBR 15808"
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
            <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>
              Salvar Tipo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
