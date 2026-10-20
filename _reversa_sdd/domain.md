# Domínio de Negócio e Glossário — CICOM

> Gerado pelo Detetive do Reversa em 2026-09-18
> Nível de Documentação: **Detalhado**

---

## 1. Glossário do Domínio

| Termo / Conceito | Descrição Térmica e Operacional | Módulo / Tabela Relacionada | Confiança |
| :--- | :--- | :--- | :---: |
| **Vaso de Pressão / Cilindro** | Recipiente metálico destinado a armazenar agente extintor sob pressão. Identificado por número de série gravado no gargalo. | `CADEXTIN.DBF` (`NUMERO`) | 🟢 |
| **Agente Extintor** | Substância utilizada para extinção de incêndio (PQS - Pó Químico Seco, CO2 - Gás Carbônico, Água Pressurizada, Espuma Mecânica, Halon). | `CADEXTIN.DBF` (`AGENTE`) | 🟢 |
| **Nível 1 de Manutenção** | Inspeção visual, verificação de carga, limpeza e checagem de componentes sem despressurização do cilindro. | `MOV_ITEM.DBF` (`NIVEL_MAN = 1`) | 🟢 |
| **Nível 2 de Manutenção** | Manutenção preventiva/corretiva com despressurização, substituição de agente extintor e componentes internos. | `MOV_ITEM.DBF` (`NIVEL_MAN = 2`) | 🟢 |
| **Nível 3 de Manutenção** | Ensaio hidrostático de alta pressão para verificação de resistência do vaso de pressão. Obrigatório a cada 5 anos. | `MOV_ITEM.DBF` (`NIVEL_MAN = 3`) | 🟢 |
| **Selo de Conformidade Inmetro** | Etiqueta autoadesiva de alta segurança com numeração sequencial única fornecida por órgãos acreditados (IPEM/Inmetro). | `SELO.DBF` (`NUM_SELO`) | 🟢 |
| **Falta de Selo / Selo Danificado** | Ocorrência em que um selo é rasurado, destruído ou extraviado durante o processo de aplicação ou transporte. | `FALTASEL.DBF` | 🟢 |
| **Ordem de Serviço (OS)** | Documento formal de entrada, acompanhamento técnico e saída do lote de extintores de um cliente. | `MOVTO.DBF` / `MOV_ITEM.DBF` | 🟢 |
| **Laudo de Ensaio Hidrostático** | Registro dos parâmetros de teste de pressão (kgf/cm²) e resultado de expansão volumétrica do cilindro. | `MOV_ITEM.DBF` (`PRESSAO_EN`) | 🟢 |
| **Etiqueta Zebra (ZPL/EPL)** | Rótulo térmico de instrução de operação, classe de fogo e garantia afixado ao corpo do extintor. | `EtiZebra/` | 🟢 |

---

## 2. Regras de Negócio Implícitas (RN)

### RN-01: Obrigatoriedade de Atribuição de Selo Inmetro 🟢 CONFIRMADO
- **Descrição:** Todo extintor que passa por manutenção (Nível 1, 2 ou 3) deve obrigatoriamente ter um número de Selo de Conformidade Inmetro associado antes do encerramento da Ordem de Serviço.
- **Implementação Legada:** Validação na função `BAIXAOS()` em `SIST1.PRG` e `DIGSE()` em `digse.prg`.
- **Rastreabilidade:** `MOV_ITEM.NUM_SELO` -> `SELO.NUM_SELO`.

### RN-02: Periodicidade e Controle de Ensaio Hidrostático (Nível 3) 🟢 CONFIRMADO
- **Descrição:** O cilindro submetido a ensaio hidrostático (Nível 3) ganha validade de 5 anos para o próximo teste. Caso a data do próximo ensaio esteja vencida, o sistema deve forçar a manutenção de Nível 3.
- **Implementação Legada:** Calculado em `CADERNO1.PRG` (`PROX_ENSAIO = ULT_ENSAIO + 5 anos`).
- **Rastreabilidade:** `CADEXTIN.ULT_ENSAIO` e `CADEXTIN.PROX_ENSAIO`.

