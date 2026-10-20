# ADR 0001: Arquitetura Monolítica em CA-Clipper com Overlays Dinâmicos (.OVL)

> **Status:** Aceito (Retroativo)  
> **Data:** 2026-09-18 (Data da Engenharia Reversa)  
> **Autor:** Detetive Reversa  
> **Nível de Documentação:** Detalhado  

---

## Contexto e Problema

No final dos anos 80 e durante a década de 90, o desenvolvimento de sistemas comerciais para automação de oficinas e empresas de manutenção no Brasil enfrentava restrições severas de hardware:
- Máquinas rodando MS-DOS com a barreira de 640 KB de RAM convencional.
- Necessidade de gerenciar grandes volumes de dados (cadastros de clientes, cilindros, ordens de serviço e estoque de selos Inmetro).
- A aplicação inteira compilada como um único executável estático ultrapassaria o limite de memória do MS-DOS.

## Decisão Técnica

Adotar o compilador **CA-Clipper Summer '87 / Clipper 5.x** em conjunto com o linker **RTLINK (CLIPP)** utilizando **Dynamic Overlays (`.OVL`)**.

A aplicação foi estruturada com um módulo executável principal (`SIST.EXE` / `SIST.PRG`) que carrega dinamicamente trechos de código em memória à medida que o usuário navega nos menus (`SIST.OVL`, `SIST1.OVL`, `CICOM.OVL`).

## Alternativas Consideradas

1. **Compilação em C / Assembly puro:**
   - *Prós:* Menor consumo de memória RAM e controle direto de hardware.
   - *Contras:* Tempo de desenvolvimento extremamente alto e ausência de mecanismos nativos de manipulação de tabelas ISAM/dBase.
2. **Uso de Extensores de Memória DOS de 32-bit (Blinker / Exospace / CauseWay):**
   - *Prós:* Permitiria acesso a memória estendida (XMS/EMS) eliminando a barreira dos 640 KB.
   - *Contras:* Custo elevado de licença dos extensores na época e incompatibilidade com computadores antigos da base de clientes.
3. **Divisão em Múltiplos Executáveis Independentes sem Overlays:**
   - *Prós:* Simplicidade de compilação individual.
   - *Contras:* Perda de estado de variáveis globais (`PUBLIC`/`PRIVATE`) entre telas e atraso perceptível de carregamento de disco a cada troca de menu.

## Consequências

### Positivas 🟢
- Permitiu a execução fluida de um sistema complexo de controle de extintores e faturamento em computadores PC AT 286/386/486 com 640 KB de RAM.
- Modularização lógica do código por arquivos fontes (`SIST1.PRG` a `SIST99.PRG`).

### Negativas / Débitos Técnicos 🔴
- Dificuldade de migração para sistemas operacionais de 64-bit modernos (Windows 10/11 x64), exigindo o uso de emuladores (DOSBox, NTVDMx64 ou vDOS).
- Acoplamento elevado por meio de variáveis globais compartilhadas no espaço de memória principal.
