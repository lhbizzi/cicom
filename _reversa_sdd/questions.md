# Perguntas para Validação Humana — CICOM

> Gerado pelo Revisor do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: ✅ **Validação Concluída (100% Resolvido)**

---

## Pergunta 1

**Contexto:** Módulo `faturamento_notas` — Emissão de Notas Fiscais via Spooler Matricial LPT1 em `prg/nota.prg:140`  
**Spec afetada:** [`_reversa_sdd/faturamento_notas/requirements.md`](file:///c:/Inmetro/_reversa_sdd/faturamento_notas/requirements.md)  
**Pergunta:** No sistema legado, as notas fiscais são impressas diretamente em formulário contínuo sem integração eletrônica. Na modernização, qual o padrão de Nota Fiscal Eletrônica (NFe/NFSe) adotado pela empresa para integração com a SEFAZ/Prefeitura?  
**Impacto:** Define a inclusão dos serviços de integração HTTP/SOAP com a SEFAZ no planejamento do ciclo forward/migração.

**Resposta:** Nota fiscal de venda e de serviço.

---

## Pergunta 2

**Contexto:** Módulo `etiquetas_zebra` — Impressão Térmica de Etiquetas em `EtiZebra/Etiqueta/ETIQUETA.PRG`  
**Spec afetada:** [`_reversa_sdd/etiquetas_zebra/design.md`](file:///c:/Inmetro/_reversa_sdd/etiquetas_zebra/design.md)  
**Pergunta:** As impressoras Zebra físicas da oficina estão conectadas via rede Ethernet (IP Fixo) ou via cabo USB local nas estações de trabalho?  
**Impacto:** Define a escolha entre o desenvolvimento de um agente de impressão local WebZebra (USB) ou um serviço de rede centralizado via IP raw socket.

**Resposta:** Conexão usb via cabo.

---

## Pergunta 3

**Contexto:** Módulo `caderno_extintores` — Cálculo da Validade de Ensaio Hidrostático em `prg/CADERNO1.PRG:238`  
**Spec afetada:** [`_reversa_sdd/caderno_extintores/design.md`](file:///c:/Inmetro/_reversa_sdd/caderno_extintores/design.md)  
**Pergunta:** A regra atual adiciona `365 * 5` dias ao teste. Deseja manter o cálculo simples ou adotar ajuste de calendário por mês/ano exato (ex: 18/09/2026 -> 18/09/2031)?  
**Impacto:** Define a fórmula de cálculo no backend moderno para conformidade exata com normas da ABNT.

**Resposta:** quero colocar um dia exato, este cálculo era para jogar 5 anos para frente, pode-se colocar a mesma data 5 anos para frente.
