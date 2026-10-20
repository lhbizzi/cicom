# Módulo Faturamento e Emissão de Notas Fiscais (`faturamento_notas`), Tarefas de Implementação

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/nota.prg`, `prg/lancar.prg`)

---

## 1. Pré-requisitos

- [ ] Tabelas `SAIDA`, `PRODNFE` e `VINNOTA` criadas no banco de dados.
- [ ] Encerramento de Ordens de Serviço (`sist_main`) funcional.

---

## 2. Tarefas de Implementação

- [ ] **T-01: Implementar Motor de Apuração Fiscal (ISSQN vs ICMS)**
  - **Origem Legada:** `prg/nota.prg:70-110`
  - **Critério de Aceite:** Somar itens de serviço e peças, desmembrando `VAL_SERV` e `VAL_PROD`.
  - **Confiança:** 🟢

- [ ] **T-02: Implementar Emissor de Cabeçalho de Nota Fiscal (`SAIDA`)**
  - **Origem Legada:** `prg/nota.prg:40-65`
  - **Critério de Aceite:** Gerar `NUM_NF` sequencial e gravar cabeçalho em `SAIDA.DBF`.
  - **Confiança:** 🟢

- [ ] **T-03: Implementar Gravador de Itens Fiscais (`PRODNFE`)**
  - **Origem Legada:** `prg/nota.prg:120-150`
  - **Critério de Aceite:** Gravar cada item faturado com quantidade, valor unitário e valor total.
  - **Confiança:** 🟢

- [ ] **T-04: Implementar Controle de Vínculo OS <-> Nota (`VINNOTA`)**
  - **Origem Legada:** `prg/nota.prg:160-180`
  - **Critério de Aceite:** Registrar associação impedindo duplicação de faturamento para a mesma OS.
  - **Confiança:** 🟢

---

## 3. Tarefas de Teste

- [ ] **TT-01: Teste de Desmembramento Fiscal ISSQN / ICMS**
  - Validar se a soma dos serviços e peças resulta exatamente no `VAL_TOTAL` sem divergência de centavos.
- [ ] **TT-02: Teste de Bloqueio de Refaturamento**
  - Tentar faturar novamente uma OS já vinculada em `VINNOTA` e validar rejeição.
