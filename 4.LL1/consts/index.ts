export const START_SYMBOL = 'S';
export const EPSILON = 'ε';
export const STACK_END = '$';

export enum stateType {
    TERMINAL,
    NON_TERMINAL
}

export interface IProductions {
    [key: string]: Array<string>
}

export interface IFirstFollowTable {
    first: IProductions,
    follow: IProductions
}