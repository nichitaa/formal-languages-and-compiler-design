import {CFG, S0, stateType} from '../consts/consts';
import {getNewStateKey, isTerminal, structuredClone} from '../utils';

const substituteTerminals = (grammar: CFG): CFG => {

    const cfg = structuredClone(grammar);
    for (let s in cfg) {

        const arr = cfg[s];
        for (let state of arr) {

            let splitedState = state.split('');
            if (splitedState.length > 1 && s !== S0) {
                for (let el of splitedState) {

                    // for S -> aA like transitions
                    if (isTerminal(el)) {
                        // get new /already used , key from grammar
                        // delete S -> aA
                        // add S -> XA
                        // add X -> a
                        let tKey = getNewStateKey(cfg, el, stateType.TERMINAL);
                        cfg[tKey] = [el];
                        const filtered = cfg[s].filter(el => el !== splitedState.join(''));
                        splitedState[splitedState.indexOf(el)] = tKey;
                        filtered.push(splitedState.join(''));
                        cfg[s] = filtered;
                    }
                }
            }

        }

    }

    if (cfg[S0] !== undefined) cfg[S0] = [...cfg['S']];

    return cfg;
};

export default substituteTerminals;
