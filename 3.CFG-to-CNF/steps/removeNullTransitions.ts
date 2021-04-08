import {CFG, EPSILON, S, S0} from '../consts/consts';
import {hasEpsilon, structuredClone} from '../utils';

const removeNullTransitions = (grammar: CFG): CFG => {

    let cfg = structuredClone(grammar);
    for (let s in cfg) {

        let arr = cfg[s];
        for (let i = 0; i < arr.length; i++) {

            if (arr[i] === EPSILON) {
                cfg[s] = cfg[s].filter(el => el !== EPSILON);
                return updateNull(cfg, s);
            }

        }

    }

    return cfg;
};

const updateNull = (grammar: CFG, nullState: string): CFG => {

    let cfg = structuredClone(grammar);
    for (let s in cfg) {

        let arr = cfg[s];
        for (let i = 0; i < arr.length; i++) {

            const state = arr[i];
            let splitedState = state.split('');

            if (splitedState.includes(nullState)) {

                if (splitedState.length === 1) {
                    // S -> A and A -> epsilon
                    if (s === S) console.log(`\x1b[33m \n ${S} -> ${EPSILON} will not be included in next table! \x1b[0m`);
                    // A -> C and C -> epsilon, will add A -> epsilon
                    else cfg[s].push(EPSILON);
                }

                // S -> Aa and A -> epsilon, will add S -> a
                if (splitedState.length === 2) {
                    const state = splitedState.filter(el => el !== nullState);
                    cfg[s].push(state.join(''));
                }

                if (splitedState.length > 2) {
                    let count = 0;
                    splitedState.map(el => {if (el === nullState) count++;});

                    // S -> ACC || S -> CAC || S -> CCA and A -> epsilon
                    // will add S -> CC for all cases
                    if (count === 1) {
                        const state = splitedState.filter(el => el !== nullState);
                        cfg[s].push(state.join(''));
                    }

                    // S -> ABA and A -> epsilon, will add S -> AB | BA | B
                    else {
                        const newCombinations: Array<string> = makeCombinations(splitedState, nullState);
                        cfg[s] = [...cfg[s], ...newCombinations];
                    }

                }

            }

        }

    }

    if (hasEpsilon(cfg)) {
        return removeNullTransitions(cfg);
    }

    return cfg;
};

const makeCombinations = (s: Array<string>, nullState: string): Array<string> => {

    const res: string[] = [];
    const idxs: number[] = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === nullState) idxs.push(i);
    }

    for (let i = 0; i < idxs.length; i++) {
        const newS = s.filter((el, j) => j !== idxs[i]);
        res.push(newS.join(''));
    }

    const lastS = [...s];
    for (let i = 0; i < idxs.length; i++) {
        delete lastS[idxs[i]];
    }

    lastS.filter(el => el);
    res.push(lastS.join(''));

    return res;
};

export default removeNullTransitions;