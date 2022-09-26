import React from 'react'
import Eventsbox from '../components/eventscomponent'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Events() {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-row mx-auto justify-center w-4/5'>
          
          <div className=''><Sidebar title="Events"/></div>

  
          <div className="shrink-0 w-full"><Eventsbox/></div>

        </div>
        
    </div>
  )
}
