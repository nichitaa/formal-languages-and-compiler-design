/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */

import {IProductions} from "../consts";
import {
    getKeyByValue,
    getLeftFactoringData,
    getNewRandLetter, hasLeftFactoring,
    structuredClone,
    substituteMapping
} from "../utils/utils";


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
export const leftFactoring = (productions: IProductions, mapping: object): [IProductions, object] => {
    const prodsCopy = structuredClone(productions);
    const mappingCopy = {...mapping}

    for (const derivedFrom in prodsCopy) {
        const [bool, commons, rest] = getLeftFactoringData(derivedFrom, prodsCopy)

        if (bool) {
            prodsCopy[derivedFrom] = []
            for (const common in commons) {
                const newKey = getNewRandLetter(prodsCopy);
                const newDerivation = commons[common]
                prodsCopy[derivedFrom].push(`${common}${newKey}`)
                prodsCopy[newKey] = [...newDerivation]

                // todo: mb add with double: ''
                // in case we have 2 different left factoring's from same variable
                // e.g. C -> cN | cNa | eM | eMa
                // will be:
                // C -> cNI' | eMH'
                // I' -> ε | a
                // H' -> ε | a
                const mappedKey = getKeyByValue(mappingCopy, `${derivedFrom}'`)
                if(mappedKey !== undefined) {
                    mappingCopy[newKey] = `${mappedKey}'`
                } else {
                    mappingCopy[newKey] = `${derivedFrom}'`
                }

            }
            prodsCopy[derivedFrom].push(...rest!)
        }
    }

    if(hasLeftFactoring(prodsCopy)) {
        return leftFactoring(prodsCopy, mappingCopy)
    }

    return [prodsCopy, mappingCopy];
}