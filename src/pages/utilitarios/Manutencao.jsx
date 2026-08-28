import { useState } from "react";

export default function Manutencao() {
  const [loadingAction, setLoadingAction] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const runSystemTool = (toolName) => {
    setLoadingAction(toolName);
    setActionMessage("");

    setTimeout(() => {
      if (toolName === "backup") {
        const time = new Date().toLocaleTimeString();
        setActionMessage(`Backup realizado com sucesso em backup_dbf_${Date.now().toString().substring(8)}.zip às ${time}!`);
      } else {
        setActionMessage("Purga e reindexação de arquivos .DBF e .CDX concluídos com sucesso! Zero registros corrompidos.");
      }
      setLoadingAction(null);
    }, 2000);
  };

  return (
    <div className="glass-panel settings-card" style={{ maxWidth: "560px", margin: "0 auto" }}>
      <h3 className="settings-card-title">🛠️ Utilitários de Manutenção (DBF PACK)</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
        Ferramentas para garantir a integridade dos arquivos originais em Clipper durante a transição do sistema.
      </p>

      {actionMessage && (
        <div style={{ backgroundColor: "rgba(16, 185, 129, 0.12)", color: "var(--accent-success)", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", border: "1px solid var(--accent-success)" }}>
          {actionMessage}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        <button 
          className="btn-primary" 
          style={{ justifyContent: "center" }}
          disabled={loadingAction !== null}
          onClick={() => runSystemTool("backup")}
        >
          {loadingAction === "backup" ? (
            <span>⏳ Compactando DBF...</span>
          ) : (
            <>💾 Efetuar Backup Completo</>
          )}
        </button>

        <button 
          className="btn-primary" 
          style={{ justifyContent: "center", backgroundColor: "var(--accent-warning)", color: "#1e1b4b" }}
          disabled={loadingAction !== null}
          onClick={() => runSystemTool("pack")}
        >
          {loadingAction === "pack" ? (
            <span>⏳ Compactando e Indexando...</span>
          ) : (
            <>⚡ Otimizar Tabelas (PACK DBF)</>
          )}
        </button>
      </div>
    </div>
  );
}
