import React from 'react';
import {Typography} from 'antd';
import ProductionsInput from "./components/ProductionsInput";
import DisplayProductions from "./components/DisplayProductions";
import ParseWordInput from "./components/ParseWordInput";

const {Title} = Typography;

const ProductionsView = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            padding: '10px'
        }}>
            <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}> Productions </Title>
            <ProductionsInput/>
            <ParseWordInput/>
            <DisplayProductions/>
            <Title style={{textAlign: 'center'}} level={4}> <code style={{fontSize: '0.7em'}}>author: Pasecinic Nichita <br/> faf
                192 <br/> 05.05.2021</code> </Title>
        </div>
    );
};

export default ProductionsView;