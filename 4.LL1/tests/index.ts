import {EPSILON, IProductions, START_SYMBOL} from "../consts";

/**
 * very interesting and challenging variant :(
 * */
export const var16: IProductions = {
    [START_SYMBOL]: ['dA'],
    'A': ['B', 'BcA'],
    'B': ['bD'],
    'D': ['a', 'aD']
}

// down here are more relevant ones
// from here: https://www.youtube.com/watch?v=_uSlP91jmTM
export const prod: IProductions = {
    [START_SYMBOL]: ['ABCDE'],
    'A': ['a', EPSILON],
    'B': ['b', EPSILON],
    'C': ['c'],
    'D': ['d', EPSILON],
    'E': ['e', EPSILON]
};

export const prod1: IProductions = {
    [START_SYMBOL]: ['Bb', 'Cd'],
    'B': ['aB', EPSILON],
    'C': ['cC', EPSILON]
}

export const prod2: IProductions = {
    [START_SYMBOL]: ['ACB', 'CbB', 'Ba'],
    'A': ['da', 'BC'],
    'B': ['g', EPSILON],
    'C': ['h', EPSILON]
}

// ref: https://www.youtube.com/watch?v=_uSlP91jmTM
export const prod3: IProductions = {
    // Q is E'
    // START_SYMBOL is E
    [START_SYMBOL]: ['TQ'],
    'Q': ['+TQ', EPSILON],
    // R is T'
    'T': ['FR'],
    'R': ['*FR', EPSILON],
    // a is id
    // o is opening parenthesis (
    // c is closing parenthesis )
    'F': ['a', `o${START_SYMBOL}c`]
}

export const prod4: IProductions = {
    [START_SYMBOL]: ['aBDh'],
    'B': ['cC'],
    'C': ['bC', EPSILON],
    'D': ['EF'],
    'E': ['g', EPSILON],
    'F': ['f', EPSILON],
}

