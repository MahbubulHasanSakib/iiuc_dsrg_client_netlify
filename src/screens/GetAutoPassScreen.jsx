import React,{useState,useEffect} from 'react'
import { Container,Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/AdminComponents/Header'
import axios from 'axios'
import ProfileImg from '../components/assets/profileImg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../components/CommonComponents/Loader'
import { faEdit,faDeleteLeft,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
import { checkJWT } from '../checkJWT'
const GetAutoPassScreen = () => {

 const [members,setMembers]=useState([])
  useEffect(()=>{
   try {
    const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    
    const config = {
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }
    const getMembers=async()=>{
      const response=await axios.get('https://gray-awful-newt.cyclic.app/getAutoPasswords',config);
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
    else if(userInfo.isAdmin===false) {
        navigate('/')
    }
    else if(userInfo.isAdmin==true)
    {
      checkJWT(navigate);
    }
  },[navigate,userInfo])
  

  return (
   <>
<Header/>
<Container className='memberListContainer'>
         <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>UserName</th>
      <th>Auto Password</th>
    </tr>
  </thead>
  <tbody>
  {members && members.length>0?
  (
    members.map((member,index)=>{
        return <tr key={index}>
        <td>{member.uname}</td>
        <td>{member.pass}</td>
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

export default GetAutoPassScreen