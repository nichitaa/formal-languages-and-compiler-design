import {
    prod,
    prod1,
    prod2,
    prod3,
    prod4,
    var16
} from './tests'
import {buildFirstFollowTable} from "./steps/FirstFollow";

/*
first: {
    S: [ 'a', 'b', 'c' ],
    A: [ 'a', 'ε' ],
    B: [ 'b', 'ε' ],
    C: [ 'c' ],
    D: [ 'd', 'ε' ],
    E: [ 'e', 'ε' ]
  },
follow: {
    S: [ '$' ],
    A: [ 'b', 'c' ],
    B: [ 'c' ],
    C: [ 'd', 'e', '$' ],
    D: [ 'e', '$' ],
    E: [ '$' ]
  }
*/
console.log('Productions:')
console.table(prod)
buildFirstFollowTable(prod)


/*
first: {
    S: [ 'a', 'b', 'c', 'd' ],
    B: [ 'a', 'ε' ],
    C: [ 'c', 'ε' ]
  },
follow: {
    S: [ '$' ],
    B: [ 'b' ],
    C: [ 'd' ]
  }
*/
console.log('Productions:')
console.log({prod1})
buildFirstFollowTable(prod1)


/*
first: {
    S: [ 'd', 'g', 'h', 'ε', 'b', 'a' ],
    A: [ 'd', 'g', 'h', 'ε' ],
    B: [ 'g', 'ε' ],
    C: [ 'h', 'ε' ]
  },
follow: {
    S: [ '$' ],
    A: [ 'h', 'g', '$' ],
    B: [ '$', 'a', 'h', 'g' ],
    C: [ 'g', '$', 'b', 'h' ]
  }
*/
console.log('Productions:')
console.log({prod2})
buildFirstFollowTable(prod2)

// ***** Start symbol is E here ****
/*
first: {
    E: [ 'a', 'o' ],
    Q: [ '+', 'ε' ],
    T: [ 'a', 'o' ],
    R: [ '*', 'ε' ],
    F: [ 'a', 'o' ]
  },
follow: {
    E: [ '$', 'c' ],
    Q: [ '$', 'c' ],
    T: [ '+', '$', 'c' ],
    R: [ '+', '$', 'c' ],
    F: [ '*', '+', '$', 'c' ]
  }
*/
console.log('Productions:')
console.log({prod3})
buildFirstFollowTable(prod3)


/*
first: {
    S: [ 'a' ],
    B: [ 'c' ],
    C: [ 'b', 'ε' ],
    D: [ 'g', 'f', 'ε' ],
    E: [ 'g', 'ε' ],
    F: [ 'f', 'ε' ]
  },
follow: {
    S: [ '$' ],
    B: [ 'g', 'f', 'h' ],
    C: [ 'g', 'f', 'h' ],
    D: [ 'h' ],
    E: [ 'f', 'h' ],
    F: [ 'h' ]
  }
*/
console.log('Productions:')
console.log({prod4})
buildFirstFollowTable(prod4)

// console.log('Productions:')
// console.log({var16})
// firstFollow(var16)