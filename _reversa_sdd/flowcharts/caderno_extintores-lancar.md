# Fluxograma da Função — `LANCAR()` (`caderno_extintores`)

> Gerado pelo Arqueólogo do Reversa em 2026-09-18
> Nível: **Detalhado (Por Função)**

```mermaid
flowchart TD
    Start([Início LANCAR()]) --> ClearScreen[Limpar Tela / Montar Moldura]
    ClearScreen --> GetClient[Solicitar Código do Cliente]
    GetClient --> SeekClient{Cliente Existe em CADCLI?}
    SeekClient -->|Não| ErrClient[Exibir Mensagem: Cliente Não Cadastrado] --> GetClient
    SeekClient -->|Sim| GetOS[Solicitar Número da OS]
    GetOS --> SeekOS{OS Existente ou Nova?}
    SeekOS -->|Nova| CreateOSHeader[Gravar Cabeçalho em MOVTO.DBF]
    SeekOS -->|Existente| LoadOSHeader[Carregar Dados da OS]
    CreateOSHeader --> LoopExtin[Loop de Entrada de Extintores]
    LoadOSHeader --> LoopExtin
    LoopExtin --> GetNumExtin[Prompt: Número de Série do Cilindro]
    GetNumExtin --> ValidateSelo[Validar Selo Inmetro em SELO.DBF]
    ValidateSelo --> SaveItem[APPEND BLANK em MOV_ITEM.DBF]
    SaveItem --> AskMore{Continuar Lançamento?}
    AskMore -->|Sim| LoopExtin
    AskMore -->|Não| Return([Retornar ao Menu])
```
