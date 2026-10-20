# Diagrama C4 — Containers (Nível 2) — CICOM

> Gerado pelo Arquiteto do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Diagrama de Containers C4 (Mermaid)

```mermaid
C4Container
    title Diagrama de Containers (C4 Level 2) - Sistema CICOM

    Person(user, "Operador do Sistema", "Usuário da oficina de extintores navegando via teclado em terminal MS-DOS.")

    System_Boundary(cicom_boundary, "Fronteira do Sistema CICOM") {
        Container(sist_exe, "Módulo Principal (SIST.EXE)", "CA-Clipper 5.x Executable", "Gestão do menu principal, login, ordens de serviço (OS) e cadastros gerais.")
        
        Container(caderno_ovl, "Módulo Vistorias & Ensaios (CADERNO.OVL)", "Dynamic Overlay (RTLINK)", "Execução dos laudos de vistoria, ensaio hidrostático (Nível 3) e impressão de cadernos.")
        
        Container(digita_exe, "Módulo Lote de Selos (DIGITA.EXE / DIGSE)", "CA-Clipper Standalone / Overlay", "Lançamento contínuo em alta velocidade de selos Inmetro e registro de inutilizados (FALTASEL).")
        
        Container(nota_ovl, "Módulo Faturamento & Notas (NOTA.OVL)", "Dynamic Overlay (RTLINK)", "Cálculos fiscais de ISSQN/ICMS, emissão de notas fiscais de serviço e livro caixa.")
        
        Container(zebra_driver, "Template Manager (EtiZebra/)", "Scripting PRG / Text Stream", "Geração dinâmica dos scripts ZPL/EPL para rotulagem de cilindros.")

        ContainerDb(dbf_tables, "Tabelas DBF", "dBase III / IV Files", "Persistência principal dos dados: CADCLI.DBF, CADEXTIN.DBF, MOVTO.DBF, MOV_ITEM.DBF, SELO.DBF, FALTASEL.DBF, SAIDA.DBF.")
        
        ContainerDb(ntx_indexes, "Índices NTX", "Clipper NTX B-Tree Index", "Arquivos de índice secundário para busca instantânea por SEEK: CADCLICD.NTX, EXTSELO.NTX, MOVTO.NTX, etc.")
    }

    System_Ext(printer_lpt, "Impressoras Físicas (Zebra / Matricial)", "Dispositivos de Impressão LPT1/COM1")

    Rel(user, sist_exe, "Navegação por menus e abertura de OS", "Keyboard / TUI Screen 80x25")
    Rel(user, digita_exe, "Digitação contínua de números de selos", "Keyboard / Screen Output")
    
    Rel(sist_exe, caderno_ovl, "Carrega em memória RAM sob demanda", "RTLINK Overlay Manager")
    Rel(sist_exe, nota_ovl, "Carrega em memória RAM sob demanda", "RTLINK Overlay Manager")
    
    Rel(sist_exe, dbf_tables, "Grava e lê cabeçalhos e clientes", "Driver DBFNTX (RLOCK/FLOCK)")
    Rel(sist_exe, ntx_indexes, "Busca rápida e atualização de ponteiros", "DBFNTX B-Tree Engine")
    
    Rel(caderno_ovl, dbf_tables, "Grava ensaios e laudos técnicos", "Driver DBFNTX")
    Rel(caderno_ovl, ntx_indexes, "Pesquisa histórico de cilindro", "DBFNTX B-Tree Engine")
    Rel(caderno_ovl, zebra_driver, "Invoca templates de etiqueta", "File Read / Function Call")
    
    Rel(digita_exe, dbf_tables, "Lança selos em lote e perdas", "Driver DBFNTX")
    Rel(digita_exe, ntx_indexes, "Atualiza status do selo", "DBFNTX B-Tree Engine")
    
    Rel(nota_ovl, dbf_tables, "Grava saídas fiscais e itens", "Driver DBFNTX")
    
    Rel(caderno_ovl, printer_lpt, "Emite laudos e etiquetas ZPL", "DOS Spooler / LPT1")
    Rel(nota_ovl, printer_lpt, "Emite notas fiscais matriciais", "DOS Spooler / LPT1")
```

