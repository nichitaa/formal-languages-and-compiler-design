import React, {FC} from 'react';
import './App.css';
import ProductionsView from "./components/ProductionsView";
import ParsingView from "./components/ParsingView";
import ParseTree from "./components/ParsingView/components/ParseTree";
import {Typography} from "antd";
import {useParser} from "./context/ParserContext";

const {Title} = Typography;

const App: FC = () => {
    const {success, wordAccepted} = useParser();
    return (
        <>
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
            }}>
                <ProductionsView/>
                <ParsingView/>
            </div>
            <div style={{
                width: '100vw',
                height: '100vh',
            }}>
                {success && wordAccepted
                && <>
                    <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}>
                        Parse Tree <code style={{fontSize: '0.7em'}}>click on nodes to collapse them</code>
                    </Title>
                    <ParseTree/>
                </>}
            </div>
        </>
    );
}

export default App;