import express from "express";
import bodyParser from "body-parser";
import {changeSymbols, IProductions} from "../ll1/consts";
import {eliminateLeftRecursion} from "../ll1/steps/leftRecursion";
import {leftFactoring} from "../ll1/steps/leftFactoring";
import {buildPredictiveParsingTable} from "../ll1/steps/predictiveParsingTable";
import {parseLL1} from "../ll1/steps/parse";
import {substituteMapping} from "../ll1/utils/utils";

const parserRouter = express.Router();

parserRouter.use(bodyParser.json());

parserRouter.route('/parse')
    .post((req, res, next) => {
        console.log(req.body)
        try {
            const {word, productions} = req.body;

            changeSymbols(req.body.startSymbol, req.body.epsilon);
            // console.log('changed symbols')

            // 1. Left Recursion
            let lr: IProductions = {};
            let mapLR: object = {};
            try {
                [lr, mapLR] = eliminateLeftRecursion(productions, {});
                // console.log('1. left recursion: ', lr, mapLR)
            } catch (e) {
                return res.json({
                    success: false,
                    message: `Left Recursion removal error ${e.message}`
                })
            }

            // 2. Left Factoring
            let lf: IProductions = {};
            let mapLF: object = {};
            try {
                [lf, mapLF] = leftFactoring(lr, mapLR);
                // console.log('2. left factoring: ', lf, mapLF)
            } catch (e) {
                return res.json({
                    success: false,
                    message: `Left Factoring error ${e.message}`,
                    leftRecursion: {data: lr, map: mapLR}
                })
            }

            // 3. Predictive table
            let parseTable: object = {};
            let terminals: string[] = [];
            let nonTerminals: string[] = [];
            try {
                [parseTable, terminals, nonTerminals] = buildPredictiveParsingTable(lf);
                // console.log('3. predictive table: ', parseTable, terminals, nonTerminals)
            } catch (e) {
                return res.json({
                    success: false,
                    message: `Error at building Predictive Parsing Table: ${e.message}`,
                    leftRecursion: {data: lf, map: mapLR},
                    leftFactoring: {data: lf, map: mapLF}
                })
            }

            // 4. Actual word parsing + parse tree constructions
            let accepted: boolean = false;
            let trace: object = {};
            let parseTree: object = {};
            try {
                [accepted, trace, parseTree] = parseLL1(word, parseTable);
                // console.log('4. word parsing: ', accepted, trace, parseTree)
            } catch (e) {
                return res.json({
                    success: false,
                    message: `Error while parsing the word: ${word}: ${e.message}`,
                    leftRecursion: {data: lf, map: mapLR},
                    leftFactoring: {data: lf, map: mapLF},
                    parseTable,
                    terminals,
                    nonTerminals,
                    wordAccepted: accepted,
                    wordParseTable: trace,
                    parseTree
                })
            }

            // 5. Substitute Mapping
            let substitutedProds: IProductions;
            try {
                substitutedProds = substituteMapping(lf, mapLF);
                // console.log('5. substituted productions', substitutedProds)
            } catch (e) {
                return res.json({
                    success: false,
                    message: `Error while substitute mappings for productions after Left Factoring`,
                    leftRecursion: {data: lf, map: mapLR},
                    leftFactoring: {data: lf, map: mapLF},
                    parseTable,
                    terminals,
                    nonTerminals,
                    wordAccepted: accepted,
                    wordParseTable: trace,
                    parseTree
                })
            }

            return res.json({
                success: true,
                message: 'All good',
                leftRecursion: {data: lr, map: mapLR},
                leftFactoring: {data: lf, map: mapLF},
                parseTable,
                terminals,
                nonTerminals,
                wordAccepted: accepted,
                wordParseTable: trace,
                parseTree,
                substitutedProds
            })

        } catch (e) {
            res.json({
                success: false,
                message: e.message
            })
        }


    })

export = parserRouter