import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 15, 25, 0.6); /* Slightly darker tinted backdrop */
          backdrop-filter: blur(10px) saturate(120%); /* Premium glassy blur across the entire viewport */
          -webkit-backdrop-filter: blur(10px) saturate(120%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it floats over sidebar, content headers and layout elements */
          animation: modalFadeIn 0.2s ease-out;
          padding: 1rem;
        }
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          width: 95%;
          max-width: 960px;
          max-height: 90vh;
          overflow-y: auto;
          overflow-x: hidden; /* Prevent horizontal scrollbars inside the modal container */
          box-shadow: var(--shadow-lg), 0 20px 25px -5px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          position: relative;
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: var(--bg-secondary);
          z-index: 2;
        }
        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }
        /* Ensure all inputs and selects adapt to grid cell width and prevent horizontal overflow */
        .modal-content .form-group input,
        .modal-content .form-group select {
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
        }
        .modal-body {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .modal-footer {
          padding: 1.25rem 1.75rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          background: var(--bg-secondary);
          position: sticky;
          bottom: 0;
          z-index: 2;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 style={{ fontWeight: 700, margin: 0 }}>{title}</h4>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
