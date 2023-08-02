interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

function sendMessage(logger: Logger, message: string): void {
    logger.log(message);
}

const consoleLogger = new ConsoleLogger();

sendMessage(consoleLogger, "Hello, world!");
