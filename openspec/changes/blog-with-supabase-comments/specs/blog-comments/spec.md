## ADDED Requirements

### Requirement: View comments per post

The post detail view SHALL fetch and display comments from Supabase, ordered by `created_at` ascending. Each comment SHALL show: user name, date, and text content.

#### Scenario: Comments loaded

- **WHEN** the post detail view opens
- **THEN** comments SHALL be fetched and rendered below the post body

#### Scenario: No comments

- **WHEN** the post has no comments
- **THEN** the system SHALL display "Be the first to comment!"

#### Scenario: Comments loading

- **WHEN** comments are being fetched
- **THEN** the system SHALL show a loading indicator

#### Scenario: Comments error

- **WHEN** the comments fetch fails
- **THEN** the system SHALL display an error with retry button

### Requirement: GitHub login to comment

The system SHALL integrate with Supabase Auth using GitHub OAuth provider. Users MUST be authenticated to submit comments. Unauthenticated users SHALL see a "Login with GitHub" button instead of the comment form.

#### Scenario: Not logged in

- **WHEN** the user is not authenticated
- **THEN** the comment area SHALL show a "Login with GitHub" button

#### Scenario: GitHub login flow

- **WHEN** the user clicks "Login with GitHub"
- **THEN** Supabase SHALL open a GitHub OAuth popup

#### Scenario: Successful login

- **WHEN** the OAuth flow completes successfully
- **THEN** the comment form SHALL appear and the user name SHALL be displayed

### Requirement: Authenticated user submits comment

Authenticated users SHALL see a textarea and "Submit" button. Submitting SHALL INSERT a new row in the `comments` table with `post_id`, `user_id`, `user_name`, and `content`. On success, the comment SHALL appear in the list and the textarea SHALL clear.

#### Scenario: Submit comment

- **WHEN** the authenticated user fills the textarea and clicks Submit
- **THEN** the comment SHALL be inserted into Supabase and appended to the comments list

#### Scenario: Submitting state

- **WHEN** the user clicks Submit
- **THEN** the button SHALL be disabled and show "Posting..." until the request completes

#### Scenario: Submit error

- **WHEN** the INSERT fails
- **THEN** the system SHALL display "Failed to post comment" with a retry option

#### Scenario: Empty comment prevented

- **WHEN** the user tries to submit an empty or whitespace-only comment
- **THEN** the system SHALL NOT submit and SHALL show a validation message

### Requirement: Session persistence

The system SHALL check for an existing Supabase auth session on page load. If a session exists, the user SHALL remain logged in across page refreshes.

#### Scenario: Session restored

- **WHEN** the page loads and a valid Supabase session exists
- **THEN** the user SHALL be authenticated without requiring re-login

### Requirement: Logout

The system SHALL provide a logout option in the blog modal when the user is authenticated.

#### Scenario: Logout

- **WHEN** the authenticated user clicks "Logout"
- **THEN** Supabase session SHALL be destroyed and the UI SHALL return to unauthenticated state
