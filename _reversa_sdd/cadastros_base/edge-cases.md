# Módulo Cadastros Base e Bibliotecas Reutilizáveis (`cadastros_base`), Casos de Borda

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Mapeamento de Casos Extremos

| ID | Descrição do Caso de Borda | Comportamento Legado | Solução / Tratamento na Modernização | Confiança |
| :--- | :--- | :--- | :--- | :---: |
| **EC-CAD-01** | **CNPJs com Formatação / Máscara Inválida** | O legado remove pontuações antes de passar pelo validador. | Normalizar a string removendo `.`, `-` e `/` antes de calcular os dígitos Módulo 11. | 🟢 |
| **EC-CAD-02** | **Cadastros com CNPJ Duplicado** | O legado não impunha `UNIQUE INDEX` no DBF, permitindo duplicidade. | Definir constraint de unicidade (`UNIQUE`) na coluna CNPJ/CPF no banco relacional moderno. | 🟢 |
