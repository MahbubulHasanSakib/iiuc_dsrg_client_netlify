import React from 'react'
import axios from 'axios'

export const checkJWT = async (navigate) => {
   // const navigate=useNavigate()
    try {
      const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
     if(user)
     {
      
      const response=await axios.get('https://gray-awful-newt.cyclic.app/api/checkjwt', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if(!response.data.success)
      {
        localStorage.removeItem('userInfo')
        navigate('/login')
      }
     }
    } catch (error) {
      console.log("error")
      console.log(error);
      localStorage.removeItem('userInfo')
      navigate('/login')
      // Redirect to login page if JWT is not valid
      //window.location.href = '/login';
    }
  };