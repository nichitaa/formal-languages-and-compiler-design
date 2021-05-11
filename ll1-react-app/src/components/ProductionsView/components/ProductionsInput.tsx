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
        <Form onFinish={addNewProduction} >
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    {startSymbol === ''
                    && <Input
                        required={true}
                        maxLength={1}
                        style={{textTransform: 'uppercase', width: '100%'}}
                        placeholder={'Start Symbol e.g.: S'}
                        value={startSymbol}
                        onChange={(e) => changeStartSymbol(e.target.value)}
                    />}
                </Col>

                <Col span={6}>
                    <Form.Item
                        rules={[{
                            required: true,
                            message: 'State to derive from is required'
                        }]}
                    >
                        <Input
                            maxLength={1}
                            style={{textTransform: 'uppercase', width: '100%'}}
                            placeholder={'derived from'}
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        <Input
                            style={{width: '100%'}}
                            placeholder={'derived to'}
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </Form.Item>

                </Col >
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        htmlType={'submit'}
                        onClick={addNewProduction}>Add</Button>
                </Col>
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        danger={true}
                        onClick={() => clearProductions()}>Delete all</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ProductionsInput;