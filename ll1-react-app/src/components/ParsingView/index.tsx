import React from 'react';
import {Typography} from 'antd';
import DisplayProductions from "./components/DisplayProductions";
import {ParseTable} from "./components/ParseTable";
import {useParser} from "../../context/ParserContext";
import {WordParseTable} from "./components/WordParsingTable";

const {Title} = Typography;

const ParsingView = () => {
    const {lrProds, lrMapping, lfMapping, lfProds, word, success} = useParser();
    return (
        <>
            <div style={{
                width: '100%',
                height: '100vh',
                overflowY: 'scroll',
                paddingBottom: '2em',
            }}>
                <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}> Parsing {success &&
                <code>
                    {word}
                </code>} </Title>

                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>
                        <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Removing Left Recursion </Title>
                        <DisplayProductions prods={lrProds} mappings={lrMapping}/>
                    </div>

                    <div>
                        <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Left Factoring </Title>
                        <DisplayProductions prods={lfProds} mappings={lfMapping}/>
                    </div>
                </div>

                <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Predictive Parsing Table </Title>
                <ParseTable/>

                <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Word Parsing </Title>
                <WordParseTable/>
            </div>
        </>
    );
};

export default ParsingView;