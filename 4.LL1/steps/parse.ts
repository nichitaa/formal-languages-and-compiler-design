/**
 * @author Pasecinic Nichita <pasecinic.nichita@isa.utm.md>
 * @date 03.05.2021
 */


import {EPSILON, STACK_END, START_SYMBOL} from "../consts";
import {isNonTerminal, isTerminal} from "../utils/utils";

export const parseLL1 = (word: string, table: object): [boolean, Array<{ stack, input, action, derivation }>?, object?] => {

    const stack = [STACK_END, START_SYMBOL];
    const input = word.split('')
    input.push(STACK_END);


    let condition =
        input.length === stack.length
        && stack.length === 1
        && stack[0] === input[0]
        && input[0] === STACK_END;

    const res: Array<{ stack, input, action, derivation }> = [];

    // parse tree example object
    // word - imfine
    // const tree = {
    //     S: {
    //         F: {
    //             A: {
    //                 'i': 'terminal'
    //             },
    //             'm': 'terminal'
    //         },
    //         B: {
    //             C: {
    //                 'f': 'terminal'
    //             },
    //             O: {
    //                 I: {
    //                     'i': 'terminal'
    //                 },
    //                 K: {
    //                     'n': 'terminal'
    //                 },
    //                 'e': 'terminal'
    //             }
    //         }
    //     }
    // }

    let parseTree: object = {}

    let idx = 0;
    while (!condition) {
        res[idx] = {
            stack: stack.join(''),
            input: input.join(''),
            action: '',
            derivation: ''
        }
        const top = stack.pop();

        if (isNonTerminal(top!)) {
            if (table[top!][input[0]] === undefined) {
                console.log(`String: ${word} can not be parsed as for Non Terminal ${top} does not exists a derivation with ${input[0]}`)
                return [false, undefined];
            }
            const toPush = table[top!][input[0]].split('').reverse()
            if (!toPush.includes(EPSILON)) stack.push(...toPush)
            res[idx].action = `${toPush.join('')}`
            res[idx].derivation = `${top} -> ${table[top!][input[0]]}`;

            // parse tree object update
            if (idx === 0) {
                // only for start state
                parseTree[top!] = {}
                const child = table[top!][input[0]].split('')
                for (let c of child) {
                    if (isTerminal(c)) parseTree[top!][c] = '- terminal'
                    else parseTree[top!][c] = {}
                }
                // console.log(parseTree)
            } else {
                getObject(parseTree, top, [...table[top!][input[0]].split('')])
            }

        } else {
            if (top === input[0]) {
                res[idx].action = 'terminal/consumed'
                res[idx].derivation = `${top} == ${input[0]}`;
                input.shift()
            } else {
                console.log(`String: ${word} can not be parsed as terminals ${top} and ${input[0]} does not match`)
                return [false, undefined, undefined];
            }
        }

        condition =
            input.length === stack.length
            && stack.length === 1
            && stack[0] === input[0]
            && input[0] === STACK_END;
        idx++;
    }

    res.push({
        stack: stack.join(''),
        input: input.join(''),
        action: '--- accepted --',
        derivation: '--- accepted --'
    });

    // console.log(JSON.stringify(parseTree, null, 2))
    return [true, res, parseTree]
}


// modified from https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
// recursive finds the object by key and and updates it
// mutations with recursion are bad, but no issues here
const getObject = (theObject, state, arr) => {
    let result = null;
    for (const prop in theObject) {
        // if the key is the state
        if (prop == state) {
            // and is an empty object
            if (Object.keys(theObject[prop]).length === 0) {
                // update it with new possessed hierarchical states
                for (let el of arr) {
                    if (isTerminal(el)) {
                        theObject[state][el] = '- terminal'
                    } else {
                        theObject[state][el] = {}
                    }
                }
                return theObject;
            }
        }
        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
            result = getObject(theObject[prop], state, arr);
            if (result) {
                break;
            }
        }
    }
    return result;
}

