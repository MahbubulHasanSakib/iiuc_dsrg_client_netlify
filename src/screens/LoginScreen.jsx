import React from 'react'
import stylesheet from '../components/css/styles.css'
import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../components/Context/userContext'
import loginUp from '../components/assets/logo.png'
import loginSide from '../components/assets/idsrg-admin-page-logo.png'
const LoginScreen = () => {

    const navigate = useNavigate()

    const userData = useAppContext()

    const [membershipId, setMembershipId] = useState('')
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
            const { data } = await axios.post('https://gray-awful-newt.cyclic.app/login', { membershipId, password }, config)
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
        
        <Container className="login-page2 mt-4 shadow-lg p-0">
            <div className="mb-sm-5 border border-2" >
                <div className="d-flex flex-column p-5">
                    <div className="text-center">
                        <img src={loginUp}
                            style={{ width: '185px' }} alt="logo" />
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
                            <Form.Label>Membership Id</Form.Label>
                            <Form.Control className="p-2" type='text' onChange={(e) => setMembershipId(e.target.value)} value={membershipId} placeholder="Enter membership id" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="adminPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="p-2" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password" />
                        </Form.Group>

                        <div className="text-center pt-1 mb-5 pb-1">
                            <button type="submit" className="btn-login border-0 fw-bold mb-4 w-100"> <i class="bi bi-person-fill-down"></i>&nbsp;LOG IN</button>
                            <Link to="/forget-password" className="text-muted" style={{ fontSize: "1.2rem" }}>Forgot password?</Link>
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


    )
}

export default LoginScreen