---

## 2. Detalhamento dos Containers

### 2.1 Módulo Principal (`SIST.EXE`)
- **Tecnologia:** CA-Clipper 5.x / RTLINK.
- **Função:** Controlar o ciclo de vida da aplicação, validar credenciais do operador, gerenciar a abertura e fechamento de Ordens de Serviço (`MOVTO.DBF`), e carregar os overlays de negócio (`.OVL`).
- **Comunicação:** Interface direta TUI (Text User Interface) com tela de 80 colunas e 25 linhas (`@ SAY ... GET`).

### 2.2 Módulo de Vistorias e Ensaios (`CADERNO.OVL`)
- **Tecnologia:** CA-Clipper Dynamic Overlay.
- **Função:** Gerenciar os dados técnicos de manutenção dos extintores. Controlar vistorias (Nível 1), recargas (Nível 2) e testes de pressão hidrostática a 250 kgf/cm² (Nível 3).
- **Comunicação:** Manipulação direta das tabelas `CADEXTIN.DBF` e `MOV_ITEM.DBF`.

### 2.3 Módulo de Lançamento em Lote de Selos (`DIGITA.EXE` / `DIGSE`)
- **Tecnologia:** Executável Autônomo em CA-Clipper / Sub-rotina dedicada.
- **Função:** Prover uma tela simplificada e ultrarrápida para que o operador digite em sequência os selos Inmetro aplicados em cada cilindro, registrando divergências e selos danificados em `FALTASEL.DBF`.
- **Comunicação:** Leitura e atualização rápida em laço da tabela `SELO.DBF`.

### 2.4 Módulo de Faturamento e Notas (`NOTA.OVL`)
- **Tecnologia:** CA-Clipper Dynamic Overlay.
- **Função:** Apurar os valores dos serviços executados e das peças trocadas na OS, desmembrando as alíquotas de ISSQN (serviço municipal) e ICMS (peças estaduais), registrando em `SAIDA.DBF` e emitindo formulário fiscal.
- **Comunicação:** Emissão de texto ASCII formatado direto para a porta paralela `LPT1`.

### 2.5 Gerenciador de Templates Zebra (`EtiZebra/`)
- **Tecnologia:** Coleção de sub-rotinas Clipper (`ETIQUETA.PRG`, `EtiNR23/`).
- **Função:** Montar as strings de comandos na linguagem **ZPL II (Zebra Programming Language)** ou **EPL2**, injetando variáveis de sistema (Número de Série, Selo Inmetro, Data de Validade) e enviando a stream para a impressora.

### 2.6 Motor de Persistência ISAM (`DBF` / `NTX`)
- **Tecnologia:** dBase III Standard / Clipper DBFNTX RDD.
- **Função:** Armazenar dados em arquivos binários em disco. A busca é acelerada via comandos `SEEK` sobre arquivos de índices B-Tree (`.NTX`).

---

## 3. Protocolos e Mecanismos de Integração Interna

| Origem | Destino | Mecanismo | Protocolo / Formato |
| :--- | :--- | :--- | :--- |
| `SIST.EXE` | Overlays (`.OVL`) | Carga de Memória por Demanda | RTLINK Dynamic Overlay Exec |
| Modulos Clipper | `DBFNTX Engine` | Chamadas RDD de Baixo Nível | File Locks (`FLOCK`/`RLOCK`) em disco local/SMB |
| Módulo Caderno | Impressora Zebra | Output Stream em Porta DOS | Text Streams ZPL II (`^XA ... ^XZ`) via LPT1 |
| Módulo Faturamento | Impressora Matricial | Output Stream em Porta DOS | ASCII Plain Text + Esc/P com `SET PRINTER TO LPT1` |
