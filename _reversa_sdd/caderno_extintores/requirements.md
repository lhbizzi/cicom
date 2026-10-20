# Módulo Caderno de Vistorias e Ensaios Hidrostáticos (`caderno_extintores`), Especificação de Requisitos

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/CADERNO1.PRG` a `prg/CADERNO5.PRG` e `prg/caderno.prg`)

---

## 1. Visão Geral

O módulo **`caderno_extintores`** gerencia o núcleo técnico de engenharia de manutenção de extintores de incêndio do **CICOM**. Ele engloba o controle de vistorias técnicas (Nível 1), recargas (Nível 2) e testes de pressão hidrostática em alta pressão (Nível 3), garantindo conformidade legal com as normas da ABNT NBR 12962 / NBR 13485 e exigências do Inmetro.

---

## 2. Responsabilidades

- Registrar e cadastrar cilindros de extintores de incêndio em `CADEXTIN.DBF` vinculados ao cliente proprietário. 🟢
- Registrar o nível de manutenção executado (Nível 1: Vistoria, Nível 2: Recarga, Nível 3: Ensaio Hidrostático). 🟢
- Calcular e atualizar automaticamente a data limite do próximo ensaio hidrostático (`PROX_ENSAIO = ULT_ENSAIO + 5 anos`) quando for Nível 3. 🟢
- Registrar a pressão de teste aplicada em kgf/cm² (`PRESSAO_EN`) e medição de expansão volumétrica. 🟢
- Emitir a Ficha / Laudo de Ensaio Hidrostático para auditoria do Inmetro/IPEM (`R2EXTINTOR`). 🟢

---

## 3. Regras de Negócio

- **RN-02 (Periodicidade do Ensaio Hidrostático - Nível 3):** Extintores submetidos a ensaio hidrostático recebem a validade de 5 anos para o próximo teste (`PROX_ENSAIO = ULT_ENSAIO + 5 anos`). Se a data atual for maior ou igual a `PROX_ENSAIO`, o sistema deve obrigatoriamente forçar a manutenção de Nível 3. 🟢 CONFIRMADO (`CADERNO1.PRG:235`)
- **RN-06 (Chave Única do Extintor):** Um extintor é identificado de forma única pela combinação do Número de Série gravado no casco (`NUMERO`) e pelo código do cliente proprietário (`COD_CLI`). 🟢 CONFIRMADO (`PEQLIB.PRG:120`, Index `CADEXTI1.NTX`)
- **RN-07 (Pressão Mínima de Teste):** Manutenções de Nível 3 em vasos de alta pressão (ex: CO2) exigem a digitação do valor de pressão em kgf/cm² (`PRESSAO_EN`), que deve estar dentro da faixa homologada pelo fabricante. 🟢 CONFIRMADO (`CADERNO3.PRG:80`)

---

## 4. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
| :--- | :--- | :---: | :--- |
| **RF-01** | **Cadastro / Identificação do Cilindro** | Must | Registrar Número de Série, Fabricante, Ano de Fabricação, Agente Extintor e Capacidade. |
| **RF-02** | **Lançamento de Manutenção (Nível 1, 2 e 3)** | Must | Permitir selecionar o nível de serviço e registrar peças trocadas (`PECAS_TROC`). |
| **RF-03** | **Cálculo da Validade de 5 Anos** | Must | Se `NIVEL_MAN == 3`, atualizar `ULT_ENSAIO` com a data atual e `PROX_ENSAIO = DATA + 5 anos`. |
| **RF-04** | **Registro de Pressão de Ensaio** | Must | Exigir o valor em kgf/cm² em `PRESSAO_EN` para ensaios hidrostáticos de alta pressão. |
| **RF-05** | **Emissão de Laudo Técnico** | Must | Gerar relatório em formulário contínuo via `R2EXTINTOR()` contendo histórico de testes. |

---

## 5. Requisitos Não Funcionais

| Tipo | Requisito Inferido | Evidência no Código | Confiança |
| :--- | :--- | :--- | :---: |
| **Performance** | Busca indexada por Número de Série via `CADEXTIN.NTX` e por Cliente via `CADEXTI1.NTX`. | `prg/CADERNO1.PRG:60` | 🟢 |
| **Segurança** | Restrição de alteração de histórico de testes a usuários comuns após impressão do laudo. | `prg/CADERNO1.PRG:310` | 🟡 |
| **Confiabilidade** | Armazenamento de dados históricos por 5 anos para atender fiscalização do IPEM. | Exigência legal ABNT NBR 12962 | 🟢 |

---

## 6. Critérios de Aceitação (Gherkin)

```gherkin
Cenário: Lançamento de Ensaio Hidrostático (Nível 3)
  Dado que o extintor "EXT-5544" do cliente "000123" passa por manutenção de Nível 3 na data "2026-09-18"
  Quando o operador digita a pressão de ensaio "250.00" kgf/cm2 e confirma a manutenção
  Então o sistema deve atualizar ULT_ENSAIO para "2026-09-18"
  E deve calcular PROX_ENSAIO para "2031-09-18"
  E deve gravar o registro em MOV_ITEM.DBF com NIVEL_MAN = 3

Cenário: Alerta de Ensaio Hidrostático Vencido
  Dado que o extintor "EXT-1010" possui a data PROX_ENSAIO igual a "2025-05-10" (Vencida)
  Quando o operador tenta lançar uma manutenção de Nível 1 (Apenas Vistoria)
  Então o sistema deve emitir um alerta "Ensaio Hidrostático Vencido! Manutenção de Nível 3 Obrigatória."
```

---

## 7. Rastreabilidade de Código Legado

| Arquivo Legado | Função / Sub-rotina | Cobertura |
| :--- | :--- | :---: |
| `prg/CADERNO1.PRG` | `LANCAR()`, `R2EXTINTOR()` | 🟢 |
| `prg/CADERNO2.PRG` | `TELAOS()`, `DIGITA_EXTIN()` | 🟢 |
| `prg/CADERNO3.PRG` | `LAUDO_PRESSAO()` | 🟢 |
| `prg/caderno.prg` | `MENU_CADERNO()` | 🟢 |
