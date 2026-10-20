# Módulo Caderno de Vistorias e Ensaios Hidrostáticos (`caderno_extintores`), Casos de Borda

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Mapeamento de Casos Extremos

| ID | Descrição do Caso de Borda | Comportamento Legado | Solução / Tratamento na Modernização | Confiança |
| :--- | :--- | :--- | :--- | :---: |
| **EC-EXT-01** | **Transferência de Cilindro Entre Clientes** | O número de série no casco pode coincidir entre clientes diferentes. | Manter chave primária composta `(NUMERO, COD_CLI)` ou gerar UUID global por ativo. | 🟢 |
| **EC-EXT-02** | **Ano Bissexto no Cálculo de 5 Anos** | Adição simples de `365*5` dias gera desvio no dia do mês após 5 anos. | Utilizar funções nativas de manipulação de data (`date.AddYears(5)`). | 🟢 |
| **EC-EXT-03** | **Reprompting de Pressão Negativa ou Zerada** | O legado aceitava digitação zerada em casos de exceção sem log. | Exigir validação estrita de faixa de pressão (> 0) conforme o tipo de agente (ex: CO2 -> 250 kgf/cm²). | 🟢 |
