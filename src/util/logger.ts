import * as winston from "winston";
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-w',
    zippedArchive: true,
    maxSize: '20m'
});

transport.on('rotate', (oldFilename, newFilename) => {});

export const logger = winston.createLogger({
    transports: [
      transport
    ]
});
