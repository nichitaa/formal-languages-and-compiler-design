import React, {FC} from 'react';
import './App.css'
import ProductionsView from "./components/ProductionsView";
import ParsingView from "./components/ParsingView";
import ParseTree from "./components/ParsingView/components/ParseTree";
import {Typography} from "antd";
const {Title} = Typography;

const App: FC = () => {
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
                <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}> Parse Tree </Title>
                <ParseTree/>
            </div>

        </>
    );
};

export default App;