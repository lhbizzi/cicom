# Especificação de Tela: Caderno de Extintores (Inspeção & Ensaio) — CICOM Modern

> Gerado pelo Screen Translator Reversa (`/reversa-migrate`)  
> Componente / Rota: `/oficina/caderno-extintores`  
> Data: 2026-09-28  

---

## 1. Visão Geral da Tela

Esta tela traduz a operação do módulo legado `caderno_extintores` (`CADERNO1.PRG`). É o local onde os técnicos registram os ensaios hidrostáticos, cargas, pressões e trocas de componentes, calculando automaticamente as datas de validade conforme a norma ABNT NBR 12962.

---

## 2. Layout da Interface (Wireframe / Mockup Structural)

```
+-----------------------------------------------------------------------------------+
|  Caderno de Inspeção e Ensaio Hidrostático - Caderno 1                            |
+-----------------------------------------------------------------------------------+
|  Ordem de Serviço: [ #1042 - Usina Santa Rita S/A                ] [ Buscar OS ]  |
+-----------------------------------------------------------------------------------+
|  DADOS DO EXTINTOR                                                                |
|  Nº de Série:   [ EXT-884920     ]  Fabricante: [ Kidde           ]                 |
|  Ano Fabr.:     [ 2021           ]  Capacidade: [ 10 kg           ]                 |
|  Agente Ext.:   [ PQS ABC        ]  Pressão Trab: [ 10.5 kgf/cm²  ]                 |
+-----------------------------------------------------------------------------------+
|  MANUTENÇÃO E ENSAIO HIDROSTÁTICO                                                 |
|  Nível Manut.:  ( ) Nível 1  ( ) Nível 2  (*) Nível 3 (Ensaio Hidrostático)       |
|  Data Ensaio:   [ 28/09/2026     ]  (Data Atual)                                  |
|  Nova Validade: [ 28/09/2031     ]  (Calculada: Exatos 5 anos ABNT NBR 12962)    |
|  Pressão Ensaio:[ 25.0 kgf/cm²   ]  Resultado:  (*) Aprovado  ( ) Reprovado       |
+-----------------------------------------------------------------------------------+
|  COMPONENTES E PEÇAS TROCADAS                                                     |
|  [X] Válvula de Segurança    [X] Anel O-ring      [ ] Mangote de Descarga         |
|  [X] Manômetro 14kg          [ ] Manípulo         [ ] Difusor CO2                 |
+-----------------------------------------------------------------------------------+
|  SELO INMETRO                                                                     |
|  Número do Selo: [ 18492019     ] (Selo associado da faixa de estoque)            |
+-----------------------------------------------------------------------------------+
|  [ F2 - Gravar Registro ]  [ F8 - Imprimir Etiqueta Zebra ]  [ Esc - Cancelar ]   |
+-----------------------------------------------------------------------------------+
```

---

## 3. Regras de Interface e Validações

1. **Cálculo Automático de Validade ABNT:**
   - Ao selecionar Nível 3 (Ensaio Hidrostático), o campo **Nova Validade** é preenchido automaticamente somando **exatos 5 anos** ao mês e dia da data do teste (ex: `28/09/2026` → `28/09/2031`).
2. **Associação de Selo Inmetro:**
   - O campo **Número do Selo** é pré-preenchido com o próximo selo vago da faixa alocada para a bancada do técnico.
3. **Disparo de Impressão de Etiqueta Zebra (USB):**
   - Ao clicar em `Imprimir Etiqueta Zebra` (ou pressionar `F8`), o sistema gera o payload ZPL com o código de barras, modelo, lote e vencimento do extintor, disparando a impressão via `WebSocket` local (`ws://localhost:9100`).
