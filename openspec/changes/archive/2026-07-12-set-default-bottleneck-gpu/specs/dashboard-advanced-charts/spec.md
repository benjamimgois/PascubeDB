## ADDED Requirements

### Requirement: Bottleneck Chart Default GPU Selection
The system SHALL default the selected option in the GPU vs CPU Bottleneck chart's GPU select dropdown to "RX 9070 XT" upon initialization if that model is available in the options.

#### Scenario: Initializing bottleneck chart with default GPU model
- **WHEN** the dashboard page finishes loading and initializes the bottleneck GPU select dropdown
- **THEN** "RX 9070 XT" is selected by default and the corresponding GPU bottleneck chart is rendered
