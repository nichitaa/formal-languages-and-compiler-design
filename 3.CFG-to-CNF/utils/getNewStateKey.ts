// return state key to be used by respective transition
import {CFG, stateType} from '../consts/consts';

const getNewStateKey = (cfg: CFG, combination: string, type: stateType): string => {
    // one alphabet for terminals, e.g: X -> a
    // one alphabet for NonTerminals, e.g: M: AB
    let alphabet: string;

    switch (type) {

        case stateType.TERMINAL:
            alphabet = 'XYZQ';
            // if the state with only one terminal derivation already exists 
            // return it
            for (let s in cfg) {
                const arr = cfg[s];
                if (arr.length === 1 && arr[0] === combination) return s;
            }
            break;

        case stateType.NON_TERMINAL:
            alphabet = 'MNIOPT';
            for (let s in cfg) {
                const arr = cfg[s];
                if (arr.length === 1 && arr[0] === combination) return s;
            }
            break;

    }

    // otherwise will return a new key from corresponding alphabet
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export default getNewStateKey;