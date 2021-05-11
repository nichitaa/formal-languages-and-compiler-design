import React from 'react';
import {Typography, Divider, Row} from 'antd';
import ProductionsInput from "./components/ProductionsInput";
import DisplayProductions from "./components/DisplayProductions";
import ParseWordInput from "./components/ParseWordInput";

const {Title, Paragraph, Text, Link} = Typography;

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
        </div>
    );
};

export default ProductionsView;