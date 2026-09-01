import { useState } from "react";

export default function Parametros() {
  const [emulateBeep, setEmulateBeep] = useState(true);
  const [matrixPrinter, setMatrixPrinter] = useState(false);
  const [autoIndex, setAutoIndex] = useState(true);

  return (
    <div className="glass-panel settings-card" style={{ maxWidth: "560px", margin: "0 auto" }}>
      <h3 className="settings-card-title">🖥️ Parâmetros do Sistema Clipper</h3>
      
      <div className="toggle-switch-container">
        <div className="toggle-label">
          <span className="toggle-title">Emulação de Som (Beep/Bell)</span>
          <span className="toggle-desc">Sons clássicos do terminal em operações críticas.</span>
        </div>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={emulateBeep} 
            onChange={() => setEmulateBeep(!emulateBeep)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="toggle-switch-container">
        <div className="toggle-label">
          <span className="toggle-title">Saída para Impressora Matricial</span>
          <span className="toggle-desc">Gera relatórios em modo texto (ASCII) plano de 80 colunas.</span>
        </div>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={matrixPrinter} 
            onChange={() => setMatrixPrinter(!matrixPrinter)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="toggle-switch-container">
        <div className="toggle-label">
          <span className="toggle-title">Reindexação Automática (.NTX / .CDX)</span>
          <span className="toggle-desc">Garante a ordenação dos índices de busca ao iniciar o dia.</span>
        </div>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={autoIndex} 
            onChange={() => setAutoIndex(!autoIndex)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}
