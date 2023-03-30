import React from 'react'
import stylesheet from '../components/css/styles.css'
import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../components/Context/userContext'
import loginUp from '../components/assets/logo.png'
import Loader from '../components/CommonComponents/Loader'
const ChangeForgetPass = () => {
    const navigate = useNavigate()

    const userData = useAppContext()

   /* const [membershipId, setMembershipId] = useState('')
    const [password, setPassword] = useState('')*/
     const [info,setInfo]=useState({
        membershipId:"",
        username:"",
        userEmail:""
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage]=useState('')
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])
    
    const handleChange=(e)=>{
        const name=e.target.name;
        setInfo((pre)=>{
            return {...pre,[name]:e.target.value}
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("")
        if(info.membershipId!="" && info.username!="" && info.userEmail)
        {
            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                setLoading(true);
                const { data } = await axios.post('https://gray-awful-newt.cyclic.app/api/changeForgotPasswordRequest', 
                {membershipId:info.membershipId,
                username:info.username,
                userEmail:info.userEmail
                }, config)
                setLoading(false)
               // console.log("success")
               // console.log(data)
                setSuccessMessage(data.message);
                
            }
            catch (error) {
                console.log(error.response.data)
                setLoading(false)
                setErrorMessage(error.response.data.message);
                
            } 
        }
        else{
            setErrorMessage("All fileds are required")
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

            <h5 className='text-center'>Request Admin for new Password</h5>
            
               {errorMessage !== "" &&
               <div class="alert alert-danger" role="alert">
                   <p>{errorMessage}</p>
               </div>}
               {successMessage !== "" &&
               <div class="alert alert-success" role="alert">
                   <p>{successMessage}</p>
               </div>}
               
            
            <Form onSubmit={(e) => handleSubmit(e)} >
                <Form.Group className="mb-4" controlId="membershipId">
                    <Form.Label>Membership Id</Form.Label>
                    <Form.Control className="p-2" type='text'
                    name="membershipId"
                     onChange={handleChange} value={info.membershipId} placeholder="Enter your membership id" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="username">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control className="p-2" name="username" type="text" onChange={handleChange} value={info.username} placeholder="Enter your username" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="useremail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className="p-2" name="userEmail" type="email" onChange={handleChange} value={info.userEmail} placeholder="Enter your email" />
                </Form.Group>
                {
                    loading?<Loader/>:
                    <div className="text-center pt-1 mb-5 pb-1">
                    <button type="submit" className="btn-login border-0 fw-bold mb-4 w-100"> <i class="bi bi-person-fill-down"></i>&nbsp;Send</button>
             
                </div>
                }

                
            </Form>
        </div>
    </div>
</Container>
  )
}

export default ChangeForgetPass
