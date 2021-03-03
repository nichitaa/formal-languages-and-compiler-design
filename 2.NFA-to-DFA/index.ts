import {I_FA, nfa_start, nfa_terminal} from "./NFA_test";

const _ = require('lodash')
const {nfa_sample, nfa_a} = require('./NFA_test')

abstract class A_DFA {
    _dfa: I_FA; // dfa object
    _nfa: I_FA; // nfa object
    _a: Array<string> // nfa alphabet
    _dfaStates: Array<string[]> // dfa states
    _terminal: string // can be easily adjusted to array of terminals
    _start: string // start symbol

    protected constructor(nfa, a, t, s) {
        this._nfa = nfa;
        this._a = a
        this._dfa = {};
        this._dfaStates = []
        this._terminal = t
        this._start = s
    }
}

class DFA extends A_DFA {

    public constructor(nfa: I_FA, a: string[], t: string, s: string) {
        super(nfa, a, t, s);
        this.convertNFAtoDFA()
    }

    public displayAsTable = (fa: I_FA, msg?: string) => {
        let table = {}
        const faCopy = _.cloneDeep(fa)
        for (let r in faCopy) {
            if(this._start === r) {
                table['->' + r] = faCopy[r]
            } else if (this._terminal === r) {
                table['*' + r] = faCopy[r]
            } else {
                table[r] = faCopy[r]
            }
        }
        for(let r in table) {
            const state = table[r]
            for (let c in state) {
                if (state[c].length === 0) {
                    state[c] = '∅'
                } else {
                    state[c] = state[c].join('')
                }
            }
        }
        console.log('\x1b[36m%s\x1b[0m', msg)
        console.table(table)
        console.log()
    }

    public getDFA(): I_FA {
        return this._dfa;
    }

    public getNFA(): I_FA {
        return this._nfa
    }

    public convertNFAtoDFA = (): void => {
        for (let q_state in this._nfa) {
            if (this._dfa[q_state] === undefined) {
                let q = ''
                if (this._start === q_state) {
                    q = '->' + q_state
                } else if (this._terminal === q_state) {
                    q = '*' + q_state
                }
                this._dfa[q] = this._nfa[q_state]
                this._dfaStates.push([q_state])
                this.advance(this._nfa[q_state])
            }
        }
    }

    private advance = (row: { [key: string]: string[] }): void => {
        for (let r in row) {
            const available: string[] = row[r];
            const nextState: string = row[r].join('');
            if (this._dfa[nextState] === undefined && nextState !== '') {
                let exists = false
                for (let i = 0; i < this._dfaStates.length; i++) {
                    if (this.similarArrays(available, this._dfaStates[i])) {
                        exists = true
                    }
                }
                if (!exists) {
                    this.updateDFA(nextState, available);
                }
            }
        }
    }

    private updateDFA = (state: string, arr: string[]): void => {
        const newState = {};
        if (arr.includes(this._terminal)) {
            state = '*' + state;
        }
        newState[state] = {};
        this._dfaStates.push(arr);
        for (let i = 0; i < this._a.length; i++) {
            let p: Array<string> = [];

            for (let j = 0; j < arr.length; j++) {
                const old = this._nfa[arr[j]][this._a[i]];
                if (old.length > 0) {
                    p = [...p, ...old];
                }
            }
            p = [...new Set([...p])];
            newState[state][this._a[i]] = [...p];
        }
        this._dfa = {...this._dfa, ...newState};
        for (let f in newState) {
            this.advance(newState[f]);
        }
    }

    private similarArrays = (newState: string[], dfaState: string[]): boolean => {
        if (newState.length !== dfaState.length) return false;
        for (let j = 0; j < dfaState.length; j++) {
            if (newState.indexOf(dfaState[j]) === -1) {
                return false;
            }
        }
        return true;
    }
}


const dfa = new DFA(nfa_sample, nfa_a, nfa_terminal, nfa_start)

const nfa_ = dfa.getNFA();
dfa.displayAsTable(nfa_, "INPUT Non-Deterministic-FA: ")

const dfa_ = dfa.getDFA();
dfa.displayAsTable(dfa_, "OUTPUT Deterministic-FA: ")
