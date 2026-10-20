# Módulo Cadastros Base e Bibliotecas Reutilizáveis (`cadastros_base`), Especificação de Requisitos

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/PEQLIB.PRG`, `prg/FUNCAO.PRG`, `prg/TBR12.PRG`, `prg/Busca.prg`)

---

## 1. Visão Geral

O módulo **`cadastros_base`** engloba a gestão das entidades mestres do **CICOM** (Cadastro de Clientes em `CADCLI.DBF`, Vendedores, Serviços e Tabelas auxiliares) e provê a biblioteca de funções utilitárias do sistema (`PEQLIB.PRG` e `FUNCAO.PRG`), incluindo componentes visuais TUI, rotinas de validação de documentos fiscais e utilitários de emergência para reconstrução de índices `.NTX` (`findex`).

---

## 2. Responsabilidades

- Manter os dados cadastrais completos de clientes (`CADCLI.DBF`). 🟢
- Fornecer o algoritmo de validação de dígitos verificadores de CNPJ e CPF pelo método Módulo 11 (`FUNCAO.PRG`). 🟢
- Prover rotinas de interface TUI reutilizáveis (janelas `Box()`, alertas de erro, formatação de máscaras). 🟢
- Executar a rotina de reindexação proativa (`findex.prg`) para reconstruir índices B-Tree corrompidos. 🟢

---

## 3. Regras de Negócio

- **RN-06 (Validação de CNPJ/CPF):** O cadastro de clientes exige a validação estrita do CNPJ/CPF pelo algoritmo Módulo 11 antes da gravação do registro. 🟢 CONFIRMADO (`FUNCAO.PRG:150`)
- **RN-CAD-01 (Código de Cliente Incremental):** O código identificador do cliente (`CODIGO`) é numérico sequencial único de 6 dígitos (`CADCLICD.NTX`). 🟢 CONFIRMADO (`PEQLIB.PRG:45`)

---

## 4. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
| :--- | :--- | :---: | :--- |
| **RF-01** | **CRUD de Clientes** | Must | Inclusão, alteração, consulta e exclusão de clientes em `CADCLI.DBF`. |
| **RF-02** | **Validador de CNPJ/CPF** | Must | Retornar falso para CNPJs com dígitos verificadores inválidos. |
| **RF-03** | **Reindexador de Emergência (`findex`)** | Must | Recriar todos os `.NTX` lendo as tabelas `.DBF` sequencialmente. |

---

## 5. Rastreabilidade de Código Legado

| Arquivo Legado | Função / Sub-rotina | Cobertura |
| :--- | :--- | :---: |
| `prg/PEQLIB.PRG` | `PEQLIB()`, `Box()`, `Mensagem()` | 🟢 |
| `prg/FUNCAO.PRG` | `ValidaCNPJ()`, `ValidaCPF()` | 🟢 |
| `prg/TBR12.PRG` | `TABELA_SERVICOS()` | 🟢 |
| `prg/Busca.prg` | `AchaTudo()`, `findex()` | 🟢 |
