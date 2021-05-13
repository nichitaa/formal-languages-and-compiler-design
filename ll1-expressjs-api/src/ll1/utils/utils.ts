import v8 from 'v8';
import {EPSILON, IProductions} from "../consts";

export const structuredClone = (productions: IProductions): IProductions => {
    return v8.deserialize(v8.serialize(productions));
};

export const isTerminal = (state: string): boolean => {
    return state.toLowerCase() === state;
}

export const isNonTerminal = (state: string): boolean => {
    return state.toUpperCase() === state && state !== '+' && state !== '*';
}

export const isEpsilon = (state: string): boolean => {
    return state === EPSILON;
}

export const getRHSDerivations = (state: string, prods: IProductions): [boolean, object?] => {
    const derivations: object = {}
    let exists = false;

    for (const el in prods) {
        const arr = prods[el];
        for (const s of arr) {
            const split = s.split('');
            if (split.includes(state)) {
                exists = true;
                if (derivations[el] !== undefined) {
                    derivations[el].push(s);
                } else {
                    derivations[el] = [];
                    derivations[el].push(s);
                }
            }
        }
    }

    if (exists) {
        return [exists, derivations]
    }
    return [false, undefined];
}

// recursion will start when duplicates will start to appear
export const isRecursiveStack = (stack: string[], productions: IProductions) => {
    if (stack.length > Object.keys(productions).length && (new Set(stack)).size !== stack.length) return true;
}

export const hasLeftFactoring = (prods: IProductions): boolean => {
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
}

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
export const getLeftFactoringData = (state: string, prods: IProductions): [boolean, object?, string[]?] => {
    const derivations = prods[state];
    const res = {};
    const tbChanged: string[] = [];
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
                    if (der1Substr === '') der1Substr = EPSILON;
                    if (der2Substr === '') der2Substr = EPSILON;
                    if (res[char] === undefined) {
                        res[char] = [der1Substr, der2Substr];
                        tbChanged.push(der1, der2);
                    } else if (res[char] !== undefined) {
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
                    if (d === '') d = EPSILON;
                    res[commonSubstring].push(d);
                }

                delete res[el];
            }
        }
        const rest = derivations.filter(el => !tbChanged.includes(el));
        return [bool, res, rest];
    }

    return [bool, undefined, undefined];

}
// https://stackoverflow.com/questions/1916218/find-the-longest-common-starting-substring-in-a-set-of-strings
const longestStartingSubstring = (array: string[]) => {
    const A = array.concat().sort();
    const a1 = A[0];
    const a2 = A[A.length - 1];
    const L = a1.length;
    let i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
    return a1.substring(0, i);
}

export const getNewRandLetter = (prods: IProductions): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let rand = '';
    do {
        rand = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (rand !== '' && prods[rand] !== undefined);
    return rand;
}

export const substituteMapping = (prods: IProductions, mappings: object): IProductions => {
    const prodsCopy = structuredClone(prods);
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
            })
            return newSplit.join('');
        })
        // substitute the old object key
        if (mappings[derivedFrom] !== undefined) {
            prodsCopy[mappings[derivedFrom]] = [...prodsCopy[derivedFrom]];
            delete prodsCopy[derivedFrom];
        }
    }
    return prodsCopy;
}

export const getKeyByValue = (object: object, value: string): string | undefined => {
    return Object.keys(object).find(key => object[key] === value);
}

export const hasLeftRecursion = (productions: IProductions): boolean => {
    for (const derivedFrom in productions) {
        for (const derivation of productions[derivedFrom]) {
            if (derivedFrom.charAt(0) === derivation.charAt(0) && derivation.split('').length > 1) return true;
        }
    }
    return false
}

export const getLeftRecursionData = (state: string, productions: IProductions): [boolean, string[]?, string[]?] => {
    const derivations = productions[state];
    let bool = false;
    let res: string[] = [];

    for (const derivation of derivations) {
        if (derivation.charAt(0) === state.charAt(0)) {
            bool = true;
            res.push(derivation);
        }
    }

    if (bool) {
        // remaining
        const rest = derivations.filter(el => !res.includes(el))
        res = res.map(el => el.slice(1))
        return [bool, res, rest]
    }

    return [bool, undefined, undefined]
}

export const getTerminalsAndNonTerminals = (productions: IProductions) => {
    const t: string[] = [];
    const n: string[] = [];
    for (const derivedFrom in productions) {
        if (!n.includes(derivedFrom)) n.push(derivedFrom)
        for (const derivation of productions[derivedFrom]) {
            const split = derivation.split('');
            for (const s of split) {
                if (isTerminal(s) && !t.includes(s)) t.push(s)
                if (isNonTerminal(s) && !n.includes(s)) n.push(s)
            }
        }
    }
    return [t, n]
}
