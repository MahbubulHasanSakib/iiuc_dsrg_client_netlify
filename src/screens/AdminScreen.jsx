import React,{useEffect} from 'react'
import { Container } from 'react-bootstrap'
import AddMember from '../components/AdminComponents/AddMember'
import Header from "../components/AdminComponents/Header"
import { useParams,useNavigate} from 'react-router-dom'
import { checkJWT } from '../checkJWT'
const AdminScreen = () => {
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
   <AddMember/>
   </>
  )
}

export default AdminScreen