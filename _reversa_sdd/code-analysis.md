# Análise de Código Consolidada — CICOM

> Gerado pelo Arqueólogo do Reversa em 2026-09-18
> Nível de Documentação: **Detalhado**

---

## 1. Visão Geral da Arquitetura de Código

O sistema **CICOM** é uma aplicação monolítica desenvolvida em **CA-Clipper (xBase)**, compilada para ambiente MS-DOS de 16/32 bits utilizando o linker **RTLINK** com arquitetura de **Overlays Dinâmicos (`.OVL`)**.

- **Linguagem:** CA-Clipper Summer '87 / Clipper 5.x
- **Estilo de Programação:** Procedural com variáveis globais (`PUBLIC` / `PRIVATE`), orientação a eventos via menu de opções (`ACHOICE`) e comandos de tela (`@ ... SAY ... GET`).
- **Persistência:** Tabelas ISAM em dBase III/IV (`.DBF`) e índices B-Tree nativos (`.NTX`).

---

## 2. Módulos do Sistema

### 2.1 Módulo `sist_main` (Menu Principal & Ordens de Serviço) 🟢 CONFIRMADO
- **Arquivos-Fonte:** `SIST.PRG`, `SIST1.PRG`, `SIST2.PRG`, `SIST3.PRG`, `SIST4.PRG`, `SIST5.PRG`, `SIST6.PRG`, `SIST7.PRG`, `SIST8.PRG`, `SIST99.PRG`, `sist44.prg`, `sis4.prg`
- **Responsabilidade:** Inicialização de variáveis ambientais, reconstrução e indexação dos arquivos NTX (`findex`), menu principal via teclado/atalhos F2/F3/F4, gerenciamento de Ordens de Serviço (OS) e orçamentos.
- **Funções Chave:**
  - `SIST()`: Entry point principal da aplicação.
  - `TELAOS()`: Interface e fluxo de criação/edição de Ordens de Serviço.
  - `BAIXAOS()`: Processamento de encerramento da OS, atualização do status dos extintores e vinculo de selos.
  - `ORCAMENTO()`: Cálculo e geração de orçamentos prévios de manutenção.

### 2.2 Módulo `caderno_extintores` (Inspeção, Ensaios & Selos Inmetro) 🟢 CONFIRMADO
- **Arquivos-Fonte:** `CADERNO1.PRG`, `CADERNO2.PRG`, `CADERNO3.PRG`, `caderno.prg`, `caderno4.prg`, `caderno5.prg`
- **Responsabilidade:** Ficha técnica do extintor, registro de dados do cilindro (Nº de Série, Fabricante, Ano de Fabricação, Agente Extintor, Capacidade), laudo de ensaios hidrostáticos (Nível 1, 2 e 3) e vinculação com selos de conformidade Inmetro.
- **Funções Chave:**
  - `LANCAR()`: Lançamento técnico de extintores recebidos para manutenção.
  - `R2EXTINTOR()`: Relatório de extintores por cliente, lote e vencimento.
  - `QTDEEXT()`: Contagem e validação da quantidade de extintores por lote/OS.
  - `BAIXARDOC()`: Baixa documental e liberação para emissão do selo.

### 2.3 Módulo `digita_selos` (Lançamento e Controle de Selos Inmetro) 🟢 CONFIRMADO
- **Arquivos-Fonte:** `DIGITA.PRG`, `digse.prg`, `seq.prg`, `acerto.PRG`, `MARRETA.PRG`, `MARRETA1.PRG`
- **Responsabilidade:** Digitação em lote de selos Inmetro recebidos do órgão certificador. Validação de faixas contínuas, identificação de selos inutilizados/danificados (`FALTASEL.DBF`) e acerto de sequências (`SEQ.EXE`).
- **Funções Chave:**
  - `DIGITA()`: Interface de alta velocidade para entrada de sequências de selos.
  - `DIGSE()`: Atribuição de selos Inmetro a extintores inspecionados.
  - `SEQ()`: Reordenamento e ajuste da numeração sequencial de selos.
  - `MARRETA()`: Utilitário de correção de consistência na tabela `SELO.DBF`.

### 2.4 Módulo `faturamento_notas` (Notas Fiscais & Cobrança) 🟢 CONFIRMADO
- **Arquivos-Fonte:** `nota.prg`, `lancar.prg`, `Fol.prg`, `si.prg`, `si6.prg`, `Busca.prg`
- **Responsabilidade:** Emissão de Notas Fiscais (venda de produtos e prestação de serviços de recarga), apuração de impostos (ICMS, ISSQN), geração de livro de saídas e integrações financeiras/contas a receber.
- **Funções Chave:**
  - `NOTA()`: Processamento e montagem da Nota Fiscal.
  - `R2MOSTRANF()`: Visualização e impressão de nota fiscal e espelho de faturamento.
  - `BUSCA()`: Pesquisa rápida de faturamento e clientes por filtro parametrizado.

### 2.5 Módulo `etiquetas_zebra` (Modelos de Impressão Zebra) 🟢 CONFIRMADO
- **Arquivos-Fonte:** Diretório `EtiZebra/` (`EtiNR23/`, `Eticadastro/`, `Etiqueta/`)
- **Responsabilidade:** Geração de arquivos de impressão gráfica ZPL/EPL direcionados a impressoras térmicas Zebra para fixação nos cilindros de extintor (Selo de garantia, instruções de operação, classe de fogo e selo de conformidade).

### 2.6 Módulo `cadastros_base` (Cadastros & Bibliotecas Centrais) 🟢 CONFIRMADO
- **Arquivos-Fonte:** `PEQLIB.PRG`, `FUNCAO.PRG`, `TBR12.PRG` + Tabelas `CADCLI`, `CADEXTIN`, `CADMARCA`, `CADSERV`, `CADVEND`, `FORNECE`
- **Responsabilidade:** Suporte a cadastros auxiliares e rotinas genéricas de interface e regras de negócio.
- **Funções Chave:**
  - `PEQLIB.PRG`: Desenho de janelas, caixas de diálogo, calendários, calculadora e utilitários de tela.
  - `FUNCAO.PRG`: Utilitários de conversão de datas, calculadoras financeiras, validação de CPF/CNPJ.
  - `TBR12.PRG`: Tabela de normas ABNT/Inmetro para carga e pressão de ensaios.

---

## 3. Matriz de Complexidade e Rastreabilidade

| Módulo | Qtd Arquivos PRG | Complexidade | Tabelas DBF Principais | Confiança |
| :--- | :---: | :---: | :--- | :---: |
| `sist_main` | 12 | Alta | `MOVTO.DBF`, `MOV_ESTQ.DBF`, `FINANC.DBF` | 🟢 CONFIRMADO |
| `caderno_extintores` | 6 | Altíssima | `CADEXTIN.DBF`, `MOV_ITEM.DBF`, `LOTE.DBF` | 🟢 CONFIRMADO |
| `digita_selos` | 6 | Média | `SELO.DBF`, `FALTASEL.DBF`, `CONTLOTE.DBF` | 🟢 CONFIRMADO |
| `faturamento_notas` | 6 | Alta | `SAIDA.DBF`, `VINNOTA.DBF`, `PRODNFE.DBF` | 🟢 CONFIRMADO |
| `etiquetas_zebra` | Templates ZPL | Baixa | N/A (Consome `MOV_ITEM.DBF`) | 🟢 CONFIRMADO |
| `cadastros_base` | 3 | Média | `CADCLI.DBF`, `CADMARCA.DBF`, `CADSERV.DBF` | 🟢 CONFIRMADO |
