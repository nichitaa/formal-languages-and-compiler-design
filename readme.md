# LFPC Labs

Pasecinic Nichita, FAF 192

## **Lab - 1**

- NodeJS-TypeScript CLI to convert a regular grammar to Finite Automaton (FA)

- Check if some input string is accepted by generated FA

  ***Demo***

  ![lab1demo](https://user-images.githubusercontent.com/57563506/107852445-643eb100-6e19-11eb-8a04-19b485ef071c.gif)

## Lab - 2 Convert NFA to DFA

- Program to convert input NFA to DFA, respecting all transitions and rules.

  sample input NFA:

  ```typescript
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
  ```

  sample console output DFA:

  ```typescript
  corresponding dfa:  {
      '->q0': { 
          'a': [ 'q1' ], 
          'b': [ 'q0' ] 
      },
      'q1': { 
          'a': [], 
          'b': [ 'q1', 'q2' ] 
      },
      'q1q2': { 
          'a': [ 'q2' ], 
          'b': [ 'q1', 'q2', 'q3' ] 
      },
      'q2': { 
          'a': [ 'q2' ], 
          'b': [ 'q3' ] 
      },
      '*q3': { 
          'a': [], 
          'b': [] 
      },
      '*q1q2q3': { 
          'a': [ 'q2' ], 
          'b': [ 'q1', 'q2', 'q3' ] 
      }
  }
  ```

  *More NFA examples can be seen in NFA_test.ts* 

  

  ##### Stuff requested to be written on paper:  

  > 1. Convert NFA from your variant to DFA on paper, writing all transitions and drawing converted automato.

  ![photo_2021-03-03_22-23-12](https://user-images.githubusercontent.com/57563506/109867479-32c64200-7c6f-11eb-933e-57d9d52fb528.jpg)

  ##### JFLAP says it is correct !

  ![Untitled picture](https://user-images.githubusercontent.com/57563506/109867656-728d2980-7c6f-11eb-8a05-64e0b2556a26.png)

  > 1. Write program which converts nondeterministic finite automato (NFA) to deterministic finite automato (DFA)
  > 2. Display converted automato in form of graph or transition table

  ##### The program results are shown in form on the transition table

  ![lab2demo](https://user-images.githubusercontent.com/57563506/109866634-2a213c00-7c6e-11eb-8a62-0602aa1e97ac.gif)


------



`To run the programs:` 

1. `clone repository`
2. `cd into specific lab work`
3. `run npm install or yarn install`
4. `run npm start or yarn start`

