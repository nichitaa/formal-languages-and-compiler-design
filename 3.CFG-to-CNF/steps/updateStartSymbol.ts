import {CFG, S, S0} from '../consts/consts';
import {structuredClone} from '../utils';

// if S on RHS (right hand side) of CFG
// will add S0 -> S as first element in the CNF
const updateStartSymbol = (grammar: CFG): CFG => {
    let cfg = structuredClone(grammar);
    for (let s in cfg) {

        let arr = cfg[s];
        for (let i = 0; i < arr.length; i++) {

            let splited = arr[i].split('');
            if (splited.includes(S)) {
                let keyValues = Object.entries(cfg);
                keyValues.splice(0, 0, [S0, [S]]);
                cfg = Object.fromEntries(keyValues);
            }

        }

    }
    return cfg;
};

export default updateStartSymbol;
