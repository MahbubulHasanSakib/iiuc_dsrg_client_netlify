import React, { useEffect, useState } from 'react'
import ProfileImg from '../components/assets/profileImg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../components/Context/userContext'
import '../components/css/styles.css'
import WithLayout from '../Layout/WithLayout'
import Loader from '../components/CommonComponents/Loader'
import { checkJWT } from '../checkJWT'
const EditUserProfileScreen = () => {
  const userData = useAppContext()
  const member = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
  const [memberDetails, setMemberDetails] = useState({})
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  const [showPublicationModel, setShowPublicationModel] = useState(false)
  const handlePublicationModelClose = () => setShowPublicationModel(false)
  const handlePublicationModelShow = () => setShowPublicationModel(true)

  const [showSkillModel, setShowSkillModel] = useState(false)
  const handleSkillModelClose = () => setShowSkillModel(false)
  const handleSkillModelShow = () => setShowSkillModel(true)

  const [memberInfo, setMemberInfo] = useState({
    company: '',
    startDate: '',
    endDate: '',
    designation: '',
    jobDescription: '',
  })
  const [publication, setPublication] = useState({
   pname:"",
   authors:""
  })
 const [skills,setSkills]=useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [designation, setDesignation] = useState('')

  useEffect(() => {
    try {
      const getMemberById = async () => {
        try {
          setLoading(true)
          const response = await axios.get(
            `https://gray-awful-newt.cyclic.app/api/members/${member.username}`,
          )

          setMemberDetails(response.data)
          setLoading(false)
        } catch (error) {
          setErrorMessage(error.response.data)
          setLoading(true)
        }
      }
      getMemberById()
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data)
      setLoading(true)
    }
  }, [])

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

  useEffect(() => {
   
    try {
      const getCommitteeMembers = async () => {
        const response = await axios.get(
          'https://gray-awful-newt.cyclic.app/api/committee',
        )
        
        const isExecutive = response.data.find(
          (d) => d.username === member.username,
        )
        if (isExecutive) setDesignation(isExecutive.designation)
        else setDesignation('Member')
      }
      getCommitteeMembers()
    } catch (error) {
      console.log(error)
    }
  }, [memberDetails])

 

  const handlePublicationSubmit=async (e)=>{
    e.preventDefault();
    
    if(publication.pname!=="" && publication.authors!=="")
    {
      try{
        const user = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
        const {data} = await axios.post(
          `https://gray-awful-newt.cyclic.app/api/publications/${member.username}`,
          publication,
          config,
        )
  
        setMemberDetails(data.member)
        if (data.success) {
          setErrorMessage('')
          setSuccessMessage('Publication added successfully')
          setShowPublicationModel(false)
          setPublication({
            pname: "",
            authors:""
          })
        }
      }catch(error)
      {
        console.log(error)
      }
    }
    else setErrorMessage("All fileds are required")
  }

  const handleSkillsSubmit=async (e)=>{
    e.preventDefault();
  
    
   if(skills!=="")
    {
      try{
        const user = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
        const {data} = await axios.post(
          `https://gray-awful-newt.cyclic.app/api/skills/${member.username}`,
          {skills:skills},
          config,
        )
  
        setMemberDetails(data.member)
        if (data.success) {
          setErrorMessage('')
          setSuccessMessage('Skills added successfully')
          setShowSkillModel(false)
          setSkills("")
        }
      }catch(error)
      {
        console.log(error)
      }
    }
    else setErrorMessage("All fileds are required") 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (
      memberInfo.company !== '' &&
      memberInfo.startDate !== '' &&
      memberInfo.designation !== ''
    ) {
      const startDate = new Date(memberInfo.startDate).toLocaleDateString(
        'en-GB',
      )
      const endDate = new Date(memberInfo.endDate).toLocaleDateString('en-GB')

      memberInfo.startDate = startDate.replace(/\//g, '-')
      memberInfo.endDate = endDate.replace(/\//g, '-')
      setMemberInfo(memberInfo)
      
      const sdate = new Date(
        memberInfo.startDate.split('-').reverse().join('-'),
      )
      const edate = new Date(memberInfo.endDate.split('-').reverse().join('-'))

      const now = new Date()

      if (sdate > now || edate > now) {
        setErrorMessage('Future Date cannot be selected')
      } else {
        const user = localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null

        e.preventDefault()

        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
          const { data } = await axios.put(
            `https://gray-awful-newt.cyclic.app/api/jobs/${memberDetails._id}`,
            memberInfo,
            config,
          )

          setMemberDetails(data.member)
          if (data.success) {
            setErrorMessage('')
            setSuccessMessage('Job added successfully')
            setShow(false)
            setMemberInfo({
              company: '',
              startDate: '',
              endDate: '',
              designation: '',
              jobDescription: '',
            })
          }
        } catch (error) {
          console.log(error.response)
          setSuccessMessage('')
          setErrorMessage(error.response.data.message)
        }
      }
      /* const user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

    e.preventDefault()
  
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                 Authorization:`Bearer ${user.token}`
            }
        }
        const { data } = await axios.put(`https://gray-awful-newt.cyclic.app/api/jobs/${memberDetails._id}`, memberInfo, config)
       
        setMemberDetails(data.member)
        if (data.success) {
            setErrorMessage('')
            setSuccessMessage('Job added successfully')
            setShow(false)
           setMemberInfo({
            company:"",
            startDate:"",
            endDate:"",
            designation:"",
            jobDescription:"",
          })
        }
    }
    catch (error) {
        console.log(error.response);
        setSuccessMessage('')
        setErrorMessage(error.response.data.message);
    } */
    } else setErrorMessage('Please fill all required(*) fields')
  }
  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setMemberInfo({ ...memberInfo, [key]: value })
  }

  const handlePublicationChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setPublication({ ...publication, [key]: value })
  }

  memberDetails.jobs?.sort(function (a, b) {
    /* var dateA = new Date(a.startDate.split("-").reverse().join("-"));
  var dateB = new Date(b.startDate.split("-").reverse().join("-"));
  return dateB - dateA; */
    let dateA_start = new Date(a.startDate.split('-').reverse().join('-'))

    let year = dateA_start.getFullYear()
    let month = dateA_start.getMonth() + 1
    let day = dateA_start.getDate()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day

    dateA_start = year + '-' + month + '-' + day

    let dateA_end = ''
    if (a.endDate !== 'Invalid Date') {
      dateA_end = new Date(a.endDate.split('-').reverse().join('-'))

      let year = dateA_end.getFullYear()
      let month = dateA_end.getMonth() + 1
      let day = dateA_end.getDate()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day

      dateA_end = year + '-' + month + '-' + day
    }

    let dateB_start = new Date(b.startDate.split('-').reverse().join('-'))

    let year_b = dateB_start.getFullYear()
    let month_b = dateB_start.getMonth() + 1
    let day_b = dateB_start.getDate()

    month_b = month_b < 10 ? '0' + month_b : month_b
    day_b = day_b < 10 ? '0' + day_b : day_b

    dateB_start = year_b + '-' + month_b + '-' + day_b
    let dateB_end = ''
    if (b.endDate !== 'Invalid Date') {
      dateB_end = new Date(b.endDate.split('-').reverse().join('-'))

      let year = dateB_end.getFullYear()
      let month = dateB_end.getMonth() + 1
      let day = dateB_end.getDate()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day

      dateB_end = year + '-' + month + '-' + day
    }
    

    if (a.endDate === 'Invalid Date') {
      if (b.endDate === 'Invalid Date') {
        return new Date(dateB_start) - new Date(dateA_start)
      } else {
        return -1
      }
    } else {
      if (b.endDate === 'Invalid Date') {
        return 1
      } else {
        return new Date(dateB_end) - new Date(dateA_end)
      }
    }
  })

  const handleDateChange = (event) => {
    
    const key = event.target.name
    const newDate = event.target.value
    
    // const formattedDate = new Date(newDate).toLocaleDateString('en-GB');
    setMemberInfo({ ...memberInfo, [key]: newDate })
  }

  return (
    <>
      {!loading ? (
        <>
          <Modal className="modal-class" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new job experiance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMessage !== '' ? (
                <p style={{ color: 'red', padding: '5px' }}>{errorMessage}</p>
              ) : (
                ''
              )}
              <Form onSubmit={handleSubmit}>
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row job-form">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          type="text"
                          onChange={handleChange}
                          name="company"
                          class="form-control"
                          placeholder="Company"
                          value={memberInfo.company}
                        />
                      </div>
                      {/*   <div class="form-group">
                                            <input type="text" onChange={handleChange} name="startDate" class="form-control" placeholder="Start date" value={memberInfo.startDate} />
                                     </div> */}
                      <div class="form-group">
                        <input
                          type="date"
                          onChange={handleDateChange}
                          name="startDate"
                          class="form-control"
                          placeholder="Start date"
                          value={memberInfo.startDate}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="date"
                          onChange={handleDateChange}
                          name="endDate"
                          class="form-control"
                          placeholder="End date"
                          value={memberInfo.endDate}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          name="designation"
                          onChange={handleChange}
                          class="form-control"
                          placeholder="Designation"
                          value={memberInfo.designation}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <textarea
                          placeholder="Job Description"
                          onChange={handleChange}
                          name="jobDescription"
                          value={memberInfo.jobDescription}
                          rows={10}
                          cols={40}
                        ></textarea>
                      </div>

                      <input
                        type="submit"
                        class="btnRegister"
                        value="Register"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          

          
          <Modal className="modal-class" show={showPublicationModel} onHide={handlePublicationModelClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new publication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMessage !== '' ? (
                <p style={{ color: 'red', padding: '5px' }}>{errorMessage}</p>
              ) : (
                ''
              )}
              <Form onSubmit={handlePublicationSubmit}>
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row job-form">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          type="text"
                          onChange={handlePublicationChange}
                          name="pname"
                          class="form-control"
                          placeholder="Paper Name"
                          value={publication.pname}
                        />
                      </div>
                    
                      <div class="form-group">
                        <input
                          type="text"
                          name="authors"
                          onChange={handlePublicationChange}
                          class="form-control"
                          placeholder="Authors(Ex:A. nick,David M.)"
                          value={publication.authors}
                        />
                      </div>
                      <input
                        type="submit"
                        class="btnRegister"
                        value="Submit"
                      />
                    </div>
                  
                  </div>
                </div>
              </Form>
            </Modal.Body>
          </Modal>



          <Modal className="modal-class" show={showSkillModel} onHide={handleSkillModelClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMessage !== '' ? (
                <p style={{ color: 'red', padding: '5px' }}>{errorMessage}</p>
              ) : (
                ''
              )}
              <Form onSubmit={handleSkillsSubmit}>
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row job-form">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          type="text"
                          onChange={(e)=>setSkills(e.target.value)}
                          name="skills"
                          class="form-control"
                          placeholder="Skills(Ex:html,css,js)"
                          value={skills}
                        />
                      </div>
                    
                      <input
                        type="submit"
                        class="btnRegister"
                        value="Submit"
                      />
                    </div>
                  
                  </div>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          <main className="profil_page">
            <section className="left_box">
              <div className="profil_info" id="pro_info">
                <div className="backgound_and_profil">
                  <img
                    className="background_img"
                    src="https://res.cloudinary.com/dpdq2a9fu/image/upload/v1675235929/dsrgcv_gtmmoc.jpg"
                    alt="#"
                  />
                  <img
                    className="profil_pic"
                    src={memberDetails.profileImg || ProfileImg}
                    alt="#"
                  />
                </div>
                <div className="personnal_info_profil">
                  <i className="fa-solid fa-pencil" />
                  <div className="name_and_school">
                    <h2>{memberDetails.name}</h2>
                    {memberDetails.jobs?.length > 0 &&
                      memberDetails.jobs[0].endDate === 'Invalid Date' && (
                        <p>
                          {memberDetails.jobs[0].designation} at{' '}
                          {memberDetails.jobs[0].company}
                        </p>
                      )}
                    <p>
                      {/*  <img src={BrandImg} alt="#" /> */}
                      {designation !== '' && (
                        <span>
                          {designation},IIUC Data Science Research Group
                        </span>
                      )}
                    </p>
                  </div>
                  <p
                    style={{ marginLeft: '75%', marginBottom: '10px' }}
                    className="mail_to"
                  >
                    <a href={`mailto:${memberDetails.email}`}>
                      Contact
                      <i
                        style={{ paddingLeft: '2px', marginTop: '3px' }}
                        class="bi bi-envelope"
                      ></i>
                    </a>
                  </p>
                </div>
              </div>

              <div className="infos" style={{ paddingBottom: '10px' }}>
                <div className="title">
                  <h4>About</h4>
                  <i className="fa-solid fa-pen" />
                </div>
                <p>{memberDetails.description}</p>
              </div>
              <div className="infos" style={{ paddingBottom: '10px' }}>
                <div className="title">
                  {userData.userInfo.user && (
                    <div className="add-experiance">
                      <p>Add experience</p>
                      <p>
                        <FontAwesomeIcon onClick={handleShow} icon={faPlus} />
                      </p>
                    </div>
                  )}
                </div>
                {memberDetails.jobs && memberDetails.jobs.length > 0 ? (
                  <h4 style={{ padding: '10px' }}>Experiences</h4>
                ) : null}
                {memberDetails.jobs &&
                  memberDetails.jobs.length > 0 &&
                  memberDetails.jobs.map((job) => {
                    return (
                      <>
                        <p style={{ marginBottom: '20px' }}>
                          <img src="#" alt="" /> &nbsp;{' '}
                          <span>{job.designation}</span> <br /> &nbsp; &nbsp;
                          &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                          {job.company}
                          <br /> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                          &nbsp; &nbsp;[{job.startDate}] - [
                          {job.endDate === 'Invalid Date'
                            ? 'Present'
                            : job.endDate}
                          ]<br />
                        </p>
                      </>
                    )
                  })}
              </div>
              <div className="infos" style={{ paddingBottom: '10px' }}>
                <div className="title">
                  <h4>Education</h4>
                  <span className="icons">
                    <i className="fa-solid fa-plus" />
                    <i className="fa-solid fa-pen" />
                  </span>
                </div>
                <p>
                  <img
                    src="./css/images/Jiangsu_Normal_University_logo.png"
                    alt=""
                  />
                  <span> International Islamic University Chittagong </span>
                  <br />
                  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                  &nbsp;Bachelor of Engineering, Computer Science and
                  Engineering <br />
                  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  <br />
                  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                  &nbsp;Activities at institution :
                  {designation !== '' &&
                    `Worked as ${designation} at IIUC Data Science Research Group`}
                </p>
              </div>
              <div className="infos" >
                <div className="title" style={{ display: 'block' }}>
                  <div>
                    <div className="title">
                      {userData.userInfo.user && (
                        <div className="add-experiance">
                          <p>Add Research and publication</p>
                          <p>
                            <FontAwesomeIcon
                              onClick={handlePublicationModelShow}
                              icon={faPlus}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {memberDetails.reseachers_and_publications &&
                  memberDetails.reseachers_and_publications.length > 0 ? (
                    <h4>Publications</h4>
                  ) : null}
                  {memberDetails.reseachers_and_publications &&
                    memberDetails.reseachers_and_publications.length > 0 &&
                    memberDetails.reseachers_and_publications.map((pub) => {
                      return (
                        <>
                          <h5>{pub.paper_name}</h5>
                          <p style={{ marginBottom: '20px' }}>{pub.authors}</p>
                        </>
                      )
                    })}
                </div>
                {/* <p><span style={{fontWeight:'bold'}}>Interpretable Machine Learning for COVID-19: An Empirical Study on Severity Prediction Task</span><br />&nbsp;&nbsp; &nbsp; &nbsp;Authors:Han Wu, College of Engineering, Mathematics & Physical Sciences, University of Exeter, 3286 Exeter, United Kingdom of Great Britain and Northern Ireland, EX4 4QJ (e-mail: hw630@exeter.ac.uk)  
Wenjie Ruan, College of Engineering, Mathematics & Physical Sciences, University of Exeter, 3286 Exeter, United Kingdom of Great Britain and Northern Ireland, (e-mail: W.Ruan@exeter.ac.uk)  
Jiangtao Wang, Faculty Research Centre for Intelligent Healthcare, Coventry University, 2706 Coventry, West Midlands, United Kingdom of Great Britain and Northern Ireland, (e-mail: jiangtao.wang@coventry.ac.uk)  
Dingchang Zheng, Faculty Research Centre for Intelligent Healthcare, Coventry University, 2706 Coventry, West Midlands, United Kingdom of Great Britain and Northern Ireland, (e-mail: ad4291@coventry.ac.uk)  
  Bei Liu, Department of Gastroenterology, The 910 Hospital of PLA, Quanzhou, China, (e-mail: liubei0927@outlook.com)</p> */}
              </div>
              <div className="skills">
                <div className="title" style={{display:"block"}}>
                <div >
                    <div className="title">
                      {userData.userInfo.user && (
                        <div className="add-experiance">
                          <p>Add skills</p>
                          <p>
                            <FontAwesomeIcon
                              onClick={handleSkillModelShow}
                              icon={faPlus}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                {memberDetails.skills &&
                  memberDetails.skills.length > 0 ? (
                    <h4>Skills</h4>
                  ) : null}
                  {memberDetails.skills &&
                    memberDetails.skills.length > 0 &&
                    memberDetails.skills.map((skill,index) => {
                      return (
                        <>
                          <span style={{ marginBottom: '10px',color:"#000000" }}>{skill}
                          {index<memberDetails.skills.length-1?",":null}</span>
                           </>
                      )
                    })}
                </div>
              </div>

              <div className="languages">
                <div className="title">
                  <h4>Languages</h4>
                  <span>
                    {' '}
                    <i className="fa-solid fa-plus" />
                    <i className="fa-solid fa-pen" />
                  </span>
                </div>
                <div className="language">
                  <h5>Bangla</h5>
                  <p>Native</p>
                </div>
              </div>
              <div className="infos" style={{ paddingBottom: '10px' }}>
                <div className="card-body">
                  <div className="h4 mt-0 title">Basic Information</div>

                  <div className="row mt-3">
                    <div className="col-sm-4">
                      <strong className="text-uppercase">
                        Field of Interest:
                      </strong>
                    </div>
                    <div className="col-sm-8">
                      {memberDetails.field_of_interest}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default WithLayout(EditUserProfileScreen)
