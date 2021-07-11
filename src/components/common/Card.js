/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';


const MyCard = (props) => {

    return (
        <Card style={{ margin: '10px' }} className="text-center">
            <Card.Header style={{ backgroundColor: '#cce6ff', fontWeight: 'bold', fontSize: 'large' }}>{props.name}</Card.Header>
            {/* <Card.Footer style={{ backgroundColor: '#ccfff5' }} className="text-muted">Ratings</Card.Footer> */}
            <Card.Body style={{ backgroundColor: '#ffb3cc' }}>
                {/* <Card.Title>{props.tag ? props.tag : 'No Tag Mentioned'}</Card.Title>
                <Card.Text>
                    Contact No : XXXXXXXXXX
    </Card.Text> */}
                <Card.Text>
                    {props.district ? props.district : 'District not provided !'}
                </Card.Text>
                <a target='_blank' href={`coaching-details/${props.id}`} className="btn btn-primary">Show More</a>

            </Card.Body>

        </Card>
    )

}

export default MyCard;