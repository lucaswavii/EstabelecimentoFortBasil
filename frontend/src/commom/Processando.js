
import React from 'react';

export default props => (
    props.isCarrega ? 
    <div className="overlay d-flex justify-content-center align-items-center">
        <i className="fas fa-2x fa-sync fa-spin"></i>
    </div> : ''
);