import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Error403 = () => {
    const redirectToHome = () => {
        window.location.href = "/";
    };

    return (
        <Container>
            <h1>Error 403 - Access Denied</h1>
            <Button onClick={redirectToHome}>Go to Home</Button>
        </Container>
    );
};

export default Error403;
