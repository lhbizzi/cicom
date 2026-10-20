# Diagrama C4 — Componentes (Nível 3) — CICOM

> Gerado pelo Arquiteto do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Diagrama de Componentes C4 (Mermaid)

```mermaid
C4Component
    title Diagrama de Componentes (C4 Level 3) - Módulos Internos do CICOM

    Container_Boundary(sist_boundary, "Módulo Central & Operações (sist_main / caderno_extintores)") {
        Component(comp_sist, "SIST.PRG", "Main Controller", "Ponto de entrada da aplicação, inicialização de variáveis globais e laço do Menu Principal.")
        Component(comp_baixaos, "BAIXAOS (SIST1.PRG)", "OS Status Manager", "Gerencia o fechamento de OS, valida alocação completa de selos e altera SITUACAO para 'F'.")
        Component(comp_lancar, "LANCAR (CADERNO1.PRG)", "Inspection Manager", "Registra vistorias, troca de componentes e calcula a próxima data de ensaio (+5 anos).")
        Component(comp_pressao, "CADERNO3.PRG", "Pressure Test Engine", "Coleta os dados do teste de pressão hidrostática (kgf/cm²) e gera laudo de expansão.")
    }

    Container_Boundary(digita_boundary, "Módulo Lote de Selos (digita_selos)") {
        Component(comp_digita, "DIGITA.PRG", "Batch Entry Interface", "Tela de altíssima velocidade para lançamento continuo de selos.")
        Component(comp_digse, "DIGSE (digse.prg)", "Seal Allocator", "Vincula o selo Inmetro ao item da OS (MOV_ITEM) e altera STATUS do selo para 'U' (Usado).")
        Component(comp_faltasel, "FALTASEL (acerto.PRG)", "Loss Auditor", "Registra perdas, extravios e danos em selos Inmetro na tabela FALTASEL.DBF.")
    }

    Container_Boundary(fisc_boundary, "Módulo Fiscal (faturamento_notas)") {
        Component(comp_nota, "NOTA (nota.prg)", "Tax Engine & NF", "Calcula ISSQN (serviços) e ICMS (peças), gravando no histórico fiscal SAIDA.DBF.")
        Component(comp_r2nf, "R2MOSTRANF (CADERNO1.PRG)", "Invoice Report Generator", "Formata o cabeçalho e os itens para impressão na matricial.")
    }

    Container_Boundary(base_boundary, "Biblioteca & Persistência (cadastros_base)") {
        Component(comp_peqlib, "PEQLIB.PRG", "UI & Utility Library", "Rotinas de menu pop-up, janelas de texto, formatação de valores e máscaras.")
        Component(comp_funcao, "FUNCAO.PRG", "Validation Engine", "Validações de CNPJ/CPF via Módulo 11 e consistência de datas.")
        Component(comp_findex, "findex.prg", "Index Rebuilder", "Reconstrói todos os arquivos de índices .NTX a partir das tabelas .DBF.")
    }

    ContainerDb(dbf_store, "Base ISAM DBF/NTX", "dBase III Files", "CADCLI, CADEXTIN, MOVTO, MOV_ITEM, SELO, FALTASEL, SAIDA.")

    Rel(comp_sist, comp_baixaos, "Invoca rotina de baixa de OS")
    Rel(comp_sist, comp_lancar, "Invoca lançamento de extintores")
    
    Rel(comp_baixaos, comp_digse, "Verifica selos associados")
    Rel(comp_lancar, comp_pressao, "Solicita dados de ensaio hidrostático (Nível 3)")
    
    Rel(comp_digita, comp_digse, "Envia numeração de selo lida")
    Rel(comp_digse, comp_faltasel, "Redireciona selo danificado/extraviado")
    
    Rel(comp_baixaos, comp_nota, "Dispara faturamento da OS concluída")
    
    Rel(comp_sist, comp_peqlib, "Utiliza componentes visuais TUI")
    Rel(comp_lancar, comp_funcao, "Valida dados e datas")
    Rel(comp_sist, comp_findex, "Dispara reindexação na inicialização se necessário")

    Rel(comp_baixaos, dbf_store, "Grava em MOVTO.DBF")
    Rel(comp_lancar, dbf_store, "Grava em CADEXTIN.DBF e MOV_ITEM.DBF")
    Rel(comp_pressao, dbf_store, "Atualiza PRESSAO_EN em MOV_ITEM.DBF")
    Rel(comp_digse, dbf_store, "Atualiza STATUS em SELO.DBF e NUM_SELO em MOV_ITEM.DBF")
    Rel(comp_faltasel, dbf_store, "Insere registro em FALTASEL.DBF")
    Rel(comp_nota, dbf_store, "Grava registros em SAIDA.DBF e PRODNFE.DBF")
```

