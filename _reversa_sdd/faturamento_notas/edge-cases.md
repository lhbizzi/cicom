# Módulo Faturamento e Emissão de Notas Fiscais (`faturamento_notas`), Casos de Borda

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Mapeamento de Casos Extremos

| ID | Descrição do Caso de Borda | Comportamento Legado | Solução / Tratamento na Modernização | Confiança |
| :--- | :--- | :--- | :--- | :---: |
| **EC-FAT-01** | **Arredondamento de Centavos em Impostos** | O legado realiza truncamento simples sem arredondamento bancário. | Utilizar tipos decimais de alta precisão (`Decimal` / `BigDecimal`) e regra de arredondamento ABNT NBR 5891. | 🟢 |
| **EC-FAT-02** | **Nota Fiscal Zerada (Cortesia / Garantia)** | O sistema permite emitir Nota Fiscal com valor zerado. | Exigir indicação explícita de "Operação Sem Débito Fiscal" ou CFOP específico para garantia. | 🟢 |
