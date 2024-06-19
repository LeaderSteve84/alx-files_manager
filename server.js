import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

// added line to parse JSON requests
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
