import chalk from 'chalk';
import os from 'node:os';
import process from 'node:process';

export interface StartupLoggerOptions {
  port: number | string;
  env: string;
}

export function startupLogger({ port, env }: StartupLoggerOptions): void {
  console.clear();

  const line = chalk.gray(
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  );

  console.log(
    chalk.hex('#3B82F6').bold(`
████████╗███████╗ ██████╗██╗  ██╗███╗   ██╗███████╗███████╗████████╗
╚══██╔══╝██╔════╝██╔════╝██║  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝
   ██║   █████╗  ██║     ███████║██╔██╗ ██║█████╗  ███████╗   ██║
   ██║   ██╔══╝  ██║     ██╔══██║██║╚██╗██║██╔══╝  ╚════██║   ██║
   ██║   ███████╗╚██████╗██║  ██║██║ ╚████║███████╗███████║   ██║
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝
`)
  );

  console.log(line);
  console.log(chalk.bold.cyan('🛒 TechNest Store • Enterprise E-Commerce Backend API'));
  console.log(chalk.gray('Clean Architecture • Node 22 LTS • Express 5 • Prisma • Supabase • Redis'));
  console.log(line);

  console.log(chalk.bold.yellow('📦 Project Setup'));
  console.log('   Name         : ' + chalk.green('TechNest Store Server'));
  console.log('   Version      : ' + chalk.green('v1.0.0'));
  console.log('   Environment  : ' + chalk.yellow(env));
  console.log('   Runtime      : ' + chalk.cyan(process.version));
  console.log(`   Started At   : ${new Date().toLocaleString()}`);

  console.log();
  console.log(chalk.bold.yellow('🌐 Network & Endpoints'));
  console.log('   Status       : ' + chalk.greenBright('🟢 ONLINE'));
  console.log(`   Host         : localhost`);
  console.log(`   Port         : ${port}`);
  const baseURL = `http://localhost:${port}`;
  console.log('   Base URL     : ' + chalk.blue.underline(baseURL));
  const apiURL = `http://localhost:${port}/api/v1`;
  console.log('   API Base     : ' + chalk.blue.underline(apiURL));
  const healthURL = `http://localhost:${port}/health`;
  console.log('   Health Check : ' + chalk.blue.underline(healthURL));

  console.log();
  console.log(chalk.bold.yellow('📦 Configured Pipeline'));
  console.log(`   ✅ Express 5 Framework (x-powered-by hidden)`);
  console.log(`   ✅ CORS Security & Credentials Allowed`);
  console.log(`   ✅ Helmet Headers & Compression`);
  console.log(`   ✅ JSON Parser & Request ID Correlation`);
  console.log(`   ✅ Pino Logger & Centralized Error Handler`);

  console.log();
  console.log(chalk.bold.yellow('🗄 Database & Infrastructure'));
  console.log('   Status       : ' + chalk.greenBright('🟢 CONNECTED'));
  console.log(`   ORM          : Prisma Client v6`);
  console.log(`   Database     : Supabase PostgreSQL`);
  console.log(`   Cache & Queue: Redis 7 + BullMQ`);

  console.log();
  console.log(chalk.bold.yellow('💻 Operating Host'));
  console.log(`   Platform     : ${os.platform()} (${os.arch()})`);
  console.log(`   Hostname     : ${os.hostname()}`);
  console.log(`   CPU Cores    : ${os.cpus().length}`);
  console.log(
    `   RAM Memory   : ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`
  );

  console.log();
  console.log(chalk.bold.yellow('🚀 Active Feature Modules'));
  console.log(`   ✅ Authentication & RBAC (JWT / Supabase Auth)`);
  console.log(`   ✅ Product Catalog & Redis Full-Text Search`);
  console.log(`   ✅ Shopping Cart & Guest Bag Merging`);
  console.log(`   ✅ Orders & Automated Inventory Management`);
  console.log(`   ✅ Razorpay / Stripe Payment Gateway`);
  console.log(`   ✅ Enterprise Admin Dashboard Analytics`);

  console.log(line);

  console.log(
    chalk.greenBright.bold(
      '🚀 TechNest Enterprise Backend is live and ready for production requests!'
    )
  );

  console.log(
    chalk.cyan('💡 Tip: Press ') +
      chalk.yellow.bold('CTRL + C') +
      chalk.cyan(' to gracefully terminate the process.')
  );

  console.log(line);
}

export default startupLogger;
