import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProfileImg from '../components/assets/profileImg.jpg'
import Header from '../components/AdminComponents/Header'
const EditFacultyScreen = () => {
    const navigate=useNavigate()
    const params=useParams();
    const [memberInfo, setMemberInfo] = useState({
     username:"",
     name:"",
     image:"",
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

    useEffect(()=>{
    
        const getMemberById=async()=>{
            const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

          try {
              const response=await axios.get(`https://gray-awful-newt.cyclic.app/api/editFaculty/${params.fid}`,config);
              const memberDetails=response.data.member;
              setMemberInfo({
                username:memberDetails.username,
                name: memberDetails.name,
                image: memberDetails.image,
                teaching_designation:memberDetails.teaching_designation,
                dept: memberDetails.dept,
                session: memberDetails.session
              })
          } catch (error) {
              console.log(error)
          }
        }
         getMemberById()
       
    },[params.id])


    

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${user.token}`
                }
            }

            const formData=new FormData()
     formData.append("username",memberInfo.username)
     formData.append("name",memberInfo.name)
     formData.append("image",memberInfo.image)
     formData.append("teaching_designation",memberInfo.teaching_designation)
     formData.append("dept",memberInfo.dept)
     formData.append("session",memberInfo.session)
     
            const { data } = await axios.put(`https://gray-awful-newt.cyclic.app/api/editFaculty/${params.fid}`, formData, config)
           
            if (data.success) {
                setErrorMessage('')
                setSuccessMessage('Faculty updated successfully')
            }
        }
        catch (error) {
            console.log(error.response);
            setSuccessMessage('')
            setErrorMessage(error.response.data.message);
        }

    }
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setMemberInfo({ ...memberInfo, [key]: value })
    }

    const handleFileChange=(e)=>{
        const key = e.target.name;
        setMemberInfo({ ...memberInfo, [key]: e.target.files[0] })
    }

  return (
   <>
   <Header/>
   <div class="container register">
    <div class="row">
        <div class="col-md-3 register-left">
        </div>
        <div class="col-md-9 register-right">

            <div class="tab-content" id="myTabContent">
                <Form onSubmit={handleSubmit}>
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Edit Faculty</h3>
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
                                                onChange={handleChange} name="username" class="form-control" placeholder="Username" value={memberInfo.username} readOnly={true} disabled={true}/>
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
                                        <div class="form-group">
                                    <label>Image</label><br/>
                                  {/*  <img src={memberInfo.image||ProfileImg} width="200px" height="200px" style={{borderRadius:'50%',marginBottom:'20px'}} /><br/> */}
                                    <label for="files" style={{
                                            border:'2px solid black',
                                            backgroundColor:'#3e83ab',
                                            color:"#ffffff"
                                    }} class="btn">Update Image</label>
                                    <input type="file" id="files" style={{visibility:'hidden'}} onChange={handleFileChange} name="image" class="form-control"  />
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
   </>
  )
}

export default EditFacultyScreen