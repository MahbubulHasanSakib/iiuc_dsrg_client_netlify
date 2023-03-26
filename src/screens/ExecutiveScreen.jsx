import React from 'react'
import { useLocation } from 'react-router-dom'
import Founder from '../components/ExecutiveComponents/Founder'
import Advisory from '../components/ExecutiveComponents/Advisory'
import TeacherTrainer from '../components/ExecutiveComponents/TeacherTrainer'
import Commitee from '../components/ExecutiveComponents/Commitee'
import WithLayout from '../Layout/WithLayout'
const ExecutiveScreen = () => {
  const path=useLocation().pathname
  return (
  <>

    {
      path==="/me/founder_head" &&
      <Founder/>
    }
    {
      path==="/advisory-panel" &&
      <Advisory/>
    }
    {
      path==="/faculty-members" &&
     <TeacherTrainer/>
    }
    {
      path==="/executive-committee" &&
      <Commitee/>
    }

  </>
  )
}

export default WithLayout(ExecutiveScreen)