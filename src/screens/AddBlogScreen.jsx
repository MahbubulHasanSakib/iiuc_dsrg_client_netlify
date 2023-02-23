import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import WithLayout from '../Layout/WithLayout'
import { checkJWT } from '../checkJWT'

const AddBlogScreen = () => {
    const navigate=useNavigate()
    const params=useParams();
    const [blogInfo, setblogInfo] = useState({
        blog_image:"",
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
        else {
            checkJWT(navigate)
        }
    },[navigate,userInfo])



    

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [fullname,setFullname]=useState("")


    useEffect(()=>{
        if(userInfo){
        const getMemberById = async () => {
            try {
              const response = await axios.get(`https://gray-awful-newt.cyclic.app/api/members/${userInfo.username}`);
    
              setFullname(response.data.name)
            } catch (error) {
            
              setErrorMessage(error.response.data)
            }
          }
          getMemberById()
        }
    },[userInfo])
    //console.log(fullname)
    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
       
       if(blogInfo.title!=="" && blogInfo.blog_image!=="" && 
       blogInfo.description!=="")
       {
        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${user.token}`
                }
            }

            const formData=new FormData()
     formData.append("blog_image",blogInfo.blog_image)
     formData.append("title",blogInfo.title)
     formData.append("description",blogInfo.description)
     formData.append("name",fullname)
     formData.append("username",user.username)
     formData.append("date",blogInfo.date)
     
     
            const { data } = await axios.post(`https://gray-awful-newt.cyclic.app/api/blogs`, formData, config)
           
            if (data.success) {
                setErrorMessage('')
                setSuccessMessage('Blog added successfully')
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
        setblogInfo({ ...blogInfo, [key]: value })
    }

    const handleFileChange=(e)=>{
        const key = e.target.name;
        setblogInfo({ ...blogInfo, [key]: e.target.files[0] })
    }

  return (
   <>

   <div class="container register">
    <div class="row">
        <div class="col-md-3 register-left">
        </div>
        <div class="col-md-9 register-right">

            <div class="tab-content" id="myTabContent">
                <Form onSubmit={handleSubmit}>
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Add Blog</h3>
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
                                        onChange={handleChange} name="title" class="form-control" placeholder="Blog Title" value={blogInfo.title} />
                                </div>
                                
                            {/*    <div class="form-group">
                                    <input type="datetime-local" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}" onChange={handleChange} name="date" class="form-control" placeholder="Date" value={blogInfo.date} />
                        </div> */}
                                <div class="form-group">
                                    <label>Image</label><br/>
                                  {/*  <img src={memberInfo.image||ProfileImg} width="200px" height="200px" style={{borderRadius:'50%',marginBottom:'20px'}} /><br/> */}
                                    <label for="files" style={{
                                            border:'2px solid black',
                                            backgroundColor:'#3e83ab',
                                            color:"#ffffff"
                                    }} class="btn">Add blog image</label>
                                    <input type="file" id="files" style={{visibility:'hidden'}} onChange={handleFileChange} name="blog_image" class="form-control"  />
                                </div>
                                
                            </div>
                            <div class="col-md-6">

                                <div class="form-group">
                                    <textarea placeholder="Description" onChange={handleChange} name="description" value={blogInfo.description} rows={10} cols={40}></textarea>
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

export default WithLayout(AddBlogScreen)