export let START_SYMBOL = 'S';
export let EPSILON = 'ε';
export const STACK_END = '$';

export const changeSymbols = (start: string, epsilon: string) => {
    START_SYMBOL = start;
    EPSILON = epsilon
}


export enum stateType {
    TERMINAL,
    NON_TERMINAL
}

export interface IProductions {
    [key: string]: string[]
}

export interface IFirstFollowTable {
    first: IProductions,
    follow: IProductions
}