/*
* LFPC Lab - 3 CFG to CNF
* FAF - 192
* Pasecinic Nichita
*/

import {removeDuplicates} from './utils';
import {
    normalizeToCNF,
    removeNullTransitions,
    removeUnitTransitions,
    substituteTerminals,
    updateStartSymbol,
} from './steps';
import {CFG, steps} from './consts/consts';
// import {cfg} from './consts/var18';
import {cfg} from './consts/var17';
// import {cfg} from './consts/var16';
// import {cfg} from './consts/sample'


const log = (stepCFG: CFG, stepMsg: string): void => {
    console.log('\n\x1b[36m%s\x1b[0m', stepMsg);
    console.table(stepCFG);
};

// per step algorithm to convert CFG to CNF
const main = (): void => {
    log(cfg, steps[0]);

    let step1 = updateStartSymbol(cfg);
    log(step1, steps[1]);

    let step2 = removeNullTransitions(step1);
    log(step2, steps[2]);

    let step3 = removeUnitTransitions(step2);
    step3 = removeDuplicates(step3);
    log(step3, steps[3]);

    let step4 = substituteTerminals(step3);
    log(step4, steps[4]);

    let step5 = normalizeToCNF(step4);
    log(step5, steps[5]);
};

main();
