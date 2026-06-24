## Why

SBCs tem nomes de CPU/GPU genéricos (ex: "Raspberry Pi 5" como CPU, "VideoCore VII" como GPU) que nao deixam claro qual dispositivo é. A planilha tem uma coluna "product name" (ex: "Raspberry Pi 5 Rev 1.0", "Orange Pi 5 Plus 16GB") que identifica o dispositivo exato. Precisamos exibir esse nome nos charts de SBC para facilitar identificação.

## What Changes

- Adicionar campo `productName` ao parser (JSONP + CSV fallback)
- Nos charts da seção Portable Devices, quando o dispositivo for SBC, exibir `productName` no label do chart (como label principal ou abaixo do CPU/GPU)
- Atualizar FALLBACK_CSV com coluna product name

## Capabilities

### New Capabilities
- (nenhuma — mudança apenas de apresentação)

### Modified Capabilities
- `sbc-devices`: Atualizar requisitos de exibição dos charts SBC para incluir productName no label
- `dashboard-mobile-charts`: Atualizar requisitos de exibição dos top runs charts para incluir productName quando SBC

## Impact

- `app.js`: parser (JSONP + CSV), funções de label para SBC, renderCharts
- `FALLBACK_CSV`: adicionar coluna product name + valores de exemplo
