import React from 'react';
import {Typography, Divider} from 'antd';

const {Title, Paragraph, Text, Link} = Typography;

const DisplayProductions = ({prods, mappings}) => {

    return (
        <div style={{
            width: '100%',
            minHeight: '10em',
            overflowY: 'auto',
            paddingLeft: '1em',
            paddingRight: '1em'
        }}>
            <code>
                <Paragraph>
                    <blockquote>
                        {Object.keys(prods).map((key, i) => {
                            return <>
                                <strong>{key} 🡪 </strong>
                                {
                                    prods[key].map((el, idx) => {
                                        if(idx === 0) return <> {el} </>
                                        else return <>
                                            | {el}
                                        </>
                                    })
                                }
                                <br/>
                            </>
                        })}
                    </blockquote>
                </Paragraph>
            </code>
            <pre>
                Mappings:
                <code>
                    {JSON.stringify(mappings, null, 2)}
                </code>
            </pre>
        </div>
    );
};

export default DisplayProductions;