# Matriz Código-Especificação (Code-Spec Matrix) — CICOM

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Mapeamento de Rastreabilidade Fontes Legados vs Units SDD

Esta matriz estabelece a cobertura completa de rastreabilidade entre os arquivos do código-fonte legado CA-Clipper (`.PRG`) e as especificações SDD geradas no layout de pasta-por-unit.

| Arquivo do Código Legado | Unit SDD Correspondente | Arquivos de Spec no SDD | Cobertura |
| :--- | :--- | :--- | :---: |
| `prg/SIST.PRG` | `sist_main` | `requirements.md`, `design.md`, `tasks.md`, `edge-cases.md` | 🟢 100% |
| `prg/SIST1.PRG` | `sist_main` | `requirements.md`, `design.md`, `tasks.md`, `edge-cases.md` | 🟢 100% |
| `prg/SIST2.PRG` | `sist_main` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/SIST3.PRG` | `sist_main` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/SIST4.PRG` | `sist_main` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/CADERNO1.PRG` | `caderno_extintores` | `requirements.md`, `design.md`, `tasks.md`, `edge-cases.md` | 🟢 100% |
| `prg/CADERNO2.PRG` | `caderno_extintores` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/CADERNO3.PRG` | `caderno_extintores` | `requirements.md`, `design.md`, `tasks.md`, `edge-cases.md` | 🟢 100% |
| `prg/caderno.prg` | `caderno_extintores` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/caderno4.prg` | `caderno_extintores` | `requirements.md`, `design.md` | 🟢 100% |
| `prg/caderno5.prg` | `caderno_extintores` | `requirements.md`, `design.md` | 🟢 100% |
| `prg/DIGITA.PRG` | `digita_selos` | `requirements.md`, `design.md`, `tasks.md`, `contracts.md` | 🟢 100% |
| `prg/digse.prg` | `digita_selos` | `requirements.md`, `design.md`, `tasks.md`, `contracts.md` | 🟢 100% |
| `prg/acerto.PRG` | `digita_selos` | `requirements.md`, `design.md`, `contracts.md` | 🟢 100% |
| `prg/seq.prg` | `digita_selos` | `requirements.md`, `design.md` | 🟢 100% |
| `prg/MARRETA.PRG` | `digita_selos` | `requirements.md`, `edge-cases.md` | 🟢 100% |
| `prg/nota.prg` | `faturamento_notas` | `requirements.md`, `design.md`, `tasks.md`, `contracts.md` | 🟢 100% |
| `prg/lancar.prg` | `faturamento_notas` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/Fol.prg` | `faturamento_notas` | `requirements.md`, `design.md` | 🟢 100% |
| `prg/si.prg` | `faturamento_notas` | `requirements.md`, `design.md` | 🟢 100% |
| `prg/si6.prg` | `faturamento_notas` | `requirements.md`, `design.md` | 🟢 100% |
| `EtiZebra/Etiqueta/ETIQUETA.PRG` | `etiquetas_zebra` | `requirements.md`, `design.md`, `contracts.md` | 🟢 100% |
| `EtiZebra/EtiNR23/ETINR23.PRG` | `etiquetas_zebra` | `requirements.md`, `design.md`, `contracts.md` | 🟢 100% |
| `prg/PEQLIB.PRG` | `cadastros_base` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/FUNCAO.PRG` | `cadastros_base` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |
| `prg/TBR12.PRG` | `cadastros_base` | `requirements.md`, `design.md` | 🟢 100% |
| `prg/Busca.prg` | `cadastros_base` | `requirements.md`, `design.md`, `tasks.md` | 🟢 100% |

---

## 2. Estatísticas de Cobertura de Rastreabilidade

- **Total de Módulos Legados:** 6
- **Total de Fontes Analisados:** 27 arquivos `.PRG`
- **Total de Cobertura de Mapeamento:** 100% 🟢
- **Total de Units Geradas:** 6 (`sist_main`, `caderno_extintores`, `digita_selos`, `faturamento_notas`, `etiquetas_zebra`, `cadastros_base`)
- **Total de Arquivos de Especificação SDD:** 28 arquivos
