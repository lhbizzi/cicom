# Diagrama C4 — Contexto (Nível 1) — CICOM

> Gerado pelo Arquiteto do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Diagrama de Contexto C4 (Mermaid)

```mermaid
C4Context
    title Diagrama de Contexto (C4 Level 1) - Sistema CICOM

    Person(tecnico, "Técnico de Manutenção", "Inspetor credenciado responsável pelo ensaio hidrostático, vistoria física e montagem dos extintores.")
    Person(digitador, "Operador de Lançamento", "Operador responsável pelo lançamento em lote e alocação de selos Inmetro no sistema.")
    Person(faturamento, "Operador Fiscal", "Responsável pela apuração de serviços, emissão de NFs (ISS/ICMS) e cobrança.")
    Person(auditor, "Auditor do Inmetro / IPEM", "Fiscal externo que inspeciona a rastreabilidade dos selos de conformidade e livros de ensaio.")

    System(cicom, "Sistema CICOM", "Sistema de Gestão de Manutenção de Extintores, Controle de Selos Inmetro e Faturamento (CA-Clipper MS-DOS).")

    System_Ext(inmetro_sys, "Inmetro / IPEM Org", "Órgão regulador que fornece as faixas de selos de segurança e exige prestação de contas dos selos aplicados e descartados.")
    System_Ext(zebra_printer, "Impressora Térmica Zebra", "Equipamento de impressão gráfica de alta velocidade para etiquetas adesivas NR-23 e garantia em ZPL/EPL.")
    System_Ext(matrix_printer, "Impressora Matricial LPT1", "Dispositivo de impressão por impacto em formulário contínuo para Ordens de Serviço, Laudos e Notas Fiscais.")
    System_Ext(backup_media, "Unidade de Fita / Disco de Backup", "Dispositivo de armazenamento secundário para cópias de segurança dos arquivos DBF/NTX.")

    Rel(tecnico, cicom, "Mapeia vistorias, ensaios hidrostáticos e peças trocadas", "Interface TUI (Teclado)")
    Rel(digitador, cicom, "Digita faixas de selos e baixas em lote (`DIGITA`)", "Interface TUI Rápida")
    Rel(faturamento, cicom, "Processa faturamento de OS e imprime notas fiscais", "Interface TUI")
    Rel(auditor, cicom, "Solicita relatórios de rastreabilidade de selos e laudos de ensaio", "Relatórios Impressos / Telas de Consulta")

    Rel(cicom, inmetro_sys, "Emite relatórios oficiais de controle de selos e mapas de inutilização", "Relatório Físico / Exportação TXT")
    Rel(cicom, zebra_printer, "Envia streams de comandos ZPL/EPL", "Porta LPT1 / COM1 / Direct Stream")
    Rel(cicom, matrix_printer, "Envia texto formatado ASCII em formulário contínuo", "Porta Paralela LPT1")
    Rel(cicom, backup_media, "Executa rotinas de cópia e compactação de tabelas DBF", "Execução Batch MS-DOS")
```

---

## 2. Descrição das Entidades de Contexto

### 2.1 Personas & Usuários Internos

| Persona | Papel & Objetivo no Sistema | Principais Telas / Módulos Utilizados |
| :--- | :--- | :--- |
| **Técnico de Manutenção** | Inserir os dados das inspeções técnicas (Nível 1, 2 e 3), medir pressão de teste hidrostático e indicar peças substituídas. | `CADERNO1.PRG`, `CADERNO2.PRG`, `caderno.prg` |
| **Operador de Lançamento** | Registrar os lotes de selos recebidos do IPEM e vincular cada selo a um extintor na OS com extrema rapidez. | `DIGITA.PRG`, `digse.prg`, `acerto.PRG` |
| **Operador Fiscal** | Concluir ordens de serviço, desmembrar impostos (ISSQN vs ICMS) e emitir as notas fiscais correspondentes. | `nota.prg`, `lancar.prg`, `SIST1.PRG` (`BAIXAOS`) |
| **Auditor / Responsável Técnico** | Garantir a conformidade legal perante as portarias do Inmetro e assinar os laudos de ensaio hidrostático. | `CADERNO3.PRG`, `R2EXTINTOR()` |

---

### 2.2 Sistemas Externos & Periféricos

| Sistema Externo / Ator | Tipo de Integração | Protocolo / Formato | Descrição da Interação |
| :--- | :--- | :--- | :--- |
| **Inmetro / IPEM** | Auditoria Externa | Relatórios em Papel / TXT | Recebe a prestação de contas mensal contendo os selos utilizados, extintores atendidos e selos inutilizados (`FALTASEL`). |
| **Impressora Zebra** | Periférico de Impressão | Comandos ZPL / EPL (ASCII) | Impressão de etiquetas de conformidade coladas diretamente no casco do extintor. |
| **Impressora Matricial** | Periférico de Impressão | Texto Puro via `SET PRINTER TO LPT1` | Impressão de vias de Ordens de Serviço, laudos de ensaio hidrostático e formulários fiscais. |
| **Gerenciador de Backup** | Utilitário de Sistema | Scripts Batch DOS (`.BAT`) | Copia os arquivos `.DBF` e `.NTX` para mídias externas de segurança. |

---

## 3. Limites do Sistema Legado

1. **Escopo Interno:** O CICOM engloba desde a entrada do extintor na oficina (OS) até o laudo técnico, alocação de selo Inmetro e faturamento.
2. **Escopo Fora do Sistema:** O sistema não possui integração bancária online (bloquetos emissores via API/CNAB nativo), não possui comunicação HTTP/WebServices com secretarias de fazenda (NFe SEFAZ moderna) e não possui portal de clientes na web.