---

## 2. Descrição Detalhada dos Componentes

### 2.1 Componentes do Núcleo e Vistorias (`sist_main` / `caderno_extintores`)

| Componente | Arquivo Fonte | Responsabilidade Principal | Invocado por |
| :--- | :--- | :--- | :--- |
| **`SIST`** | `prg/SIST.PRG` | Ponto de entrada, inicialização das variáveis públicas (`cEmpresa`, `dDataSis`), tratamento da tela principal e roteamento do menu principal. | MS-DOS / `Cicom.bat` |
| **`BAIXAOS`** | `prg/SIST1.PRG` | Validação e fechamento da Ordem de Serviço. Verifica se todos os itens possuem selo Inmetro e calcula o valor total. | `SIST.PRG` |
| **`LANCAR`** | `prg/CADERNO1.PRG` | Interface de entrada de extintores na OS. Atualiza a tabela `CADEXTIN.DBF` e define a periodicidade dos ensaios. | `SIST.PRG` / Menu Caderno |
| **`PRESSAO`** | `prg/CADERNO3.PRG` | Registra a pressão de teste aplicada (kgf/cm²) e a expansão volumétrica em cilindros de alta pressão (CO2/PQS). | `CADERNO1.PRG` |

---

### 2.2 Componentes de Controle de Selos Inmetro (`digita_selos`)

| Componente | Arquivo Fonte | Responsabilidade Principal | Invocado por |
| :--- | :--- | :--- | :--- |
| **`DIGITA`** | `prg/DIGITA.PRG` | Interface em lote otimizada para alta produtividade de digitação (sem delays ou menus intermediários). | Executável autônomo / Menu |
| **`DIGSE`** | `prg/digse.prg` | Valida se a numeração do selo digitado está cadastrada em `SELO.DBF` no status Estoque (`E`) e realiza o vínculo com a OS. | `DIGITA.PRG` / `SIST1.PRG` |
| **`FALTASEL`**| `prg/acerto.PRG` | Registra e justifica a perda, destruição física ou erro de gravação de selos em `FALTASEL.DBF` para auditoria do Inmetro/IPEM. | `DIGSE()` / Menu Digitação |

---

### 2.3 Componentes Fiscais e de Faturamento (`faturamento_notas`)

| Componente | Arquivo Fonte | Responsabilidade Principal | Invocado por |
| :--- | :--- | :--- | :--- |
| **`NOTA`** | `prg/nota.prg` | Efetua a apuração fiscal desmembrando impostos municipais (ISSQN) de estaduais (ICMS sobre peças), gravando a Nota Fiscal em `SAIDA.DBF`. | `BAIXAOS()` / Menu Fiscal |
| **`R2MOSTRANF`**| `prg/CADERNO1.PRG` | Formata o espelho da nota fiscal e direciona o fluxo de dados ASCII diretamente para a impressora matricial em `LPT1`. | `NOTA()` |

---

### 2.4 Componentes Utilitários e Infraestrutura (`cadastros_base`)

| Componente | Arquivo Fonte | Responsabilidade Principal | Invocado por |
| :--- | :--- | :--- | :--- |
| **`PEQLIB`** | `prg/PEQLIB.PRG` | Biblioteca central contendo funções de interface gráfica TUI (janelas `BOX`, mensagens de alerta, seletores de cor). | Todos os módulos |
| **`FUNCAO`** | `prg/FUNCAO.PRG` | Biblioteca de rotinas de validação de CNPJ/CPF (Módulo 11), máscaras de formatação e cálculos de datas. | Todos os módulos |
| **`findex`** | `prg/Busca.prg` / `PEQLIB.PRG` | Utilitário de emergência que lê as tabelas `.DBF` e re-cria todos os índices `.NTX` corrompidos por travamento ou queda de luz. | `SIST.PRG` (no boot do sistema) |

---

## 3. Matriz de Dependência entre Componentes Internos

```mermaid
graph LR
    SIST["SIST.PRG"] --> PEQLIB["PEQLIB.PRG"]
    SIST --> FUNCAO["FUNCAO.PRG"]
    BAIXAOS["SIST1.PRG"] --> DIGSE["digse.prg"]
    BAIXAOS --> NOTA["nota.prg"]
    LANCAR["CADERNO1.PRG"] --> PRESSAO["CADERNO3.PRG"]
    DIGITA["DIGITA.PRG"] --> DIGSE
    DIGSE --> FALTASEL["acerto.PRG"]
    NOTA --> FUNCAO
```
