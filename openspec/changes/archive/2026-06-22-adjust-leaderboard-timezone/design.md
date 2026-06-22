## Context

Rather than applying a complex conversion or shift, the user wants the dashboard to reflect the exact raw timestamps recorded in the database/source sheet. We will remove the custom timezone conversion logic entirely.

## Goals / Non-Goals

**Goals:**
- Display raw date/time values from the source Google Sheet/CSV.
- Remove all timezone offset math.

**Non-Goals:**
- Any client-side conversion or timezone parsing.

## Decisions

### 1. Remove convertUTCToGMT3 entirely
- **Approach**: Remove the function and directly assign the raw string value to the `dateTime` field.
- **Rationale**: Keeps the codebase simpler, displays raw source values as requested, and avoids timezone discrepancies between the dashboard and raw sheet.

## Risks / Trade-offs

- **Risk**: Stored timestamps in the Google Sheet might be in a different timezone (e.g. UTC or Pacific Time) than the user's local timezone.
- **Mitigation**: The user accepts this and prefers displaying the raw data source timestamp directly.
