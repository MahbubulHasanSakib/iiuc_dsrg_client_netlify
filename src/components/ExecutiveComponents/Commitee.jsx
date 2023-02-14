import React from 'react';
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import ProfileImg from '../assets/profileImg.jpg';
import { Link } from 'react-router-dom';
import Separator from '../CommonComponents/Separator';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import Loader from '../CommonComponents/Loader';
const Commitee = () => {
   const [committee, setCommittee] = useState([])
   const [data,setData]=useState([])
   const [members, setMembers] = useState([])
   const [selectedSession, setSelectedSession] = useState("")
   const [sortedSessions,setSortedSessions]=useState([])
   let sessions=[]
   useEffect(() => {
      try {
         const getCommitteeMembers = async () => {
            const response = await axios.get('https://gray-awful-newt.cyclic.app/api/committee');
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
            //const data = response.data.filter((d) => d.session === sortedDates[0])
            //setCommittee(data)
            
         }
         getCommitteeMembers()
      } catch (error) {
         console.log(error)
      }
   }, [])
   

  

   useEffect(() => {
      try {
         const getMembers = async () => {
            const response = await axios.get('https://gray-awful-newt.cyclic.app/api/members');
            setMembers(response.data)
         }
         getMembers()

      } catch (error) {
         console.log(error)
      }
    }, [committee])



    useEffect(()=>{
      const getCommittee = data.filter((d) => d.session === selectedSession)
      setCommittee(getCommittee) 
    },[selectedSession])

   const chief=committee && committee.length>0 &&
   committee.find((m)=>m.designation.toLowerCase()==='chief' && m.section==='chief_and_vice-chief')
  
   const Vice_chiefs=committee && committee.length>0 &&
   committee.filter((m)=>m.designation.toLowerCase()!=='chief' && m.section==='chief_and_vice-chief')
   
   const Coordinators_and_leads=committee && committee.length>0 && committee.filter((m)=>m.section==='coordinator_and_team-leader')
   
   const Executives=committee && committee.length>0 && committee.filter((m)=>m.section==='executive_member')
   


   const image_of_chief=members && members.length>0 && chief &&
   members.find(m=>m.username===chief?.username)?.profileImg
   const vice_chief_img=Vice_chiefs && Vice_chiefs.length>0 && 
   Vice_chiefs.map((d)=>{
      return members.find(m=>m.username===d.username)?.profileImg
   })
   const coord_leads_img=Coordinators_and_leads && Coordinators_and_leads.length>0 &&  Coordinators_and_leads.map((d)=>{
      return members.find(m=>m.username===d.username)?.profileImg
   })

   const executives_img=Executives && Executives.length>0 && Executives.map((d)=>{
      return members.find(m=>m.username===d.username)?.profileImg
   })
   

   const handleClick=(ses)=>{
      setSelectedSession(ses)
   }

   
   return (

      committee && committee.length > 0 && members && members.length > 0 ?
         <>
            <h3 className='text-center' style={{padding:"20px 0px",backgroundColor:"#f6f6f6"}}>Executive Committee</h3>
            <Container>

               {/* chief and vice chief */}

               <>
                  <div className='border-2 border-bottom border-dark-subtle'>
                     <div className='row justify-content-center'>
                        <div className='commitee-member' style={{marginBottom:20}}>
                           <img src={image_of_chief || ProfileImg} alt="" />
                           <Link to={`/me/${chief.username}`}><h3>{chief.name}</h3></Link>
                           <p>{chief.designation}</p>
                        </div>
                     </div>
                     <div className='media-chief-vicechief'>
                        {Vice_chiefs.map((vc, idx) => (
                           <div>
                              <div className='commitee-member'>
                                 <img src={vice_chief_img[idx] || ProfileImg} alt="" />
                                 <Link to={`/me/${vc.username}`}><h3>{vc.name}</h3></Link>
                                 <p>{vc.designation}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </>

               {/* Coordinator and Team Leaders  */}

               <>
                  <div className='title-div partners my-5'>
                     <Separator />
                     <div> <h3 className='text-center'>Coordinator & Team Leaders</h3></div>
                     <Separator />
                  </div>
                  {/*Row xs={1} sm={3} md={4}  */}
                  <div className='media-cordinator-lead border-2 border-bottom'>
                     {Coordinators_and_leads.map((d, idx) => (
                        <>
                           <div className='commitee-member'>
                              <img src={coord_leads_img[idx] || ProfileImg} alt="" />
                              <Link to={`/me/${d.username}`}><h3>{d.name}</h3></Link>
                              <p>{d.designation}</p>
                           </div>
                        </>
                     ))}
                  </div>
               </>

               {/* Executive Members */}
               <>
                  <div className='title-div partners my-5'>
                     <Separator />
                     <div> <h3 className='text-center'>Executive Members</h3></div>
                     <Separator />
                  </div>
                  <div className='media-executive-member border-2 border-bottom'>
                     {Executives.map((d, idx) => (
                        <>
                           <div className='commitee-member'>
                              <img src={executives_img[idx] || ProfileImg} alt="" />
                              <Link to={`/me/${d.username}`}><h3>{d.name}</h3></Link>
                              <p>{d.designation}</p>
                           </div>
                        </>
                     ))}
                  </div>
               </>
            {/*   <div className='d-flex justify-content-center my-5'>
                  <Pagination className='p-2'>
                     <Pagination.First>{"First"}</Pagination.First >
                     <Pagination.Prev />
                     <Pagination.Item active>{`2022-2023`}</Pagination.Item>
                     <Pagination.Item>{`2022-2023`}</Pagination.Item>
                     <Pagination.Item>{`2022-2023`}</Pagination.Item>
                     <Pagination.Ellipsis />
                     <Pagination.Item disabled>{`2022-2023`}</Pagination.Item>
                     <Pagination.Next />
                     <Pagination.Last>{"Last"}</Pagination.Last >
                  </Pagination>
               </div>
                     */}
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
         </> : <Loader />


   )

}

export default Commitee