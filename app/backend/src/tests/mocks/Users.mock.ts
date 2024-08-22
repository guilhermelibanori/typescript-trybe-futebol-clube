const validUser = 
  {
    "email": "user@user.com",
    "password": "secret_user"
  }

const userFromDB = 
  {
    "id": 2,
   " username": 'User',
    "password": '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    "email": 'user@user.com',
    "role": 'user'
  }

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTQyODA3NTEsImV4cCI6MTY5NDg4NTU1MX0.dVikA8mhrj41uYtJD9Cn06gIp_MJkpzUFqBws0quC64'
const invalidField = { message: 'Invalid email or password' }

const missingField = { message: 'All fields must be filled' }


  export {
    validUser,
    invalidField,
    missingField,
    userFromDB,
    validToken
  }
