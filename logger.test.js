// const DEUBG_LEVEL = require('./logger');
const { logger, DEBUG_LEVEL} = require('./logger');

describe("GIVEN I'm using the setMaxLoggingLevel function to set the max logging level", () => {
    describe("WHEN I set the max logging level to FATAL(0)", () => {
        test("THEN the getMaxLoggingLevel function will return FATAL.", () => {
            logger.setMaxLoggingLevel(DEBUG_LEVEL.FATAL);
            expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.FATAL);
        })
    })

    describe("WHEN I set the max logging level to ERROR(1)", () => {
        test("THEN the getMaxLoggingLevel function will return ERROR.", () => {
            logger.setMaxLoggingLevel(DEBUG_LEVEL.ERROR);
            expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.ERROR);
        })
    })

    describe("WHEN I set the max logging level to WARN(2)", () => {
        test("THEN the getMaxLoggingLevel function will return WARN.", () => {
            logger.setMaxLoggingLevel(DEBUG_LEVEL.WARN);
            expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.WARN);
        })
    })

    describe("WHEN I set the max logging level to INFO(3)", () => {
        test("THEN the getMaxLoggingLevel function will return INFO.", () => {
            logger.setMaxLoggingLevel(DEBUG_LEVEL.INFO);
            expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.INFO);
        })
    })

    describe("WHEN I set the max logging level to DEBUG(4)", () => {
        test("THEN the getMaxLoggingLevel function will return DEBUG.", () => {
            logger.setMaxLoggingLevel(DEBUG_LEVEL.DEBUG);
            expect(logger.getMaxLoggingLevel()).toBe(DEBUG_LEVEL.DEBUG);
        })
    })
})

describe("GIVEN the max logging level has been set to DEBUG(4)", () => {

    beforeEach(() => {
        //Set the correct logging level for test suite.
        logger.setMaxLoggingLevel(DEBUG_LEVEL.DEBUG);
      });

    describe("WHEN a FATAL message is requested to be logged", () => {
        test("THEN the message will display with white text and red background", () => {
            message = `This is a Fatal Message`
            actualMessage = logger.FATAL(`${message}`,{returnString: true});
            expectedMessage = `\x1b[41m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
      })
    
    describe("WHEN a ERROR message is requested to be logged", () => {
        test("THEN the message will display with red text", () => {
            message = `This is an Error Message`
            actualMessage = logger.ERROR(`${message}`,{returnString: true});
            expectedMessage = `\x1b[31m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })
    
    describe("WHEN a WARN message is requested to be logged", () => {
        test("THEN the message will display with yellow text", () => {
            message = `This is a Warning Message`
            actualMessage = logger.WARN(`${message}`,{returnString: true});
            expectedMessage = `\x1b[33m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })
    
    describe("WHEN a INFO message is requested to be logged", () => {
        test("THEN the message will display with blue text", () => {
            message = `This is a Info Message`
            actualMessage = logger.INFO(`${message}`,{returnString: true});
            expectedMessage = `\x1b[36m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })
    
    describe("WHEN a DEBUG message is requested to be logged", () => {
        test("THEN the message will display with green text", () => {
            message = `This is a Debug Message`
            actualMessage = logger.DEBUG(`${message}`,{returnString: true});
            expectedMessage = `\x1b[32m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })
})

describe("GIVEN the max logging level has been set to INFO(3)", () => {

    beforeEach(() => {
        //Set the correct logging level for test suite.
        logger.setMaxLoggingLevel(DEBUG_LEVEL.INFO);
      });

    describe("WHEN a FATAL message is requested to be logged", () => {
        test("THEN the message will display with white text and red background", () => {
            message = `This is a Fatal Message`
            actualMessage = logger.FATAL(`${message}`,{returnString: true});
            expectedMessage = `\x1b[41m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })

    
    describe("WHEN a INFO message is requested to be logged", () => {
        test("THEN the message will display with blue text", () => {
            message = `This is a Info Message`
            actualMessage = logger.INFO(`${message}`,{returnString: true});
            expectedMessage = `\x1b[36m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })
    
    describe("WHEN a DEBUG message is requested to be logged", () => {
        test("THEN the messages should NOT be output", () => {
            message = `This is a Debug Message`
            actualMessage = logger.DEBUG(`${message}`,{returnString: true});
            expectedMessage = undefined;
    
            expect(actualMessage).toBe(expectedMessage);
        })
    })

})

describe("If the Max Logging Level is set to FATAL(0)", () => {

    beforeEach(() => {
        //Set the correct logging level for test suite.
        logger.setMaxLoggingLevel(DEBUG_LEVEL.FATAL);
      });

    describe("WHEN a FATAL message is requested to be logged", () => {
        test("THEN the message will display with white text and red background", () => {
            message = `This is a Fatal Message`
            actualMessage = logger.FATAL(`${message}`,{returnString: true});
            expectedMessage = `\x1b[41m${message}\x1b[0m`;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })

    describe("WHEN a INFO message is requested to be logged", () => {
        test("THEN the message should NOT be output", () => {
            message = `This is a Info Message`
            actualMessage = logger.INFO(`${message}`,{returnString: true});
            expectedMessage = undefined;
        
            expect(actualMessage).toBe(expectedMessage);
        })
    })

    describe("WHEN a DEBUG message is requested to be logged", () => {
        test("THEN the messages should NOT be output", () => {
            message = `This is a Debug Message`
            actualMessage = logger.DEBUG(`${message}`,{returnString: true});
            expectedMessage = undefined;
    
            expect(actualMessage).toBe(expectedMessage);
        })
    })
})

