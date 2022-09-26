import React from 'react'
import Dashboard from '../components/dashboard'

import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Dashboardscreen() {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-row mx-auto justify-center w-4/5'>
          
          <div className=''><Sidebar title="Dashboard"/></div>

  
          <div className="shrink-0 w-full"><Dashboard/></div>

        </div>
        
    </div>
  )
}
