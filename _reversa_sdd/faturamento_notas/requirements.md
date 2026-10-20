# Módulo Faturamento e Emissão de Notas Fiscais (`faturamento_notas`), Especificação de Requisitos

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/nota.prg`, `prg/lancar.prg`, `prg/Fol.prg`, `prg/si.prg`, `prg/si6.prg`)

---

## 1. Visão Geral

O módulo **`faturamento_notas`** é responsável pela gestão financeira, apuração de impostos e emissão de Notas Fiscais decorrentes da manutenção de extintores no **CICOM**. Ele realiza a segregação tributária legal entre prestação de serviços (imposto municipal ISSQN) e reposição de componentes/agentes (imposto estadual ICMS), registrando as operações em `SAIDA.DBF` e `PRODNFE.DBF`.

---

## 2. Responsabilidades

- Calcular o valor total dos serviços prestados na Ordem de Serviço. 🟢
- Segregar valores tributáveis por ISSQN (mão de obra, vistoria, ensaio) e ICMS (peças, manômetros, pó químico, válvulas). 🟢
- Gerar a Nota Fiscal com número sequencial único em `SAIDA.DBF`. 🟢
- Vincular a Nota Fiscal emitida à Ordem de Serviço em `VINNOTA.DBF`. 🟢
- Emitir a Nota Fiscal formatada em impressora matricial de formulário contínuo. 🟢

---

## 3. Regras de Negócio

- **RN-05 (Segregação Tributária ISSQN vs ICMS):** O faturamento deve desmembrar os itens cobrados em serviços (sujeitos a alíquota de ISSQN municipal) e fornecimento de peças/insumos (sujeitos a ICMS estadual). 🟢 CONFIRMADO (`nota.prg:88`)
- **RN-FAT-01 (Sequencial de Nota Fiscal):** O número da Nota Fiscal (`NUM_NF`) deve seguir um sequencial numérico único e ininterrupto para prestação de contas aos órgãos fiscais. 🟢 CONFIRMADO (`nota.prg:40`)

---

## 4. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
| :--- | :--- | :---: | :--- |
| **RF-01** | **Cálculo de Impostos (ISS/ICMS)** | Must | Desmembrar valores de serviços em `VAL_SERV` e peças em `VAL_PROD`. |
| **RF-02** | **Emissão de Nota Fiscal** | Must | Gravar registro em `SAIDA.DBF`, itens em `PRODNFE.DBF` e alterar status fiscal. |
| **RF-03** | **Vínculo Fiscal OS-Nota** | Must | Criar associação entre `NUM_OS` e `NUM_NF` na tabela `VINNOTA.DBF`. |
| **RF-04** | **Impressão Fiscal Matricial** | Must | Transmitir comandos ASCII de formulário contínuo para a porta `LPT1`. |

---

## 5. Requisitos Não Funcionais

| Tipo | Requisito Inferido | Evidência no Código | Confiança |
| :--- | :--- | :--- | :---: |
| **Confiabilidade Fiscal** | Gravação síncrona dos registros fiscais antes da emissão do formulário em papel. | `prg/nota.prg:120` | 🟢 |
| **Integridade Operacional** | Bloqueio de refaturamento para Ordens de Serviço já vinculadas em `VINNOTA.DBF`. | `prg/nota.prg:50` | 🟢 |

---

## 6. Critérios de Aceitação (Gherkin)

```gherkin
Cenário: Emissão de Nota Fiscal Mista (Serviços + Peças)
  Dado que a OS "001234" possui R$ 200,00 em serviços de ensaio e R$ 150,00 em peças substituídas
  Quando o operador confirma a emissão da Nota Fiscal
  Então o sistema deve gravar VAL_SERV = 200.00 e VAL_PROD = 150.00 em SAIDA.DBF
  E deve calcular o VAL_TOTAL = 350.00
  E deve emitir o formulário fiscal impresso em LPT1
```

---

## 7. Rastreabilidade de Código Legado

| Arquivo Legado | Função / Sub-rotina | Cobertura |
| :--- | :--- | :---: |
| `prg/nota.prg` | `NOTA()` | 🟢 |
| `prg/lancar.prg` | `LANCAR_FATURAMENTO()` | 🟢 |
| `prg/Fol.prg` | `EMITE_FOLHA_CAIXA()` | 🟢 |
