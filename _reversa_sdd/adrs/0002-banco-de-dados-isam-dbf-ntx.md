# ADR 0002: Persistência Local via Banco de Dados ISAM (DBF / NTX)

> **Status:** Aceito (Retroativo)  
> **Data:** 2026-09-18 (Data da Engenharia Reversa)  
> **Autor:** Detetive Reversa  
> **Nível de Documentação:** Detalhado  

---

## Contexto e Problema

O sistema CICOM precisa armazenar registros persistentes de mais de 50 entidades (clientes, cilindros de extintor, ordens de serviço, itens inspecionados, lotes de selos Inmetro e notas fiscais). 

Na época da concepção do sistema:
- Bancos de dados relacionais cliente-servidor (SQL) eram pesados, caros e inviáveis para sistemas de microcomputadores desktop em oficinas.
- O acesso aos dados precisava ser extremamente rápido para pesquisas por CNPJ, número de série de cilindro e número de selo.

## Decisão Técnica

Utilizar a tecnologia **dBase III/IV (`.DBF`)** com o driver nativo de índices B-Tree do Clipper **`DBFNTX` (`.NTX`)**.

Cada tabela é um arquivo autônomo no disco (`CADCLI.DBF`, `CADEXTIN.DBF`, `SELO.DBF`), acompanhada de seus respectivos arquivos de índice primário e secundário (`CADCLICD.NTX`, `EXTSELO.NTX`, `NUMSELO.NTX`).

## Alternativas Consideradas

1. **Driver DBFCDX (FoxPro Compound Indexing):**
   - *Prós:* Arquivo de índice único contendo múltiplas tags e menor tamanho em disco.
   - *Contras:* Requereria atualizar para Clipper 5.2/5.3 com bibliotecas RDD adicionais e geraria incompatibilidade com utilitários dBase III existentes na empresa.
2. **Arquivos Texto Planos com Acesso Aleatório (`FREAD`/`FWRITE`):**
   - *Prós:* Total controle da estrutura binária.
   - *Contras:* Alta complexidade para manter chaves e reconstrução manual de algoritmos de busca B-Tree.
3. **Btrieve / FairCom C-tree:**
   - *Prós:* Motor ISAM mais robusto com suporte transacional.
   - *Contras:* Necessidade de pagar royalties por estação e complexidade de integração com o ecossistema CA-Clipper.

## Consequências

### Positivas 🟢
- Altíssima velocidade de leitura e pesquisa indexada (`SEEK`) em hardware modesto.
- Facilidade de manutenção, exportação para planilhas e auditoria usando ferramentas como dBase, DBF Viewer ou FoxPro.

### Negativas / Débitos Técnicos 🔴
- Ausência de suporte a transações ACID, chaves estrangeiras (`FOREIGN KEY`) e integridade referencial nativa no banco.
- Vulnerabilidade de corrupção dos arquivos de índice (`.NTX`) em casos de desabastecimento de energia ou travamento do sistema DOS, exigindo a rotina de reindexação proativa (`findex.prg`) na abertura do sistema.
