# Módulo Etiquetas Térmicas Zebra (`etiquetas_zebra`), Design Técnico

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes em `EtiZebra/`)

---

## 1. Interface e Assinatura das Funções

| Símbolo | Assinatura / Parâmetros | Retorno | Descrição & Localização |
| :--- | :--- | :--- | :--- |
| `IMPRIME_ETIQUETA_ZEBRA()` | `(cNumExtin: Character, cNumSelo: Character)` | `NIL` | Formata e envia ZPL em `EtiZebra/Etiqueta/ETIQUETA.PRG:15`. |

---

## 2. Exemplo de Template Stream ZPL II

```text
^XA
^FO50,50^A0N,30,30^FDINMETRO - MANUTENCAO DE EXTINTORES^FS
^FO50,90^A0N,25,25^FDEXTINTOR: EXT-12345^FS
^FO50,120^A0N,25,25^FDAGENTE: PQS 4KG^FS
^FO50,150^A0N,25,25^FDPROX. ENSAIO: 09/2031^FS
^FO50,190^BCN,60,Y,N,N^FD99887766^FS
^XZ
```
