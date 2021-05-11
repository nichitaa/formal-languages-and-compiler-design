import React, {FC, useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useParser} from "../../../context/ParserContext";

const ParseWordInput: FC = () => {
    const {word, updateWord, parseWord, loadVar16} = useParser();

    const onFinish = () => {
        parseWord()
    }

    return (
        <Form onFinish={onFinish}>
            <Row gutter={[8, 8]}>
                <Col span={12}/>

                <Col span={6}>
                    <Form.Item>
                        <Input
                            placeholder={'Word to parse'}
                            value={word}
                            onChange={(e) => updateWord(e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        htmlType={'submit'}
                        onClick={() => parseWord()}
                    >Parse</Button>
                </Col>
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        onClick={() => loadVar16()}
                    >Load</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ParseWordInput;