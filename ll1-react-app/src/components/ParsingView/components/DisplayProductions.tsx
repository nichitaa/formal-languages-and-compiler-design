import React, {Fragment} from 'react';
import {Typography, Divider} from 'antd';
import ReactJson from "react-json-view";

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
                            return <Fragment key={key}>
                                <strong>{key} 🡪 </strong>
                                {prods[key].map((el, idx) => {
                                    if (idx === 0) return <> {el} </>
                                    else return <>
                                        | {el}
                                    </>
                                })}
                                <br/>
                            </Fragment>
                        })}
                    </blockquote>
                </Paragraph>
            </code>
            <pre>
                <ReactJson
                    collapsed={true}
                    name={'mappings'}
                    src={mappings}
                    theme={'solarized'}
                    displayDataTypes={false}
                    displayObjectSize={false}
                />
            </pre>
        </div>
    );
};

export default DisplayProductions;