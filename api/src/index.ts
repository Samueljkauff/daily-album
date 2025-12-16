import app from "./app.js";
import { bootstrap } from "./bootstrap/boostrap.js";

const PORT = 2121;

const env = bootstrap();

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
