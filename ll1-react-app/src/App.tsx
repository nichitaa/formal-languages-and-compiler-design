import React, {FC} from 'react';
import './App.css'
import ProductionsView from "./components/ProductionsView";
import ParsingView from "./components/ParsingView";

const App: FC = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
        }}>
            <ProductionsView/>
            <ParsingView/>
        </div>
    );
};

export default App;