import React from 'react'
import stylesheet from '../components/css/styles.css'
import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../components/Context/userContext'
import loginUp from '../components/assets/LoginUpLogo.png'
import loginSide from '../components/assets/idsrg-admin-page-logo.png'
const LoginScreen = () => {

    const navigate = useNavigate()

    const userData = useAppContext()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post('https://gray-awful-newt.cyclic.app/login', { username, password }, config)
            localStorage.setItem('userInfo', JSON.stringify(data))
            userData.userInfo.setUser(data)
            navigate('/')
        }
        catch (error) {
            console.log(error.response.data)
            setErrorMessage(error.response.data);
        }
    }
    return (
        /*Admin Login Page 1 (Nayem)*/
        // <Container className="mt-4 gradient-form">
        //     <Row>
        //         <Col md={6} className="mb-sm-5 border border-2">

        //             <div className="d-flex flex-column p-5">
        //                 <div className="text-center">
        //                     <img src={loginUp}
        //                         style={{ width: '185px' }} alt="logo" />
        //                     <h4 className="mt-1 mb-5 pb-1">We are the IDSRG Team</h4>
        //                 </div>

        //                 <h5 className='text-center'>ADMIN LOGIN</h5>
        //                 {
        //                     errorMessage !== "" &&
        //                     <div class="alert alert-danger" role="alert">
        //                         <p>{errorMessage}</p>
        //                     </div>
        //                 }
        //                 <Form onSubmit={(e) => handleSubmit(e)} >
        //                     <Form.Group className="mb-4" controlId="adminEmail">
        //                         <Form.Label>Email</Form.Label>
        //                         <Form.Control className="p-2" type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
        //                     </Form.Group>

        //                     <Form.Group className="mb-4" controlId="adminPassword">
        //                         <Form.Label>Password</Form.Label>
        //                         <Form.Control className="p-2" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password" />
        //                     </Form.Group>

        //                     <div className="text-center pt-1 mb-5 pb-1">
        //                         <button type="submit" className="btn-login border-0 fw-bold mb-4 w-100">LOG IN</button>
        //                         <a className="text-muted" style={{fontSize: "1.2rem" }} href="#!">Forgot password?</a>
        //                     </div>

        //                     <div className="d-md-flex flex-row align-items-center justify-content-center pb-md-4 mb-4">
        //                         <h5 className="mb-0">Are't you an admin?</h5>
        //                         <button className='btn btn-dark text-white rounded-pill mx-md-2 px-md-4 py-md-1'>
        //                             <Link to='/' style={{textDecoration:"none", color:"white" }}><i class="bi bi-arrow-left-circle-fill">
        //                             </i>&nbsp;&nbsp;Go Back</Link>
        //                         </button>
        //                     </div>
        //                 </Form>
        //             </div>
        //         </Col>
        //         <Col md={6} className="mb-lg-5 p-0">
        //             <div className="d-flex flex-column gradient-custom-background justify-content-center h-100">
        //                 <div className="text-center">
        //                     <img src={loginSide} alt="logo" className='p-5' />
        //                 </div>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>


        /*Admin Login Page 2 (Nayem)*/
        <Container className="login-page2 mt-4 shadow-lg p-0">
            <div className="mb-sm-5 border border-2" >
                <div className="d-flex flex-column p-5">
                    <div className="text-center">
                        <img src={loginUp}
                            style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">IIUC Data Science Research Group</h4>
                    </div>

                    <h5 className='text-center'>Please Login Your Account</h5>
                    {
                        errorMessage !== "" &&
                        <div class="alert alert-danger" role="alert">
                            <p>{errorMessage}</p>
                        </div>
                    }
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Form.Group className="mb-4" controlId="adminEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control className="p-2" type='text' onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="adminPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="p-2" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password" />
                        </Form.Group>

                        <div className="text-center pt-1 mb-5 pb-1">
                            <button type="submit" className="btn-login border-0 fw-bold mb-4 w-100"> <i class="bi bi-person-fill-down"></i>&nbsp;LOG IN</button>
                            <a className="text-muted" style={{ fontSize: "1.2rem" }} href="#!">Forgot password?</a>
                        </div>

                        <div className="d-md-flex flex-row align-items-center justify-content-center pb-md-4 mb-4">
                            <h5 className="mb-0">Don't have an account?</h5>
                            <button className='btn btn-dark text-white rounded-pill mx-md-2 px-md-4 py-md-1'>
                                <Link to='/' style={{ textDecoration: "none", color: "white" }}><i class="bi bi-arrow-left-circle-fill">
                                </i>&nbsp;&nbsp;Go Back</Link>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>


        // <div>
        //     <Container>
        //         <h1 className='text-center'>Login Form</h1>
        //         {
        //             errorMessage !== "" &&
        //             <div class="alert alert-danger" role="alert">
        //                 <p>{errorMessage}</p>
        //             </div>
        //         }
        //         <Form onSubmit={(e) => handleSubmit(e)} >
        //             <Form.Group className="mb-3" controlId="formBasicEmail">
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control name="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
        //             </Form.Group>

        //             <Form.Group className="mb-3" controlId="formBasicPassword">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
        //             </Form.Group>
        //             <Button variant="primary" type="submit">
        //                 Submit
        //             </Button>
        //             <p>Don't have an account?<Link to='/register'><span>sign up</span></Link></p>
        //         </Form>
        //     </Container>
        // </div>
    )
}

export default LoginScreen