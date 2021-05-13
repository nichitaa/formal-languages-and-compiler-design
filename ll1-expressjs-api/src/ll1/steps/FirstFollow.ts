/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 01.05.2021
 */


import {structuredClone, getRHSDerivations, isNonTerminal, isTerminal, isRecursiveStack} from "../utils/utils";
import {EPSILON, IFirstFollowTable, IProductions, STACK_END, START_SYMBOL} from "../consts";

/**
 * @param productions - all productions
 * @returns firstFollowTable - the first and follow table for each variable
 * */
export const buildFirstFollowTable = (productions: IProductions): IFirstFollowTable => {

    const prodsCopy = structuredClone(productions);

    const firstFollowTable: IFirstFollowTable = {
        first: {},
        follow: {}
    };

    for (const el in prodsCopy) {
        firstFollowTable.first[el] = firstOf(el, prodsCopy);
        firstFollowTable.follow[el] = followOf(el, prodsCopy, []);
    }

    return firstFollowTable;

}

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
export const followOf = (state: string, productions: IProductions, recursionStack): string[] => {

    const prodsCopy = structuredClone(productions);

    // to remove fucking recursion
    // e.g.:
    // A -> BP
    // P -> cA
    // keep track of recursion stack of the states that we compute followOf
    const _recursionStack = [...recursionStack];
    if (isRecursiveStack(_recursionStack, prodsCopy)) return [STACK_END]

    let res: string[] = [];

    if (state === START_SYMBOL) res.push(STACK_END);

    const [bool, occurrences] = getRHSDerivations(state, prodsCopy);

    if (bool) {
        for (const derivedFrom in occurrences) {

            const derivations = occurrences[derivedFrom];
            for (const derivation of derivations) {

                const slug = derivation!.split(state)[1];
                if (slug !== '') {
                    res.push(...firstOfNonTerminal(slug, prodsCopy, 0, []));
                    if (res.includes(EPSILON)) {
                        res = res.filter(el => el !== EPSILON);
                        _recursionStack.push(derivedFrom)
                        res.push(...followOf(derivedFrom!, prodsCopy, _recursionStack));
                    }
                } else {
                    _recursionStack.push(derivedFrom)
                    if (derivedFrom !== state) res.push(...followOf(derivedFrom!, prodsCopy, _recursionStack));
                }

            }

        }

    }

    return [...new Set(res)];

}

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
export const firstOf = (state: string, productions: IProductions): string[] => {

    const prodsCopy = structuredClone(productions);
    const res: string[] = [];

    const derivations = prodsCopy[state];

    for (const derivation of derivations) {
        const firstChar = derivation.charAt(0);

        if (isTerminal(firstChar)) {
            res.push(firstChar);
        } else if (isNonTerminal(firstChar)) {
            res.push(...firstOfNonTerminal(derivation, prodsCopy, 0, []));
        }

    }

    return [...new Set(res)];

}

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
export const firstOfNonTerminal = (state: string, productions: IProductions, currentPos: number, res: string[]): string[] => {

    // console.log({firstOfNonTerminal: state, productions, currentPos, res})
    const currentChar = state.charAt(currentPos);
    let resArr = [...res]

    if (isNonTerminal(currentChar)) {
        resArr.push(...firstOf(currentChar, productions));
    }

    if (isTerminal(currentChar)) {
        resArr.push(currentChar);
    }

    if (resArr.includes(EPSILON)) {
        if (currentPos === state.length - 1) return [...new Set(resArr)];
        resArr = resArr.filter(el => el !== EPSILON);
        currentPos++;
        resArr.push(...firstOfNonTerminal(state, productions, currentPos, resArr));
    }

    return [...new Set(resArr)];

}
