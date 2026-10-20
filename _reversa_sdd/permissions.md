# Matriz de Permissões (RBAC / ACL) — CICOM

> Gerado pelo Detetive do Reversa em 2026-09-18
> Nível de Documentação: **Detalhado**

---

## 1. Visão Geral de Controle de Acesso

O sistema **CICOM** foi construído para ambiente MS-DOS em rede local (NetWare / Windows Peer-to-Peer). O controle de acesso é implementado proceduralmente por meio de senhas por operador no menu principal (`SIST.PRG`) e separação de executáveis por função operacional.

---

## 2. Perfis de Usuário (Papéis / Roles)

| Papel | Descrição / Atribuição Principal | Nível de Acesso |
| :--- | :--- | :--- |
| **`ADMIN`** (Gerente / Administrador) | Acesso irrestrito a todas as rotinas, utilitários de acerto de banco (`MARRETA.EXE`), cancelamento de OS, parâmetros fiscais e reindexação. | Total |
| **`OPERADOR_DIGITA`** (Digitador de Selos) | Operação concentrada em lançamento rápido de faixas de selos, inclusão de falhas/avarias de selos e acertos sequenciais. | Operacional Especializado |
| **`TECNICO_INSPECAO`** (Inspetor de Oficina) | Lançamento de dados técnicos de cilindros, laudos de ensaio hidrostático (Nível 1, 2 e 3) e impressão de etiquetas Zebra. | Técnico / Oficina |
| **`FATURAMENTO_CAIXA`** (Operador de Caixa / Faturamento) | Emissão de Notas Fiscais de Serviços/Venda, consulta de cadastros de clientes e relatórios financeiros. | Comercial / Fiscal |

---

## 3. Matriz de Permissões por Módulo e Operação

| Módulo / Funcionalidade | Operação | `ADMIN` | `OPERADOR_DIGITA` | `TECNICO_INSPECAO` | `FATURAMENTO_CAIXA` | Confiança |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **`sist_main`** | Abrir OS (`TELAOS`) | ✅ | ❌ | ✅ | ✅ | 🟢 |
| | Baixar / Encerrar OS (`BAIXAOS`) | ✅ | ❌ | ✅ | ❌ | 🟢 |
| | Cancelar OS | ✅ | ❌ | ❌ | ❌ | 🟢 |
| | Reindexar Índices (`findex`) | ✅ | ❌ | ❌ | ❌ | 🟢 |
| **`digita_selos`** | Digitação de Selos em Lote (`DIGITA`) | ✅ | ✅ | ❌ | ❌ | 🟢 |
| | Lançar Falta/Avaria (`FALTASEL`) | ✅ | ✅ | ❌ | ❌ | 🟢 |
| | Utilitário Corretivo (`MARRETA`) | ✅ | ❌ | ❌ | ❌ | 🟢 |
| **`caderno_extintores`**| Lançar Ensaio Hidrostático (`CADERNO`) | ✅ | ❌ | ✅ | ❌ | 🟢 |
| | Alterar Validade / Capacidade | ✅ | ❌ | ✅ | ❌ | 🟢 |
| | Baixa Documental de Extintor | ✅ | ❌ | ✅ | ❌ | 🟢 |
| **`faturamento_notas`**| Emitir Nota Fiscal (`NOTA`) | ✅ | ❌ | ❌ | ✅ | 🟢 |
| | Alterar Alíquota / Imposto | ✅ | ❌ | ❌ | ❌ | 🟢 |
| | Consultar Clientes / Faturamento | ✅ | ✅ | ✅ | ✅ | 🟢 |
| **`etiquetas_zebra`** | Imprimir Etiquetas ZPL/EPL | ✅ | ❌ | ✅ | ❌ | 🟢 |

---

## 4. Regras de Segurança e Proteção Implicitas

1. **Proteção de Utilitários Críticos (`MARRETA.EXE` / `SEQ.EXE`):**
   - O executável `MARRETA.EXE` realiza edições diretas nos ponteiros de `SELO.DBF`. Seu uso é restrito ao administrador para sanar incoerências de integridade referencial.
2. **Imutabilidade de Selos Utilizados (`STATUS = 'U'`):**
   - Após a alocação de um selo a uma OS baixada, o registro de `SELO.DBF` não pode ser alterado por operadores comuns, exigindo permissão de `ADMIN` para estorno.
3. **Bloqueio de Arquivos DBF em Rede (`FLOCK()` / `RLOCK()`):**
   - Rotinas de atualização concorrente (ex: atribuição de selos) utilizam bloqueio explícito de registro (`RLOCK()`) ou de tabela (`FLOCK()`) para evitar race conditions em ambiente multiusuário DOS.
