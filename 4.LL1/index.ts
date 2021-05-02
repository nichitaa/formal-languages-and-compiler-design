/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */


import {
    prod,
    prod1,
    prod2,
    prod3,
    prod4,
    var16,
    recursion,
    leftF,
    leftF1, leftF2, var16NoLF
} from './tests'
import {buildFirstFollowTable} from "./steps/FirstFollow";
import {leftFactoring} from "./steps/leftFactoring"
import {substituteMapping} from "./utils/utils";
import {IProductions} from "./consts";


//#region ************************** FIRST - FOLLOW *************************************

const testFirstFollow = (prods: IProductions, log: string): void => {
    console.log(`\n${log}`)
    console.table(prods)
    const ff = buildFirstFollowTable(prods)
    console.log('First: ')
    console.log(ff.first)
    console.log('Follow: ')
    console.log(ff.follow)
}

// First:
// {
//     S: [ 'a', 'b', 'c' ],
//     A: [ 'a', 'ε' ],
//     B: [ 'b', 'ε' ],
//     C: [ 'c' ],
//     D: [ 'd', 'ε' ],
//     E: [ 'e', 'ε' ]
// }
// Follow:
// {
//     S: [ '$' ],
//     A: [ 'b', 'c' ],
//     B: [ 'c' ],
//     C: [ 'd', 'e', '$' ],
//     D: [ 'e', '$' ],
//     E: [ '$' ]
// }
// testFirstFollow(prod, 'prod')

// First:
// {
//     S: [ 'a', 'b', 'c', 'd' ],
//     B: [ 'a', 'ε' ],
//     C: [ 'c', 'ε' ]
// }
// Follow:
// {
//     S: [ '$' ],
//     B: [ 'b' ],
//     C: [ 'd' ]
// }
// testFirstFollow(prod1, 'prod1')

// First:
// {
//     S: [ 'd', 'g', 'h', 'ε', 'b', 'a' ],
//     A: [ 'd', 'g', 'h', 'ε' ],
//     B: [ 'g', 'ε' ],
//     C: [ 'h', 'ε' ]
// }
// Follow:
// {
//     S: [ '$' ],
//     A: [ 'h', 'g', '$' ],
//     B: [ '$', 'a', 'h', 'g' ],
//     C: [ 'g', '$', 'b', 'h' ]
// }
// testFirstFollow(prod2, 'prod2')

// First:
// {
//     S: [ 'a', 'o' ],
//     Q: [ '+', 'ε' ],
//     T: [ 'a', 'o' ],
//     R: [ '*', 'ε' ],
//     F: [ 'a', 'o' ]
// }
// Follow:
// {
//     S: [ '$', 'c' ],
//     Q: [ '$', 'c' ],
//     T: [ '+', '$', 'c' ],
//     R: [ '+', '$', 'c' ],
//     F: [ '*', '+', '$', 'c' ]
// }
// testFirstFollow(prod3, 'prod3 - E')

// First:
// {
//     S: [ 'a' ],
//     B: [ 'c' ],
//     C: [ 'b', 'ε' ],
//     D: [ 'g', 'f', 'ε' ],
//     E: [ 'g', 'ε' ],
//     F: [ 'f', 'ε' ]
// }
// Follow:
// {
//     S: [ '$' ],
//     B: [ 'g', 'f', 'h' ],
//     C: [ 'g', 'f', 'h' ],
//     D: [ 'h' ],
//     E: [ 'f', 'h' ],
//     F: [ 'h' ]
// }
// testFirstFollow(prod4, 'prod4')

// First:
// {
//     S: [ 'd' ],
//     A: [ 'b' ],
//     B: [ 'b' ],
//     D: [ 'a' ],
//     P: [ 'ε', 'c' ],
//     I: [ 'ε', 'a' ]
// }
// Follow:
// {
//     S: [ '$' ],
//     A: [ '$' ],
//     B: [ 'c', '$' ],
//     D: [ 'c', '$' ],
//     P: [ '$' ],
//     I: [ 'c', '$' ]
// }
// testFirstFollow(var16NoLF, 'var16NoLF')

//#endregion




//#region ************************** LEFT - FACTORING *************************************
const testLF = (prods: IProductions, log: string): IProductions => {
    console.log(`\n${log}`)
    const [lf, map] = leftFactoring(prods, {})
    const res = substituteMapping(lf, map)
    console.table(prods)
    console.table(res)
    return lf
}

// testLF(var16, 'var16')
// testLF(leftF, 'leftF')
// testLF(leftF1, 'leftF1')
// testLF(leftF2, 'leftF2')

//#endregion


const clean = testLF(var16, 'var16')
console.log(clean)
testFirstFollow(clean, 'var16')


