import React, {useContext, useState} from 'react';

export interface IProds {
    [name: string]: string[]
}

export interface ICtx {
    productions: IProds,
    addProduction: Function
    clearProductions: Function,
    word: string,
    updateWord: Function,
    parseWord: Function,
    lrProds: IProds,
    lrMapping: object,
    lfProds: IProds,
    lfMapping: object,
    parseTable: object,
    wordAccepted: boolean,
    wordParseTable: Array<{ stack?: string, input?: string, derivation?: string, action?: string }>,
    terminals: string[],
    nonTerminals: string[],
    startSymbol: string,
    epsilon: string,
    changeStartSymbol: Function,
    error: boolean,
    errorMsg: string,
    success: boolean,
    loadVar16: Function,
    loadVar15: Function,
    parseTree: object,
    substitutedProds: IProds,
    loadTest1: Function,
    loadTest2: Function,
    loadTest3: Function,
    loadTest4: Function,
}

const ParserContext = React.createContext<ICtx>({
    productions: {},
    addProduction: () => {
    },
    clearProductions: () => {
    },
    word: '',
    updateWord: () => {
    },
    parseWord: () => {
    },
    lrProds: {},
    lfProds: {},
    parseTable: [],
    terminals: [],
    nonTerminals: [],
    wordAccepted: false,
    wordParseTable: [],
    lrMapping: {},
    lfMapping: {},
    startSymbol: '',
    epsilon: 'ε',
    changeStartSymbol: () => {
    },
    error: false,
    errorMsg: '',
    success: false,
    loadVar16: () => {
    },
    loadVar15: () => {},
    parseTree: {},
    substitutedProds: {},
    loadTest1: () => {},
    loadTest2: () => {},
    loadTest3: () => {},
    loadTest4: () => {}
});


export const useParser = () => {
    return useContext(ParserContext)
}

