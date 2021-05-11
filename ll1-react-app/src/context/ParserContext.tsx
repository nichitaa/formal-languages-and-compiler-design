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
    parseTree: object
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
    parseTree: {}
});


export const useParser = () => {
    return useContext(ParserContext)
}

export const ParserProvider = ({children}: { children: React.ReactNode }) => {
    const [productions, setProductions] = useState<{ [name: string]: string[] }>({});
    const [startSymbol, setStartSymbol] = useState<string>('');
    const [epsilon, setEpsilon] = useState<string>('ε')
    const [word, setWord] = useState<string>('');

    const [leftRecursionProds, setLeftRecursionProds] = useState<{ [name: string]: string[] }>({});
    const [leftRecursionMaps, setLeftRecursionMaps] = useState<{ [name: string]: string }>({});

    const [leftFactoringProds, setLeftFactoringProds] = useState<{ [name: string]: string[] }>({});
    const [leftFactoringMaps, setLeftFactoringMaps] = useState<{ [name: string]: string }>({})

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
        // console.log({body: params.body})
        fetch('http://localhost:8080/api/parse', params)
            .then(response => response.json())
            .then(res => {
                // console.log(res)
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
                    if (res.wordAccepted) {
                        setWordAccepted(res.wordAccepted);
                        setWordParseTable(res.wordParseTable);
                        setParseTree(res.parseTree)
                    } else {
                        setWordAccepted(res.wordAccepted);
                        setWordParseTable([]);
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
        parseTree
    };

    return (
        <ParserContext.Provider value={value}>
            {children}
        </ParserContext.Provider>
    )

}