"use strict";
/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftFactoring = void 0;
const utils_1 = require("../utils/utils");
/**
 * @remarks
 * this is a recursive method to remove the left factoring from given productions
 * applying the rule:
 *  A -> aC | aCb
 *  then
 *  A -> aCL
 *  L -> ε | b
 * !Note - L will be mapped to A'
 * @param productions - all productions
 * @param mapping     - the mapping object for current productions
 * e.g.: mapping { "X": "S'"}
 * so, when will call substituteMapping() func
 * all of the "X" will be substituted with S'
 * @returns [ new productions, mapping for them ]
 * */
const leftFactoring = (productions, mapping) => {
    const prodsCopy = utils_1.structuredClone(productions);
    const mappingCopy = Object.assign({}, mapping);
    for (const derivedFrom in prodsCopy) {
        const [bool, commons, rest] = utils_1.getLeftFactoringData(derivedFrom, prodsCopy);
        if (bool) {
            prodsCopy[derivedFrom] = [];
            for (const common in commons) {
                const newKey = utils_1.getNewRandLetter(prodsCopy);
                const newDerivation = commons[common];
                prodsCopy[derivedFrom].push(`${common}${newKey}`);
                prodsCopy[newKey] = [...newDerivation];
                // todo: mb add with double: ''
                // in case we have 2 different left factoring's from same variable
                // e.g. C -> cN | cNa | eM | eMa
                // will be:
                // C -> cNI' | eMH'
                // I' -> ε | a
                // H' -> ε | a
                const mappedKey = utils_1.getKeyByValue(mappingCopy, `${derivedFrom}'`);
                if (mappedKey !== undefined) {
                    mappingCopy[newKey] = `${mappedKey}'`;
                }
                else {
                    mappingCopy[newKey] = `${derivedFrom}'`;
                }
            }
            prodsCopy[derivedFrom].push(...rest);
        }
    }
    if (utils_1.hasLeftFactoring(prodsCopy)) {
        return exports.leftFactoring(prodsCopy, mappingCopy);
    }
    return [prodsCopy, mappingCopy];
};
exports.leftFactoring = leftFactoring;
//# sourceMappingURL=leftFactoring.js.map