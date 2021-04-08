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

## Lab - 3 Convert CFG to CNF 

- was used same structure (as in previous labs) to represent the grammar 
- each step is a separate function which works independently and returns a new, updated grammar
- utils - set of simple and useful utils to check if the grammar meets a certain condition (mostly)
- ACTUAL PERFORMED STEPS:
  1.  Check if S in RHA, if so update grammar with S0
  2.  Remove null (ε) transitions and any remaining
  3.  Remove unit transitions and any duplicates
  4.  Substitute terminals in transitions with multiple variables to correspond to CNF 
  5.  Substitute the transitions with more then 2 non terminals and non reachable or useless transitions to correspond to CNF
- at each step is shown the current grammar in form of a table, then it is easy to follow the steps and check for correctitude (at least, I think so)

![image](https://user-images.githubusercontent.com/82079634/114011385-d22db480-986d-11eb-8115-b79cf126f2b3.png)

![image](https://user-images.githubusercontent.com/82079634/114011468-ed98bf80-986d-11eb-8e1b-8035f84d8669.png)

![image-20210408132616846](C:\Users\Win10Pro\AppData\Roaming\Typora\typora-user-images\image-20210408132616846.png)

![image](https://user-images.githubusercontent.com/82079634/114011561-07d29d80-986e-11eb-8b46-dbc74fa6aa86.png)

![image](https://user-images.githubusercontent.com/82079634/114011600-13be5f80-986e-11eb-9ed5-557d7daf074f.png)

![image-20210408132709784](C:\Users\Win10Pro\AppData\Roaming\Typora\typora-user-images\image-20210408132709784.png)



`To run the programs:` 

1. `clone repository`
2. `cd into specific lab work`
3. `run npm install or yarn install`
4. `run npm start or yarn start`

