var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (message) {
        console.log(message);
    };
    return ConsoleLogger;
}());
function sendMessage(logger, message) {
    logger.log(message);
}
var consoleLogger = new ConsoleLogger();
sendMessage(consoleLogger, "Hello, world!");
