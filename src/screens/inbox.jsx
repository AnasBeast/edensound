import React from 'react'
import Messagebox from '../components/messagebox'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Inboxscreen() {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-row mx-auto justify-center w-4/5'>
          
          <div className=''><Sidebar title="Inbox"/></div>

  
          <div className="shrink-0 w-full"><Messagebox/></div>

        </div>
        
    </div>
  )
}
