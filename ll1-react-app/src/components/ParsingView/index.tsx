import React from 'react';
import {Tag, Typography} from 'antd';
import DisplayProductions from "./components/DisplayProductions";
import {ParseTable} from "./components/ParseTable";
import {useParser} from "../../context/ParserContext";
import {WordParseTable} from "./components/WordParsingTable";

const {Title} = Typography;

const ParsingView = () => {
    const {lrProds, lrMapping, lfMapping, lfProds, word, success, substitutedProds, wordAccepted} = useParser();
    return (
        <>
            <div style={{
                width: '100%',
                height: '100vh',
                overflowY: 'auto',
                paddingBottom: '2em',
                direction: 'rtl'
            }}>
                {
                    success
                        ? <div style={{direction: 'ltr'}}>
                            <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}>
                                Parsing <code style={{fontSize: '0.7em'}}>{word}</code>
                            </Title>

                            <div style={{display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto'}}>
                                <div>
                                    <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Removing Left
                                        Recursion </Title>
                                    <DisplayProductions prods={lrProds} mappings={lrMapping}/>
                                </div>

                                <div>
                                    <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Left Factoring </Title>
                                    <DisplayProductions prods={lfProds} mappings={lfMapping}/>
                                </div>
                            </div>

                            <div style={{width: '90%', margin: 'auto'}}>
                                <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Substituted
                                    Mappings </Title>
                                <DisplayProductions prods={substitutedProds} mappings={{}}/>
                            </div>

                            <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Predictive Parsing Table <code>👾
                                too
                                lazy to substitute it 👾</code> </Title>
                            <ParseTable/>

                            <Title style={{marginTop: '1em', marginLeft: '1em'}} level={5}> Word Parsing
                                {wordAccepted
                                    ? <Tag style={{marginLeft: '1em'}} color="green">word accepted</Tag>
                                    : <Tag style={{marginLeft: '1em'}} color="red">word not accepted</Tag>}
                            </Title>
                            <WordParseTable/>
                        </div>
                        : <>
                            <Title style={{textAlign: 'center', marginTop: '1em'}} level={3}>
                                Parsing <code style={{fontSize: '0.6em'}}>press load and parse to see parser context</code>
                            </Title>
                        </>
                }
            </div>
        </>
    )
}

export default ParsingView;