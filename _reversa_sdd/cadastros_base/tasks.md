# Módulo Cadastros Base e Bibliotecas Reutilizáveis (`cadastros_base`), Tarefas de Implementação

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/PEQLIB.PRG`, `prg/FUNCAO.PRG`)

---

## 1. Tarefas de Implementação

- [ ] **T-01: Implementar Serviço de Cadastro e Gerenciamento de Clientes (`CADCLI`)**
  - **Origem Legada:** `prg/PEQLIB.PRG:40-120`
  - **Critério de Aceite:** Prover CRUD completo com busca por CNPJ/CPF e Razão Social.
  - **Confiança:** 🟢

- [ ] **T-02: Implementar Validador de CNPJ e CPF (Módulo 11)**
  - **Origem Legada:** `prg/FUNCAO.PRG:150-250`
  - **Critério de Aceite:** Validar estritamente os dígitos verificadores calculados.
  - **Confiança:** 🟢

- [ ] **T-03: Implementar Utilitários de Reindexação e Verificação de Integridade**
  - **Origem Legada:** `prg/Busca.prg:45-90`
  - **Critério de Aceite:** Permitir a reconstrução de índices em caso de falha de I/O.
  - **Confiança:** 🟢

---

## 2. Tarefas de Teste

- [ ] **TT-01: Teste Unitário do Algoritmo Módulo 11 para CNPJ/CPF**
  - Testar CNPJs válidos conhecidos e CNPJs com dígitos manipulados.
