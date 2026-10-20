# Fluxograma da Função — `DIGITA()` (`digita_selos`)

> Gerado pelo Arqueólogo do Reversa em 2026-09-18
> Nível: **Detalhado (Por Função)**

```mermaid
flowchart TD
    Start([Início DIGITA()]) --> OpenTables[SELE SELO / SET INDEX TO NUMSELO]
    OpenTables --> GetBatchInfo[Ler Número do Lote / Faixa Inicial e Final]
    GetBatchInfo --> LockTable[RLOCK() na Tabela SELO.DBF]
    LockTable --> IterateSelos[For nSelo = nInicial To nFinal]
    IterateSelos --> CheckFound{DBSEEK(nSelo)}
    CheckFound -->|Achou| UpdateStatus[REPLACE STATUS WITH 'U', NUM_OS WITH nOS]
    CheckFound -->|Não Achou| AppendNew[APPEND BLANK / Gravar Novo Selo]
    UpdateStatus --> NextStep[Próximo Selo]
    AppendNew --> NextStep
    NextStep --> IterateSelos
    IterateSelos -->|Fim do Loop| Unlock[UNLOCK / COMMIT]
    Unlock --> Return([Retornar ao Módulo Chamtador])
```
