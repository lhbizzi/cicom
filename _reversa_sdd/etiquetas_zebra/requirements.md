# Módulo Etiquetas Térmicas Zebra (`etiquetas_zebra`), Especificação de Requisitos

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes em `EtiZebra/`)

---

## 1. Visão Geral

O módulo **`etiquetas_zebra`** gerencia o formato e a transmissão de comandos em linguagem **ZPL II (Zebra Programming Language)** ou **EPL2** para impressoras térmicas diretas. Ele gera os rótulos de instrução de operação (NR-23), garantia e identificação do Selo Inmetro colados no casco dos extintores.

---

## 2. Responsabilidades

- Formatar o layout visual das etiquetas de conformidade Inmetro. 🟢
- Injetar dados dinâmicos do cilindro (`NUMERO`, `CAPACIDADE`, `AGENTE`, `PROX_ENSAIO`, `NUM_SELO`). 🟢
- Transmitir a stream de comandos ZPL II para a impressora. 🟢

---

## 3. Regras de Negócio

- **RN-ETI-01 (Código de Barras do Selo):** A etiqueta deve conter o código de barras no padrão Code 128 contendo a numeração exata do Selo de Conformidade Inmetro afixado. 🟢 CONFIRMADO (`EtiZebra/Etiqueta/ETIQUETA.PRG:30`)

---

## 4. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
| :--- | :--- | :---: | :--- |
| **RF-01** | **Geração de Stream ZPL II** | Must | Montar comandos `^XA ... ^XZ` com os campos do extintor e do selo. |
| **RF-02** | **Impressão por Lote de Extintores** | Should | Imprimir todas as etiquetas dos extintores de uma OS em uma única chamada. |

---

## 5. Rastreabilidade de Código Legado

| Arquivo Legado | Função / Sub-rotina | Cobertura |
| :--- | :--- | :---: |
| `EtiZebra/Etiqueta/ETIQUETA.PRG` | `IMPRIME_ETIQUETA_ZEBRA()` | 🟢 |
| `EtiZebra/EtiNR23/ETINR23.PRG` | `IMPRIME_NR23()` | 🟢 |
