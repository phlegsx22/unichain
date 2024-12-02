'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileContent from './profileContent'
import IssuesContent from './issueContent'
import SupportContent from './supportContent'
import { LogOut, User, AlertCircle, HeadphonesIcon, Menu, X } from 'lucide-react'
import Link from 'next/link'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'issues', label: 'Issues', icon: AlertCircle },
  { id: 'support', label: 'Support', icon: HeadphonesIcon },
]

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logging out...')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      <aside
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-40 w-64 transform ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out`
            : 'w-64'
        } bg-gradient-to-b from-purple-600 to-indigo-600 text-white p-6 flex flex-col`}
      >
        <Link href="/" className="mb-10">
          <h1 className="text-2xl font-bold">Unichain</h1>
        </Link>
        <Tabs orientation="vertical" value={activeTab} onValueChange={handleTabChange} className="space-y-2 flex-grow mt-24">
          <TabsList className="flex flex-col items-stretch space-y-2 bg-transparent flex-grow">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="justify-start font-bold px-4 py-2 text-left hover:bg-white/10 data-[state=active]:bg-white/20"
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-left hover:bg-white/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </TabsList>
        </Tabs>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'profile' && <ProfileContent />}
          {activeTab === 'issues' && <IssuesContent />}
          {activeTab === 'support' && <SupportContent />}
        </div>
      </main>
    </div>
  )
}