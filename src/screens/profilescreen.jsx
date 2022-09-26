import React from 'react'
import Editprofile from '../components/editprofile'
import Navbar from '../components/navbar'
import Notificationsbox from '../components/notificationcomponent'
import Sidebar from '../components/sidebar'

export default function Profile() {
  return (
    <div>
        <Navbar/>
        <div className='grid grid-rows grid-flow-col gap-4 w-3/4 mx-auto justify-center'>
          
          <div className='w-96 h-96 row-span-2'><Sidebar title="Edit Your Profile"/></div>

  
          <div className="shrink-0 w-full"><Editprofile/></div>

        </div>
        
    </div>
  )
}
