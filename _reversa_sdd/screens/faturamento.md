# Especificação de Tela: Faturamento Fiscal (NFe / NFSe) — CICOM Modern

> Gerado pelo Screen Translator Reversa (`/reversa-migrate`)  
> Componente / Rota: `/fiscal/faturamento`  
> Data: 2026-09-28  

---

## 1. Visão Geral da Tela

Esta tela moderniza o módulo legado `faturamento_notas` (`nota.prg`). Substitui a emissão direta de formulário contínuo em impressora matricial por um painel central de **transmissão e emissão eletrônica de NFe (Venda de Peças/Extintores) e NFSe (Serviços de Manutenção)** integrado com os webservices da SEFAZ e Prefeitura.

---

## 2. Layout da Interface (Wireframe / Mockup Structural)

```
+-----------------------------------------------------------------------------------+
|  Faturamento & Emissão Fiscal Eletrônica (NFe / NFSe)                             |
+-----------------------------------------------------------------------------------+
|  ORDENS DE SERVIÇO CONCLUÍDAS AGUARDANDO FATURAMENTO                              |
|  OS # | Cliente               | Valor Peças | Valor Serviço | Ação               |
|  #1041| Condomínio Solar      | R$ 180,00   | R$ 500,00     | [ Transmitir NFe ] |
|  #1042| Usina Santa Rita S/A   | R$ 450,00   | R$ 2.000,00   | [ Transmitir NFe ] |
+-----------------------------------------------------------------------------------+
|  MONITOR DE TRANSMISSÃO SEFAZ / PREFEITURA                                        |
|  Doc # | Tipo | Cliente             | Chave de Acesso NFe      | Status         |
|  4092  | NFe  | Usina Santa Rita    | 35260912345678000190...  | Autorizada ✅  |
|  4093  | NFSe | Usina Santa Rita    | RPS-1042-2026            | Processando ⏳ |
+-----------------------------------------------------------------------------------+
|  AÇÕES DISPONÍVEIS                                                                |
|  [ Imprimir DANFE PDF ]  [ Baixar XML ]  [ Enviar por E-mail ao Cliente ]         |
+-----------------------------------------------------------------------------------+
```

---

## 3. Regras de Integração Fiscal

1. **Emissão Dual (Venda vs Serviço):**
   - Peças trocadas (válvulas, manômetros, suportes) geram **NFe v4.0 (ICMS)** via SEFAZ Estadual.
   - Serviços prestados (recarga, ensaio hidrostático, pintura) geram **NFSe (ISS)** via Prefeitura Municipal.
2. **Processamento Assíncrono com Contingência:**
   - Em caso de instabilidade na SEFAZ, o documento entra na fila background de contingência (BullMQ) para retransmissão automática a cada 5 minutos.
