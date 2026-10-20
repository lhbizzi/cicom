# Diagrama Entidade-Relacionamento Completo (ERD) — CICOM

> Gerado pelo Arquiteto do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos arquivos DBF e índices NTX extraídos do código legados)

---

## 1. Diagrama ERD Completo em Mermaid

```mermaid
erDiagram
    CADCLI {
        Numeric CODIGO PK "Código único do Cliente (6)"
        Character NOME "Razão Social / Nome (45)"
        Character FANTASIA "Nome Fantasia (20)"
        Character ENDERECO "Logradouro e Número (40)"
        Character BAIRRO "Bairro (25)"
        Character CIDADE "Cidade (25)"
        Character ESTADO "Sigla UF (2)"
        Character CEP "Código Postal (9)"
        Character CNPJ "CNPJ ou CPF formatado (18)"
        Character INSC "Inscrição Estadual (15)"
        Character FONE "Telefone de contato (15)"
        Character CONTATO "Pessoa de contato (25)"
    }

    CADEXTIN {
        Character NUMERO PK "Número de Série no Gargalo do Extintor (12)"
        Numeric SEQUENCIA "Sequencial interno do cadastro (8)"
        Numeric COD_CLI FK "Código do Cliente Proprietário (6)"
        Character CAPACIDADE "Capacidade de carga (ex: 4kg, 10L) (10)"
        Character AGENTE "Agente Extintor (PQS, CO2, Agua, etc) (10)"
        Character FABRICANTE "Marca / Fabricante do Cilindro (15)"
        Numeric ANO_FABR "Ano de fabricação do vaso (4)"
        Date ULT_ENSAIO "Data do último ensaio hidrostático (8)"
        Date PROX_ENSAIO "Data limite próximo ensaio hidrostático (8)"
        Character NUM_SELO1 "Número do Selo de Conformidade atual (12)"
        Numeric NUM_OS "Número da última Ordem de Serviço (6)"
    }

    MOVTO {
        Numeric NUM_OS PK "Número único da Ordem de Serviço (6)"
        Numeric COD_CLI FK "Código do Cliente (6)"
        Date DATA_ENT "Data de entrada da OS (8)"
        Date DATA_SAI "Data de previsão/conclusão de saída (8)"
        Numeric VALOR_TOT "Valor total bruto da OS (12,2)"
        Character SITUACAO "Status da OS: A=Aberta, F=Fechada, C=Cancelada (1)"
        Character TECNICO "Nome do inspetor técnico responsável (20)"
    }

    MOV_ITEM {
        Numeric NUM_OS PK, FK "Número da Ordem de Serviço (6)"
        Character NUM_EXTIN PK, FK "Número de Série do Extintor (12)"
        Numeric NIVEL_MAN "Nível de Manutenção: 1=Vistoria, 2=Recarga, 3=Ensaio (1)"
        Numeric NUM_SELO FK "Número do Selo Inmetro atribuído (12)"
        Numeric VALOR_SERV "Valor cobrado pelo serviço (10,2)"
        Character PECAS_TROC "Descrição de peças e componentes trocados (40)"
        Numeric PRESSAO_EN "Pressão de teste hidrostático em kgf/cm2 (5,2)"
    }

    SELO {
        Numeric NUM_SELO PK "Número sequencial único do Selo Inmetro (12)"
        Character SERIE "Série alfabética do lote do selo (3)"
        Date DATA_REC "Data de recebimento do lote do IPEM (8)"
        Character STATUS "Status: E=Estoque, U=Usado, D=Danificado, C=Cancelado (1)"
        Numeric NUM_OS FK "Número da OS em que foi aplicado (6)"
    }

    FALTASEL {
        Numeric NUM_SELO PK "Número do Selo Inmetro inutilizado (12)"
        Date DATA "Data do registro da perda/dano (8)"
        Character MOTIVO "Justificativa da perda para o Inmetro (50)"
        Character OPERADOR "Operador que registrou o acerto (15)"
    }

    SAIDA {
        Numeric NUM_NF PK "Número da Nota Fiscal emitida (8)"
        Numeric NUM_OS FK "Número da Ordem de Serviço vinculada (6)"
        Numeric COD_CLI FK "Código do Cliente (6)"
        Date DATA_EMIS "Data de emissão da nota fiscal (8)"
        Numeric VAL_SERV "Valor total dos serviços (ISSQN) (12,2)"
        Numeric VAL_PROD "Valor total dos produtos/peças (ICMS) (12,2)"
        Numeric VAL_TOTAL "Valor total consolidado da Nota (12,2)"
    }

    PRODNFE {
        Numeric NUM_NF PK, FK "Número da Nota Fiscal (8)"
        Numeric ITEM PK "Número de ordem do item na nota (3)"
        Character COD_PROD "Código do produto ou serviço (10)"
        Character DESCRICAO "Descrição comercial do item (40)"
        Numeric QUANT "Quantidade fornecida (8,2)"
        Numeric VAL_UNIT "Valor unitário do item (10,2)"
        Numeric VAL_ITEM "Valor total do item (12,2)"
    }

    VINNOTA {
        Numeric NUM_OS PK, FK "Número da Ordem de Serviço (6)"
        Numeric NUM_NF PK, FK "Número da Nota Fiscal (8)"
        Date DATA_VINC "Data do vínculo fiscal (8)"
    }

    CADCLI ||--o{ MOVTO : "solicita (1:N)"
    CADCLI ||--o{ CADEXTIN : "possui (1:N)"
    CADCLI ||--o{ SAIDA : "faturado em (1:N)"
    
    MOVTO ||--|{ MOV_ITEM : "contém itens (1:N)"
    CADEXTIN ||--o{ MOV_ITEM : "submetido a (1:N)"
    
    SELO ||--o| MOV_ITEM : "alocado em (1:1 opt)"
    SELO ||--o| FALTASEL : "inutilizado em (1:1 opt)"
    
    MOVTO ||--o| VINNOTA : "associado a (1:1)"
    SAIDA ||--o| VINNOTA : "associa (1:1)"
    SAIDA ||--|{ PRODNFE : "detalhado em (1:N)"
```

