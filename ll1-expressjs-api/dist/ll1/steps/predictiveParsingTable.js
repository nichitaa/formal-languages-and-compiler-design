"use strict";
/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPredictiveParsingTable = void 0;
const consts_1 = require("../consts");
const utils_1 = require("../utils/utils");
const FirstFollow_1 = require("./FirstFollow");
const buildPredictiveParsingTable = (productions) => {
    const prodsCopy = utils_1.structuredClone(productions);
    const table = {};
    // empty table structure with undef cells
    const [terminals, nonTerminals] = utils_1.getTerminalsAndNonTerminals(prodsCopy);
    for (const nonTerminal of nonTerminals) {
        table[nonTerminal] = {};
        for (const terminal of terminals) {
            if (terminal !== consts_1.EPSILON)
                table[nonTerminal][terminal] = undefined;
        }
        table[nonTerminal][consts_1.STACK_END] = undefined;
    }
    for (const derivedFrom in prodsCopy) {
        const derivations = prodsCopy[derivedFrom];
        for (const derivation of derivations) {
            const firstOfs = FirstFollow_1.firstOfNonTerminal(derivation, prodsCopy, 0, []);
            for (const first of firstOfs) {
                if (first !== consts_1.EPSILON) {
                    if (table[derivedFrom][first] === undefined)
                        table[derivedFrom][first] = derivation;
                    else {
                        throw new Error(`This is not a valid LL1 grammar,
                        as cell under row ${derivedFrom} and coll ${first} will contain more then one production:
                        ${table[derivedFrom][first]} and ${derivation}`);
                    }
                }
                else {
                    const followOfs = FirstFollow_1.followOf(derivedFrom, prodsCopy, []);
                    for (const follow of followOfs) {
                        if (table[derivedFrom][follow] === undefined)
                            table[derivedFrom][follow] = consts_1.EPSILON;
                        else {
                            throw new Error(`This is not a valid LL1 grammar,
                            as cell under row ${derivedFrom} and coll ${follow} will contain more then one production:
                            ${table[derivedFrom][follow]} and ${consts_1.EPSILON}`);
                        }
                    }
                }
            }
        }
    }
    return [table, terminals, nonTerminals];
};
exports.buildPredictiveParsingTable = buildPredictiveParsingTable;
//# sourceMappingURL=predictiveParsingTable.js.map