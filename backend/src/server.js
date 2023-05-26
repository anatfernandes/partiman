import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is listening on port ${port}`);
});
