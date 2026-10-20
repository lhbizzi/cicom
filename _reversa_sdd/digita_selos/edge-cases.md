# Módulo Lançamento em Lote de Selos Inmetro (`digita_selos`), Casos de Borda

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Mapeamento de Casos Extremos

| ID | Descrição do Caso de Borda | Comportamento Legado | Solução / Tratamento na Modernização | Confiança |
| :--- | :--- | :--- | :--- | :---: |
| **EC-SELO-01** | **Digitação de Selo Inexistente no Estoque** | Emite sinal sonoro `BEEP` e exige redigitação. | Validar via API e exibir feedback visual imediato na tela. | 🟢 |
| **EC-SELO-02** | **Tentativa de Desalocar Selo Já Usado** | Não permitido pelo sistema sem rotina de acerto especial (`MARRETA.PRG`). | Exigir confirmação de supervisor com log de auditoria. | 🟢 |
| **EC-SELO-03** | **Estouro da Faixa de Selos** | O operador chega ao fim do lote cadastrado. | Notificar proativamente o gestor sobre término iminente de estoque de selos. | 🟡 |
