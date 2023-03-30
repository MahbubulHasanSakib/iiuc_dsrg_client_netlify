import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProfileImg from '../components/assets/profileImg.jpg'
import Header from '../components/AdminComponents/Header'
import { checkJWT } from '../checkJWT'
const AddEventScreen = () => {
    const navigate=useNavigate()
    const params=useParams();
    const [eventInfo, setEventInfo] = useState({
        event_image:[],
        title: "",
        description: ""
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



    

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
       //console.log(eventInfo)
        const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

       if(eventInfo.title!==""  && 
       eventInfo.description!=="")
       {
        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${user.token}`
                }
            }

            const formData=new FormData()
           // console.log(eventInfo.event_image.length)
            for (let i = 0; i < eventInfo.event_image.length; i++) {
               // console.log(eventInfo.event_image[i])
                formData.append("event_image", eventInfo.event_image[i]);
              }
     
     formData.append("title",eventInfo.title)
     formData.append("description",eventInfo.description)
     formData.append("date",eventInfo.date)
     
     
            const { data } = await axios.post("https://gray-awful-newt.cyclic.app/api/events", formData, config)
           
            if (data.success) {
                setErrorMessage('')
                setSuccessMessage('Event added successfully')
            }
        }
        catch (error) {
            console.log(error.response);
            setSuccessMessage('')
            setErrorMessage(error.response.data.message);
        }
       }
       else setErrorMessage("All Fields are required")

    }
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setEventInfo({ ...eventInfo, [key]: value })
    }

    const handleFileChange=(e)=>{
        const key = e.target.name;
       // console.log(e.target.files)
        setEventInfo({ ...eventInfo, [key]: e.target.files })
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
                        <h3 class="register-heading">Add Event</h3>
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
                                        onChange={handleChange} name="title" class="form-control" placeholder="Event Title" value={eventInfo.title} />
                                </div>
                                
                            {/*    <div class="form-group">
                                    <input type="datetime-local" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}" onChange={handleChange} name="date" class="form-control" placeholder="Date" value={eventInfo.date} />
                        </div> */}
                                <div class="form-group">
                                    <label>Image</label><br/>
                                  {/*  <img src={memberInfo.image||ProfileImg} width="200px" height="200px" style={{borderRadius:'50%',marginBottom:'20px'}} /><br/> */}
                                    <label for="files" style={{
                                            border:'2px solid black',
                                            backgroundColor:'#3e83ab',
                                            color:"#ffffff"
                                    }} class="btn">Add event image</label>
                                    <input type="file" id="files" style={{visibility:'hidden'}} onChange={handleFileChange} name="event_image" class="form-control"  multiple/>
                                </div>
                                
                            </div>
                            <div class="col-md-6">

                                <div class="form-group">
                                    <textarea placeholder="Description" onChange={handleChange} name="description" value={eventInfo.description} rows={10} cols={40}></textarea>
                                </div>

                                <input type="submit" class="btnRegister" value="Add" />
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

export default AddEventScreen