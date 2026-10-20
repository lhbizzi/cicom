# Módulo Menu Principal e Ordens de Serviço (`sist_main`), Especificação de Requisitos

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/SIST.PRG`, `prg/SIST1.PRG` a `prg/SIST4.PRG`)

---

## 1. Visão Geral

O módulo **`sist_main`** é o núcleo de controle operacional e de navegação do sistema **CICOM**. Ele é responsável pela inicialização do ambiente MS-DOS, validação de acesso dos operadores, exibição da árvore de menus principais, abertura de Ordens de Serviço (OS), acompanhamento do ciclo de vida da manutenção de extintores e finalização com fechamento da OS (`BAIXAOS`).

---

## 2. Responsabilidades

- Inicializar variáveis globais de ambiente (`cEmpresa`, `dDataSis`, `cUsuario`, `nOpcao`) no boot (`SIST.PRG`). 🟢
- Gerenciar o menu principal via controle de teclado e janelas pop-up TUI. 🟢
- Realizar a abertura de Ordens de Serviço (`MOVTO.DBF`), vinculando-as a clientes válidos cadastrados em `CADCLI.DBF`. 🟢
- Controlar a transição de estados da OS (Aberta `A` -> Fechada `F` -> Cancelada `C`). 🟢
- Validar a associação obrigatória de Selos Inmetro e serviços antes do encerramento da OS. 🟢

---

## 3. Regras de Negócio

- **RN-04 (Fechamento da OS):** Uma Ordem de Serviço só pode transitar do status Aberta (`A`) para Fechada (`F`) após o preenchimento de todos os itens (`MOV_ITEM`) com o respectivo Selo Inmetro alocado e valor calculado. 🟢 CONFIRMADO (`SIST1.PRG:85`)
- **RN-06 (Cliente Obrigatório):** Não é permitida a criação de uma OS sem um código de cliente (`COD_CLI`) existente e ativo em `CADCLI.DBF`. 🟢 CONFIRMADO (`SIST1.PRG:45`)
- **RN-OS-01 (Numerador Único de OS):** O número da Ordem de Serviço (`NUM_OS`) é um sequencial numérico único de 6 dígitos gerado incrementalmente. 🟢 CONFIRMADO (`SIST1.PRG:20`)

---

## 4. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
| :--- | :--- | :---: | :--- |
| **RF-01** | **Inicialização do Sistema** | Must | Carregar configurações, verificar integridade de índices `.NTX` e exibir menu principal. |
| **RF-02** | **Abertura de Ordem de Serviço** | Must | Solicitar o código do cliente, validar via `SEEK` em `CADCLI.DBF`, gerar `NUM_OS` e gravar cabeçalho em `MOVTO.DBF`. |
| **RF-03** | **Consulta e Edição de OS** | Should | Permitir a busca por número da OS ou por cliente, exibindo lista de extintores vinculados. |
| **RF-04** | **Baixa e Fechamento de OS** | Must | Executar a rotina `BAIXAOS()`, conferir selos de conformidade alocados e alterar `SITUACAO = 'F'`. |
| **RF-05** | **Cancelamento de OS** | Could | Alterar `SITUACAO = 'C'`, liberar os selos previamente reservados e registrar motivo. |

---

## 5. Requisitos Não Funcionais

| Tipo | Requisito Inferido | Evidência no Código | Confiança |
| :--- | :--- | :--- | :---: |
| **Performance** | Otimização de I/O de busca de cliente via índice `CADCLICD.NTX` em tempo sub-segundo. | `prg/SIST1.PRG:48` (`SEEK STR(nCodCli,6)`) | 🟢 |
| **Segurança** | Controle de perfil de acesso por operador em nível de menu. | `prg/SIST.PRG:102` (`IF cNivel < 2 ... ENDIF`) | 🟡 |
| **Disponibilidade** | Re-execução da rotina de reindexação (`findex.prg`) caso o sistema detecte falha no boot. | `prg/SIST.PRG:25` (`NETERR()`) | 🟢 |

---

## 6. Critérios de Aceitação (Gherkin)

```gherkin
Cenário: Abertura bem-sucedida de Ordem de Serviço
  Dado que o operador informa o Código de Cliente "000123"
  E o cliente existe no cadastro CADCLI.DBF com status ativo
  Quando o operador confirma a criação da OS
  Então o sistema deve gerar o número sequencial de OS "004589"
  E deve gravar um registro em MOVTO.DBF com DATA_ENT igual à data atual
  E deve alterar o status SITUACAO para "A"

Cenário: Tentativa de fechamento de OS sem selos alocados
  Dado que a Ordem de Serviço "004589" possui 3 extintores no MOV_ITEM.DBF
  E o extintor com número de série "EXT-9988" está sem número de selo Inmetro atribuído
  Quando o operador aciona a função BAIXAOS
  Então o sistema deve bloquear o fechamento da OS
  E deve exibir a mensagem de erro "Item sem Selo Inmetro atrelado. Impossível encerrar OS."
```

---

## 7. Matriz MoSCoW

| Requisito | MoSCoW | Justificativa |
| :--- | :---: | :--- |
| **Abertura de OS (`NUM_OS`)** | Must | Fluxo primário de entrada do lote na oficina. |
| **Baixa e Encerramento (`BAIXAOS`)** | Must | Pré-requisito para emissão do laudo e faturamento fiscal. |
| **Filtro de Pesquisa por Período** | Should | Importante para controle operacional diário. |
| **Cancelamento de OS** | Could | Operação de exceção acionada raramente. |

---

## 8. Rastreabilidade de Código Legado

| Arquivo Legado | Função / Sub-rotina | Cobertura |
| :--- | :--- | :---: |
| `prg/SIST.PRG` | `SIST()` | 🟢 |
| `prg/SIST1.PRG` | `BAIXAOS()`, `ABREOS()` | 🟢 |
| `prg/SIST2.PRG` | `CONSERTA()` | 🟢 |
| `prg/SIST3.PRG` | `RELATORIO_OS()` | 🟢 |
