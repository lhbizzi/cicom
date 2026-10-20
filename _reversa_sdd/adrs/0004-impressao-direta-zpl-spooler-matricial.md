# ADR 0004: Impressão Direta Zebra (ZPL/EPL) e Spooler Matricial LPT1

> **Status:** Aceito (Retroativo)  
> **Data:** 2026-09-18 (Data da Engenharia Reversa)  
> **Autor:** Detetive Reversa  
> **Nível de Documentação:** Detalhado  

---

## Contexto e Problema

A oficina de manutenção de extintores necessita imprimir duas categorias distintas de documentos de saída:
1. **Documentos Fiscais e Laudos Técnicos:** Formulários contínuos de vias de Ordem de Serviço, Notas Fiscais e Cadernos de Inspeção em impressoras matriciais (ex: Epson LX-300 / FX-890).
2. **Etiquetas de Cilindro:** Rótulos autoadesivos resistentes de instrução de operação (NR-23), dados de carga e garantia afixados ao extintor em impressoras térmicas industriais (Zebra).

## Decisão Técnica

Utilizar envio direto de fluxos de código bruto para as portas paralelas/seriais (`LPT1` / `COM1`):
- Para etiquetas Zebra: Templates gravados no diretório `EtiZebra/` (`EtiNR23/`, `Eticadastro/`, `Etiqueta/`) contendo código de linguagem **ZPL/EPL** nativo, concatenados com variáveis do extintor e enviados via spooler em lote.
- Para relatórios matriciais: Comandos de escape ASCII (Epson Standard) diretamente em `SET PRINTER TO LPT1`.

## Alternativas Consideradas

1. **Uso do Gerador de Relatórios Padrão do Clipper (`.FRM`):**
   - *Prós:* Interface visual simples para desenho de relatórios.
   - *Contras:* Não suporta comandos gráficos de código de barras ou etiquetas térmicas Zebra ZPL.
2. **Impressão via Driver Gráfico do Windows (GDI):**
   - *Prós:* Suporte a qualquer impressora moderna USB.
   - *Contras:* Incompatível com o ambiente puro MS-DOS 16-bit do sistema legado.

## Consequências

### Positivas 🟢
- Velocidade máxima de impressão (sem overhead de renderização gráfica do sistema operacional).
- Alta durabilidade e legibilidade dos códigos de barras e selos afixados nos cilindros.

### Negativas / Débitos Técnicos 🔴
- Forte acoplamento com modelos específicos de impressora (Zebra) e portas físicas `LPT1`.
- Em sistemas operacionais modernos sem porta paralela física `LPT1`, é necessário utilitários de redirecionamento de spooler (ex: `NET USE LPT1 \\localhost\Zebra` ou `DOSPRN`).
