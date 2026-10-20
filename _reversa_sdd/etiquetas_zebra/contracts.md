# Módulo Etiquetas Térmicas Zebra (`etiquetas_zebra`), Contratos Operacionais

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Contrato Operacional de Emissão de Etiqueta ZPL

```typescript
interface PrintZebraLabelRequest {
  serialNumber: string;
  agentType: string;
  capacity: string;
  nextTestDate: string;  // Formato MM/YYYY
  sealNumber: string;    // Código de barras Code 128
  printerAddress: string; // IP ou Spooler Name
}

interface PrintZebraLabelResponse {
  success: boolean;
  rawZplSent: string;
  printedAt: string;
}
```
