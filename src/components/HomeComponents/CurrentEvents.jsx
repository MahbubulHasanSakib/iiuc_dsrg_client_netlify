import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Separator from '../CommonComponents/Separator';
import EventsImg from '../assets/EsrdLab_Events.jpg';
import axios from 'axios';
import Loader from '../CommonComponents/Loader';
import { Link } from 'react-router-dom';
const CurrentEvents = () => {
    const [events,setEvents]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
       const getEvents=async()=>{
        setLoading(true)
        const response = await axios.get('https://gray-awful-newt.cyclic.app/api/events');
        setEvents(response.data)
        setLoading(false)
       }
       getEvents()
    },[])

    events.sort(function(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
        const postDates=[]
      events.map((evt)=>{   
        const date = new Date(evt.date);
        const formattedDate = date.toISOString().split(".")[0];  
          const postTime = new Date(formattedDate+"+00:00");
        const bangladeshTimeZone = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka"
        });
       // const bangladeshDateTime = bangladeshTimeZone.format(postTime);
       const bdPostTime=bangladeshTimeZone.format(postTime)
    const [month, day, year] = bdPostTime.split("/");
    const formatted = `${day}/${month}/${year}`;
        postDates.push(formatted)
    })
    return (
        <Container className="my-5">
            <div className='title-div partners mb-5'>
                <Separator />
                <div> <h3 className='text-center'>Our Current Events</h3></div>
                <Separator />
            </div>
            <Row xs={1} md={2} lg={2} xl={3} className="g-5">
                {
                    loading ?
                        <Loader /> :
                        events && events.length > 0 &&
                        events.slice(0, 3).map((ev, idx) => (
                            <Col>
                                <Card>
                                    <Card.Img variant="top"
                                        style={{ height: '200px' }} src={ev.image[0]} />
                                    <Card.Body style={{ height: "220px" }}>
                                        <Card.Title className='fw-bold text-justify'>{ev.title}</Card.Title>
                                        <Card.Text style={{ textAlign: "justify" }}>
                                            {ev.description.split(" ").splice(0, 20).join(" ") +
                                                `.......`}
                                            <Link to={`/events/${ev._id}`}>Read more</Link>
                                        </Card.Text>
                                        <small className="text-muted">{postDates[idx]}</small>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                }
            </Row>
            <div className='mt-5' style={{ textAlign: 'center', color: "white" }}>
                <Link to="/activities"><button className='btn btn-outline-dark px-5 py-2'>See More Events</button></Link>
            </div>
        </Container>
    );
};

export default CurrentEvents;