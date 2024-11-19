import React from "react";
import { Helmet } from "react-helmet";

const ReactHelmet = ({ children, title, description, keywords, disabledMeta }) => {
    return (
        <>
            {!disabledMeta ? <Helmet>
                <title>{title || ''}</title>
                <meta name="description" content={description || ''} />
                <meta name="keywords" content={keywords || ''} />
            </Helmet> : null}
            {children}
        </>
    );
};

export default ReactHelmet;
