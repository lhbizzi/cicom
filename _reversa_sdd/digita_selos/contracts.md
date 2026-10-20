# Módulo Lançamento em Lote de Selos Inmetro (`digita_selos`), Contratos Operacionais

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Contrato Operacional de Alocação de Selo (`DIGSE`)

### Assinatura Lógica (API Service Target)
```typescript
interface AllocateSealRequest {
  numSelo: string;     // Número de 12 dígitos do Selo Inmetro
  numOS: number;       // Número da Ordem de Serviço (6 dígitos)
  numExtintor: string; // Número de Série do Extintor
}

interface AllocateSealResponse {
  success: boolean;
  message: string;
  sealData?: {
    numSelo: string;
    status: 'USED' | 'STOCK' | 'DAMAGED';
    allocatedAt: string;
  };
}
```

---

## 2. Contrato de Inutilização / Registro de Perda (`FALTASEL`)

### Assinatura Lógica (API Service Target)
```typescript
interface ReportDamagedSealRequest {
  numSelo: string;
  reason: string;      // Justificativa oficial para o Inmetro/IPEM
  operatorId: string;  // Identificador do operador
}

interface ReportDamagedSealResponse {
  success: boolean;
  auditRecordId: string;
  reportedAt: string;
}
```
