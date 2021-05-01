import v8 from 'v8';
import {EPSILON, IProductions} from "../consts";


export const isTerminal = (state: string): boolean => {
    return state.toLowerCase() === state;
}

export const isNonTerminal = (state: string): boolean => {
    return state.toUpperCase() === state;
}

export const isEpsilon = (state: string): boolean => {
    return state === EPSILON;
}


export const getRHSDerivations = (state: string, prods: object): [boolean, object?] => {
    let derivations: object = {}
    let exists = false;

    for(let el in prods) {
        const arr = prods[el];
        for(let s of arr) {
            let split = s.split('');
            if(split.includes(state)) {
                exists = true;
                if(derivations[el] !== undefined) {
                    derivations[el].push(s)
                } else {
                    derivations[el] = [];
                    derivations[el].push(s)
                }
            }
        }
    }

    if(exists) {
        return [exists, derivations]
    }
    return [false, undefined];
}

const structuredClone = (productions: IProductions): IProductions => {
    return v8.deserialize(v8.serialize(productions));
};

export default structuredClone;