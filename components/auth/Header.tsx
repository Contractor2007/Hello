'use client'

import React, { useState } from 'react';
import { Menu, AlertTriangle, Flag, MessageSquare, Shield, Settings, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const reportIssues = [
    { id: 1, name: "Harassment", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 2, name: "Hate Speech", icon: <Flag className="h-4 w-4" /> },
    { id: 3, name: "Bullying", icon: <MessageSquare className="h-4 w-4" /> },
    { id: 4, name: "Violence", icon: <Shield className="h-4 w-4" /> },
    { id: 5, name: "Other Issues", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className='fixed top-0 left-0 right-0 p-4 bg-sky-500 text-white z-50'>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h3 className='font-bold text-lg'>RedFlags</h3>
        
        <div className="relative">
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-1 focus:outline-none"
          >
            <span>Menu</span>
            {isMenuOpen ? (
              <X className="h-5 w-5 transition-transform" />
            ) : (
              <Menu className="h-5 w-5 transition-transform" />
            )}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <h4 className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                Report Issues
              </h4>
              {reportIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/report/${issue.name.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-2">{issue.icon}</span>
                  {issue.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;