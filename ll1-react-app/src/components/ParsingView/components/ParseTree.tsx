import React, {useEffect, useState} from 'react';
import Tree from "react-d3-tree";
import {useParser} from "../../../context/ParserContext";
import './customTree.css'

const ParseTree = () => {
    interface ITree {
        name?: string,
        children?: Array<ITree>,
        attributes?: { terminal: string }
    }

    const {parseTree, startSymbol} = useParser();
    const [tree, setTree] = useState<ITree>({})


    const nested = (obj: object, result: ITree, state: string) => {

        const el = obj[state]
        result.name = state;

        result.children = new Array(Object.keys(el).length).fill(undefined)

        let entries = Object.entries(el);
        // @ts-ignore
        for (let [index, [key, value]] of entries.entries()) {
            // console.log({index, key, value})
            result.children[index] = {}
            if (typeof value === 'string') {
                result.children[index].name = key
                result.children[index].attributes = {terminal: ''}
            } else {
                nested(el, result.children[index], key)
            }
        }
    }

    useEffect(() => {
        if(Object.keys(parseTree).length !== 0) {
            let treeCopy: ITree = {
                name: '',
                children: []
            }
            nested(parseTree, treeCopy, startSymbol)
            setTree(treeCopy)
        } else {
            setTree({})
        }
        return () => {
            setTree({})
        }
    }, [parseTree])

    return (
        <div>

            <div id="treeWrapper" style={{width: '100vw', height: '100vh'}}>
                <Tree
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf"
                    orientation={'vertical'}
                    collapsible={true}
                    // @ts-ignore
                    data={tree}
                    translate={{
                        x: window.screen.width / 2,
                        y:  window.screen.height / 5
                    }}
                />
            </div>
        </div>
    );
};

export default ParseTree;