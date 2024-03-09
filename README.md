# MelodyVerse

MelodyVerse is a web application that allows users to sign up, browse posts, and interact with the community. It is built using Node.js, Express.js, MongoDB, React.js, and other technologies listed below.

## Technology Stack

- Node.js and npm
- Express.js (or another suitable Node.js framework)
- MongoDB (or another database of your choice)
- jsonwebtoken library for JWT generation and validation
- React.js for component structure and functionality
- Tailwind CSS for responsive design

## Signup Screen

The signup screen allows users to create a new account. It includes fields for username/email, password (with confirmation), and optional fields like name and profile picture. Validation for required fields and email format is implemented using React state management and validation libraries. Users must agree to terms and conditions before signing up. Clear error messages and success messages are displayed, and a welcome email notification is simulated upon successful signup. Users are redirected to the post list screen using React Router.

## Post List Screen

The post list screen allows users to scroll infinitely and view posts fetched from the server using GET API endpoints. The design is implemented using Tailwind CSS to ensure responsiveness and visual appeal consistent with the "MelodyVerse" theme.

## API Endpoints

- **POST /signup:** Registers a new user with provided username, email, and password. Validates input, ensures unique usernames and emails, hashes passwords securely, stores user data in the database, and returns a success message and JWT token upon successful registration.

- **GET /posts:** Implements paginated fetching of posts data from the database. Ensures secure access, rejecting unauthenticated requests.

## JWT Implementation

JWT tokens are generated with appropriate payload and expiration time upon successful login. They are validated in protected routes to ensure user authentication. Robust token refresh mechanisms can be implemented if desired.

## Best Practices

- Enforce input validation and sanitization to prevent vulnerabilities.
- Protect against common attacks like SQL injection and XSS.
- Securely store passwords using strong hashing algorithms (e.g., bcrypt or Argon2).
- Implement proper error handling and provide informative error messages.
- Write clean, well-structured, and documented code.
- Consider using environment variables for sensitive information.
- Handle sessions and token expiration effectively.

## Bonus Points

- Add rate limiting to protect against brute force attacks.
- Use middleware for authentication and authorization.
- Implement social login options using mock APIs and React libraries.
- Add password visibility toggle.
- Use animations or microinteractions with React libraries like Framer Motion to enhance user experience.
- Include accessibility features like alt text and keyboard navigation using ARIA attributes and focus management.
- Implement unit testing for your React components using Jest or similar libraries.

## Getting Started

1. Clone the repository:

```bash
git clone [repository URL]
```
## screenshots
![Screenshot from 2024-03-08 22-23-51](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/4bc178aa-994e-417e-906c-0c7a6ae0ae9c)

![Screenshot from 2024-03-08 22-23-56](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/9e880faa-e46a-4bc6-9350-279ac27ba075)

![Screenshot from 2024-03-08 22-24-18](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/eb6dbe63-8ff3-4c30-8181-dbde5a3b8f6b)

![Screenshot from 2024-03-08 22-24-24](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/36cb53bf-827c-43fc-a0c8-ad6465262494)


