# MeloVerse

MeloVerse is a web application that allows users to sign up, browse posts and create post, and interact with the community. It is built using Node.js, Express.js, MongoDB, React.js, and other technologies listed below.

## Technology Stack

- Node.js and npm
- Express.js (or another suitable Node.js framework)
- MongoDB (or another database of your choice)
- jsonwebtoken library for JWT generation and validation
- React.js for component structure and functionality
- Tailwind CSS for responsive design

## Signup Screen

The signup screen allows users to create a new account. It includes fields for username, email, password (with confirmation of password). Validation for required fields and email format is implemented using validation librarie formik and yup. and a welcome toast notification is simulated upon successful signup. Users are redirected to the post list screen using React Router.

## Post List Screen / Home screen

The post list screen allows users to scroll infinitely and view posts fetched from the server using GET API endpoints. The design is implemented using Tailwind CSS to ensure responsiveness and visual appeal consistent with the "MelodyVerse" theme.
infinite scroll is implemented using tanstack/react-query.

## API Endpoints

- **POST /signup and login :** Registers a new user and login user with provided username, email, and password. Validates input, ensures unique usernames and emails, hashes passwords securely, stores user data in the database, and returns a success message and JWT token upon successful registration.

- **GET /posts:** Implements paginated fetching of posts data from the database. Ensures secure access, rejecting unauthenticated requests.

- **POST / posts :** user can create new post on this end point.

## JWT Implementation

JWT tokens are generated with appropriate payload and expiration time upon successful login. They are validated in protected routes to ensure user authentication. Robust token refresh mechanisms can be implemented if desired.

## Bonus features.

- Securely stored passwords using strong hashing algorithm bcrypt.
- Added rate limiting to protect against brute force attacks while login using express-rate-limit.
- Used middleware for authentication and authorization.
- Useed animations or microinteractions with React libraries like Framer Motion to enhance user experience.

## Getting Started

1. Clone the repository:

```bash
git clone [repository URL]
```
## screenshots
![Screenshot from 2024-03-09 15-48-09](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/48e43de3-989d-43f5-8c11-d68d49c3625a)

![Screenshot from 2024-03-09 15-48-13](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/f9d7ed36-d29a-43b1-9107-2b7d761f67d2)

![Screenshot from 2024-03-09 15-48-47](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/c66ea35d-53c6-4d87-bba3-62c96de5e988)

![Screenshot from 2024-03-09 15-49-12](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/8b6aa3f0-0af1-48f9-8733-22797b3b2495)

![Screenshot from 2024-03-09 15-50-38](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/2215bfcf-7277-463c-bc06-284ccf8f5bff)

![Screenshot from 2024-03-09 15-50-49](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/6e865ce5-09ca-46f2-9335-05c61e4c0d28)

![Screenshot from 2024-03-08 22-23-51](https://github.com/PratikHGhadge/MeloVerse/assets/93422248/1483465c-1e68-484b-a8b6-6ae1b44289e0)
