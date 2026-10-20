# Especificação de Tela: Digitação Rápida de Selos Inmetro — CICOM Modern

> Gerado pelo Screen Translator Reversa (`/reversa-migrate`)  
> Componente / Rota: `/oficina/digita-selos`  
> Data: 2026-09-28  

---

## 1. Visão Geral da Tela

Esta tela é a versão moderna do módulo legado `digita_selos` (`DIGITA.PRG`). Trata-se de uma interface de **alta produtividade baseada exclusivamente em navegação por teclado (sem necessidade de mouse)**, utilizada pelos operadores da oficina para vincular sequências contínuas de Selos Inmetro aos extintores ensaiados.

---

## 2. Layout da Interface (Wireframe / Mockup Structural)

```
+-----------------------------------------------------------------------------------+
|  Lançamento e Digitação de Selos Inmetro (Modo Alta Produtividade)                |
+-----------------------------------------------------------------------------------+
|  Lote / Ordem de Serviço: [ #1042 - Usina Santa Rita S/A       ]                  |
|  Técnico Responsável:     [ Carlos Eduardo (Bancada 02)       ]                  |
+-----------------------------------------------------------------------------------+
|  ENTRADA RÁPIDA DE SEQUÊNCIA DE SELOS                                             |
|  Selo Inicial: [ 1048201    ]  Selo Final: [ 1048215    ]  Qtd: 15 Selos          |
|  [ Enter - Processar Sequência ]                                                  |
+-----------------------------------------------------------------------------------+
|  GRADE DE MATRICIALMENTE / EXTINTORES ASSOCIADOS                                  |
|  Item | Nº Extintor   | Agente Extintor | Capacity | Selo Atribuído | Status       |
|  01   | EXT-99201     | PQS 4kg         | 4 kg     | 1048201        | Validado OK  |
|  02   | EXT-99202     | CO2 6kg         | 6 kg     | 1048202        | Validado OK  |
|  03   | EXT-99203     | Água 10L        | 10 L     | 1048203        | Validado OK  |
|  ...  | ...           | ...             | ...      | ...            | ...          |
+-----------------------------------------------------------------------------------+
|  RESUMO DO LOTE                                                                   |
|  Total Validados: 15  |  Divergências/Pulos: 0  |  Selos Danificados: 0            |
+-----------------------------------------------------------------------------------+
|  [ F2 - Confirmar Lote ]  [ F6 - Marcar Selo Danificado ]  [ Esc - Limpar ]       |
+-----------------------------------------------------------------------------------+
```

---

## 3. Comportamento Operacional & Teclado

1. **Auto-Tab e Navegação Contínua por Enter:**
   - Ao digitar o **Selo Inicial** e pressionar `Enter`, o cursor avança para **Selo Final**.
   - Pressionar `Enter` no Selo Final preenche automaticamente a tabela abaixo relacionando a ordem dos extintores.
2. **Validação de Duplicidade e Lacunas (Gaps):**
   - O backend impede a inserção de selos já utilizados em outras OSs ou fora da faixa liberada pelo Inmetro.
3. **Atalhos Rápidos:**
   - `F6`: Marca o selo selecionado como "Danificado / Rasgado no Manuseio" (exigido para prestação de contas ao IPEM).
   - `F2`: Salva e gera a listagem de auditoria oficial do Inmetro.
