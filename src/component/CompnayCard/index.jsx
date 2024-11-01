import React from 'react'
import { Card,Button } from "react-bootstrap"
export default function index() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Teklif Al</Button>
            </Card.Body>
        </Card>
    )
}
