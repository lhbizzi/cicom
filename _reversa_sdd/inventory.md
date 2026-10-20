# Inventário do Sistema Legado — CICOM

> Gerado pelo Scout do Reversa em 2026-09-18

## 1. Visão Geral do Sistema

- **Nome do Projeto:** CICOM (Sistema de Controle de Extintores, Selos Inmetro e Faturamento)
- **Tipo de Aplicação:** Sistema Desktop/MS-DOS Monolítico em CA-Clipper
- **Domínio de Negócio:** Gestão de Manutenção de Extintores de Incêndio, Rastreabilidade e Controle de Selos de Conformidade Inmetro, Orçamentos, Ordens de Serviço, Clientes e Faturamento.

---

## 2. Tecnologias e Compiladores

| Categoria | Tecnologia / Ferramenta | Detalhes / Versão |
| :--- | :--- | :--- |
| **Linguagem Principal** | CA-Clipper (xBase) | Summer '87 / Clipper 5.x |
| **Gerenciador de Build** | RMAKE (Clipper Make) | `SIST.RMK`, `DIGITA.RMK`, `caderno.rmk` |
| **Linker / Overlays** | RTLINK (CLIPP) | Com suporte a Dynamic Overlays (`.OVL`) |
| **Banco de Dados** | xBase DBF / NTX | Driver DBFNTX nativo do Clipper |
| **Ambiente de Execução** | MS-DOS / NTVDM / DOSBox | Scripts em lote `.BAT` (`Cicom.bat`, `inmetro.bat`) |
| **Impressão & Hardware** | Impressoras Zebra (ZPL/EPL) & LPT Matrix/Laser | Pastas `EtiZebra/` e scripts de spooler LPT1 |

---

## 3. Mapeamento de Arquivos por Extensão

- **Fonte Clipper (`.PRG`):** ~35 arquivos no raiz, 29 em `prg/`, 33 em `prglaser/`.
- **Objetos Compilados (`.OBJ`):** `SIST.OBJ`, `CADERNO1.OBJ`..`CADERNO5.OBJ`, `DIGITA.OBJ`, `FUNCAO.OBJ`, `PEQLIB.OBJ`, `TBR12.OBJ`.
- **Executáveis (`.EXE`):** `CICOM.EXE`, `DIGITA.EXE`, `SEQ.EXE`, `MARRETA.EXE`, `MARRETA1.EXE`, `MARRETA.EXE`.
- **Overlays (`.OVL`):** `CICOM.OVL`, `CICOM1.OVL`, `CICOM2.OVL`, `DIGITA.OVL`, `SIST.OVL`, `SIST1.OVL`.
- **Bancos de Dados (`.DBF`):** >50 tabelas de dados (`CADCLI.DBF`, `CADEXTIN.DBF`, `SELO.DBF`, `MOV_ITEM.DBF`, `LOTE.DBF`, etc.).
- **Índices (`.NTX`):** >25 arquivos de índice (`CADCLICD.NTX`, `EXTSELO.NTX`, `MOV_ITEM.NTX`, `NUMSELO.NTX`, etc.).
- **Scripts de Build (`.BAT`, `.RMK`, `.LNK`):** Compilation batch files e makefiles.
- **Relatórios & Memória (`.TXT`, `.MEM`, `.FRM`):** Relatórios de fechamento mensal (`JAN25.TXT`, etc.) e memórias de cálculo.

---

## 4. Estrutura de Diretórios

```
C:\Inmetro\
├── .agents/                 # Agentes e Skills do Reversa
├── .reversa/                # Configurações e Estado do Reversa
├── BKP/                     # Backups de segurança do sistema
├── CADEXT/                  # Planilhas e exportações de extintores
├── EtiZebra/                # Modelos de etiquetas para impressoras Zebra
│   ├── EtiNR23/             # Etiquetas NR-23
│   ├── Eticadastro/         # Etiquetas de cadastro
│   └── Etiqueta/            # Modelos padrão de etiquetas
├── dbf/                     # Diretório complementar de arquivos de dados DBF
├── ntx/                     # Diretório complementar de arquivos de índice NTX
├── prg/                     # Código-fonte principal de programas Clipper
├── prglaser/                # Versão adaptada/customizada para impressão Laser
├── itens/                   # Arquivos complementares de itens
└── (Raiz com fontes, executáveis e tabelas operacionais)
```

---

## 5. Entry Points & Módulos Principais

1. **`CiCom.exe` / `SIST.PRG`** — Aplicação principal. Gerencia menus, cadastros, emissão de ordens de serviço, orçamento, relatórios e controle Inmetro.
2. **`DIGITA.EXE` / `DIGITA.PRG`** — Módulo de alta produtividade para digitação e lançamento em lote de selos e extintores.
3. **`caderno.bat` / `CADERNO1.PRG` a `caderno5.prg`** — Módulo de ensaios e caderno de inspecao/manutenção de extintores.
4. **`nota.prg` / `lancar.prg`** — Emissão e processamento de notas fiscais e faturamento.
5. **`SEQ.EXE` / `seq.prg`** — Utilitário de controle e recalculo de numeração sequencial de selos Inmetro.

---

## 6. Cobertura de Testes

- **Framework de Testes Automatizados:** Ausente.
- **Arquivo de Testes:** 0 arquivos `.test.*` ou `.spec.*`.
- **Validação:** Testes manuais via execução direta de rotinas em lote (`.BAT`).

---

## 7. Sugestão de Organização das Specs

- **Granularidade Sugerida:** `module`
- **Justificativa:** O sistema é estruturado em blocos funcionais por domínio bem delimitados (SIST/Sistema, CADERNO/Vistoria de Extintores, SELO/Inmetro, DIGITA/Lançamentos, FAT/Faturamento).
