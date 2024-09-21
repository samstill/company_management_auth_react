import React, { useEffect } from 'react';
import './styles/NotFound.css';

const NotFound = () => {
    useEffect(() => {
        document.title = '404 - Not Found';
    }, []);

    return (
        <div className="not-found-container">
            <div className="header">
                <h1 className="error-title">Error</h1>
                <h1 className="error-code">404</h1>
            </div>
            <div className="not-found-content">
                <h2 className="error-message"><span className="error-highlight">N</span>ot <span className="error-highlight">F</span>ound</h2>
            </div>
        </div>
    );
};

export default NotFound;
