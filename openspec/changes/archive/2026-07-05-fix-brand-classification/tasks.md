## 1. CPU Brand Classification Fix

- [x] 1.1 Adicionar `athlon` à lista de keywords AMD em `getCPUBrandDistribution()`

## 2. GPU Brand Classification Fix

- [x] 2.1 Adicionar `pro v` e `radeon pro` à lista de keywords AMD em `getGPUBrandDistribution()`

## 3. Verify

- [x] 3.1 Confirmado via dados reais: Athlon Gold 3150U → AMD (CPU Others agora 0)
- [x] 3.2 Confirmado via dados reais: Pro V620 e Pro VII → AMD (GPU Others agora 0)
- [x] 3.3 Confirmado via dados reais: classificações existentes inalteradas (AMD: 622, Intel: 275, NVIDIA: 313, Intel GPU: 51)
- [ ] 3.4 Abrir index.html no browser para verificação visual final
