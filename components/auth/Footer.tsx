import React from 'react'
import { Home, PlusCircle, User } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-sky-500 dark:bg-blue-700 text-white transition-colors duration-3000'>
      <div className="flex justify-between items-center max-w-md mx-auto">
       <div className="">
       <Link href={'/posts'} className="flex flex-col items-center gap-1 text-sm">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
       </div>
        
        <div className="">
        <Link href={'/posts/createpost'} className="flex flex-col items-center gap-1 text-sm">
          <PlusCircle className="h-5 w-5" />
          <span>Create</span>
        </Link>
        </div>
        
        <div className="">
        <Link href={'/users'} className="flex flex-col items-center gap-1 text-sm">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer