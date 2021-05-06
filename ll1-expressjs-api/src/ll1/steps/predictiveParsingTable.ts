/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */


import {EPSILON, IProductions, STACK_END} from "../consts";
import {getTerminalsAndNonTerminals, structuredClone} from "../utils/utils";
import {firstOfNonTerminal, followOf} from "./FirstFollow";


export const buildPredictiveParsingTable = (productions: IProductions): [object, string[], string[]] => {

    const prodsCopy = structuredClone(productions);
    const table = {}

    // empty table structure with undef cells
    const [terminals, nonTerminals] = getTerminalsAndNonTerminals(prodsCopy)
    for (const nonTerminal of nonTerminals) {
        table[nonTerminal] = {}
        for (const terminal of terminals) {
            if (terminal !== EPSILON) table[nonTerminal][terminal] = undefined
        }
        table[nonTerminal][STACK_END] = undefined
    }

    for (const derivedFrom in prodsCopy) {

        const derivations = prodsCopy[derivedFrom];
        for (const derivation of derivations) {

            const firstOfs = firstOfNonTerminal(derivation, prodsCopy, 0, [])
            for (const first of firstOfs) {
                if (first !== EPSILON) {
                    if (table[derivedFrom][first] === undefined) table[derivedFrom][first] = derivation
                    else {
                        throw new Error(`This is not a valid LL1 grammar,
                        as cell under row ${derivedFrom} and coll ${first} will contain more then one production:
                        ${table[derivedFrom][first]} and ${derivation}`)
                    }
                } else {
                    const followOfs = followOf(derivedFrom, prodsCopy, [])
                    for (const follow of followOfs) {
                        if (table[derivedFrom][follow] === undefined) table[derivedFrom][follow] = EPSILON
                        else {
                            throw new Error(`This is not a valid LL1 grammar,
                            as cell under row ${derivedFrom} and coll ${follow} will contain more then one production:
                            ${table[derivedFrom][follow]} and ${EPSILON}`)
                        }
                    }
                }
            }

        }
    }

    return [table, terminals, nonTerminals];

}