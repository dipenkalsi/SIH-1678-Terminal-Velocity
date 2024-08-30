'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { Menu, X, FileText, Copy, Check, Search } from 'lucide-react'
import RedactionComponent from '@/components/redact/redaction'

export default function RedactLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  // const { text, setText, redactedText, redact } = useRedact()
  const [isCopied, setIsCopied] = useState(false)
  const nameRef = useRef(null)
  const [nameHoverPosition, setNameHoverPosition] = useState({ x: 0, y: 0 })
  const [isNameHovered, setIsNameHovered] = useState(false)

  const blurProps = useSpring({
    opacity: 0.2,
    config: { mass: 1, tension: 280, friction: 60 },
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // const copyToClipboard = useCallback(() => {
  //   navigator.clipboard.writeText(redactedText).then(() => {
  //     setIsCopied(true)
  //     toast({
  //       title: "Copied!",
  //       description: "The redacted text has been copied to your clipboard.",
  //     })
  //     setTimeout(() => setIsCopied(false), 2000)
  //   })
  // }, [redactedText, toast])

  const handleNameMouseMove = useCallback((e) => {
    if (nameRef.current) {
      const rect = nameRef.current.getBoundingClientRect()
      setNameHoverPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      <animated.div
        style={{
          ...blurProps,
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
        className="absolute inset-0 bg-white rounded-full filter blur-md w-4 h-4"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-repeat opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:flex lg:justify-between lg:max-w-full lg:w-full lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 lg:w-1/2">
            {/* <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 lg:w-1/2"> */}
              <div className="sm:text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-bold text-white sm:text-4xl md:text-5xl">
                  <span className="block xl:inline">Secure your text with</span>{' '}
                  <span 
                    ref={nameRef}
                    className="block relative overflow-hidden cursor-none"
                    onMouseEnter={() => setIsNameHovered(true)}
                    onMouseLeave={() => setIsNameHovered(false)}
                    onMouseMove={handleNameMouseMove}
                    style={{
                      filter: isNameHovered ? 'blur(4px)' : 'none',
                    }}
                  >
                    <h1 className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl">
                    PIReT
                    {isNameHovered && (
                      <div 
                        className="absolute bg-white rounded-full pointer-events-none"
                        style={{
                          left: `${nameHoverPosition.x - 25}px`,
                          top: `${nameHoverPosition.y - 25}px`,
                          width: '50px',
                          height: '50px',
                          mixBlendMode: 'difference',
                        }}
                      />
                    )}
                    {isNameHovered && (
                      <Search 
                        className="absolute pointer-events-none"
                        style={{
                          left: `${nameHoverPosition.x - 12}px`,
                          top: `${nameHoverPosition.y - 12}px`,
                          width: '24px',
                          height: '24px',
                        }}
                      />
                    )}
                    </h1>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  PIReT: Personal Identity Redaction Tool
                </p>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Protect sensitive information with our advanced redaction tool. Easily obscure confidential data in your documents.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 md:py-4 md:text-lg md:px-10">
                      Get started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-900 md:py-4 md:text-lg md:px-10">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center"> */}
            {/* <div className="lg:w-1/2 flex items-center justify-end">
              <div className="flex items-center justify-center"> */}
            <div className="mt-10 lg:mt-0 lg:w-1/2 flex items-center justify-center lg:justify-end">
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-white opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white opacity-20 rounded-full animate-pulse animation-delay-200"></div>
                <div className="absolute inset-4 bg-white opacity-30 rounded-full animate-pulse animation-delay-400"></div>
                <div className="absolute inset-6 bg-white opacity-40 rounded-full animate-pulse animation-delay-600"></div>
                <div className="absolute inset-0 flex items-center justify-center text-black text-4xl font-bold">
                  REDACT
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        
        <RedactionComponent />
      </main>
    </div>
  )
}

