// some constants
export const EPSILON: string = 'ε';
export const S0: string = '$₀';
export const S: string = '$';

export const steps: object = {
    0: `ORIGINAL CONTEXT FREE GRAMMAR`,
    1: `STEP 1 UPDATE START SYMBOL [ if S in RHA will add ${S0} -> ${S} ]`,
    2: `STEP 2 REMOVE NULL TRANSITIONS [ e.g: A -> aB, B -> ${EPSILON} | b in A -> aB | a, B -> b ]`,
    3: `STEP 3 REMOVE UNIT TRANSITIONS [ e.g: A -> B, B -> a | b in A -> a | b, B -> a | b ]`,
    4: `STEP 4 SUBSTITUTE TERMINALS [ e.g: A -> aB in A -> XB, X -> a ]`,
    5: `STEP 5 NORMALIZE TO CHOMSKY NORMAL FORM [ e.g: A -> A${S}A in A -> HA, H -> A${S} ]`,
};

export enum stateType {
    TERMINAL,
    NON_TERMINAL
}

export interface CFG {
    [key: string]: Array<string>
}