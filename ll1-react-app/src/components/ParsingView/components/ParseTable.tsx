import React from "react";
import {Table} from 'antd';
import {useParser} from "../../../context/ParserContext";



export const ParseTable = () => {
    const {parseTable, terminals} = useParser();

    const col: object[] = [{
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        render: text => <code>{text}</code>
    }]
    const dat: object[] = []

    for (let el of terminals) {
        if(el !== 'ε') {
            col.push({
                title: el,
                dataIndex: el,
                key: el,
                render: text => <code>{text}</code>
            })
        }
    }

    col.push({
        title: '$',
        dataIndex: 'stackEnd',
        key: '$',
        render: text => <code>{text}</code>
    })

    for(let el in parseTable) {
        const obj: object = {}
        for (let t of terminals) {
            if(parseTable[el][t] !== undefined) {
                obj[t] = parseTable[el][t]
            } else {
                obj[t] = '---'
            }
        }
        if(parseTable[el]['$'] !== undefined) {
            obj['stackEnd'] = parseTable[el]['$']
        } else {
            obj['stackEnd'] = '---'
        }
        dat.push({
            state: el,
            key: el,
            ...obj
        })
    }


    return (
        <div style={{
            marginLeft: '1em',
            marginRight: '1em'
        }}>
            <Table
                columns={col}
                dataSource={dat}
                bordered={true}
                pagination={false}
            />
        </div>
    )
}
