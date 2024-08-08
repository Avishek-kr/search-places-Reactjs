## Key Features

- **Search Functionality:** Users can search for places using a search input component.
- **Pagination:** Handles pagination with customizable items per page.
- **Debounce:** Implements debounce functionality for pagination to prevent unnecessary API calls and improve responsiveness.
- **Error Handling:** Displays error notifications if data fetching fails.
- **Loading State:** Shows a loader while data is being fetched.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or Yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of your project and add the following environment variables:

    ```env
    VITE_GEODB_URI=your_geodb_uri
    VITE_GEODB_KEY=your_geodb_key
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at [http://localhost:5173](http://localhost:5173).

## Key Points of Recent Updates

- **Debounce Implementation:**
  - **Pagination:** Added debounce to the items per page input to prevent excessive re-renders and API calls.
  - **useDebounce Hook:** Created a custom hook for handling debounce logic in components.

- **State Management:**
  - **Empty Input Handling:** Updated logic to prevent API calls when the search input is empty and maintain the current UI state.

- **Error Handling:**
  - Added an `ErrorNotification` component to display error messages when data fetching fails.

- **Code Refactoring:**
  - **Component Renaming:** Refactored component names for clarity and consistency.
  - **Component Extraction:** Created new components such as `ErrorNotification` and `Loader` to separate concerns and improve modularity.

## Testing

- **Functionality Tests:** Verified that search functionality works correctly with debounce.
- **UI Tests:** Ensured that the UI elements, including pagination and error notifications, are displayed correctly.
- **Edge Cases:** Tested behavior with empty inputs and pagination changes.
