# Módulo Lançamento em Lote de Selos Inmetro (`digita_selos`), Design Técnico

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/DIGITA.PRG`, `prg/digse.prg`, `prg/acerto.PRG`)

---

## 1. Interface e Assinatura das Funções

| Símbolo | Assinatura / Parâmetros | Retorno | Descrição & Localização |
| :--- | :--- | :--- | :--- |
| `DIGITA()` | `()` | `NIL` | Loop principal da tela de digitação em lote. (`DIGITA.PRG:15`) |
| `DIGSE()` | `(nNumSelo: Numeric, nNumOS: Numeric, cExtin: Character)` | `Logical` | Valida, busca no NTX `NUMSELO.NTX` e consome o selo. (`digse.prg:40`) |
| `ACERTO_SELO()`| `(nNumSelo: Numeric, cMotivo: Character)` | `Logical` | Registra a perda do selo na tabela `FALTASEL.DBF`. (`acerto.PRG:25`) |

---

## 2. Fluxo Principal de Processamento de Selo

```mermaid
sequenceDiagram
    autonumber
    actor Operador
    participant DIGITA as DIGITA.PRG
    participant DIGSE as digse.prg
    participant DB_SELO as SELO.DBF
    participant DB_ITEM as MOV_ITEM.DBF

    Operador->>DIGITA: Digita Selo Inmetro (Ex: 123456)
    DIGITA->>DIGSE: DIGSE(123456, nNumOS, cExtin)
    DIGSE->>DB_SELO: SEEK 123456 (NUMSELO.NTX)
    alt Selo Encontrado e STATUS == 'E'
        DIGSE->>DB_SELO: RLOCK(), STATUS := 'U', NUM_OS := nNumOS, UNLOCK
        DIGSE->>DB_ITEM: RLOCK(), NUM_SELO := 123456, UNLOCK
        DIGSE-->>DIGITA: Retorna .T. (Sucesso)
        DIGITA-->>Operador: Avança para Próximo Extintor
    else Selo Não Encontrado ou Já Utilizado (STATUS != 'E')
        DB_SELO-->>DIGSE: Erro de Validação
        DIGSE-->>DIGITA: Retorna .F.
        DIGITA-->>Operador: Beep de Alerta "Selo Inválido ou Já Usado"
    end
```

---

## 3. Decisões de Design Identificadas

| Decisão | Evidência no Código Legado | Confiança |
| :--- | :--- | :---: |
| **Executável / Menu Autônomo para Evitar Overhead TUI** | Estrutura isolada em `DIGITA.PRG` | 🟢 |
| **Atalho de Teclado Direto para Lançamento de Danificados** | Leitura de tecla `INKEY()` interceptando `K_F9` para chamar `ACERTO_SELO()` | 🟢 |

---

## 4. Riscos e Lacunas

- 🔴 **Concorrência em Faixas Sequenciais de Selos:** Se dois operadores lançarem selos da mesma faixa simultaneamente, pode ocorrer rejeição de leitura em `NUMSELO.NTX`.
