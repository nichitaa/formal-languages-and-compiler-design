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
        // console.log({effect: {error, errorMsg, success}})
        if(success && !error) {
            openNotificationWithIcon('success', 'All Good!')
        } else if (error && !success) {
            openNotificationWithIcon('error', `Parsing Error!: ${errorMsg}`)
        }
    }, [error, success])

    return (
        <div style={{
            width: '100%',
            height: '30em',
            overflowY: 'auto',
            marginBottom: '2em',
            paddingLeft: '1em',
            paddingRight: '1em'
        }}>
            <code>
                Start Symbol: {startSymbol}
                <br/>
                Epsilon Symbol: {epsilon}
            </code>
            <ReactJson
                name={'productions'}
                src={productions}
                theme={'solarized'}
                displayDataTypes={false}
                displayObjectSize={false}
            />
        </div>
    );
};

export default DisplayProductions;