import React,{useState,useEffect} from 'react'
import { Container } from 'react-bootstrap'
import ProfileImg from '../assets/profileImg.jpg'
import axios from 'axios'
import Loader from '../CommonComponents/Loader'
const TeacherTrainer = () => {

  const [faculties, setFaculties] = useState()
   const [data,setData]=useState([])
   const [selectedSession, setSelectedSession] = useState("")
   const [sortedSessions,setSortedSessions]=useState([])
   let sessions=[]
  useEffect(() => {
    try {
      const getFaculties = async () => {
        const response = await axios.get('https://gray-awful-newt.cyclic.app/api/faculties');
        setData(response.data)
        response.data.forEach(m => {
           if (!sessions.includes(m.session)) {
              sessions.push(m.session);
           }
         });
         
         function sortDates(dates) {
           return dates.sort((a, b) => {
             const lastYearA = parseInt(a.split('-')[1]);
             const lastYearB = parseInt(b.split('-')[1]);
             return lastYearB - lastYearA;
           });
         }
          const sortedDates = sortDates(sessions);
        
         setSortedSessions(sortedDates)
         setSelectedSession(sortedDates[0])
      }
      getFaculties()
    } catch (error) {
      console.log(error)
    }
  }, [])
  


  useEffect(()=>{
    const getFaculty = data.filter((d) => d.session === selectedSession)
    setFaculties(getFaculty) 
  },[selectedSession])


  const handleClick=(ses)=>{
    setSelectedSession(ses)
 }

  return (
    faculties && faculties.length>0?
    <>
    <h3 className='text-center' style={{padding:"20px 0px",backgroundColor:"#f6f6f6"}}>Faculty Members</h3>
    <Container>
        <div className='teacher-trainers'>
          
       {
        
        faculties.map(mem=>{
          return (
        <div className="teacher-trainer">
          <img src={mem.image||ProfileImg} alt="" />
           <h3>{mem.name}</h3>
           <p>{mem.teaching_designation}</p>
           <p>{mem.dept}</p>
          </div>
          )
        })
       }
        </div>
        <div style={{display:'flex',
                    justifyContent:'center',
                    margin:'10px 0px'}}>
                    {
                        sortedSessions.map(ses=>{
                           return <p style={{backgroundColor:'#DC2516',
                           padding:'10px',
                           border:'1px solid #000000',
                        color:'#ffffff'}}
                           onClick={()=>handleClick(ses)}>{ses}</p>
                        })
                     }
                    </div>
</Container>
</>:<Loader/>
  )
}

export default TeacherTrainer