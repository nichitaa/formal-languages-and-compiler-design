import React, {FC} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useParser} from "../../../context/ParserContext";
import {ApartmentOutlined} from '@ant-design/icons';

const ParseWordInput: FC = () => {
    const {
        word,
        updateWord,
        parseWord,
        loadVar16,
        loadVar15,
        loadTest1,
        loadTest2,
        loadTest3,
        loadTest4
    } = useParser();

    return (
        <Form>
            <Row gutter={[8, 8]}>
                <Col span={12}/>
                <Col span={9}>
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
                        icon={<ApartmentOutlined/>}
                        type={'primary'}
                        style={{width: '100%'}}
                        htmlType={'submit'}
                        onClick={() => parseWord()}
                    >Parse</Button>
                </Col>
            </Row>

            <Row gutter={[8, 8]} justify={'end'}>
                <Col span={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <strong><code>Load</code></strong> 🕊
                </Col>
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        onClick={() => loadTest1()}
                    ><code>test1</code></Button>
                </Col>
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        onClick={() => loadTest2()}
                    ><code>test2</code></Button>
                </Col>
                <Col span={3}>
                    <Button
                        style={{width: '100%'}}
                        onClick={() => loadTest3()}
                    ><code>test3</code></Button>
                </Col>
                <Col span={3}>
                    <Button
                        danger={true}
                        type={'dashed'}
                        style={{width: '100%'}}
                        onClick={() => loadTest4()}
                    ><code>test4</code></Button>
                </Col>
                <Col span={3}>
                    <Button
                        type={'dashed'}
                        danger={true}
                        style={{width: '100%'}}
                        onClick={() => loadVar16()}
                    ><code>var16</code></Button>
                </Col>
                <Col span={3}>
                    <Button
                        type={'dashed'}
                        danger={true}
                        style={{width: '100%'}}
                        onClick={() => loadVar15()}
                    ><code>var15</code></Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ParseWordInput;