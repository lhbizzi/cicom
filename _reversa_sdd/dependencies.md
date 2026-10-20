# Dependências do Sistema Legado — CICOM

> Gerado pelo Scout do Reversa em 2026-09-18

## 1. Toolchain de Compilação e Build

| Dependência / Ferramenta | Propósito | Origem / Arquivos de Referência |
| :--- | :--- | :--- |
| **CA-Clipper Compiler** | Compilador da linguagem Clipper para código objeto (`.OBJ`) | `SIST.RMK` (`clipper $< /b /m`) |
| **RTLINK Linker** | Linker estático com suporte a Overlays dinâmicos (`.OVL`) | `SIST.LNK`, `DIGITA.LNK` |
| **RMAKE** | Utilitário Make de automação de compilação da Nantucket/Computer Associates | `SIST.RMK`, `DIGITA.RMK`, `caderno.rmk` |
| **MS-DOS Batch System** | Encadeamento e inicialização do sistema | `Cicom.bat`, `inmetro.bat`, `CLIP.BAT`, `CO.BAT` |

---

## 2. Bibliotecas Internas e Módulos Utilitários

| Módulo / Arquivo | Descrição | Funções Principais |
| :--- | :--- | :--- |
| **`PEQLIB.PRG` / `PEQLIB.OBJ`** | Biblioteca de utilitários gerais e interface com usuário | Telas, máscaras, formatação de campos, caixas de diálogo |
| **`FUNCAO.PRG` / `FUNCAO.OBJ`** | Biblioteca de funções de cálculo e suporte de negócio | Cálculos tributários, validação de documentos, datas, strings |
| **`TBR12.PRG` / `TBR12.OBJ`** | Módulo de tabelas de suporte e parâmetros operacionais | Parâmetros de ensaios de extintores, classes de fogo, selos |

---

## 3. Storage e Drivers de Banco de Dados

| Componente | Tipo | Detalhes |
| :--- | :--- | :--- |
| **DBFNTX RDD** | Replaceable Database Driver | Driver de arquivos nativo Clipper (`.DBF` para tabelas, `.NTX` para índices de árvore B+) |
| **Controle de Concorrência** | FLOCK() / RLOCK() | Enfileiramento e travamento de registro/arquivo nativo xBase para rede MS-NET/Novell NetWare/Windows LAN |

---

## 4. Hardware, Dispositivos e Periféricos

| Dispositivo / Protocolo | Integração | Arquivos de Suporte |
| :--- | :--- | :--- |
| **Impressoras Térmicas Zebra** | Impressão de etiquetas de selo e identificação de extintores (Linguagem ZPL/EPL) | Diretório `EtiZebra/` (`EtiNR23/`, `Eticadastro/`, `Etiqueta/`) |
| **Impressoras Matriciais / Laser LPT1** | Spooler de impressão para relatórios e notas fiscais | Scripts `.BAT` com comando `net use lpt1`, arquivo `LPT10.PRN` |
