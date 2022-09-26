import React from 'react'
import Navbar from '../components/navbar'
import Notificationsbox from '../components/notificationcomponent'
import Sidebar from '../components/sidebar'

export default function Notifications() {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-row mx-auto justify-center w-4/5'>
          
          <div className=''><Sidebar title="All Notifications"/></div>

  
          <div className="shrink-0 w-full"><Notificationsbox/></div>

        </div>
        
    </div>
  )
}
