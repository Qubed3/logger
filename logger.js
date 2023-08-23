const path = require('path');

const LCFATAL = "\x1b[41m";
const LCERROR = "\x1b[31m";
const LCWARN = "\x1b[33m";
const LCINFO = "\x1b[36m";
const LCDEBUG = "\x1b[32m";
const LCRESET = "\x1b[0m";

const PATH_OUTPUT = {
    PATH: "110",
    FILE: "001",
    WHOLE: "111"
}

const DEBUG_LEVEL = {
    FATAL: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
}
DEBUG_LEVEL.inverse = {
    0: "FATAL",
    1: "ERROR",
    2: "WARN",
    3: "INFO",
    4: "DEBUG"
}

/*
Logging Levels
FATAL (0)   | Critical errors indicating the application can’t continue to run normally without developer intervention.
ERROR (1)   | App is still capable of running but has encountered a problem. Usually, this indicates that a required task in the application failed.
WARN (2)    | Indicates an issue in the application that if left unchecked could grow into an error.
INFO (3)    | Used to indicate check points of expected behaviour and processing e.g. start of a process, completion of a task, or a change in the state of the system.
DEBUG (4)   | Used strickly within the debugging process. Used to understand what the system is doing, identify bugs and issues, and diagnose problems.

Stack Overflow link for colours: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
*/

/* Config options */
//maxLoggingLevel sets the maximum logging level that should be output. All levels below the max will also be output 
var maxLoggingLevel = DEBUG_LEVEL.INFO;

//includeTimestamp indicates if date and time should be on each output.
var includeTimestamp = false;

//groupLogsByFile indicates if a header should be printed displaying which file a logged message has come from, each time it changes.
var groupLogsByFile = false;

var pathOutput = PATH_OUTPUT.FILE;
/*---------------------------------*/

var prevCallerPath = "";
var finalMessage = "";
var includeTable = false;
var currentCallerPath = "";

function resetDefaults(){
    finalMessage = "";
    includeTable = false;
}
/**
 * Evaluate all guard type options that set conditions under which the message may be logged.
 * Options that are checked are: 
 * options.assert
 * @param {object} options options object providing additional logging functionality
 * @returns {boolean} This dertermines if processing this message should continue.
 */
function evaluateOptionsToDetermineAdvancing(options){
    //if the assert option exists and is a function...
    if(options.hasOwnProperty('assert') && (typeof options.assert === "function")){
        //run the function to see if it fails. If it fails exit the function. If it passes continue.
        // console.log(`An Assertion: ${options.assert()}`);
        if(!options.assert()) return false;
    }
    //if the assert option exists and is a boolean...
    else if(options.hasOwnProperty('assert') && (typeof options.assert === "boolean")){
        // console.log("A Boolean");
        if(options.assert == false) return false;
    }

    return true;
}

/**
 * Configures internal varibales to align with configutation options.
 * Options that are checked are: 
 * options.table, 
 * options.tableObject
 * @param {object} options options object providing additional logging functionality
 */
function implementConfigOptions(options){
    
    //If the table option is set to true
    if(options.hasOwnProperty('table')){
        if(options.table == true && options.hasOwnProperty('tableObject')){
            includeTable = true;
        }
    }
    

}

function addLoggingGroupHeader(){
    //get the current path of the file calling the logger
   // var currentCallerPath = callerPath({depth: 1});

    // TODO: Find a module that can check callstack

    //Next check if the current file calling the logger is the same as the previous one.
    if(currentCallerPath == prevCallerPath) return;

    //Output the directory based on the PATH_OUTPUT configuration
    switch (pathOutput) {
        case PATH_OUTPUT.FILE:
            finalMessage+=`\n-----   ${path.basename(currentCallerPath)}   -----\n`;
            break;
        case PATH_OUTPUT.PATH:
            finalMessage+=`\n-----   ${path.dirname(currentCallerPath)}   -----\n`;
            break;
        case PATH_OUTPUT.WHOLE:
            finalMessage+=`\n-----   ${currentCallerPath}   -----\n`;
            break;
    
        default:
            break;
    }
    
    prevCallerPath = currentCallerPath;

}

