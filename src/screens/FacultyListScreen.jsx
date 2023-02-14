import React,{useState,useEffect} from 'react'
import { Container,Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/AdminComponents/Header'
import axios from 'axios'
import ProfileImg from '../components/assets/profileImg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../components/CommonComponents/Loader'
import { faEdit,faDeleteLeft,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
const FacultyListScreen = () => {

 const [members,setMembers]=useState([])
  useEffect(()=>{
   try {
    const getMembers=async()=>{
      const response=await axios.get('https://gray-awful-newt.cyclic.app/api/faculties');
      setMembers(response.data)
     }
     getMembers()
   } catch (error) {
    console.log(error)
   }
  },[])
    const navigate=useNavigate()

    const userInfo=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    
  useEffect(()=>
  {
      if(!userInfo)
      {
           navigate('/login')
      }
  },[navigate,userInfo])
  
    const handleDelete=async(memberId)=>{

        const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
        try {
     
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data}=await axios.get(`https://gray-awful-newt.cyclic.app/api/deleteFaculty/${memberId}`,config)
           
            const remainingMembers=members.filter((m,index)=>m._id!==data._id)
            setMembers([...remainingMembers])
            
        } catch (error) {
           console.log(error.response.data)
        }
    }
    const handleEdit=(memberId)=>{
     navigate(`/editFaculty/${memberId}`)
    }

  return (
   <>
<Header/>
<Container className='memberListContainer'>
         <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Profile Image</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {members && members.length>0?
  (
    members.map((member,index)=>{
        return <tr key={index}>
        <td>{member._id}</td>
        <td>{member.name}</td>
        <td><img src={member.image||ProfileImg} width="100px" height="100px"/></td>
        
        <td className='action'><span style={{color:'green',marginRight:'10px'}}> <FontAwesomeIcon  onClick={(e)=>handleEdit(member._id)}  icon={faEdit}/></span><span style={{color:'red'}}><FontAwesomeIcon onClick={(e)=>handleDelete(member._id)} icon={faDeleteLeft}/></span></td>
         </tr>
      })
      
  ) :<Loader/>
}

  </tbody>
</Table>
    </Container>
    
   </>
  )
}

export default FacultyListScreen