import React from 'react'
import stylesheet from '../components/css/styles.css'
import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../components/Context/userContext'
import WithLayout from '../Layout/WithLayout'
import loginUp from '../components/assets/LoginUpLogo.png'
import { checkJWT } from '../checkJWT'
import Loader from '../components/CommonComponents/Loader'
const AdminPassChangeScreen = () => {

    const navigate = useNavigate()

    const userData = useAppContext()

    const [username, setUsername] = useState('')
    const [membershipId, setMembershipId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage]=useState('')
    const [loading,setLoading]=useState(false)
    const userInfo=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    
    useEffect(()=>
    {
        if(!userInfo)
    {
         navigate('/login')
    }
    else if(userInfo.isAdmin===false) {
        navigate('/')
    }
    else if(userInfo.isAdmin==true)
    {
      checkJWT(navigate);
    }
    },[navigate,userInfo])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        setSuccessMessage("")
        //console.log(username);
       // console.log(membershipId)
        if(username!="" && membershipId!=""){
        
        const user = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null
        try {

            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}`,
                },
              }
              setLoading(true)
            const { data } = await axios.post('https://gray-awful-newt.cyclic.app/api/changeForgetPassword', { username, membershipId }, config)
            setLoading(false)
           // console.log("success");
           // console.log(data)
            setSuccessMessage(data.message);
        }
        catch (error) {
            console.log(error.response.data)
            setLoading(false)
            setErrorMessage(error.response.data.message);
        }
    }
    else setErrorMessage("All fields are required");
    }
    return (
        
        <Container className="login-page2 mt-4 shadow-lg p-0">
            <div className="mb-sm-5 border border-2" >
                <div className="d-flex flex-column p-5">
                    <div className="text-center">
                        <img src={loginUp}
                            style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">IIUC Data Science Research Group</h4>
                    </div>

                    <h5 className='text-center'>Change Password as Admin</h5>
                    {errorMessage !== "" &&
               <div class="alert alert-danger" role="alert">
                   <p>{errorMessage}</p>
               </div>}
               {successMessage !== "" &&
               <div class="alert alert-success" role="alert">
                   <p>{successMessage}</p>
               </div>}
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        

                        <Form.Group className="mb-4" controlId="adminPassword">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" className="p-2" type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="adminPassword">
                            <Form.Label>Membership Id</Form.Label>
                            <Form.Control name="membershipId" className="p-2" type="text" onChange={(e) => setMembershipId(e.target.value)} value={membershipId} placeholder="Enter membership id" />
                        </Form.Group>
                        {
                            loading?<Loader/>:
                            <>
                            <div className="text-center pt-1 mb-5 pb-1">
                            <button type="submit" className="btn-login border-0 fw-bold mb-4 w-100"> <i class="bi bi-person-fill-down"></i>&nbsp;Change Password</button>
                          
                        </div>

                        <div className="d-md-flex flex-row align-items-center justify-content-center pb-md-4 mb-4">
           
                            <button className='btn btn-dark text-white rounded-pill mx-md-2 px-md-4 py-md-1'>
                                <Link to='/' style={{ textDecoration: "none", color: "white" }}><i class="bi bi-arrow-left-circle-fill">
                                </i>&nbsp;&nbsp;Go Back</Link>
                            </button>
                        </div>
                            </>
                        }
                    </Form>
                </div>
            </div>
        </Container>


    )
}

export default AdminPassChangeScreen