export const ParserProvider = ({children}: { children: React.ReactNode }) => {
    const [productions, setProductions] = useState<IProds>({});
    const [startSymbol, setStartSymbol] = useState<string>('');
    const [epsilon, setEpsilon] = useState<string>('ε')
    const [word, setWord] = useState<string>('');

    const [leftRecursionProds, setLeftRecursionProds] = useState<IProds>({});
    const [leftRecursionMaps, setLeftRecursionMaps] = useState<IProds>({});

    const [leftFactoringProds, setLeftFactoringProds] = useState<IProds>({});
    const [leftFactoringMaps, setLeftFactoringMaps] = useState<IProds>({});

    const [substitutedProds, setSubstitutedProds] = useState<IProds>({})

    const [parseTable, setParseTable] = useState<object>({});
    const [terminals, setTerminals] = useState<string[]>([]);
    const [nonTerminals, setNonTerminals] = useState<string[]>([])

    const [wordAccepted, setWordAccepted] = useState<boolean>(false);
    const [wordParseTable, setWordParseTable] = useState<object[]>([{}]);
    const [parseTree, setParseTree] = useState<object>({});

    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const changeStartSymbol = (symbol: string) => setStartSymbol(symbol.toUpperCase());

    const addProduction = (from: string, to: string): void => {
        // console.log({from, to})
        if (from.trim() === '' || to.trim() === '') return
        from = from.toUpperCase()
        if (productions[from] === undefined) {
            setProductions(prev => ({
                ...prev,
                [from]: [to]
            }))
        } else {
            if (!productions[from].includes(to)) {
                setProductions(prev => ({
                    ...prev,
                    [from]: [...prev[from], to]
                }))
            }
        }
    }

    const clearProductions = () => {
        setProductions({});
        setWord('');
        setLeftRecursionProds({});
        setLeftRecursionMaps({});
        setLeftFactoringProds({});
        setLeftFactoringMaps({});
        setParseTable({});
        setWordAccepted(false);
        setWordParseTable([]);
        setParseTree({});
        setTerminals([]);
        setNonTerminals([]);
        setStartSymbol('');
        setErrorMsg('');
        setError(false);
        setSuccess(false);
        setSubstitutedProds({});
    }

    const updateWord = (w) => {
        setWord(w)
    }

    const parseWord = () => {
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productions, word, startSymbol, epsilon})
        };
        console.log({body: {productions, word, startSymbol, epsilon}})
        fetch('http://localhost:8080/api/parse', params)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if (res.success) {
                    setSuccess(true);
                    setError(false);
                    setErrorMsg('');
                    if (res.leftRecursion.data) {
                        setLeftRecursionProds(res.leftRecursion.data);
                        setLeftRecursionMaps(res.leftRecursion.map);
                    }
                    if (res.leftFactoring.data) {
                        setLeftFactoringProds(res.leftFactoring.data);
                        setLeftFactoringMaps(res.leftFactoring.map);
                    }
                    if (res.parseTable) {
                        setParseTable(res.parseTable);
                        setNonTerminals(res.nonTerminals);
                        setTerminals(res.terminals);
                    }
                    if (res.substitutedProds) {
                        setSubstitutedProds(res.substitutedProds)
                    }
                    if (res.wordAccepted) {
                        setWordAccepted(res.wordAccepted);
                        setWordParseTable(res.wordParseTable);
                        setParseTree(res.parseTree)
                    } else {
                        setWordAccepted(res.wordAccepted);
                        setWordParseTable(res.wordParseTable);
                        setParseTree({})
                    }
                } else {
                    setSuccess(false);
                    setError(true);
                    setErrorMsg(res.message);
                }

            });
    }

    const loadVar16 = () => {
        setStartSymbol('S');
        setEpsilon('ε');
        const var16: IProds = {
            'S': ['dA'],
            'A': ['B', 'BcA'],
            'B': ['bD'],
            'D': ['a', 'aD']
        }
        setProductions(var16);
        setWord('dbaacbaaa');
    }

    const loadVar15 = () => {
        setStartSymbol('S');
        setEpsilon('ε');
        const var15: IProds = {
            'S': ['Ag'],
            'A': ['abcB'],
            'B': ['Cd'],
            'C': ['e', 'CfD'],
            'D': ['e']
        }
        setProductions(var15);
        setWord('abcefedg');
    }

    const loadTest1 = () => {
        setStartSymbol('S');
        setEpsilon('ε');
        const prod: IProds = {
            'S': ['ABCDE'],
            'A': ['a', 'ε'],
            'B': ['b', 'ε'],
            'C': ['c'],
            'D': ['d', 'ε'],
            'E': ['e', 'ε']
        };
        setProductions(prod);
        setWord('abcde');
    }

    const loadTest2 = () => {
        setStartSymbol('S');
        setEpsilon('ε');
        const prod: IProds = {
            'S': ['aBDh'],
            'B': ['cC'],
            'C': ['bC', 'ε'],
            'D': ['EF'],
            'E': ['g', 'ε'],
            'F': ['f', 'ε'],
        }
        setProductions(prod);
        setWord('acbbbbbgh');
    }

    const loadTest3 = () => {
        setStartSymbol('E');
        setEpsilon('ε');
        const prod: IProds = {
            // Start symbol si E
            // p is +
            'E': [`E+T`, 'T'],
            // m is *
            'T': ['T*F', 'F'],
            // i is id
            // o is (
            // c is )
            'F': [`oEc`, 'i']
        }
        setProductions(prod);
        setWord('i*i+i');
    }

    const loadTest4 = () => {
        setStartSymbol('S');
        setEpsilon('ε');
        const prod: IProds = {
            'S': ['E'],
            'E': ['FcA'],
            'A': ['b', 'dD'],
            'D': ['Fe'],
            'F': ['aX'],
            'X': ['ε', 'baX']
        }
        setProductions(prod);
        setWord('ababacdabae');
    }

    const value: ICtx = {
        productions,
        addProduction,
        clearProductions,
        word,
        updateWord,
        parseWord,
        lrProds: leftRecursionProds,
        lrMapping: leftRecursionMaps,
        lfProds: leftFactoringProds,
        lfMapping: leftFactoringMaps,
        parseTable,
        terminals,
        nonTerminals,
        wordAccepted,
        wordParseTable,
        startSymbol,
        epsilon,
        changeStartSymbol,
        error,
        errorMsg,
        success,
        loadVar16,
        loadVar15,
        parseTree,
        substitutedProds,
        loadTest1,
        loadTest2,
        loadTest3,
        loadTest4
    };

    return (
        <ParserContext.Provider value={value}>
            {children}
        </ParserContext.Provider>
    )

}