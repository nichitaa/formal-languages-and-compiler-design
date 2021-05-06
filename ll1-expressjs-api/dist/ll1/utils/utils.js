"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTerminalsAndNonTerminals = exports.getLeftRecursionData = exports.hasLeftRecursion = exports.getKeyByValue = exports.substituteMapping = exports.getNewRandLetter = exports.getLeftFactoringData = exports.hasLeftFactoring = exports.isRecursiveStack = exports.getRHSDerivations = exports.isEpsilon = exports.isNonTerminal = exports.isTerminal = exports.structuredClone = void 0;
const v8_1 = __importDefault(require("v8"));
const consts_1 = require("../consts");
const structuredClone = (productions) => {
    return v8_1.default.deserialize(v8_1.default.serialize(productions));
};
exports.structuredClone = structuredClone;
const isTerminal = (state) => {
    return state.toLowerCase() === state;
};
exports.isTerminal = isTerminal;
const isNonTerminal = (state) => {
    return state.toUpperCase() === state && state !== '+' && state !== '*';
};
exports.isNonTerminal = isNonTerminal;
const isEpsilon = (state) => {
    return state === consts_1.EPSILON;
};
exports.isEpsilon = isEpsilon;
const getRHSDerivations = (state, prods) => {
    const derivations = {};
    let exists = false;
    for (const el in prods) {
        const arr = prods[el];
        for (const s of arr) {
            const split = s.split('');
            if (split.includes(state)) {
                exists = true;
                if (derivations[el] !== undefined) {
                    derivations[el].push(s);
                }
                else {
                    derivations[el] = [];
                    derivations[el].push(s);
                }
            }
        }
    }
    if (exists) {
        return [exists, derivations];
    }
    return [false, undefined];
};
exports.getRHSDerivations = getRHSDerivations;
// recursion will start when duplicates will start to appear
const isRecursiveStack = (stack, productions) => {
    if (stack.length > Object.keys(productions).length && (new Set(stack)).size !== stack.length)
        return true;
};
exports.isRecursiveStack = isRecursiveStack;
const hasLeftFactoring = (prods) => {
    for (const derivedFrom in prods) {
        const derivations = prods[derivedFrom];
        for (let i = 0; i < derivations.length; i++) {
            const der1 = derivations[i];
            const char = der1.charAt(0);
            for (let j = i; j < derivations.length; j++) {
                const der2 = derivations[j];
                // only different strings
                if (i !== j && char === der2.charAt(0)) {
                    return true;
                }
            }
        }
    }
    return false;
};
exports.hasLeftFactoring = hasLeftFactoring;
/**
 * @rules
 * e.g.:
 *  S -> iEtS | iEtSeS | a
 *  res = { iEts: [ ε, eS ] }
 * e.g:
 *  C -> cN | cNa | eM | eMa
 *  res = { cN: [ ε, a ], eM: [ ε, a ] }
 * @remarks
 * res form => {
 *     LeftFactoringCommonSubstring: [new derivations without common substring]
 * }
 * logic here:
 * - first part iterates over productions and constructs res with LeftFactoringCommonSubstring of one char only
 * - the second parte gets the longestStartingSubstring for the [new derivations without common substring] from res
 * @param state - state to check for left factoring
 * @param prods - all productions
 * @returns [ bool - has LF, res - LF data, rest - derivations without LF ]
 * */
