# Módulo Faturamento e Emissão de Notas Fiscais (`faturamento_notas`), Contratos Operacionais

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Contrato Operacional de Faturamento de OS (`NOTA`)

### Assinatura Lógica (API Service Target)
```typescript
interface InvoiceGenerationRequest {
  numOS: number;             // Número da OS a ser faturada
  customerCode: number;      // Código do Cliente
  invoiceSeries?: string;    // Série da Nota Fiscal
}

interface InvoiceGenerationResponse {
  success: boolean;
  invoiceNumber: number;
  valServices: number;       // Base ISSQN
  valProducts: number;       // Base ICMS
  valTotal: number;          // Total consolidado
  issuedAt: string;
}
```
