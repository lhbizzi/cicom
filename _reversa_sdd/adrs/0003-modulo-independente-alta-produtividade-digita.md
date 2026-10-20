# ADR 0003: Separação do Módulo de Digitação em Lote (`DIGITA.EXE`)

> **Status:** Aceito (Retroativo)  
> **Data:** 2026-09-18 (Data da Engenharia Reversa)  
> **Autor:** Detetive Reversa  
> **Nível de Documentação:** Detalhado  

---

## Contexto e Problema

O processo de controle de selos Inmetro exige a entrada de grandes lotes de selos recebidos do órgão credenciado (centenas ou milhares de selos sequenciais) e o rápido lançamento de inutilizações/danificações durante o processo produtivo.

Realizar esses lançamentos pela interface genérica de Ordens de Serviço (`SIST1.PRG`) gerava gargalo operacional, pois o operador perdia tempo navegando por menus e confirmações de tela.

## Decisão Técnica

Separar a funcionalidade de digitação de selos em um executável autônomo e otimizado chamado **`DIGITA.EXE`** (`DIGITA.PRG`, `digse.prg`, `seq.prg`), acompanhado pelo utilitário de reconciliação sequencial **`SEQ.EXE`**.

O `DIGITA.EXE` opera diretamente sobre a tabela compartilhada `SELO.DBF` e `FALTASEL.DBF`, oferecendo interface via teclado sem navegação em árvore.

## Alternativas Consideradas

1. **Manter o Lançamento de Selos Exclusivamente no Executável Principal `SIST.EXE`:**
   - *Prós:* Aplicação 100% unificada sob o mesmo binário.
   - *Contras:* Telas lentas para entrada em lote e concorrência de memória no overlay do `SIST.EXE`.
2. **Importação Automatizada via Arquivos Texto do Inmetro:**
   - *Prós:* Eliminação de digitação manual.
   - *Contras:* Na época de implementação do legado, o órgão fiscalizador não disponibilizava arquivos digitais de remessa de selos, apenas lotes físicos em papel/cartela.

## Consequências

### Positivas 🟢
- Extrema produtividade para operadores de digitação de selos (taxa de entrada até 10x superior à interface padrão).
- Isolamento de falhas: se o módulo de digitação travar, o sistema principal de OS (`SIST.EXE`) permanece operacional.

### Negativas / Débitos Técnicos 🔴
- Duplicidade parcial de código de validação entre `DIGITA.PRG` e `SIST1.PRG`.
- Necessidade de concorrência com bloqueio manual de arquivos (`FLOCK()`) para evitar colisão quando o `DIGITA.EXE` e o `SIST.EXE` alteram a tabela `SELO.DBF` simultaneamente.
