# Fluxograma da Função Principal — `SIST()` (`sist_main`)

> Gerado pelo Arqueólogo do Reversa em 2026-09-18
> Nível: **Detalhado (Por Função)**

```mermaid
flowchart TD
    Init[Altd(1) / Set Key Handlers] --> SetupVars[Definir Cores C_01..C_08 e Paths]
    SetupVars --> FindexCheck[Verificar/Criar NTXs com findex()]
    FindexCheck --> MenuLoop[Exibir ACHOICE Menu Principal]
    MenuLoop --> UserKey{Tecla Pressionada}
    UserKey -->|F2| Calendar[Chamar Calendar()]
    UserKey -->|F3| Clock[Chamar Relogio()]
    UserKey -->|F4| Calc[Chamar Calcu()]
    UserKey -->|Opção Selecionada| ExecSub[Executar Subrotina de Domínio]
    UserKey -->|27 / ESC| ConfirmExit{Confirma Saída?}
    ConfirmExit -->|Sim| Quit[QUIT / SET COLOR TO C_00]
    ConfirmExit -->|Não| MenuLoop
    ExecSub --> MenuLoop
```
