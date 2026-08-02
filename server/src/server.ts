import app from './app.js';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';
import { prisma } from './config/prisma.js';
import { startupLogger } from './utils/startupLogger.js';

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  startupLogger({
    port: PORT,
    env: config.NODE_ENV,
  });
});

// Graceful Shutdown Handlers
const shutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Initiating graceful shutdown...`);
  server.close(async () => {
    logger.info('HTTP Server closed.');
    await prisma.$disconnect();
    logger.info('Database connection closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
