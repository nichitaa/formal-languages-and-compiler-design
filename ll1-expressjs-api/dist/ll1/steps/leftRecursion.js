"use strict";
/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminateLeftRecursion = void 0;
const consts_1 = require("../consts");
const utils_1 = require("../utils/utils");
const eliminateLeftRecursion = (productions, mapping) => {
    const prodsCopy = utils_1.structuredClone(productions);
    let hasLR = utils_1.hasLeftRecursion(prodsCopy);
    while (hasLR) {
        for (const derivedFrom in prodsCopy) {
            const [bool, occurrences, rest] = utils_1.getLeftRecursionData(derivedFrom, prodsCopy);
            if (bool) {
                prodsCopy[derivedFrom] = [];
                const newStateKey = utils_1.getNewRandLetter(prodsCopy);
                for (const r of rest) {
                    prodsCopy[derivedFrom].push(`${r}${newStateKey}`);
                }
                prodsCopy[newStateKey] = [];
                for (const o of occurrences) {
                    prodsCopy[newStateKey].push(`${o}${newStateKey}`);
                }
                prodsCopy[newStateKey].push(consts_1.EPSILON);
                const mappedKey = utils_1.getKeyByValue(mapping, `${derivedFrom}'`);
                if (mappedKey !== undefined) {
                    mapping[newStateKey] = `${mappedKey}'`;
                }
                else {
                    mapping[newStateKey] = `${derivedFrom}'`;
                }
            }
        }
        hasLR = utils_1.hasLeftRecursion(prodsCopy);
    }
    return [prodsCopy, mapping];
};
exports.eliminateLeftRecursion = eliminateLeftRecursion;
//# sourceMappingURL=leftRecursion.js.map