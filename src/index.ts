import express from 'express';
import { setupApp } from './setupApp';

const app = express();
setupApp(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
