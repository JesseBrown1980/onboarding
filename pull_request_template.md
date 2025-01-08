# Please answer the following questions:

- What were some of the major decisions you made during this exercise? What were the driving factors behind those decisions?

  - **Tailwind & shadcn/ui:** Chose to use Tailwind and shadcn/ui for faster development and consistent UI design. shadcn/ui is currently a popular choice in the community.
  - **Folder Structure Update:** Refactored the folder structure for better organization, focusing on maintainability and future extensibility.
  - **Centralized Authentication:** Implemented an auth context and middleware to centralize the authentication system, improving consistency and scalability.
  - **API Integration:** Introduced an api folder for centralized API integration, streamlining API requests and managing responses in one place.

- What changes would you make to the front end of this application to prepare it for production?

  - **Loading Spinner:** Added a user-friendly loading spinner for better UX during asynchronous operations.
  - **Custom Error Messages:** Improved error handling by implementing user-friendly, custom error messages.
  - **Mobile Responsiveness:** Added responsive design for smaller screens (if needed per requirements).
  - **Sensitive Information:** Ensured all sensitive data is securely stored in environment files (.env).
  - **Optimization:** Considered the introduction of useMemo and useCallback for performance optimizations.
  - **Unit Testing:** Added unit tests to ensure functionality and stability.
  - **Accessibility:** Added aria-label attributes to the inputs for better accessibility.

- If you had time to work on one more aspect of the app, what would you focus on and why?

  - **Generalized Error States:** Plan to create more reusable and generalized error states to handle various error scenarios consistently.
  - **Styling:** Ensure consistency in styling with a shared theme (e.g., consistent button styles, spacing).
  - **Centralized State Management:** If the onboarding process needs to persist data across components or pages, consider using a state management solution like Redux or Context API.
