# Especificação de Tela: Dashboard Operacional — CICOM Modern

> Gerado pelo Screen Translator Reversa (`/reversa-migrate`)  
> Componente / Rota: `/dashboard`  
> Data: 2026-09-28  

---

## 1. Visão Geral da Tela

O **Dashboard Operacional** é a central de comando da oficina de extintores. Ele substitui os relatórios impressos e telas estáticas do menu principal legado (`sist_main`), oferecendo visão em tempo real do fluxo de Ordens de Serviço, estoque de Selos Inmetro e produtividade da equipe técnica.

---

## 2. Layout da Interface (Wireframe / Mockup Structural)

```
+-----------------------------------------------------------------------------------+
|  [CICOM Modern]  Ordens de Serviço  |  Caderno Extintores  |  Selos Inmetro  | NFe |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-------------------+  +-------------------+  +-------------------+  +----------+|
|  | OS Em Aberto      |  | Extintores Prontos|  | Selos Disponíveis |  | NFe Hoje ||
|  | 42 OS             |  | 128 Unidades      |  | 1.450 Selos       |  | R$ 18.420||
|  +-------------------+  +-------------------+  +-------------------+  +----------+|
|                                                                                   |
|  +-----------------------------------------+  +----------------------------------+|
|  | Fluxo de Produção por Estágio           |  | Alertas de Estoque de Selos      ||
|  |  Recepção  [====        ] 12 OS          |  |  Lote Atual: INM-2026-09         ||
|  |  Oficina   [============] 24 OS          |  |  Selos Restantes: 120 (Atenção!) ||
|  |  Qualidade [===         ] 6 OS           |  |  [ + Registrar Novo Lote ]       ||
|  +-----------------------------------------+  +----------------------------------+|
|                                                                                   |
|  +-------------------------------------------------------------------------------+|
|  | ÚLTIMAS ORDENS DE SERVIÇO EM ATENDIMENTO                                     ||
|  | OS #   | Cliente               | Extintores | Status       | Ações            ||
|  | #1042  | Usina Santa Rita S/A   | 15 Un.     | Em Oficina   | [ Ver Detalhes ] ||
|  | #1041  | Condomínio Solar      | 4 Un.      | Prontos      | [ Imprimir Cert ]||
|  +-------------------------------------------------------------------------------+|
+-----------------------------------------------------------------------------------+
```

---

## 3. Elementos da Tela e Ações

1. **Cards KPI de Métrica Rápidas:**
   - Total de OS em Aberto / Em Produção.
   - Volume de Extintores Finalizados no dia.
   - Saldo de Selos Inmetro disponíveis em estoque.
   - Faturamento do dia acumulado.

2. **Fluxo Kanban / Barras de Progresso por Estágio:**
   - Exibe distribuição das OSs nas etapas: `Recepção` → `Oficina/Ensaio` → `Controle de Qualidade` → `Aguardando Retirada`.

3. **Atalhos de Teclado (Power User Support):**
   - `F2`: Nova Ordem de Serviço.
   - `F3`: Abrir Caderno de Extintores (Lançamento de Ensaio).
   - `F4`: Abrir Tela de Digitação Rápida de Selos.
   - `F5`: Atualizar Painel.
