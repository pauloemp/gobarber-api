import express, { response } from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.status(200).json({ message: "Hello Friend" })
})

app.listen(3333, () => console.log('💻 Server running o port 3333'))