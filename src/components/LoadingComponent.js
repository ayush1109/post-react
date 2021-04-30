import React from 'react';
import {Spinner} from 'react-bootstrap';
export const Loading = () => {
    return (
        <div className="col-12">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
        </div>
    );
}