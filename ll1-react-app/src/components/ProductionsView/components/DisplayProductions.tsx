import React, {useEffect} from 'react';
import ReactJson from 'react-json-view';
import {useParser} from "../../../context/ParserContext";
import {notification} from "antd";


const DisplayProductions = () => {
    const {productions, startSymbol, epsilon, error, errorMsg, success} = useParser();

    const openNotificationWithIcon = (type: string, msg: string) => {
        notification[type]({
            message: 'Status',
            description: msg
        });
    };

    useEffect(() => {
        if(success && !error) {
            openNotificationWithIcon('success', 'All Good!')
        } else if (error && !success) {
            openNotificationWithIcon('error', `Parsing Error!: ${errorMsg}`)
        }
    }, [error, success, errorMsg])

    return (
        <div style={{
            width: '100%',
            height: '55vh',
            overflowY: 'auto',
            marginTop: '1em',
            marginBottom: '1em',
            paddingLeft: '1em',
            paddingRight: '1em',
        }}>
            <code>
                Start Symbol: {startSymbol}
                <br/>
                Epsilon Symbol: {epsilon}
            </code>
            <ReactJson
                enableClipboard={true}
                name={'productions'}
                src={productions}
                theme={'bright:inverted'}
                displayDataTypes={false}
                displayObjectSize={false}
                indentWidth={4}
            />
        </div>
    );
};

export default DisplayProductions;