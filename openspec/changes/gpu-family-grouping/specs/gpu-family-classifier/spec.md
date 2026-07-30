## ADDED Requirements

### Requirement: GPU Family Classification
The system SHALL provide a function that classifies a normalized GPU name into a canonical family name. The classification SHALL be based on model number prefix matching as defined in the family mapping table. Families spanning mobile GPUs SHALL use a "Mobile" suffix (e.g., "RTX 40 Mobile"). GPUs that do not match any known family pattern SHALL return `null`.

The canonical family names SHALL be:

| Family | Pattern | Example Models |
|--------|---------|----------------|
| RX 500 | `RX 5xx` | RX 580 Series, RX 590 Series |
| RX Vega | `RX Vega`, `AMD Vega` | RX Vega 64, AMD Vega |
| RX 5000 | `RX 5xxx` | RX 5700 XT |
| RX 6000 | `RX 6xxx` | RX 6600, RX 6800 XT |
| RX 7000 | `RX 7xxx` | RX 7800 XT, RX 7900 XTX |
| RX 9000 | `RX 9xxx` | RX 9070 XT, RX 9070 |
| GTX 900 | `GTX 9xx` | GTX 980 Ti |
| GTX 10 | `GTX 10xx` | GTX 1060 6GB, GTX 1080 |
| GTX 16 | `GTX 16xx` | GTX 1650 Ti, GTX 1660 Ti |
| RTX 20 | `RTX 20xx` | RTX 2060, RTX 2080 Ti |
| RTX 30 | `RTX 30xx` | RTX 3060 Ti, RTX 3080 |
| RTX 40 | `RTX 40xx` | RTX 4070, RTX 4090 |
| RTX 50 | `RTX 50xx` | RTX 5070, RTX 5070 Ti |
| RTX 30 Mobile | `RTX 30xx Mobile` | RTX 3050 Mobile, RTX 3080 Laptop |
| RTX 40 Mobile | `RTX 40xx Mobile` | RTX 4050 Mobile, RTX 4070 Mobile |
| RTX 50 Mobile | `RTX 50xx Mobile` | RTX 5070 Mobile |
| Arc A-Series | `Arc Axxx` | Arc A750 |
| Arc B-Series | `Arc Bxxx` | Arc B580 |

#### Scenario: Classifying a standard desktop AMD GPU
- **WHEN** the normalized GPU name is "RX 7900 XTX"
- **THEN** the classifier returns "RX 7000"

#### Scenario: Classifying a standard desktop NVIDIA GPU
- **WHEN** the normalized GPU name is "RTX 4090"
- **THEN** the classifier returns "RTX 40"

#### Scenario: Classifying a mobile NVIDIA GPU
- **WHEN** the normalized GPU name is "RTX 4070 Mobile"
- **THEN** the classifier returns "RTX 40 Mobile"

#### Scenario: Classifying a laptop-named GPU as mobile
- **WHEN** the normalized GPU name is "RTX 3080 Laptop"
- **THEN** the classifier returns "RTX 30 Mobile"

#### Scenario: Classifying an Intel Arc GPU
- **WHEN** the normalized GPU name is "Arc B580"
- **THEN** the classifier returns "Arc B-Series"

#### Scenario: Classifying an unrecognized GPU
- **WHEN** the normalized GPU name is "Steam Deck" or "Mali G610" or "VideoCore VII"
- **THEN** the classifier returns `null`

### Requirement: GPU Family Score Aggregation
The system SHALL compute a family-level score for each driver version as the **average of per-model averages** (mean of means). Each GPU model within the family contributes equally, regardless of its individual sample count. If a family contains only one GPU model, the aggregation naturally collapses to a simple mean.

#### Scenario: Aggregating family score with multiple models
- **WHEN** the RTX 50 family has data for driver version 610.x with RTX 5070 (avg: 5000, 10 samples) and RTX 5070 Ti (avg: 6500, 5 samples)
- **THEN** the family score is (5000 + 6500) / 2 = 5750

#### Scenario: Aggregating family score with a single model
- **WHEN** the RX Vega family has only RX Vega 64 with 15 samples averaging 2000
- **THEN** the family score is 2000 (collapses to simple mean)

### Requirement: GPU Family Tooltip
The system SHALL render a tooltip on hover for family-level bars that displays the individual GPU models composing the family, along with their respective sample counts for that driver version.

#### Scenario: Tooltip shows model breakdown
- **WHEN** user hovers over the RTX 50 family bar for driver version 610.x
- **THEN** the tooltip shows "RTX 50", the driver version, the family score, and lists each contributing model with its sample count (e.g., "RTX 5070 (10)", "RTX 5070 Ti (5)")

#### Scenario: Tooltip for single-model family
- **WHEN** user hovers over a family bar that contains only one GPU model
- **THEN** the tooltip shows the model name with its sample count without additional breakdown
