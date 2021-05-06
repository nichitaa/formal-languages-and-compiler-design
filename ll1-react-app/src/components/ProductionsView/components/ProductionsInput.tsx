import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useParser} from "../../../context/ParserContext";

const ProductionsInput = () => {
    const {
        clearProductions,
        addProduction,
        startSymbol,
        changeStartSymbol,
    } = useParser()

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const addNewProduction = () => {
        addProduction(from, to);
        setFrom('');
        setTo('');
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Form onFinish={addNewProduction}>
                <Row gutter={[8, 8]}>
                    <Col>
                        {startSymbol === ''
                        && <Input
                            required={true}
                            maxLength={1}
                            style={{textTransform: 'uppercase'}}
                            placeholder={'Start Symbol e.g.: S'}
                            value={startSymbol}
                            onChange={(e) => changeStartSymbol(e.target.value)}
                        />}
                    </Col>
                    <Col>
                        <Form.Item
                            rules={[{
                                required: true,
                                message: 'State to derive from is required'
                            }]}
                        >
                            <Input
                                maxLength={1}
                                style={{textTransform: 'uppercase'}}
                                placeholder={'derived from'}
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Input
                                placeholder={'derived to'}
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </Form.Item>

                    </Col>
                    <Col>
                        <Button
                            htmlType={'submit'}
                            onClick={addNewProduction}>Add</Button>
                    </Col>
                    <Col>
                        <Button
                            danger={true}
                            onClick={() => clearProductions()}>Delete all</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ProductionsInput;