# Módulo Menu Principal e Ordens de Serviço (`sist_main`), Tarefas de Implementação

> Gerado pelo Redator do Reversa em 2026-09-18  
> Nível de Documentação: **Detalhado**  
> Status: 🟢 **CONFIRMADO** (Baseado nos fontes `prg/SIST.PRG`, `prg/SIST1.PRG` a `prg/SIST4.PRG`)

---

## 1. Pré-requisitos

- [ ] Tabela `CADCLI` e índice `CADCLICD` (ou repositório equivalente no banco moderno) configurados.
- [ ] Schema da tabela `MOVTO` (cabeçalho da OS) criado.
- [ ] Módulo de sessão / autenticação de usuários disponível.

---

## 2. Tarefas de Implementação

- [ ] **T-01: Implementar Inicializador de Aplicação e Contexto de Sessão**
  - **Origem Legada:** `prg/SIST.PRG:1-50`
  - **Critério de Aceite:** Carregar variáveis globais de sistema, empresa ativa e validar credenciais.
  - **Confiança:** 🟢

- [ ] **T-02: Implementar Gerador Incremental de Número de OS (`NUM_OS`)**
  - **Origem Legada:** `prg/SIST1.PRG:20-40`
  - **Critério de Aceite:** Garantir geração atômica e sequencial de `NUM_OS` (número inteiro único de 6 dígitos).
  - **Confiança:** 🟢

- [ ] **T-03: Implementar Abertura de OS com Validação de Cliente (`ABREOS`)**
  - **Origem Legada:** `prg/SIST1.PRG:45-90`
  - **Critério de Aceite:** Buscar cliente por ID, falhar se inexistente e criar registro com `SITUACAO = 'A'`.
  - **Confiança:** 🟢

- [ ] **T-04: Implementar Encerramento e Baixa de OS (`BAIXAOS`)**
  - **Origem Legada:** `prg/SIST1.PRG:120-180`
  - **Critério de Aceite:** Validar se todos os itens de `MOV_ITEM` possuem selo e valor atribuído; alterar `SITUACAO = 'F'`.
  - **Confiança:** 🟢

- [ ] **T-05: Implementar Consulta Geral de Ordens de Serviço**
  - **Origem Legada:** `prg/SIST2.PRG:10-80`
  - **Critério de Aceite:** Permitir pesquisa por número da OS ou por cliente com paginação.
  - **Confiança:** 🟢

---

## 3. Tarefas de Teste

- [ ] **TT-01: Teste de Caminho Feliz de Abertura de OS**
  - Criar OS com cliente válido e verificar inserção em banco.
- [ ] **TT-02: Teste de Bloqueio de Baixa sem Selos Inmetro**
  - Tentar baixar OS com extintor sem selo atribuído e validar mensagem de bloqueio.
- [ ] **TT-03: Teste de Concorrência em Abertura Simultânea de OS**
  - Simular dois operadores abrindo OS ao mesmo tempo para garantir que `NUM_OS` não é duplicado.

---

## 4. Ordem Sugerida de Implementação

1. **T-01** (Boot do sistema)
2. **T-02** (Gerador de sequencial)
3. **T-03** (Abertura de OS)
4. **T-04** (Encerramento de OS)
5. **T-05** (Consultas)
