import { useState, useEffect } from "react";

export default function Grid({ data = [], columns = [] }) {
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when data changes (e.g., during search)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalRecords = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  
  // Safeguard page bounds
  const activePage = Math.min(currentPage, totalPages);
  
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="table-container" style={{ display: "flex", flexDirection: "column" }}>
      <style>{`
        .grid-pager-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background-color: rgba(var(--bg-sidebar), 0.1);
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .grid-pager-info {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .grid-pager-select {
          padding: 0.35rem 0.5rem;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .grid-pager-select:focus {
          border-color: var(--accent-primary);
        }
        .grid-pager-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-pager {
          background: none;
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-pager:hover:not(:disabled) {
          background-color: var(--bg-hover);
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .btn-pager:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .pager-page-indicator {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          padding: 0 0.5rem;
        }
      `}</style>
      
      <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={col.headerStyle}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIdx) => (
            <tr key={row.id || rowIdx}>
              {columns.map((col, colIdx) => {
                if (col.render) {
                  return <td key={colIdx}>{col.render(row)}</td>;
                }
                const cellValue = row[col.accessor];
                return (
                  <td key={colIdx} style={col.cellStyle}>
                    {cellValue !== undefined && cellValue !== null ? cellValue : ""}
                  </td>
                );
              })}
            </tr>
          ))}
          {totalRecords === 0 && (
            <tr>
              <td 
                colSpan={columns.length} 
                style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}
              >
                Nenhum registro correspondente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pager Panel */}
      <div className="grid-pager-container">
        <div className="grid-pager-info">
          <span>
            Exibindo <strong>{totalRecords > 0 ? startIndex + 1 : 0}</strong> a{" "}
            <strong>{endIndex}</strong> de <strong>{totalRecords}</strong> registros
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Exibir:</span>
            <select
              className="grid-pager-select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={7}>7 registros</option>
              <option value={15}>15 registros</option>
              <option value={30}>30 registros</option>
            </select>
          </div>
        </div>

        <div className="grid-pager-buttons">
          <button
            className="btn-pager"
            disabled={activePage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Anterior
          </button>
          <span className="pager-page-indicator">
            {activePage} / {totalPages}
          </span>
          <button
            className="btn-pager"
            disabled={activePage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
