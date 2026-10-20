# Fluxograma do Módulo — `cadastros_base`

> Gerado pelo Arqueólogo do Reversa em 2026-09-18

```mermaid
flowchart TD
    Start([Manutenção de Cadastros Base]) --> Choice{Selecionar Entidade}
    Choice -->|Clientes| CadCli[Operações CRUD em CADCLI.DBF]
    Choice -->|Fornecedores| CadForn[Operações CRUD em FORNECE.DBF]
    Choice -->|Tabela de Serviços| CadServ[Operações CRUD em CADSERV.DBF]
    Choice -->|Marcas Cilindro| CadMarca[Operações CRUD em CADMARCA.DBF]

    CadCli --> Reindex[Atualizar Índices NTX via findex()]
    CadForn --> Reindex
    CadServ --> Reindex
    CadMarca --> Reindex
    Reindex --> End([Retornar ao Menu])
```
