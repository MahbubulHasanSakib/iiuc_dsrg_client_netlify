import React, { useState,useEffect } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddFacultyScreen = () => {
    const navigate=useNavigate()
    const [memberInfo, setMemberInfo] = useState({
     username:"",
     name:"",
     teaching_designation:"",
     dept:"",
     session:""
    })
    const userInfo=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    
    useEffect(()=>
    {
        if(!userInfo)
        {
             navigate('/login')
        }
    },[navigate,userInfo])

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const handleSubmit = async (e) => {

        const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

        e.preventDefault()

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                     Authorization:`Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('https://gray-awful-newt.cyclic.app/api/faculties', memberInfo, config)

            if (data.success) {
                setErrorMessage('')
                setSuccessMessage('Faculty added successfully')
            }
        }
        catch (error) {
            
            setSuccessMessage('')
            setErrorMessage(error.response.data.message);
        }

    }
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setMemberInfo({ ...memberInfo, [key]: value })
    }

    return (
        <div class="container register">
            <div class="row">
                <div class="col-md-3 register-left">
                </div>
                <div class="col-md-9 register-right">

                    <div class="tab-content" id="myTabContent">
                        <Form onSubmit={handleSubmit}>
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Add a Faculty</h3>
                                <div class="row register-form">
                                    {
                                        errorMessage!=="" &&
                                        <div class="alert alert-danger" role="alert">
                                        <p>{errorMessage}</p>
                                    </div>
                                    }
                                  {
                                    successMessage!=="" &&
                                    <div class="alert alert-success" role="alert">
                                    <p>{successMessage}</p>
                                </div>
                                  }

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text"
                                                onChange={handleChange} name="username" class="form-control" placeholder="Username" value={memberInfo.username} />
                                        </div> 
                                        <div class="form-group">
                                            <input type="text"
                                                onChange={handleChange} name="name" class="form-control" placeholder="Full Name" value={memberInfo.name} />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" onChange={handleChange} name="teaching_designation" class="form-control" placeholder="Teaching Designation *" value={memberInfo.teaching_designation} />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" onChange={handleChange} name="dept" class="form-control" placeholder="Department *" value={memberInfo.dept} />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" name="session" onChange={handleChange} class="form-control" placeholder="Session" value={memberInfo.session} />
                                        </div>
                                    </div>
                                    <div class="col-md-6">

                                      

                                        <input type="submit" class="btnRegister" value="Register" />
                                    </div>
                                </div>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddFacultyScreen