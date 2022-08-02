* API

.env variables:
MONGODB_URI=
JWT_SECRET=

starting:

- npm install && npm start

dependencies:

- axios
- bcrypt
- cors
- dotenv
- express
- express-jwt
- jsonwebtoken
- mongoose
- node-cron
- nodemon
- uuid

endpoints:

- /users/register

- /users/login

- /instruments

- /instruments/:symbol

* Frontend

starting:

- npm install && npm run dev

dependencies:

- @emotion/styled
- @mui/material
- @mui/styled-engine-sc
- @reduxjs/toolkit
- axios
- date-fns
- react-dom
- react-redux
- redux
- redux-persist

pages:

- /login

- /instruments

- /instruments/instrument
