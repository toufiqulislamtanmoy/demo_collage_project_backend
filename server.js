import chalk from "chalk";
import app from "./src/app.js";
import { system_config } from "./src/config/system.config.js";

const PORT = system_config?.port || 5000;

app.listen(PORT, () => {
  console.log(chalk.yellowBright(`🚀 Server running on http://localhost:${PORT}`));
});
