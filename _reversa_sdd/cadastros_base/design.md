# Módulo Cadastros Base e Bibliotecas Reutilizáveis (`cadastros_base`), Design Técnico

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/PEQLIB.PRG`, `prg/FUNCAO.PRG`)

---

## 1. Interface e Assinatura das Funções

| Símbolo | Assinatura / Parâmetros | Retorno | Descrição & Localização |
| :--- | :--- | :--- | :--- |
| `ValidaCNPJ()` | `(cCNPJ: Character)` | `Logical` | Algoritmo Módulo 11 para CNPJ. (`FUNCAO.PRG:150`) |
| `ValidaCPF()` | `(cCPF: Character)` | `Logical` | Algoritmo Módulo 11 para CPF. (`FUNCAO.PRG:210`) |
| `findex()` | `()` | `NIL` | Reconstrói todos os arquivos `.NTX`. (`Busca.prg:45`) |
| `Box()` | `(nT, nL, nB, nR, cTitulo)` | `NIL` | Desenha moldura na tela TUI. (`PEQLIB.PRG:80`) |

---

## 2. Fluxo Principal da Reindexação (`findex`)

```mermaid
sequenceDiagram
    autonumber
    actor Operador
    participant SIST as SIST.PRG
    participant FINDEX as findex.prg
    participant DBF as Arquivos .DBF
    participant NTX as Arquivos .NTX

    Operador->>SIST: Aciona "Reindexar Arquivos"
    SIST->>FINDEX: findex()
    FINDEX->>DBF: INDEX ON STR(CODIGO,6) TO CADCLICD
    DBF-->>NTX: Recria CADCLICD.NTX
    FINDEX->>DBF: INDEX ON NOME TO CADCLINM
    DBF-->>NTX: Recria CADCLINM.NTX
    FINDEX->>DBF: INDEX ON NUMERO TO CADEXTIN
    DBF-->>NTX: Recria CADEXTIN.NTX
    FINDEX-->>SIST: Exibe Mensagem "Reindexação Concluída com Sucesso!"
```

---

## 3. Decisões de Design Identificadas

| Decisão | Evidência no Código Legado | Confiança |
| :--- | :--- | :---: |
| **Algoritmo Nativo Módulo 11 Sem Dependências de Terceiros** | Função pura em `FUNCAO.PRG:150` | 🟢 |
| **Reconstrução Total de Índices em Loop Único** | Rotina batch `findex.prg` | 🟢 |