const getLeftFactoringData = (state, prods) => {
    const derivations = prods[state];
    const res = {};
    const tbChanged = [];
    let bool = false;
    // first part
    for (let i = 0; i < derivations.length; i++) {
        const der1 = derivations[i];
        const char = der1.charAt(0);
        if (res[char] === undefined) {
            // not visited yet
            for (let j = 0; j < derivations.length; j++) {
                const der2 = derivations[j];
                // only different strings
                if (i !== j && char === der2.charAt(0)) {
                    bool = true;
                    let der1Substr = der1.substring(1);
                    let der2Substr = der2.substring(1);
                    if (der1Substr === '')
                        der1Substr = consts_1.EPSILON;
                    if (der2Substr === '')
                        der2Substr = consts_1.EPSILON;
                    if (res[char] === undefined) {
                        res[char] = [der1Substr, der2Substr];
                        tbChanged.push(der1, der2);
                    }
                    else if (res[char] !== undefined) {
                        res[char].push(der2Substr);
                        tbChanged.push(der2);
                    }
                }
            }
        }
    }
    // has left factoring - second part
    if (bool) {
        for (const el in res) {
            const array = res[el];
            const common = longestStartingSubstring(array);
            if (common !== '') {
                const commonSubstring = `${el}${common}`;
                res[commonSubstring] = [];
                for (let d of array) {
                    d = d.substring(common.length);
                    if (d === '')
                        d = consts_1.EPSILON;
                    res[commonSubstring].push(d);
                }
                delete res[el];
            }
        }
        const rest = derivations.filter(el => !tbChanged.includes(el));
        return [bool, res, rest];
    }
    return [bool, undefined, undefined];
};
exports.getLeftFactoringData = getLeftFactoringData;
// https://stackoverflow.com/questions/1916218/find-the-longest-common-starting-substring-in-a-set-of-strings
const longestStartingSubstring = (array) => {
    const A = array.concat().sort();
    const a1 = A[0];
    const a2 = A[A.length - 1];
    const L = a1.length;
    let i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i))
        i++;
    return a1.substring(0, i);
};
const getNewRandLetter = (prods) => {
    // todo: mb there is a better way
    const alphabet = 'PLOIH';
    let rand = '';
    do {
        rand = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (rand !== '' && prods[rand] !== undefined);
    return rand;
};
exports.getNewRandLetter = getNewRandLetter;
const substituteMapping = (prods, mappings) => {
    const prodsCopy = exports.structuredClone(prods);
    for (const derivedFrom in prodsCopy) {
        const arr = prodsCopy[derivedFrom];
        // update the derivations with the replaced mapped values
        prodsCopy[derivedFrom] = arr.map(el => {
            const split = el.split('');
            const newSplit = split.map(s => {
                if (mappings[s] !== undefined) {
                    return mappings[s];
                }
                return s;
            });
            return newSplit.join('');
        });
        // substitute the old object key
        if (mappings[derivedFrom] !== undefined) {
            prodsCopy[mappings[derivedFrom]] = [...prodsCopy[derivedFrom]];
            delete prodsCopy[derivedFrom];
        }
    }
    return prodsCopy;
};
exports.substituteMapping = substituteMapping;
const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};
exports.getKeyByValue = getKeyByValue;
const hasLeftRecursion = (productions) => {
    for (const derivedFrom in productions) {
        for (const derivation of productions[derivedFrom]) {
            if (derivedFrom.charAt(0) === derivation.charAt(0))
                return true;
        }
    }
    return false;
};
exports.hasLeftRecursion = hasLeftRecursion;
const getLeftRecursionData = (state, productions) => {
    const derivations = productions[state];
    let bool = false;
    let res = [];
    for (const derivation of derivations) {
        if (derivation.charAt(0) === state.charAt(0)) {
            bool = true;
            res.push(derivation);
        }
    }
    if (bool) {
        // remaining
        const rest = derivations.filter(el => !res.includes(el));
        res = res.map(el => el.slice(1));
        return [bool, res, rest];
    }
    return [bool, undefined, undefined];
};
exports.getLeftRecursionData = getLeftRecursionData;
const getTerminalsAndNonTerminals = (productions) => {
    const t = [];
    const n = [];
    for (const derivedFrom in productions) {
        if (!n.includes(derivedFrom))
            n.push(derivedFrom);
        for (const derivation of productions[derivedFrom]) {
            const split = derivation.split('');
            for (const s of split) {
                if (exports.isTerminal(s) && !t.includes(s))
                    t.push(s);
                if (exports.isNonTerminal(s) && !n.includes(s))
                    n.push(s);
            }
        }
    }
    return [t, n];
};
exports.getTerminalsAndNonTerminals = getTerminalsAndNonTerminals;
//# sourceMappingURL=utils.js.map