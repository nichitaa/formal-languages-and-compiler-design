import {CFG, S0, stateType} from '../consts/consts';
import {getNewStateKey, hasMultipleNonTerminalTransitions, isUseless, structuredClone} from '../utils';

const normalizeToCNF = (grammar): CFG => {

    const cfg = structuredClone(grammar);
    for (let s in cfg) {

        const arr = cfg[s];
        for (let state of arr) {

            let splitedState = state.split('');
            // for S -> ABC like transitions
            if (splitedState.length > 2 && s !== S0) {
                // straightforward
                // get AB, get C
                // add T -> AB  [if some AB combination will be needed further, will be used T]
                // change to S -> TC
                const firstTwo = splitedState.slice(0, 2).join('');
                const rest = splitedState.slice(2);
                const newKey = getNewStateKey(cfg, firstTwo, stateType.NON_TERMINAL);
                const filtered = cfg[s].filter(el => el !== splitedState.join(''));
                const item = newKey + rest.join('');
                filtered.push(item);
                cfg[newKey] = [firstTwo];
                cfg[s] = filtered;
            }

        }

    }

    if (hasMultipleNonTerminalTransitions(cfg)) {
        return normalizeToCNF(cfg);
    }

    // delete useless transitions
    // that can not be reached
    for (let s in cfg) {
        if (s !== S0 && isUseless(cfg, s)) delete cfg[s];
    }

    // update S0 
    if (cfg[S0] !== undefined) cfg[S0] = [...cfg['S']];

    return cfg;
};

export default normalizeToCNF;