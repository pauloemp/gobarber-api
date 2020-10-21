import app from '@shared/infra/http/app';

const port = 3333;

app.listen(port, () => console.log(`💻 Server running on http://localhost:${port}`)); // eslint-disable-line
