## ADDED Requirements

### Requirement: Efficiency Tab Card Units and Renaming
In the dashboard Efficiency tab overview cards:
- The third card SHALL be labeled "TOP CPU Bottleneck".
- The first card (Most Efficient CPU) and the second card (Most Efficient GPU) values SHALL display with the unit "Pts / MHz" appended.
- The fourth card (Best Thermal GPU) value SHALL display with the unit "Pts / ºC" appended.
- Second and third place listings under these cards SHALL also show the same units.

#### Scenario: Displaying overview cards in the Efficiency tab
- **WHEN** the user selects the Efficiency tab on the dashboard
- **THEN** the cards show "Pts / MHz" for CPU/GPU efficiency, "Pts / ºC" for thermal efficiency, and the bottleneck card is titled "TOP CPU Bottleneck"
