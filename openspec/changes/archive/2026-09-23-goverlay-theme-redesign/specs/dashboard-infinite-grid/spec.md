# Spec Delta

## MODIFIED Requirements

### Requirement: Infinite 3D Grid Background Rendering
The system SHALL replace the 3D perspective moving grid with a clean, static, sober dark slate background (`#111622`) across the entire dashboard viewport.
- The background SHALL remain fixed and non-intrusive without motion.
- The background SHALL eliminate retro-futuristic purple radial glow gradients in favor of subtle dark slate shading.

#### Scenario: Displaying the infinite 3D grid background
- **WHEN** the dashboard page loads in the browser
- **THEN** the viewport displays a static, uniform dark slate background behind all cards without 3D animation

## REMOVED Requirements

### Requirement: Subtle Scrolling Animation
**Reason**: Replaced by static sober background to match Goverlay's native desktop application theme.
**Migration**: The `@keyframes grid-scroll` animation and rotating transforms are removed from CSS.

### Requirement: Horizon and Fade Masking
**Reason**: A flat static dark background does not require 3D horizon fade masking.
**Migration**: The `-webkit-mask-image` gradient masks for perspective grid fade are removed.
