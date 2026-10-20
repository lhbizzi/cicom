# História de Usuário (User Story): Fluxo Completo de Manutenção de Extintor e Alocação de Selo Inmetro

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO**

---

## 1. Título & Descrição

**Como** Inspetor / Operador de Manutenção de Extintores de Incêndio  
**Quero** registrar a entrada de um lote de extintores, realizar a vistoria/ensaio hidrostático, alocar o Selo de Conformidade Inmetro e emitir a Nota Fiscal de saída  
**Para que** a empresa cumpra rigorosamente a regulamentação do Inmetro/IPEM, garanta a rastreabilidade do cilindro e receba o pagamento dos serviços prestados.

---

## 2. Cenários Gherkin de Aceitação

```gherkin
Funcionalidade: Ciclo de Vida da Manutenção do Extintor no CICOM

  Cenário: Entrada do Lote e Abertura da Ordem de Serviço
    Dado que o cliente "Empresa ABC Ltda" solicita a manutenção de 5 extintores
    Quando o operador digita o código do cliente no módulo SIST_MAIN
    Então uma nova Ordem de Serviço é criada com status "A" (Aberta)
    E é gerado um número sequencial único de OS

  Cenário: Registro de Ensaio Hidrostático de Alta Pressão (Nível 3)
    Dado que o extintor com número de série "CO2-8877" atinge a data limite de 5 anos de ensaio
    Quando o inspetor seleciona a manutenção de Nível 3 no módulo CADERNO_EXTINTORES
    E digita a pressão de ensaio aplicada de 250 kgf/cm2
    Então o sistema recalcula a data do próximo ensaio adicionando 5 anos (PROX_ENSAIO)
    E registra o laudo técnico com o valor da pressão em MOV_ITEM.DBF

  Cenário: Lançamento em Lote do Selo Inmetro
    Dado que os extintores foram inspecionados e aprovados
    Quando o operador digita a numeração do selo Inmetro "99887700" no módulo DIGITA_SELOS
    Então o sistema valida se o selo está com status "E" (Estoque)
    E associa o selo ao item correspondente do extintor na OS
    E altera o status do selo para "U" (Usado)

  Cenário: Encerramento da OS e Faturamento Fiscal
    Dado que todos os extintores da OS possuem selos associados e valores calculados
    Quando o operador executa a rotina BAIXAOS no módulo SIST_MAIN
    Então a OS é alterada para o status "F" (Fechada)
    E o módulo FATURAMENTO_NOTAS gera a Nota Fiscal desmembrando ISSQN e ICMS
```
