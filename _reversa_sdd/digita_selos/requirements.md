# Módulo Lançamento em Lote de Selos Inmetro (`digita_selos`), Especificação de Requisitos

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/DIGITA.PRG`, `prg/digse.prg`, `prg/acerto.PRG`, `prg/seq.prg`, `prg/MARRETA.PRG`)

---

## 1. Visão Geral

O módulo **`digita_selos`** é o subsistema de altíssima produtividade do **CICOM** projetado para digitação rápida e contínua de números de Selos de Conformidade Inmetro alocados a cada extintor da Ordem de Serviço, bem como a prestação de contas de perdas, danos e rasuras para auditoria fiscal (`FALTASEL.DBF`).

---

## 2. Responsabilidades

- Prover interface de entrada de dados ultra-rápida sem delays ou caixas de diálogo desnecessárias (`DIGITA.PRG`). 🟢
- Validar se o número do selo digitado consta na base `SELO.DBF` e está com status de estoque (`STATUS = 'E'`). 🟢
- Vincular a numeração do selo ao registro do extintor em `MOV_ITEM.DBF` e alterar o status em `SELO.DBF` para usado (`STATUS = 'U'`). 🟢
- Tratar e auditar selos danificados, extraviados ou rasurados, gravando em `FALTASEL.DBF` com a devida justificativa (`acerto.PRG`). 🟢

---

## 3. Regras de Negócio

- **RN-01 (Atribuição Única de Selo Inmetro):** Cada extintor submetido a manutenção exige a vinculação de um único número de selo válido e exclusivo. O mesmo selo não pode ser alocado a dois extintores distintos. 🟢 CONFIRMADO (`digse.prg:50`)
- **RN-03 (Registro Obrigatório de Selos Inutilizados - `FALTASEL`):** Selos danificados no momento da aplicação ou extraviados não podem ser apagados do sistema; devem ser obrigatoriamente registrados em `FALTASEL.DBF` indicando a causa para prestação de contas ao IPEM/Inmetro. 🟢 CONFIRMADO (`acerto.PRG:30`, `DIGITA.PRG:112`)

---

## 4. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
| :--- | :--- | :---: | :--- |
| **RF-01** | **Digitação Rápida em Lote** | Must | Permitir digitação sequencial de selos teclando apenas ENTER para avançar de item em item. |
| **RF-02** | **Validação de Estoque de Selos** | Must | Checar se o selo existe em `SELO.DBF` e está livre (`STATUS == 'E'`). |
| **RF-03** | **Alocação de Selo na OS** | Must | Atualizar `MOV_ITEM->NUM_SELO = nSelo` e marcar `SELO->STATUS = 'U'`. |
| **RF-04** | **Lançamento de Selo Danificado (`FALTASEL`)** | Must | Permitir acionar tecla de atalho (ex: F9/F10) para marcar o selo como danificado em `FALTASEL.DBF`. |

---

## 5. Requisitos Não Funcionais

| Tipo | Requisito Inferido | Evidência no Código | Confiança |
| :--- | :--- | :--- | :---: |
| **Ergonomia / Produtividade** | Tempo de resposta de validação de selo por digitação < 100ms. | `prg/DIGITA.PRG:45` | 🟢 |
| **Integridade Rastreável** | Trava de concorrência com `RLOCK()` na tabela `SELO.DBF` durante o consumo. | `prg/digse.prg:65` | 🟢 |

---

## 6. Critérios de Aceitação (Gherkin)

```gherkin
Cenário: Alocação com Sucesso de Selo Em Estoque
  Dado que o selo de número "99887766" possui o status "E" (Estoque) em SELO.DBF
  Quando o operador digita "99887766" para o extintor "EXT-1234" na OS "00100"
  Então o sistema deve associar o selo em MOV_ITEM.DBF
  E deve alterar o status do selo em SELO.DBF para "U" (Usado)

Cenário: Registro de Selo Danificado (FALTASEL)
  Dado que o operador danifica a etiqueta autoadesiva do selo "99887767"
  Quando o operador aciona a rotina de acerto e justifica "Rasurado durante aplicação no cilindro"
  Então o sistema deve alterar o status do selo em SELO.DBF para "D" (Danificado)
  E deve inserir um registro auditável em FALTASEL.DBF
```

---

## 7. Rastreabilidade de Código Legado

| Arquivo Legado | Função / Sub-rotina | Cobertura |
| :--- | :--- | :---: |
| `prg/DIGITA.PRG` | `DIGITA()` | 🟢 |
| `prg/digse.prg` | `DIGSE()` | 🟢 |
| `prg/acerto.PRG` | `ACERTO_SELO()` | 🟢 |
| `prg/seq.prg` | `VALIDA_SEQUENCIA()` | 🟢 |