/**
 * 
 * @param {logger.DebugLevel | int} debugLevel A number within the inclusive range of 0-4. The DebugLevel represents these numbers as an enum (0:FATAL, 1:ERROR, 2:WARN, 3:INFO, 4:DEBUG).
 * @param {string} message The message to be logged
 * @param {Object} options options object providing additional logging functionality
 * @returns {string} complete construction of message applying configuration options
 */
function constructMessage(debugLevel, message, options){

    if(groupLogsByFile){
        addLoggingGroupHeader();
    }

    if(options){
        //Check processing isn't haulted by conditions set in the options
        if(!evaluateOptionsToDetermineAdvancing(options)) return null
                
        //configures internal varibales to align with configutation options
        implementConfigOptions(options);
    }
    //If includeTimestamp is true, the date and time is added to the finalMessage being constructed.
    if(includeTimestamp || options.timestamp) finalMessage+=(`${timestamp()}`);

    //We add the message parameter to the finalMessage with specific colouring for the debugLevel
    switch (debugLevel) {
        case 0:
            finalMessage+=(`${LCFATAL}${message}${LCRESET}`);
            break;
        case 1:
            finalMessage+=(`${LCERROR}${message}${LCRESET}`);
            break;
        case 2:
            finalMessage+=(`${LCWARN}${message}${LCRESET}`);
            break;
        case 3:
            finalMessage+=(`${LCINFO}${message}${LCRESET}`);
            break;
        case 4:
            finalMessage+=(`${LCDEBUG}${message}${LCRESET}`);
            break;            
        default:
            finalMessage+=("NONE OF THE DEBUG LEVELS WERE SELECTED?!")
            break;
    }

    return finalMessage;
}

