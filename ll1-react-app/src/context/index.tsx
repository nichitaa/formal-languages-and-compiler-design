import React from 'react';
import {ParserProvider} from "./ParserContext";

const AppContext = ({children}: {children: React.ReactNode}) => {
    return (
        <ParserProvider>
            {children}
        </ParserProvider>
    );
};

export default AppContext;