import React from 'react'
import Friendslist from '../components/friendslist'

import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Friendscreen() {
  return (
    <div>
        <Navbar/>
        <div className='grid grid-rows-2 grid-flow-col gap-4 w-3/4 mx-auto justify-center'>
          
          <div className='w-96 h-96 row-span-2'><Sidebar title="Friends"/></div>

  
          <div className="shrink-0 w-full justify-self-end mt-3"><Friendslist/></div>

        </div>
        
    </div>
  )
}
