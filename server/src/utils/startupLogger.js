import chalk from "chalk";
import os from "node:os";
import process from "node:process";

const startupLogger = ({ port, env }) => {
  console.clear();

  const line = chalk.gray(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  );

  console.log(
    chalk.hex("#3B82F6").bold(`
████████╗███████╗ ██████╗██╗  ██╗███╗   ██╗███████╗███████╗████████╗
╚══██╔══╝██╔════╝██╔════╝██║  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝
   ██║   █████╗  ██║     ███████║██╔██╗ ██║█████╗  ███████╗   ██║
   ██║   ██╔══╝  ██║     ██╔══██║██║╚██╗██║██╔══╝  ╚════██║   ██║
   ██║   ███████╗╚██████╗██║  ██║██║ ╚████║███████╗███████║   ██║
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝
`),
  );

  console.log(line);
  console.log(chalk.bold.cyan("🛒 TechNest • Modern E-Commerce Backend API"));
  console.log(chalk.gray("Build • Deploy • Scale"));
  console.log(line);

  console.log(chalk.bold.yellow("📦 Project"));
  console.log("   Name         : " + chalk.green("TechNest"));
  console.log("   Version      : " + chalk.green("v1.0.0"));
  console.log(chalk`   Environment  : ${chalk.yellow(env)}`);
  console.log("   Runtime      : " + chalk.cyan(process.version));
  console.log(`   Started At   : ${new Date().toLocaleString()}`);

  console.log();
  console.log(chalk.bold.yellow("🌐 Server"));
  console.log("   Status       : " + chalk.greenBright("🟢 ONLINE"));
  console.log(`   Host         : localhost`);
  console.log(`   Port         : ${port}`);
  const baseURL = `http://localhost:${port}`;
  console.log(chalk`   Base URL     : ${chalk.blue.underline(baseURL)}`);
  const apiURL = `http://localhost:${port}/api/v1`;
  console.log(chalk`   API          : ${chalk.blue.underline(apiURL)}`);
  const healthURL = `http://localhost:${port}/health`;
  console.log(chalk`   Health       : ${chalk.blue.underline(healthURL)}`);

  console.log();
  console.log(chalk.bold.yellow("📦 Middleware"));
  console.log(`   ✅ Express`);
  console.log(`   ✅ CORS`);
  console.log(`   ✅ dotenv`);
  console.log(`   ✅ JSON Parser`);
  console.log(`   ✅ URL Encoded Parser`);
  console.log(`   ✅ Error Handler`);

  console.log();
  console.log(chalk.bold.yellow("🗄 Database"));
  console.log(chalk`   Status       : ${chalk.yellow("🟡 Not Connected")}`);
  console.log(`   ORM          : Prisma`);
  console.log(`   Database     : PostgreSQL`);

  console.log();
  console.log(chalk.bold.yellow("💻 System"));
  console.log(`   Platform     : ${os.platform()} (${os.arch()})`);
  console.log(`   Hostname     : ${os.hostname()}`);
  console.log(`   CPU Cores    : ${os.cpus().length}`);
  console.log(
    `   Memory       : ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
  );

  console.log();
  console.log(chalk.bold.yellow("🚀 Tech Stack"));
  console.log(
    chalk.green("Node.js") +
      chalk.gray(" • ") +
      chalk.cyan("Express") +
      chalk.gray(" • ") +
      chalk.magenta("REST API") +
      chalk.gray(" • ") +
      chalk.yellow("JWT") +
      chalk.gray(" • ") +
      chalk.blue("Prisma") +
      chalk.gray(" • ") +
      chalk.red("Azure") +
      chalk.gray(" • ") +
      chalk.greenBright("Docker"),
  );

  console.log();
  console.log(chalk.bold.yellow("🛠 Upcoming Features"));
  console.log(`   ⏳ Authentication`);
  console.log(`   ⏳ Product Management`);
  console.log(`   ⏳ Shopping Cart`);
  console.log(`   ⏳ Orders`);
  console.log(`   ⏳ Payments`);
  console.log(`   ⏳ Admin Dashboard`);

  console.log(line);

  console.log(
    chalk.green.bold(
      "🚀 TechNest Backend is running and ready to accept requests!",
    ),
  );

  console.log(
    chalk.cyan("💡 Tip: Press ") +
      chalk.yellow.bold("CTRL + C") +
      chalk.cyan(" to stop the server."),
  );

  console.log(line);
};

export default startupLogger;