### RN-03: Controle de Perdas e Inutilização de Selos (`FALTASEL`) 🟢 CONFIRMADO
- **Descrição:** Selos danificados ou rasurados não podem ser simplesmente excluídos da base; devem ser registrados com o motivo da perda na tabela `FALTASEL.DBF` para prestação de contas ao Inmetro/IPEM.
- **Implementação Legada:** Rotina de lançamento em `DIGITA.PRG`.
- **Rastreabilidade:** `FALTASEL.DBF` (`NUM_SELO`, `MOTIVO`, `DATA`).

### RN-04: Transição de Status da Ordem de Serviço (`BAIXAOS`) 🟢 CONFIRMADO
- **Descrição:** Uma OS só pode transitar de Aberta (`A`) para Fechada (`F`) se todos os itens (`MOV_ITEM`) possuírem selo alocado e valor de serviço calculado.
- **Implementação Legada:** Loop de checagem em `BAIXAOS()` (`SIST1.PRG`).
- **Rastreabilidade:** `MOVTO.SITUACAO`.

### RN-05: Segregação Fiscal de Serviços (ISSQN) e Produtos/Peças (ICMS) 🟢 CONFIRMADO
- **Descrição:** O faturamento da manutenção de extintores exige o desmembramento do valor cobrado em prestação de serviços (imposto municipal ISSQN) e reposição de peças/agente (imposto estadual ICMS).
- **Implementação Legada:** Cálculo na função `NOTA()` em `nota.prg` gravando em `SAIDA.DBF` e `PRODNFE.DBF`.
- **Rastreabilidade:** `SAIDA.DBF` / `VINNOTA.DBF`.

### RN-06: Chave de Rastreabilidade do Cilindro 🟢 CONFIRMADO
- **Descrição:** Um extintor é identificado de forma única pela combinação de seu Número de Série (`NUMERO`) e o Código do Cliente proprietário (`COD_CLI`), permitindo historicidade quando cilindros de números idênticos pertencem a clientes distintos.
- **Implementação Legada:** Índice `CADEXTI1.NTX` (`STR(COD_CLI,6)+NUMERO`).
- **Rastreabilidade:** `CADEXTIN.DBF`.

### RN-07: Bloqueio de Baixa sem Laudo Técnico de Pressão 🟡 INFERIDO
- **Descrição:** Manutenções de Nível 3 exigem o registro do valor da pressão de teste em `PRESSAO_EN` antes da emissão da ficha de liberação do caderno de ensaios.
- **Implementação Legada:** Lógica inferida em `CADERNO3.PRG` / `caderno4.prg`.
- **Rastreabilidade:** `MOV_ITEM.PRESSAO_EN`.

---

## 3. Matriz de Rastreabilidade Regra vs Arquivo

| Regra | Arquivo Principal | Função / Rotina | Tabela Impactada | Status |
| :--- | :--- | :--- | :--- | :---: |
| RN-01 | `SIST1.PRG` / `digse.prg` | `BAIXAOS()` / `DIGSE()` | `SELO.DBF`, `MOV_ITEM.DBF` | 🟢 CONFIRMADO |
| RN-02 | `CADERNO1.PRG` | `LANCAR()` | `CADEXTIN.DBF` | 🟢 CONFIRMADO |
| RN-03 | `DIGITA.PRG` | `DIGITA()` | `FALTASEL.DBF`, `SELO.DBF` | 🟢 CONFIRMADO |
| RN-04 | `SIST1.PRG` | `BAIXAOS()` | `MOVTO.DBF` | 🟢 CONFIRMADO |
| RN-05 | `nota.prg` | `NOTA()` | `SAIDA.DBF`, `VINNOTA.DBF` | 🟢 CONFIRMADO |
| RN-06 | `PEQLIB.PRG` | `findex` / `CADEXTIN` | `CADEXTIN.DBF` | 🟢 CONFIRMADO |
| RN-07 | `CADERNO3.PRG` | `LANCAR()` | `MOV_ITEM.DBF` | 🟡 INFERIDO |
