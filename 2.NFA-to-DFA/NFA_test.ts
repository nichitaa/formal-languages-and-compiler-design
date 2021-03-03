export interface I_FA {
    [key: string]: {
        [key: string]: Array<string>
    }
}

/*
* VARIANT 16
* PASECINIC NICHITA
*/
const nfa_sample: I_FA = {
    'q0': {
        'a': ['q1'],
        'b': ['q0'],
    },
    'q1': {
        'a': [],
        'b': ['q1', 'q2'],
    },
    'q2': {
        'a': ['q2'],
        'b': ['q3'],
    },
    'q3': {
        'a': [],
        'b': []
    }
}
const nfa_a: string[] = ['a', 'b']
const nfa_start: string = 'q0';
const nfa_terminal: string = 'q3';

// VARIANT 17
// const nfa_sample: I_FA = {
//     'q0': {
//         'a': ['q0', 'q1'],
//         'b': [],
//     },
//     'q1': {
//         'a': ['q2'],
//         'b': ['q1'],
//     },
//     'q2': {
//         'a': ['q0'],
//         'b': ['q3'],
//     },
//     'q3': {
//         'a': [],
//         'b': []
//     }
// }
// const nfa_a: string[] = ['a', 'b']
// const nfa_start: string = 'q0';
// const nfa_terminal: string = 'q3';

/* OTHER TEST CASES */
// #1
/*
const nfa_sample = {
	'q0': {
		'0': ['q0'],
		'1': ['q1'],
	},
	'q1': {
		'0': ['q1', 'q2'],
		'1': ['q1'],
	},
	'q2': {
		'0': ['q2'],
		'1': ['q1', 'q2'],
	},
};
const nfa_a = ['0', '1']
const nfa_start: string = 'q0';
const nfa_terminal: string = 'q2';
*/

// #2
/*
const nfa_sample = {
	'q0': {
		'0': ['q0', 'q1'],
		'1': ['q1'],
	},
	'q1': {
		'0': [],
		'1': ['q0', 'q1'],
	}
};
const nfa_a = ['0', '1'];
const nfa_start: string = 'q0';
const nfa_terminal: string = 'q1';
*/

export {nfa_a, nfa_sample, nfa_start, nfa_terminal}
