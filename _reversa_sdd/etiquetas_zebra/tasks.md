# Módulo Etiquetas Térmicas Zebra (`etiquetas_zebra`), Tarefas de Implementação

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Tarefas de Implementação

- [ ] **T-01: Implementar Gerador de Templates ZPL II para Rótulos NR-23**
  - **Origem Legada:** `EtiZebra/Etiqueta/ETIQUETA.PRG:15-50`
  - **Critério de Aceite:** Montar payload ZPL II contendo código de barras Code 128 e dados do cilindro.
  - **Confiança:** 🟢

- [ ] **T-02: Implementar Driver de Impressão Raw Spooler (IP / USB / Direct)**
  - **Origem Legada:** Output Stream LPT1
  - **Critério de Aceite:** Enviar texto bruto ZPL para impressoras Zebra sem interferência do driver gráfico do OS.
  - **Confiança:** 🟢
