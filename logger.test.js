// const DEUBG_LEVEL = require('./logger');
const { logger, DEBUG_LEVEL} = require('./logger');

describe("The functions within logger set the global properties correctly", () => {
    test("Set the Max Logging Level to FATAL(0)", () => {
        logger.setMaxLoggingLevel(DEBUG_LEVEL.FATAL);
        expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.FATAL);
    })

    test("Set the Max Logging Level to ERROR(1)", () => {
        logger.setMaxLoggingLevel(DEBUG_LEVEL.ERROR);
        expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.ERROR);
    })

    test("Set the Max Logging Level to WARN(2)", () => {
        logger.setMaxLoggingLevel(DEBUG_LEVEL.WARN);
        expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.WARN);
    })

    test("Set the Max Logging Level to INFO(3)", () => {
        logger.setMaxLoggingLevel(DEBUG_LEVEL.INFO);
        expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.INFO);
    })

    test("Set the Max Logging Level to DEBUG(4)", () => {
        logger.setMaxLoggingLevel(DEBUG_LEVEL.DEBUG);
        expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.DEBUG);
    })
})

describe("All messages types should display with their expected colours", () => {

    beforeEach(() => {
        //Set the correct logging level for test suite.
        logger.setMaxLoggingLevel(DEBUG_LEVEL.DEBUG);
      });
    
    
    test("The Fatal message displays with \x1b[0mwhite\x1b[90m text and red background", () => {
        console.log(logger.getMaxLoggingLevel())
        message = `This is a Fatal Message`
        actualMessage = logger.FATAL(`${message}`,{returnString: true});
        expectedMessage = `\x1b[41m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("The Error message displays with \x1b[31mred\x1b[90m text", () => {
        console.log(logger.getMaxLoggingLevel())
        message = `This is an Error Message`
        actualMessage = logger.ERROR(`${message}`,{returnString: true});
        expectedMessage = `\x1b[31m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("The Warning message displays with \x1b[33myellow\x1b[90m text", () => {
        console.log(logger.getMaxLoggingLevel())
        message = `This is a Warning Message`
        actualMessage = logger.WARN(`${message}`,{returnString: true});
        expectedMessage = `\x1b[33m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("The Info message displays with \x1b[36mblue\x1b[90m text", () => {
        message = `This is a Info Message`
        actualMessage = logger.INFO(`${message}`,{returnString: true});
        expectedMessage = `\x1b[36m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("The Debug message displays with \x1b[32mgreen\x1b[90m text\x1b[0m", () => {
        message = `This is a Debug Message`
        actualMessage = logger.DEBUG(`${message}`,{returnString: true});
        expectedMessage = `\x1b[32m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })
})

describe("If the Max Logging Level is set to INFO", () => {

    beforeEach(() => {
        //Set the correct logging level for test suite.
        logger.setMaxLoggingLevel(DEBUG_LEVEL.INFO);
      });

    test("Fatal messages should be output", () => {
        message = `This is a Fatal Message`
        actualMessage = logger.FATAL(`${message}`,{returnString: true});
        expectedMessage = `\x1b[41m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("Info messages should be output", () => {
        message = `This is a Info Message`
        actualMessage = logger.INFO(`${message}`,{returnString: true});
        expectedMessage = `\x1b[36m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("Debug messages should NOT be output", () => {
        message = `This is a Debug Message`
        actualMessage = logger.DEBUG(`${message}`,{returnString: true});
        expectedMessage = undefined;

        expect(actualMessage).toBe(expectedMessage);
    })
})

describe("If the Max Logging Level is set to FATAL", () => {

    beforeEach(() => {
        //Set the correct logging level for test suite.
        logger.setMaxLoggingLevel(DEBUG_LEVEL.FATAL);
      });

    test("Fatal messages should be output", () => {
        message = `This is a Fatal Message`
        actualMessage = logger.FATAL(`${message}`,{returnString: true});
        expectedMessage = `\x1b[41m${message}\x1b[0m`;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("Info messages should NOT be output", () => {
        message = `This is a Info Message`
        actualMessage = logger.INFO(`${message}`,{returnString: true});
        expectedMessage = undefined;
    
        expect(actualMessage).toBe(expectedMessage);
    })

    test("Debug messages should NOT be output", () => {
        message = `This is a Debug Message`
        actualMessage = logger.DEBUG(`${message}`,{returnString: true});
        expectedMessage = undefined;

        expect(actualMessage).toBe(expectedMessage);
    })
})

