"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const consts_1 = require("../ll1/consts");
const leftRecursion_1 = require("../ll1/steps/leftRecursion");
const leftFactoring_1 = require("../ll1/steps/leftFactoring");
const predictiveParsingTable_1 = require("../ll1/steps/predictiveParsingTable");
const parse_1 = require("../ll1/steps/parse");
const utils_1 = require("../ll1/utils/utils");
const parserRouter = express_1.default.Router();
parserRouter.use(body_parser_1.default.json());
parserRouter.route('/parse')
    .post((req, res, next) => {
    console.log(req.body);
    try {
        const { word, productions } = req.body;
        consts_1.changeSymbols(req.body.startSymbol, req.body.epsilon);
        // console.log('changed symbols')
        // 1. Left Recursion
        let lr = {};
        let mapLR = {};
        try {
            [lr, mapLR] = leftRecursion_1.eliminateLeftRecursion(productions, {});
            // console.log('1. left recursion: ', lr, mapLR)
        }
        catch (e) {
            return res.json({
                success: false,
                message: `Left Recursion removal error ${e.message}`
            });
        }
        // 2. Left Factoring
        let lf = {};
        let mapLF = {};
        try {
            [lf, mapLF] = leftFactoring_1.leftFactoring(lr, mapLR);
            // console.log('2. left factoring: ', lf, mapLF)
        }
        catch (e) {
            return res.json({
                success: false,
                message: `Left Factoring error ${e.message}`,
                leftRecursion: { data: lr, map: mapLR }
            });
        }
        // 3. Predictive table
        let parseTable = {};
        let terminals = [];
        let nonTerminals = [];
        try {
            [parseTable, terminals, nonTerminals] = predictiveParsingTable_1.buildPredictiveParsingTable(lf);
            // console.log('3. predictive table: ', parseTable, terminals, nonTerminals)
        }
        catch (e) {
            return res.json({
                success: false,
                message: `Error at building Predictive Parsing Table: ${e.message}`,
                leftRecursion: { data: lf, map: mapLR },
                leftFactoring: { data: lf, map: mapLF }
            });
        }
        // 4. Actual word parsing + parse tree constructions
        let accepted = false;
        let trace = {};
        let parseTree = {};
        try {
            [accepted, trace, parseTree] = parse_1.parseLL1(word, parseTable);
            // console.log('4. word parsing: ', accepted, trace, parseTree)
        }
        catch (e) {
            return res.json({
                success: false,
                message: `Error while parsing the word: ${word}: ${e.message}`,
                leftRecursion: { data: lf, map: mapLR },
                leftFactoring: { data: lf, map: mapLF },
                parseTable,
                terminals,
                nonTerminals,
                wordAccepted: accepted,
                wordParseTable: trace,
                parseTree
            });
        }
        // 5. Substitute Mapping
        let substitutedProds;
        try {
            substitutedProds = utils_1.substituteMapping(lf, mapLF);
            // console.log('5. substituted productions', substitutedProds)
        }
        catch (e) {
            return res.json({
                success: false,
                message: `Error while substitute mappings for productions after Left Factoring`,
                leftRecursion: { data: lf, map: mapLR },
                leftFactoring: { data: lf, map: mapLF },
                parseTable,
                terminals,
                nonTerminals,
                wordAccepted: accepted,
                wordParseTable: trace,
                parseTree
            });
        }
        return res.json({
            success: true,
            message: 'All good',
            leftRecursion: { data: lr, map: mapLR },
            leftFactoring: { data: lf, map: mapLF },
            parseTable,
            terminals,
            nonTerminals,
            wordAccepted: accepted,
            wordParseTable: trace,
            parseTree,
            substitutedProds
        });
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        });
    }
});
module.exports = parserRouter;
//# sourceMappingURL=parserRouter.js.map