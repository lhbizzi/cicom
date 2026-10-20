# Módulo Faturamento e Emissão de Notas Fiscais (`faturamento_notas`), Design Técnico

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/nota.prg`, `prg/lancar.prg`)

---

## 1. Interface e Assinatura das Funções

| Símbolo | Assinatura / Parâmetros | Retorno | Descrição & Localização |
| :--- | :--- | :--- | :--- |
| `NOTA()` | `(nNumOS: Numeric)` | `Logical` | Função principal de emissão fiscal para a OS informada. (`nota.prg:20`) |
| `CALC_IMPOSTOS()`| `(nValServ: Numeric, nValProd: Numeric)` | `Object` | Retorna o desmembramento de ISSQN e ICMS. (`nota.prg:85`) |
| `IMPRIME_NF()` | `(nNumNF: Numeric)` | `NIL` | Formata e envia stream ASCII para `LPT1`. (`nota.prg:140`) |

---

## 2. Fluxo Principal de Processamento Fiscal

```mermaid
sequenceDiagram
    autonumber
    actor Operador
    participant NOTA as nota.prg
    participant DB_OS as MOVTO.DBF
    participant DB_NF as SAIDA.DBF
    participant DB_VINC as VINNOTA.DBF

    Operador->>NOTA: Informa Número da OS (Ex: 001234)
    NOTA->>DB_OS: Busca OS e calcula Totais de Serviços e Peças
    NOTA->>DB_VINC: Verifica se a OS já foi faturada
    alt OS Não Faturada
        NOTA->>DB_NF: Incrementa e obtém NUM_NF
        NOTA->>DB_NF: APPEND BLANK (Grava SAIDA.DBF)
        NOTA->>DB_VINC: Grava vínculo NUM_OS <-> NUM_NF
        NOTA->>NOTA: IMPRIME_NF(NUM_NF) -> Output LPT1
        NOTA-->>Operador: Emissão Concluída com Sucesso
    else OS Já Faturada
        DB_VINC-->>NOTA: Vínculo Encontrado
        NOTA-->>Operador: Alerta "OS Já Faturada na Nota Fiscal X"
    end
```

---

## 3. Decisões de Design Identificadas

| Decisão | Evidência no Código Legado | Confiança |
| :--- | :--- | :---: |
| **Segregação de Imposto em Campos Dedicados (`VAL_SERV`, `VAL_PROD`)** | Campos em `SAIDA.DBF` (`VAL_SERV`, `VAL_PROD`, `VAL_TOTAL`) | 🟢 |
| **Tabela de Vínculo N:M Flexível (`VINNOTA.DBF`)** | Permite vincular uma ou mais Ordens de Serviço a uma única Nota Fiscal | 🟢 |

---

## 4. Riscos e Lacunas

- 🔴 **Incompatibilidade com NF-e Eletrônica Modernas (SEFAZ XML):** O código legado emite notas fiscais em papel por formulário contínuo ASCII, sem integração HTTP/SOAP com web services de Secretarias da Fazenda.
