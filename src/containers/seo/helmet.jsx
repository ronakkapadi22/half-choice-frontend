import React from "react";
import { Helmet } from "react-helmet";

const ReactHelmet = ({ children, title, description, keywords }) => {
    return (
        <>
            <Helmet>
                <title>{title || ''}</title>
                <meta name="description" content={description || ''} />
                <meta name="keywords" content={keywords || ''} />
            </Helmet>
            {children}
        </>
    );
};

export default ReactHelmet;
