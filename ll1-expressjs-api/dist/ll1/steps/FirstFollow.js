"use strict";
/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 01.05.2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstOfNonTerminal = exports.firstOf = exports.followOf = exports.buildFirstFollowTable = void 0;
const utils_1 = require("../utils/utils");
const consts_1 = require("../consts");
/**
 * @param productions - all productions
 * @returns firstFollowTable - the first and follow table for each variable
 * */
const buildFirstFollowTable = (productions) => {
    const prodsCopy = utils_1.structuredClone(productions);
    const firstFollowTable = {
        first: {},
        follow: {}
    };
    for (const el in prodsCopy) {
        firstFollowTable.first[el] = exports.firstOf(el, prodsCopy);
        firstFollowTable.follow[el] = exports.followOf(el, prodsCopy, []);
    }
    return firstFollowTable;
};
exports.buildFirstFollowTable = buildFirstFollowTable;
/**
 * @rule
 * - For start symbol always add end of stack symbol ($)
 * - Follow(someState) = First(what goes after the follow symbol in the derivation)
 * e.g. S -> ABCDE
 *      Follow(A) = First(BCDE)
 * - if the symbol to compute Follow for is the last symbol of the derivation
 *   then it's followOf is the follow of the state it got derived from
 * e.g. S -> ABCDE
 *      Follow(E) = Follow(S)
 * - and as well the indirect version:
 * e.g. S -> ABCDE
 *      D -> a | ε
 *      E -> b | ε
 *      C -> c
 *      Follow(C) = First(DE) [a, b, ε] - has epsilon
 *      then:
 *      Follow(C) = First(DE) \ ε + Follow(S)
 *                = [a, b, $]
 *
 * @remarks
 * if variable is in RHS [right hand side]:
 *  iterate over all derivations where it occurs
 *   get the slug (the part of the string from the derivation, which comes after the state)
 *    - if the slug is not empty
 *          merge the result with the First(slug)
 *          - if it will have epsilon then it means the slug can be derived to it
 *            so we get the follow of the state we derived from
 *    - if the slug is empty [is the last right most symbol in derivation]
 *          add to result the Follow(state we derived from)
 *
 * @param state - state to compute the follow of
 * @param productions - all productions
 * @param recursionStack - the recursion stack of the follow of states we compute for
 *
 * @returns res - set of the symbols computed for Follow(state)
 * */
const followOf = (state, productions, recursionStack) => {
    const prodsCopy = utils_1.structuredClone(productions);
    // to remove fucking recursion
    // e.g.:
    // A -> BP
    // P -> cA
    // keep track of recursion stack of the states that we compute followOf
    const _recursionStack = [...recursionStack];
    if (utils_1.isRecursiveStack(_recursionStack, prodsCopy))
        return [consts_1.STACK_END];
    let res = [];
    if (state === consts_1.START_SYMBOL)
        res.push(consts_1.STACK_END);
    const [bool, occurrences] = utils_1.getRHSDerivations(state, prodsCopy);
    if (bool) {
        for (const derivedFrom in occurrences) {
            const derivations = occurrences[derivedFrom];
            for (const derivation of derivations) {
                const slug = derivation.split(state)[1];
                if (slug !== '') {
                    res.push(...exports.firstOfNonTerminal(slug, prodsCopy, 0, []));
                    if (res.includes(consts_1.EPSILON)) {
                        res = res.filter(el => el !== consts_1.EPSILON);
                        _recursionStack.push(derivedFrom);
                        res.push(...exports.followOf(derivedFrom, prodsCopy, _recursionStack));
                    }
                }
                else {
                    _recursionStack.push(derivedFrom);
                    if (derivedFrom !== state)
                        res.push(...exports.followOf(derivedFrom, prodsCopy, _recursionStack));
                }
            }
        }
    }
    return [...new Set(res)];
};
exports.followOf = followOf;
/**
 * @rule
 * e.g. A -> aB | Bc | ε
 *      B -> d | ε
 * then
 * First(A) = First(aB) | First(Bc) | First(ε)
 *   First(aB) = First(a)
 *     First(a) = a
 *   First(Bc) = First(B)
 *     First(B) = First(d) | First(ε)
 *            = d | ε
 *            [has epsilon]
 *            then
 *            First(Bc) = d | c  [if B derive ε, then A can derive to c]
 *    First(ε) = ε
 * so First(A) = a | d | c | ε
 *
 * @remarks
 * iterates over possible derivations for the given state:
 *  - if current derivation state starts with a terminal symbol e.g.: a, b:
 *      - add it to result
 *  - if current derivation state starts with a non-terminal symbol ex: A, B:
 *      - add to result the firstOfNonTerminal function returned array
 *
 * @param state       - state to compute firstOf
 * @param productions - the object of all productions
 *
 * @returns res       - the distinct set of the firstOf symbols
 * */
const firstOf = (state, productions) => {
    const prodsCopy = utils_1.structuredClone(productions);
    const res = [];
    const derivations = prodsCopy[state];
    for (const derivation of derivations) {
        const firstChar = derivation.charAt(0);
        if (utils_1.isTerminal(firstChar)) {
            res.push(firstChar);
        }
        else if (utils_1.isNonTerminal(firstChar)) {
            res.push(...exports.firstOfNonTerminal(derivation, prodsCopy, 0, []));
        }
    }
    return [...new Set(res)];
};
exports.firstOf = firstOf;
/**
 * @remarks
 * gets the symbol at given index position from the given state
 * - if this symbol is non-terminal:
 *      - merge the resulted with the symbols from firstOf(of our non-terminal current symbol)
 *
 * - if is terminal:
 *      - just add it to the result
 *
 * - if the result has epsilon symbol:
 *      - if the symbol is last symbol in the state:
 *          - return result (will contain epsilon)
 *      - else:
 *          - delete epsilon from result array
 *          - merge result with the firstOfNonTerminal() with incremented index position
 *            so next recursive call we will be checking for next character in the same state
 *
 * @param state       - state to check for ex: [AbC]
 * @param productions - all productions
 * @param res         - result array of the symbols (contains duplicates)
 * @param currentPos  - the index of the symbol from state to check for
 *
 * @returns res       - the set of resulted symbols
 * */
const firstOfNonTerminal = (state, productions, currentPos, res) => {
    const currentChar = state.charAt(currentPos);
    let resArr = [...res];
    if (utils_1.isNonTerminal(currentChar)) {
        resArr.push(...exports.firstOf(currentChar, productions));
    }
    if (utils_1.isTerminal(currentChar)) {
        resArr.push(currentChar);
    }
    if (resArr.includes(consts_1.EPSILON)) {
        if (currentPos === state.length - 1)
            return [...new Set(resArr)];
        resArr = resArr.filter(el => el !== consts_1.EPSILON);
        currentPos++;
        resArr.push(...exports.firstOfNonTerminal(state, productions, currentPos, resArr));
    }
    return [...new Set(resArr)];
};
exports.firstOfNonTerminal = firstOfNonTerminal;
//# sourceMappingURL=FirstFollow.js.map