import React,{useState,useEffect} from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Separator from '../CommonComponents/Separator';
import EventsImg from '../assets/EsrdLab_Events.jpg';
import PaginationComponent from '../CommonComponents/PaginationComponent';
import axios from 'axios';
import Loader from '../CommonComponents/Loader';
import { Link } from 'react-router-dom';
const EventsAndNews = () => {
    const [events,setEvents]=useState([])
    const [loading,setLoading]=useState(false)

    
  const [currentPage,setCurrentPage]=useState(1)
  const [eventsPerPage]=useState(4)

    useEffect(()=>{
       const getEvents=async()=>{
        setLoading(true)
        const response = await axios.get('https://gray-awful-newt.cyclic.app/api/events');
        setEvents(response.data)
        setLoading(false)
       }
       getEvents()
    },[])



    const times=[];
 
     
      function getTimeAgo(givenDate) {
      
        const currentDate = new Date();
const diffInTime = currentDate - givenDate;
const diffInMinutes = diffInTime / (1000 * 60);
const diffInHours = diffInMinutes / 60;
const diffInDays = diffInHours / 24;
const diffInMonths = diffInDays / 30.44;
const diffInYears = diffInMonths / 12;

const elapsedMinutes=Math.floor(diffInMinutes);
const elapsedHours=Math.floor(diffInHours)
const elapsedDays=Math.floor(diffInDays) 
const elapsedMonths=Math.floor(diffInMonths)
const elapsedYears=Math.floor(diffInYears) 

if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedDays < 30) {
    return `${elapsedDays} days ago`;
  } else if (elapsedMonths < 12) {
    return `${elapsedMonths} months ago`;
  } else {
    return `${elapsedYears} years ago`;
  }
      }
      events.slice(0).reverse().map((evt)=>{
        const date = new Date(evt.date);
        const formattedDate = date.toISOString().split(".")[0];  
          const postTime = new Date(formattedDate+"+00:00");
          const timeAgo = getTimeAgo(postTime);
          times.push(timeAgo)
      })
      const postDates=[]
      events.slice(0).reverse().map((evt)=>{   
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
        console.log("bdTime")
        console.log(formatted)
        postDates.push(formatted)
    })
      
      const reversed=events.slice(0).reverse().map(e=>e)

      const indexOfLastEvent=currentPage*eventsPerPage
      const indexOfFirstEvent=indexOfLastEvent-eventsPerPage
      const curEvents=reversed.slice(indexOfFirstEvent,indexOfLastEvent)
      const changePageNumber=(num)=>{
          setCurrentPage(num);
      }
  
    return (
        <>
            <Container className="d-flex justify-content-center">
                <div className="mt-5">
                    <div className='title-div partners mb-5'>
                        <Separator />
                        <div> <h3 className='text-center'>Activities</h3></div>
                        <Separator />
                    </div>
                    <div>
                        {
                            loading?<Loader/>:
                            events && events.length > 0 &&
                            curEvents.map((ev, idx) => (
                                <div data-aos="zoom-in-up" data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-once="true" className='mb-4 border-2 border-bottom border-dark-subtle'>
                                    <Row className="d-flex justify-content-between mb-4 single-event">
                                        <Col>
                                            <Card.Body>
                                                <Card.Title className='fw-bold text-justify'>{ev.title}</Card.Title>
                                                <Card.Text style={{ textAlign: "justify" }}>
                                                   {ev.description.split(" ").splice(0,50).join(" ")+
                                        `.....`}
                                        <Link to={`/events/${ev._id}`}>Read more</Link>
                                                </Card.Text>
                                                <small className="text-muted">{
                                                    postDates[idx]
                                                }<span 
                                                style={{marginLeft:"10px"}}>updated {times[idx]}</span></small>
                                            </Card.Body>
                                        </Col>
                                        <Col className="col-3 event-img">
                                            <Card.Img style={{ width: "250px", height: "140px", objectFit: "cover" }} src={ev.image[0]} />
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </Container>
            <Container className='d-flex justify-content-center mb-5'>
            <div className='d-flex justify-content-center my-5'>
             {/* <PaginationComponent></PaginationComponent> */}
             {(events.length>0) && <PaginationComponent membersPerPage={eventsPerPage} changePageNumber={changePageNumber}
              totalMembers={events.length} currentPage={currentPage}/>}
            </div>
            </Container>
        </>

    );
};

export default EventsAndNews;