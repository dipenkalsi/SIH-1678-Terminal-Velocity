'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, FileText, Copy, Check, Search } from 'lucide-react'
import Link from "next/link";
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
      <nav className="bg-black bg-opacity-90 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                {/* <FileText className="h-8 w-8 text-white" /> */}
                <span className="ml-2 text-xl font-bold text-white">PIReT</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="text-white inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Features
              </a>
              <a href="#" className="text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Contact
              </a>
              <UserButton/>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6 text-white" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6 text-white" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;