const logger = {
    /**
     * @param {string} message 
     * @param {Object} options 
     * @param {boolean|function} options.assert pass a function (or resolve it in the parameter) that results to true or false. If true, the message will be logged.
     * @param {boolean} options.table indicates whether the object in object.tableObject should be logged in a table below the logged message.
     * @param {Object} options.tableObject the object to be logged if options.table is set to true.
     * @param {Object} options.timestamp this is set to a boolean and can force the timestamp to be printed in that particular log when set to true even if the global timestamp setting is set to false.
     * @param {Object} options.forceLog this is set to a boolean and can force the log to be printed regardless of the the global maxLoggingLevel set.
     * @param {Object} optoins.returnString this is set to a boolean and will return the string rather than log it if set to true.
     * @returns 
     */
    FATAL(message ,options){
        //Reset properties that may carry data from last logging.
        resetDefaults();

        //Check this is below the maxLoggingLevel. If is above, exit function.
        if(DEBUG_LEVEL.FATAL > maxLoggingLevel) {
            //If the debug level is greater than the maxLoggingLevel we check if the option forceLog is set to false
            //before returning. If set to true, maxLoggingLevel is dimissed and we continue through the function.
            if(options === undefined) return;

            if(!options.hasOwnProperty('forceLog')) return;

            if(options.forceLog == false) return;
        }
        finalMessage = constructMessage(DEBUG_LEVEL.FATAL,message,options);
        if(finalMessage == null) return;

        if(options && options.hasOwnProperty('returnString') && options.returnString){
            return finalMessage
        }

        console.log(finalMessage);
        if(includeTable) console.table(options.tableObject);

        resetDefaults();
    },

    ERROR(message ,options){
        //Reset properties that may carry data from last logging.
        resetDefaults();

        //Check this is below the maxLoggingLevel. If is above, exit function.
        if(DEBUG_LEVEL.ERROR > maxLoggingLevel) {
            //If the debug level is greater than the maxLoggingLevel we check if the option forceLog is set to false
            //before returning. If set to true, maxLoggingLevel is dimissed and we continue through the function.
            if(options === undefined) return;

            if(!options.hasOwnProperty('forceLog')) return;

            if(options.forceLog == false) return;
        }
        finalMessage = constructMessage(DEBUG_LEVEL.ERROR,message,options);
        if(finalMessage == null) return;

        if(options && options.hasOwnProperty('returnString') && options.returnString){
            return finalMessage
        }

        console.log(finalMessage);
        if(includeTable) console.table(options.tableObject);

        resetDefaults();
    },

    WARN(message ,options){
        //Reset properties that may carry data from last logging.
        resetDefaults();

        //Check this is below the maxLoggingLevel. If is above, exit function.
        if(DEBUG_LEVEL.WARN > maxLoggingLevel) {
            //If the debug level is greater than the maxLoggingLevel we check if the option forceLog is set to false
            //before returning. If set to true, maxLoggingLevel is dimissed and we continue through the function.
            if(options === undefined) return;

            if(!options.hasOwnProperty('forceLog')) return;

            if(options.forceLog == false) return;
        }
        finalMessage = constructMessage(DEBUG_LEVEL.WARN,message,options);
        if(finalMessage == null) return;

        if(options && options.hasOwnProperty('returnString') && options.returnString){
            return finalMessage
        }

        console.log(finalMessage);
        if(includeTable) console.table(options.tableObject);

        resetDefaults();
    },

    INFO(message ,options){
        //Reset properties that may carry data from last logging.
        resetDefaults();

        //Check this is below the maxLoggingLevel. If is above, exit function.
        if(DEBUG_LEVEL.INFO > maxLoggingLevel) {
            //If the debug level is greater than the maxLoggingLevel we check if the option forceLog is set to false
            //before returning. If set to true, maxLoggingLevel is dimissed and we continue through the function.
            if(options === undefined) return;

            if(!options.hasOwnProperty('forceLog')) return;

            if(options.forceLog == false) return;
        }
        finalMessage = constructMessage(DEBUG_LEVEL.INFO,message,options);
        if(finalMessage == null) return;

        if(options && options.hasOwnProperty('returnString') && options.returnString){
            return finalMessage
        }

        console.log(finalMessage);
        if(includeTable) console.table(options.tableObject);

    },

    DEBUG(message ,options){
        //Reset properties that may carry data from last logging.
        resetDefaults();

        //Check this is below the maxLoggingLevel. If is above, exit function.
        if(DEBUG_LEVEL.DEBUG > maxLoggingLevel) {
            //If the debug level is greater than the maxLoggingLevel we check if the option forceLog is set to false
            //before returning. If set to true, maxLoggingLevel is dimissed and we continue through the function.
            if(options === undefined) return;

            if(!options.hasOwnProperty('forceLog')) return;

            if(options.forceLog == false) return;
        }
        finalMessage = constructMessage(DEBUG_LEVEL.DEBUG,message,options);
        if(finalMessage == null) return;

        if(options && options.hasOwnProperty('returnString') && options.returnString){
            return finalMessage
        }

        console.log(finalMessage);
        if(includeTable) console.table(options.tableObject);

        resetDefaults();
    },

    setMaxLoggingLevel(level){
        if (level > 4 && level < 0) return;
    
        maxLoggingLevel = level;
    },

    getMaxLoggingLevel(returnEnum){
        if(returnEnum) return DEBUG_LEVEL.inverse[maxLoggingLevel]
        return maxLoggingLevel
    },

    includeTimestamp(bool){
        if(typeof bool != "boolean") {
            console.log(`${bool} is not a boolean. The method includeTimestamp only accepts booleans`); 
            return;
        }

        includeTimestamp = bool;
    },

    includeGroupByFile(bool, string){
        if(typeof bool != "boolean") {
            console.log(`${bool} is not a boolean. The method includeGroupByFile only accepts booleans`); 
            return;
        }

        groupLogsByFile = bool;
    }

}



function middlewareHTTPCallLogger (req, res, next) {
    if(3 <= maxLoggingLevel) {
        console.log(`${timestamp()}${req.method} request received at ${req.path}`);
    }
    next();
}

function timestamp(){
    return `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()}  |  ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}  |  `
}



module.exports = { logger, DEBUG_LEVEL, middlewareHTTPCallLogger};