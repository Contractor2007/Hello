import React from 'react'
import { Home, PlusCircle, User } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-sky-500 text-white'>
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href={'/posts'} className="flex flex-col items-center gap-1 text-sm">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <Link href={'/posts/createpost'} className="flex flex-col items-center gap-1 text-sm">
          <PlusCircle className="h-5 w-5" />
          <span>Create</span>
        </Link>
        
        <Link href={'/users'} className="flex flex-col items-center gap-1 text-sm">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  )
}

export default Footer