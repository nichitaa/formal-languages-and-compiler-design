import {CFG, S0} from '../consts/consts';
import {hasOneStateTransition, isTerminal, structuredClone} from '../utils';

const removeUnitTransitions = (grammar: CFG): CFG => {

    let cfg = structuredClone(grammar);

    // for S -> S like transitions
    for (let s in cfg) {
        const arr = cfg[s];
        if (arr.includes(s)) cfg[s] = cfg[s].filter(el => el !== s);
    }

    for (let s in cfg) {

        const arr = cfg[s];
        for (let state of arr) {

            const splitedState = state.split('');

            // for S -> A like transitions
            if (splitedState.length === 1 && !isTerminal(splitedState[0]) && s !== S0) {
                // substitute with all what A derives and remove A from S transition
                const substitute = cfg[splitedState[0]];
                cfg[s] = cfg[s].filter(el => el !== splitedState[0]);
                cfg[s] = [...cfg[s], ...substitute];
            }

        }

    }

    // check for one state transitions and update
    if (hasOneStateTransition(cfg)) {
        return removeUnitTransitions(cfg);
    }

    // for S0 -> S 
    // this is the last state to be substituted 
    // at this point S will not contain valid state transition [for this step]
    if (cfg[S0] !== undefined) cfg[S0] = [...cfg['S']];

    return cfg;
};

export default removeUnitTransitions;
