import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProfileImg from '../components/assets/profileImg.jpg'
import Header from '../components/AdminComponents/Header'
import { checkJWT } from '../checkJWT'
const EditMemberScreen = () => {
    const navigate=useNavigate()
    const params=useParams();
    const [memberInfo, setMemberInfo] = useState({
        name:"",
        email: "",
        phone: "",
        image:"",
        field_of_interest: "",
        description: "",
        membershipId:""
    })


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

    useEffect(()=>{
    
        const getMemberById=async()=>{
            const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

          try {
              const response=await axios.get(`https://gray-awful-newt.cyclic.app/api/editMember/${params.id}`,config);
              const memberDetails=response.data.member;
              setMemberInfo({
                name:memberDetails.name,
                email: memberDetails.email,
                phone: memberDetails.phone,
                image:memberDetails.profileImg,
                field_of_interest: memberDetails.field_of_interest,
                description: memberDetails.description,
                membershipId:memberDetails.membershipId
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
     formData.append("name",memberInfo.name)
     formData.append("email",memberInfo.email)
     formData.append("phone",memberInfo.phone)
     formData.append("image",memberInfo.image)
     formData.append("field_of_interest",memberInfo.field_of_interest)
     formData.append("description",memberInfo.description)
     formData.append("membershipId",memberInfo.membershipId)
     
            const { data } = await axios.put(`https://gray-awful-newt.cyclic.app/api/editMember/${params.id}`, formData, config)
           
            if (data.success) {
                setErrorMessage('')
                setSuccessMessage('Member updated successfully')
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
                        <h3 class="register-heading">Edit member</h3>
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
                                        onChange={handleChange} name="name" class="form-control" placeholder="Full Name" value={memberInfo.name} />
                                </div>
                                <div class="form-group">
                                    <input type="email" onChange={handleChange} name="email" class="form-control" placeholder="Email *" value={memberInfo.email} />
                                </div>
                                <div class="form-group">
                                    <input type="text" onChange={handleChange} name="membershipId" class="form-control" placeholder="Membership ID *" value={memberInfo.membershipId} />
                                </div>
                                <div class="form-group">
                                    <input type="text" onChange={handleChange} name="phone" class="form-control" placeholder="Phone *" value={memberInfo.phone} />
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
                                <div class="form-group">
                                <label>Field of Interest</label><br/>
                                    <input type="text" name="field_of_interest" onChange={handleChange} class="form-control" placeholder="Field of interest" value={memberInfo.field_of_interest} />
                                </div>
                            </div>
                            <div class="col-md-6">

                                <div class="form-group">
                                    <textarea placeholder="Description" onChange={handleChange} name="description" value={memberInfo.description} rows={10} cols={40}></textarea>
                                </div>

                                <input type="submit" class="btnRegister" value="Update" />
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

export default EditMemberScreen