import express from "express";
import bodyParser from "body-parser";
import {changeSymbols, IProductions} from "../ll1/consts";
import {eliminateLeftRecursion} from "../ll1/steps/leftRecursion";
import {leftFactoring} from "../ll1/steps/leftFactoring";
import {buildPredictiveParsingTable} from "../ll1/steps/predictiveParsingTable";
import {parseLL1} from "../ll1/steps/parse";

const parserRouter = express.Router();

parserRouter.use(bodyParser.json());

parserRouter.route('/parse')
    .post((req, res, next) => {
        // console.log(req.body)
        try {
            const {word, productions} = req.body;

            changeSymbols(req.body.startSymbol, req.body.epsilon);

            // 1. Left Recursion
            let lr: IProductions = {};
            let mapLR: object = {};
            try {
                [lr, mapLR] = eliminateLeftRecursion(productions, {});
                // console.log(substituteMapping(lr, mapLR))
                // console.log("MAP LR: ", mapLR)
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
                // console.log("MAP LF: ", mapLF)
                // console.log(substituteMapping(lf, mapLF))
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
                // console.table(parseTable)
                // console.log(parseTable)
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
                parseTree
            })

        } catch (e) {
            res.json({
                success: false,
                message: e.message
            })
        }


    })

export = parserRouter