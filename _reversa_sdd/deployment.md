# Diagrama de Infraestrutura e Implantação (Deployment) — CICOM

> Gerado pelo Arquiteto do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado em arquivos de configuração Batch, Linker e scripts de sistema)

---

## 1. Topologia de Implantação Legada (Ambiente MS-DOS / Redes dos Anos 90/2000)

Historicamente, o **CICOM** era implantado em infraestrutura física local nas oficinas de manutenção de extintores, operando em rede local (LAN) peer-to-peer ou cliente-servidor leve via protocolo **NetBEUI** ou **IPX/SPX (Novell NetWare)**.

```mermaid
graph TD
    subgraph ServerNode ["Servidor de Arquivos Local (Novell NetWare / Windows NT Server)"]
        SHARE["Diretório Compartilhado (F:\CICOM\)"]
        DBF_FILES["Base de Dados Compartilhada (.DBF / .NTX)"]
        SHARE --- DBF_FILES
    end

    subgraph Station1 ["Estação Terminal 1 (Atendimento / OS)"]
        DOS1["MS-DOS 6.22 / Windows 98"]
        EXE1["SIST.EXE + Overlays (.OVL)"]
        DOS1 --- EXE1
    end

    subgraph Station2 ["Estação Terminal 2 (Bancada de Digitação)"]
        DOS2["MS-DOS 6.22 / Windows 98"]
        EXE2["DIGITA.EXE (Módulo Selos)"]
        DOS2 --- EXE2
    end

    subgraph Station3 ["Estação Terminal 3 (Bancada de Vistoria / Laudos)"]
        DOS3["MS-DOS 6.22 / Windows XP x86"]
        EXE3["CADERNO.OVL"]
        DOS3 --- EXE3
    end

    subgraph Peripherals ["Dispositivos de Saída Físicos"]
        LPT_MATR["Impressora Matricial (LPT1) - Notas Fiscais"]
        LPT_ZEBRA["Impressora Térmica Zebra (LPT2 / COM1) - ZPL"]
    end

    Station1 -->|Mapeamento SMB / NetBEUI| SHARE
    Station2 -->|Mapeamento SMB / NetBEUI| SHARE
    Station3 -->|Mapeamento SMB / NetBEUI| SHARE

    Station1 -->|Cabo Paralelo Centronics| LPT_MATR
    Station3 -->|Cabo Serial RS232 / Paralelo| LPT_ZEBRA
```

---

## 2. Topologia de Execução Atual em Windows 10/11 x64

Sistemas operacionais Windows de 64 bits modernos (Windows 10/11 x64) não possuem suporte nativo a executáveis MS-DOS de 16 bits (ausência da camada NTVDM). Para manter o sistema legado em funcionamento, utiliza-se a seguinte arquitetura de emulação:

```mermaid
graph TD
    subgraph ModernPC ["Workstation Windows 11 x64"]
        WIN_OS["Windows 11 OS x64"]
        
        subgraph Emulator ["Emulador vDOS / DOSBox-Staging"]
            EMU_CORE["Virtual CPU 80468 / DOS 6.22 Layer"]
            MEM_CONV["640 KB RAM Convenional Virtualizada"]
            LPT_REDIRECT["Redirecionador LPT1 -> Windows Print Spooler"]
        end

        subgraph LegacyBinaries ["Binários CICOM (C:\Inmetro)"]
            BAT["Cicom.bat"]
            SIST_PRG["SIST.EXE + OVLs"]
            DBF_LOCAL["Arquivos .DBF / .NTX"]
        end

        WIN_OS --> Emulator
        Emulator --> LegacyBinaries
        LPT_REDIRECT -->|RAW Text / Win32 Spooler| PHYSICAL_PRINTERS["Impressoras USB / Rede (Zebra / Epson)"]
    end
```

### 2.1 Configurações Críticas do DOS Legado

- **`CONFIG.SYS` / `AUTOEXEC.BAT`:**
  - `FILES=120` (Essencial para permitir múltiplos arquivos `.DBF` e `.NTX` abertos simultaneamente por módulo).
  - `BUFFERS=35` (Otimização de cache I/O de disco para operações de `SEEK`).
  - `SET CLIPPER=F120;E000;F:120` (Parâmetros de alocação de memória do Clipper).

- **Redirecionamento de Impressão (Spooler):**
  - Impressão matricial direcionada para porta paralela física `LPT1` ou porta virtual mapeada via comando `NET USE LPT1: \\localhost\Matricial`.

---

## 3. Topologia Recomendada para Arquitetura Alvo (Modernização Cloud / Containers)

Para a completa modernização do CICOM, recomenda-se a migração da arquitetura desktop 16-bit monolítica para uma arquitetura nativa em nuvem / contêineres:

```mermaid
graph TD
    subgraph ClientLayer ["Camada de Apresentação (Navegador Web / Mobile)"]
        REACT_APP["Aplicação Web React / Next.js (Interface Responsiva)"]
        ZEBRA_AGENT["Agente Local de Impressão (WebZebra / RawPrint)"]
    end

    subgraph ContainerCluster ["Cluster Docker / Kubernetes (Cloud / On-Premise)"]
        subgraph IngressGateway ["API Gateway / Reverse Proxy"]
            NGINX["Nginx / Traefik (HTTPS / SSL)"]
        end

        subgraph Microservices ["Serviços Backend (Node.js / Go / C#)"]
            API_CORE["Core OS & Inspection API"]
            API_SEAL["Inmetro Seal Traceability API"]
            API_FISCAL["Fiscal & Invoice Engine"]
        end

        subgraph DatabaseCluster ["Camada de Dados Persistente"]
            POSTGRES["PostgreSQL 15 Cluster (ACID Database)"]
            REDIS["Redis Cache (Estoque de Selos & Sessões)"]
        end
    end

    React_App -->|HTTPS / REST API| NGINX
    NGINX --> API_CORE
    NGINX --> API_SEAL
    NGINX --> API_FISCAL

    API_CORE --> POSTGRES
    API_SEAL --> POSTGRES
    API_SEAL --> REDIS
    API_FISCAL --> POSTGRES

    REACT_APP -->|Local WebSockets / HTTP| ZEBRA_AGENT
    ZEBRA_AGENT -->|USB / IP Zebra Printer| PHYSICAL_ZEBRA["Impressora Térmica Zebra (ZPL II)"]
```

### 3.1 Benefícios da Arquitetura Alvo
1. **Eliminação do Limite de 640 KB RAM:** Execução em 64 bits com escalabilidade horizontal.
2. **Garantia de Integridade de Dados (ACID):** Substituição do motor ISAM por PostgreSQL com transações atômicas e foreign keys.
3. **Auditoria em Tempo Real:** Rastreabilidade imediata dos selos Inmetro com validação via webservice/API.
4. **Impressão Sem Spooler DOS:** Suporte nativo a impressoras de rede Ethernet/Wi-Fi via ZPL/IP direct.
