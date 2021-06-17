import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ cardInfo }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Body>
                <Card.Title>
                    <strong>{cardInfo.title}</strong>
                </Card.Title>
                <Card.Text>{cardInfo.count}</Card.Text>
            </Card.Body>
        </Card>
    )
};

export default DashboardCard;
