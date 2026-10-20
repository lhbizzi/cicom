# Módulo Caderno de Vistorias e Ensaios Hidrostáticos (`caderno_extintores`), Tarefas de Implementação

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/CADERNO1.PRG` a `prg/CADERNO5.PRG` e `prg/caderno.prg`)

---

## 1. Pré-requisitos

- [ ] Schema da tabela `CADEXTIN` e índices criados.
- [ ] Módulo `sist_main` (Ordens de Serviço) operacional.

---

## 2. Tarefas de Implementação

- [ ] **T-01: Implementar Cadastro e Busca de Cilindros por Número de Série e Cliente**
  - **Origem Legada:** `prg/CADERNO1.PRG:40-100`
  - **Critério de Aceite:** Permitir localizar um extintor pela combinação de `NUMERO` + `COD_CLI` ou cadastrar um novo ativo.
  - **Confiança:** 🟢

- [ ] **T-02: Implementar Lançamento de Serviços de Manutenção (Níveis 1, 2 e 3)**
  - **Origem Legada:** `prg/CADERNO1.PRG:110-220`
  - **Critério de Aceite:** Inserir item em `MOV_ITEM` com o nível de serviço e descrição de peças trocadas.
  - **Confiança:** 🟢

- [ ] **T-03: Implementar Calculadora de Proximo Ensaio Hidrostático (+5 Anos)**
  - **Origem Legada:** `prg/CADERNO1.PRG:235-250`
  - **Critério de Aceite:** Quando `NIVEL_MAN == 3`, definir `PROX_ENSAIO = AddYears(ULT_ENSAIO, 5)` com precisão de calendário.
  - **Confiança:** 🟢

- [ ] **T-04: Implementar Captura de Dados do Teste de Pressão (kgf/cm²)**
  - **Origem Legada:** `prg/CADERNO3.PRG:70-130`
  - **Critério de Aceite:** Gravar a pressão em `PRESSAO_EN` para ensaios hidrostáticos de alta pressão.
  - **Confiança:** 🟢

- [ ] **T-05: Implementar Emissão de Laudos Técnicos e Cadernos de Ensaio**
  - **Origem Legada:** `prg/CADERNO1.PRG:280-360` (`R2EXTINTOR`)
  - **Critério de Aceite:** Gerar relatório em PDF/Print Stream formatado para auditoria do Inmetro.
  - **Confiança:** 🟢

---

## 3. Tarefas de Teste

- [ ] **TT-01: Teste de Atualização da Data de Ensaio (+5 Anos)**
  - Submeter extintor com ensaio em "2026-09-18" e validar se a próxima data resulta exatamente em "2031-09-18".
- [ ] **TT-02: Teste de Validação de Pressão Mínima**
  - Informar pressão "0.00" para ensaio de Nível 3 e validar se o sistema rejeita o laudo.
