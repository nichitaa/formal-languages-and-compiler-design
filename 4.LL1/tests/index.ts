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

export const var16NoLF: IProductions = {
    [START_SYMBOL]: ['dA'],
    A: ['BP'],
    B: ['bD'],
    D: ['aI'],
    P: [EPSILON, 'cA'],
    I: [EPSILON, 'D']
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


export const recursion: IProductions = {
    [START_SYMBOL]: ['ABC'],
    'A': ['Aa', 'Ad', 'b'],
    'B': ['Bb', 'c'],
    'C': ['Cc', 'g']
}

// https://www.youtube.com/watch?v=3_VCoBfrt9c&ab_channel=Uncode-GATEComputerScience
export const leftF: IProductions = {
    [START_SYMBOL]: ['iEtS', 'iEtSeS', 'a'],
    'E': ['b']
}

// https://www.youtube.com/watch?v=whe29gOb8p4&ab_channel=TheBootStrappers
export const leftF1: IProductions = {
    'A': ['aAB', 'aA'],
    'B': ['bB', 'b']
}

// https://www.youtube.com/watch?v=23MdbHnhUSk&ab_channel=CSEconceptswithParinita
// tricky one
export const leftF2: IProductions = {
    'S': ['aSSbS', 'aSaSb', 'abb', 'b'],
    'B': ['bB', 'b'],
    'C': ['cN', 'cNa', 'eM', 'eMa']
}