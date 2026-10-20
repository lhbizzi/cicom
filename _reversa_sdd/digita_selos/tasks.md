# Módulo Lançamento em Lote de Selos Inmetro (`digita_selos`), Tarefas de Implementação

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/DIGITA.PRG`, `prg/digse.prg`, `prg/acerto.PRG`)

---

## 1. Pré-requisitos

- [ ] Tabela `SELO` e `FALTASEL` criadas no banco de dados.
- [ ] Módulo `sist_main` e `caderno_extintores` configurados.

---

## 2. Tarefas de Implementação

- [ ] **T-01: Implementar Interface de Digitação em Lote Ultra-Rápida**
  - **Origem Legada:** `prg/DIGITA.PRG:15-80`
  - **Critério de Aceite:** Permitir navegação exclusiva por teclado com avanço automático por ENTER.
  - **Confiança:** 🟢

- [ ] **T-02: Implementar Validador e Consumidor de Selos (`DIGSE`)**
  - **Origem Legada:** `prg/digse.prg:40-90`
  - **Critério de Aceite:** Validar se o selo existe com `STATUS == 'E'`, associar à OS e alterar para `STATUS == 'U'`.
  - **Confiança:** 🟢

- [ ] **T-03: Implementar Registro de Selos Inutilizados / Perdas (`ACERTO_SELO`)**
  - **Origem Legada:** `prg/acerto.PRG:25-70`
  - **Critério de Aceite:** Gravar justificativa em `FALTASEL.DBF` e alterar status do selo para `D` (Danificado).
  - **Confiança:** 🟢

---

## 3. Tarefas de Teste

- [ ] **TT-01: Teste de Consumo de Selo em Estoque**
  - Submeter número de selo válido e verificar alteração atômica do status de "E" para "U".
- [ ] **TT-02: Teste de Rejeição de Selo Já Utilizado**
  - Tentar alocar selo com status "U" e verificar exibição do erro.
