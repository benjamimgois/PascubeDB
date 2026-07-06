# Add Shrinkage Estimator for Software Winner Scoring

## Problem

`getAbsoluteWinners` determina o vencedor de cada card da aba Software Benchmark (Faster OS, Faster Mesa, Faster NVIDIA, Faster Kernel) usando média aritmética simples por hardware+versão, sem considerar confiabilidade estatística.

Exemplo real: RX 9070 XT + Mesa 26.1 (97 amostras, avg 28,500) vs mesa-git (5 amostras, avg 29,000). A média simples declara mesa-git vencedor, mas 5 amostras é estatisticamente frágil — podem ser outliers.

## Solution

**James-Stein Shrinkage Estimator** com K=5 (força do prior empírico):

```
adjusted_mean = raw_mean × (1 - α) + pooled_mean × α
              onde α = K / (K + n)
              e pooled_mean = média de todas versões no mesmo hardware
```

- n=5:  50% shrinkage → média ajustada puxada fortemente ao centro
- n=10: 33% shrinkage
- n=50: 9% shrinkage
- n=97: 5% shrinkage → quase não afetada

A média ajustada é usada **apenas para determinar o vencedor**. As médias exibidas nos cards e tooltips continuam sendo as brutas (raw), com número de amostras visível.

### Info tooltip

Cada card ganha um ícone `?` (help-circle do Lucide) no canto superior direito. Ao passar o mouse, exibe tooltip explicando:

> "Winner is determined using a shrinkage estimator that pulls averages toward the hardware's pooled mean. This prevents small-sample versions (e.g. 5 runs) from unfairly beating well-tested versions (e.g. 97 runs). The stronger the sample count, the closer the adjusted score is to the raw average. Shrinkage factor α = 5 / (5 + n)."

## Scope

- `getAbsoluteWinners()` — adicionar cálculo de shrinkage
- `renderWinnerCard()` — injetar ícone `?` com tooltip
- `index.html` — adicionar container para tooltip nos stat-cards
- `style.css` — estilizar ícone e tooltip
