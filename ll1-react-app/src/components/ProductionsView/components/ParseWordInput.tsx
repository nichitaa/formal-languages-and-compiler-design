import React, {FC, useState} from 'react';
import {Button, Col, Input, Row} from "antd";
import {useParser} from "../../../context/ParserContext";

const ParseWordInput: FC = () => {
    const {word, updateWord, parseWord} = useParser();


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Row gutter={[8, 8]}>
                <Col>
                    <Input
                        placeholder={'Word to parse'}
                        value={word}
                        onChange={(e) => updateWord(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button onClick={() => parseWord()}>Parse</Button>
                </Col>
            </Row>

        </div>
    );
};

export default ParseWordInput;