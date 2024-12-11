import React from "react";
import { Helmet } from "react-helmet";

const ReactHelmet = ({ children, title, description, keywords, disabledMeta }) => {
    return (
        <>
            {!disabledMeta ? <Helmet>
                <title>{title || ''}</title>
                <meta name="description" content={description || ''} />
                <meta name="keywords" content={keywords || ''} />
                <meta property="og:title" content={title || ''} />
                <meta property="og:description" content={description || ''} />
                <meta property="twitter:title" content={title || ''} />
                <meta property="twitter:description" content={description || ''} />
            </Helmet> : null}
            {children}
        </>
    );
};

export default ReactHelmet;
