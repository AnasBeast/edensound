


export default function Notificationsection() {

  return (
    <div className="flex items-start space-x-4 p-5">
      
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
            
          <div className="flex flex-row items-center overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <div className="flex-shrink-0 p-4">
                <img
                className="inline-block h-14 w-14 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                />
            </div>
            
            

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9 flex flex-col items-start" >
                  <h2>Anas sent a message</h2>
                  <p>14 September, 2022 21:24</p>
                </div>
              </div>
            </div>
          </div>

        
        </form>
      </div>
    </div>
  )
}
