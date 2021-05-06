import React from "react";
import {Table, Tag} from 'antd';
import {useParser} from "../../../context/ParserContext";

export const WordParseTable = () => {
    const {wordAccepted, wordParseTable} = useParser();

    const col: object[] = [{
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
            else return <code>{text}</code>
        }
    }, {
        title: 'Derivation',
        dataIndex: 'derivation',
        key: 'derivation',
        render: (text) => {
            if (text === '--- accepted --') return <Tag color={'green'}>{text}</Tag>
            else return <code>{text}</code>
        }
    }]

    const dat: object[] = []

    for (let i = 0; i < wordParseTable.length; i++) {
        const el = wordParseTable[i];
        dat.push({
            key: i,
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
            {
                wordAccepted ?
                    <Tag color="green">word accepted</Tag>
                    : <Tag color="red">word not accepted</Tag>
            }

            <Table
                columns={col}
                dataSource={dat}
                bordered={true}
                pagination={false}
            />
        </div>
    )
}
