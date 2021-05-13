import React from "react";
import {Table, Tag} from 'antd';
import {useParser} from "../../../context/ParserContext";

export const WordParseTable = () => {
    const {wordParseTable} = useParser();

    const col: object[] = [{
        title: 'Idx',
        dataIndex: 'idx',
        key: 'idx',
        render: (text) => <code>{text}</code>
    },{
        title: 'Stack',
        dataIndex: 'stack',
        key: 'stack',
        render: (text) => <code>{text}</code>
    }, {
        title: 'Input',
        dataIndex: 'input',
        key: 'input',
        render: (text) => <code>{text}</code>
    }, {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text) => {
            if (text === 'terminal/consumed') return <Tag color={'blue'}>{text}</Tag>
            else if (text === '--- accepted --') return <Tag color={'green'}>{text}</Tag>
            else if (text === '') return <Tag color={'red'}>no corresponding action</Tag>
            else return <code>{text}</code>
        }
    }, {
        title: 'Derivation',
        dataIndex: 'derivation',
        key: 'derivation',
        render: (text) => {
            if (text === '--- accepted --') return <Tag color={'green'}>{text}</Tag>
            else if (text === '') return <Tag color={'red'}>no corresponding derivation</Tag>
            else return <code>{text}</code>
        }
    }]

    const dat: object[] = []

    for (let i = 0; i < wordParseTable.length; i++) {
        const el = wordParseTable[i];
        dat.push({
            key: i,
            idx: i,
            stack: el.stack,
            input: el.input,
            action: el.action,
            derivation: el.derivation
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
