## ADDED Requirements

### Requirement: Blog button in header

The system SHALL display a "Blog" button in the `.header-actions` div, positioned before the "Leaderboard" button. The button SHALL have id `blog-btn` and class `btn btn-secondary`, with a Lucide `newspaper` icon.

#### Scenario: Blog button visible

- **WHEN** the page loads
- **THEN** the Blog button SHALL be visible in the header actions area

### Requirement: Blog modal with post list

Clicking the Blog button SHALL open a `<dialog id="blog-modal">` that fetches and displays published posts from Supabase, ordered by `created_at` descending. Each post card SHALL show: title, date (formatted `DD/MM/YYYY`), and comment count.

#### Scenario: Open blog modal

- **WHEN** the user clicks the Blog button
- **THEN** a modal SHALL open showing the list of published posts

#### Scenario: Blog modal loading state

- **WHEN** the modal opens and posts are being fetched
- **THEN** the system SHALL display skeleton loading cards

#### Scenario: Blog modal empty state

- **WHEN** no published posts exist
- **THEN** the system SHALL display "No posts yet. Stay tuned!"

#### Scenario: Blog modal error state

- **WHEN** the Supabase query fails
- **THEN** the system SHALL display an error message with a retry button

### Requirement: Post detail view

Clicking a post card SHALL switch the modal to a detail view showing the full post content with markdown rendered to HTML. The view SHALL include a "Back to list" button.

#### Scenario: Open post detail

- **WHEN** the user clicks a post card
- **THEN** the modal SHALL render the post markdown body as HTML and display comments below

#### Scenario: Post loading state

- **WHEN** the post content is being fetched
- **THEN** the system SHALL display skeleton placeholder for title and body

#### Scenario: Post error state

- **WHEN** the post fetch fails
- **THEN** the system SHALL display "Could not load this post" with a retry button

### Requirement: Blog modal close

The modal SHALL close when the user clicks the [X] button, presses Escape, or clicks outside the modal. Closing SHALL reset the view to the post list.

#### Scenario: Close blog modal

- **WHEN** the user clicks [X], presses Escape, or clicks outside
- **THEN** the modal SHALL close and reset to list view

### Requirement: Blog modal close button

The modal SHALL have a header with "Blog" title and an [X] close button with id `close-blog-modal`.

#### Scenario: Close button visible

- **WHEN** the blog modal is open
- **THEN** the close button SHALL be visible in the modal header
