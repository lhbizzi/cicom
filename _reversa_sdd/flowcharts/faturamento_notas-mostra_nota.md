# Fluxograma da Função — `R2MOSTRANF()` (`faturamento_notas`)

> Gerado pelo Arqueólogo do Reversa em 2026-09-18
> Nível: **Detalhado (Por Função)**

```mermaid
flowchart TD
    Start([Início R2MOSTRANF()]) --> ReadParams[Receber pArquivo, pColunas, pDireciona]
    ReadParams --> OpenNfIndex[Set Index to Int0006.ntx]
    OpenNfIndex --> DisplayHeader[Exibir Cabeçalho da Nota: Cliente, CNPJ, Emissão]
    DisplayHeader --> PrintItems[Listar Servicos e Produtos Faturados]
    PrintItems --> CalcTotals[Calcular Valor Total, Base ICMS, Valor ICMS e ISSQN]
    CalcTotals --> SendOutput{pDireciona == 'I'?}
    SendOutput -->|Sim| PrintSpool[SET PRINTER ON / Enviar para LPT1]
    SendOutput -->|Não| DisplayScreen[Exibir em Janela na Tela]
    PrintSpool --> ClosePrint[SET PRINTER OFF / SET DEVICE TO SCREEN]
    DisplayScreen --> Return([Concluir Visualização])
    ClosePrint --> Return
```
