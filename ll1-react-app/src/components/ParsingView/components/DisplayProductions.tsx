import React from 'react';
import {Typography} from 'antd';
import ReactJson from "react-json-view";

const {Paragraph} = Typography;

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
                            return <React.Fragment key={key}>
                                <strong>{key} 🡪 </strong>
                                {prods[key].map((el, idx) => {
                                    if (idx === 0) return <React.Fragment key={el}> {el} </React.Fragment>
                                    else return <React.Fragment key={el}>
                                        | {el}
                                    </React.Fragment>
                                })}
                                <br/>
                            </React.Fragment>
                        })}
                    </blockquote>
                </Paragraph>
            </code>
            {(Object.keys(mappings).length > 0)
            && <ReactJson
                collapsed={true}
                name={'mappings'}
                src={mappings}
                theme={'bright:inverted'}
                displayDataTypes={false}
                displayObjectSize={false}/>}
        </div>
    );
};

export default DisplayProductions;