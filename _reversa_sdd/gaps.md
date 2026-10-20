# Registro de Lacunas do Legado (Gaps) — CICOM

> Gerado pelo Revisor do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟡 **CLASSIFICADO POR SEVERIDADE**

---

## 1. Visão Geral das Lacunas Identificadas

Este documento cataloga comportamentos do sistema legado que possuem lacunas técnicas ou de negócio, organizados por nível de severidade para suporte ao planejamento do ciclo forward e de migração.

---

## 2. Categorização de Severidade

### 🔴 Crítico (Bloqueia Migração/Reimplementação)

| ID | Módulo Afetado | Descrição da Lacuna | Impacto no Sistema Novo | Status / Solução Definida |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | `faturamento_notas` | Ausência de integração webservice com SEFAZ/Prefeitura para NFe/NFSe. | Impede a emissão fiscal em conformidade com a legislação atual. | ✅ **Resolvido:** Emissão NFe v4.0 e NFSe via serviços HTTP/SOAP diretos. |
| **GAP-02** | `cadastros_base` | Ausência de suporte a transações ACID no motor ISAM dBase III/IV. | Risco de corrupção e desassincronia entre DBFs em quedas de energia. | ⏳ Migração para Banco de Dados Relacional (PostgreSQL). |

---

### 🟡 Moderado (Exige Decisão de Design / Arquitetura)

| ID | Módulo Afetado | Descrição da Lacuna | Impacto no Sistema Novo | Status / Solução Definida |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-03** | `etiquetas_zebra` | Modelo de spooling de impressão atrelado à porta paralela `LPT1` legada. | Exige decidir entre agente USB local ou spooler IP de rede. | ✅ **Resolvido:** Conexão USB via cabo local na estação de trabalho. |
| **GAP-04** | `caderno_extintores` | Fórmula de cálculo de 5 anos via adição simples de `365 * 5` dias. | Desvio de 1 a 2 dias em anos bissextos perante calendário ABNT. | ✅ **Resolvido:** Ajuste exato por mês/ano de calendário (mesmo dia 5 anos à frente). |
| **GAP-05** | `sist_main` | Mecanismo de trava de concorrência por arquivo (`FLOCK`) e registro (`RLOCK`). | Pode causar congelamento de tela se operador abandonar o sistema. | ⏳ Substituído por Optimistic Concurrency Control no Postgres. |

---

### 🟢 Cosmético / Baixo Risco (Melhoria de Usabilidade)

| ID | Módulo Afetado | Descrição da Lacuna | Impacto no Sistema Novo | Pergunta Associada |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-06** | `digita_selos` | Emissão de beeps sonoros no MS-DOS para sinalizar erros de digitação. | Pode ser substituído por animações de feedback visual em React/Next.js. | — |
