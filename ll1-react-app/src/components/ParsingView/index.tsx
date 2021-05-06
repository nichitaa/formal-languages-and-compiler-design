import React from 'react';
import { Typography, Divider } from 'antd';
import DisplayProductions from "./components/DisplayProductions";
import {ParseTable} from "./components/ParseTable";
import {useParser} from "../../context/ParserContext";
import {WordParseTable} from "./components/WordParsingTable";

const { Title, Paragraph, Text, Link } = Typography;

const ParsingView = () => {
    const {lrProds, lrMapping, lfMapping, lfProds} = useParser();
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            // border: '2px solid grey',
            overflowY: 'auto',
            paddingBottom: '2em'
        }}>
            <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}> Parsing </Title>

            <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Removing Left Recursion </Title>
            <DisplayProductions prods={lrProds} mappings={lrMapping}/>

            <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Left Factoring </Title>
            <DisplayProductions prods={lfProds} mappings={lfMapping}/>

            <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Predictive Parsing Table </Title>
            <ParseTable/>

            <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Word Parsing </Title>
            <WordParseTable/>
        </div>
    );
};

export default ParsingView;