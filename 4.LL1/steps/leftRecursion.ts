/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */


import {EPSILON, IProductions} from "../consts";
import {
    getKeyByValue,
    getLeftRecursionData,
    getNewRandLetter,
    hasLeftRecursion,
    structuredClone
} from "../utils/utils";

export const eliminateLeftRecursion = (productions: IProductions, mapping: object): [IProductions, object] => {

    const prodsCopy = structuredClone(productions);
    let hasLR = hasLeftRecursion(prodsCopy)

    while (hasLR) {
        for (let derivedFrom in prodsCopy) {
            const [bool, occurrences, rest] = getLeftRecursionData(derivedFrom, prodsCopy);
            if (bool) {
                prodsCopy[derivedFrom] = [];
                const newStateKey = getNewRandLetter(prodsCopy);
                for (let r of rest!) {
                    prodsCopy[derivedFrom].push(`${r}${newStateKey}`)
                }
                prodsCopy[newStateKey] = []
                for (let o of occurrences!) {
                    prodsCopy[newStateKey].push(`${o}${newStateKey}`)
                }
                prodsCopy[newStateKey].push(EPSILON);

                const mappedKey = getKeyByValue(mapping, `${derivedFrom}'`)
                if (mappedKey !== undefined) {
                    mapping[newStateKey] = `${mappedKey}'`
                } else {
                    mapping[newStateKey] = `${derivedFrom}'`
                }
            }
        }
        hasLR = hasLeftRecursion(prodsCopy)
    }

    return [prodsCopy, mapping]

}
