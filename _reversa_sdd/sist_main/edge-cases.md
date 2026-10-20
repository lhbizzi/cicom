# Módulo Menu Principal e Ordens de Serviço (`sist_main`), Casos de Borda e Exceções

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Mapeamento de Casos Extremos e Exceções

| ID | Descrição do Caso de Borda | Comportamento Legado | Solução / Tratamento Recomendado na Modernização | Confiança |
| :--- | :--- | :--- | :--- | :---: |
| **EC-OS-01** | **Cliente Excluído ou Inativo** | O sistema não valida o status do cliente após a abertura da OS. | Impedir abertura e fechamento de OS caso o cadastro do cliente esteja inativo ou bloqueado por inadimplência. | 🟢 |
| **EC-OS-02** | **Queda de Energia Durante `BAIXAOS()`** | O status da OS pode mudar para `'F'` enquanto alguns registros de `MOV_ITEM` ainda não foram finalizados. | Envolver todo o processo de fechamento de OS em uma transação de banco de dados SQL atômica (`BEGIN ... COMMIT`). | 🟢 |
| **EC-OS-03** | **Duplicidade de `NUM_OS` em Rede SMB** | O laço `GO BOTTOM` + `nNumOS := NUM_OS + 1` pode gerar números idênticos se dois terminais executarem a abertura na mesma fração de segundo. | Utilizar recurso de auto-incremento de banco relacional (`SERIAL` / `SEQUENCE` / `UUID`). | 🟢 |
| **EC-OS-04** | **Reabertura de OS Fechada** | O legado não possui interface para reabrir OS fechada (`'F'`), exigindo edição direta no DBF. | Criar funcionalidade formal de reabertura de OS restrita ao perfil de Administrador com log de auditoria. | 🟡 |