---

## 2. Dicionário Relacional Detalhado

### 2.1 Tabela `CADCLI.DBF` (Cadastro Mestre de Clientes)
- **Descrição:** Tabela principal contendo as entidades de clientes atendidos.
- **Arquivo de Índices:**
  - `CADCLICD.NTX` (Chave Primária Lógica: `STR(CODIGO,6)`)
  - `CADCLINM.NTX` (Busca Por Razão Social: `NOME`)

---

### 2.2 Tabela `CADEXTIN.DBF` (Cadastro Mestre de Extintores)
- **Descrição:** Tabela de ativos de segurança (cilindros). Um extintor pertence a um único cliente.
- **Arquivo de Índices:**
  - `CADEXTIN.NTX` (Chave Primária Lógica: `NUMERO`)
  - `CADEXTI1.NTX` (Busca por Cliente: `STR(COD_CLI,6)+NUMERO`)
  - `EXTSELO.NTX` (Busca por Selo Atual: `NUM_SELO1`)

---

### 2.3 Tabela `MOVTO.DBF` (Cabeçalho de Ordens de Serviço)
- **Descrição:** Registra a transação de entrada de um lote de extintores para manutenção.
- **Arquivo de Índices:**
  - `MOVTO.NTX` (Chave Primária Lógica: `STR(NUM_OS,6)`)
  - `MOVTO1.NTX` (Busca por Cliente e OS: `STR(COD_CLI,6)+STR(NUM_OS,6)`)

---

### 2.4 Tabela `MOV_ITEM.DBF` (Itens e Laudos de Serviço da OS)
- **Descrição:** Tabela de ligação N:M entre `MOVTO` e `CADEXTIN`, contendo os detalhes técnicos de cada extintor na OS.
- **Arquivo de Índices:**
  - `MOV_ITEM.NTX` (Chave Composta: `STR(NUM_OS,6)+NUM_EXTIN`)
  - `MOVITEM1.NTX` (Busca por Selo Aplicado: `STR(NUM_SELO,12)`)

---

### 2.5 Tabela `SELO.DBF` (Estoque e Alocação de Selos Inmetro)
- **Descrição:** Tabela de rastreabilidade de cada selo autoadesivo fornecido pelo IPEM/Inmetro.
- **Arquivo de Índices:**
  - `NUMSELO.NTX` (Chave Primária Lógica: `STR(NUM_SELO,12)`)

---

### 2.6 Tabela `FALTASEL.DBF` (Registro de Perdas e Inutilização de Selos)
- **Descrição:** Guarda a justificativa oficial de selos rasurados, rasgados, danificados ou extraviados.
- **Chave de Pesquisa Lógica:** `STR(NUM_SELO,12)`.

---

### 2.7 Tabela `SAIDA.DBF` (Notas Fiscais Emitidas)
- **Descrição:** Cabeçalho do faturamento gerado para encerramento de OS.
- **Arquivo de Índices:**
  - `SAIDA.NTX` (Chave Primária Lógica: `STR(NUM_NF,8)`).

---

## 3. Matriz de Integridade Referencial Implicita

Como o banco de dados ISAM/dBase III não possui suporte a `FOREIGN KEY` nativo, a integridade é mantida via **código Clipper**:

| Tabela Origem | Campo FK | Tabela Destino | Campo PK | Tipo de Validação | Localização no Código Legado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `MOVTO` | `COD_CLI` | `CADCLI` | `CODIGO` | Checagem por `SEEK` | `SIST1.PRG:45` |
| `CADEXTIN` | `COD_CLI` | `CADCLI` | `CODIGO` | Checagem por `SEEK` | `CADERNO1.PRG:110` |
| `MOV_ITEM` | `NUM_OS` | `MOVTO` | `NUM_OS` | Vínculo de Chave Parente | `CADERNO1.PRG:180` |
| `MOV_ITEM` | `NUM_EXTIN` | `CADEXTIN` | `NUMERO` | Checagem por `SEEK` | `CADERNO1.PRG:195` |
| `MOV_ITEM` | `NUM_SELO` | `SELO` | `NUM_SELO` | Trava de Status `STATUS == 'E'` | `digse.prg:60` |
| `SAIDA` | `NUM_OS` | `MOVTO` | `NUM_OS` | Checagem na baixa fiscal | `nota.prg:75` |
