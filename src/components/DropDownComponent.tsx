'use client'
import React, { MouseEventHandler, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link' // Adjust the import based on your routing setup
import { sideBarNavTab } from '@/statics/assessmentSideBarNavList'

interface DropdownProps {
  children: React.ReactNode
  additionToHref?: string
  tab: sideBarNavTab
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  additionToHref,
  tab
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative select-none">
      <div
        onClick={toggleDropdown}
        className={`flex items-center text-[0.8rem] py-2 px-4 bg-teal-700 rounded cursor-pointer hover:bg-teal-600 duration-150  ${
          isOpen ? 'rounded-b-none' : ''
        }`}
      >
        {tab.icon && (
          <FontAwesomeIcon
            icon={tab.icon}
            className="mr-3 h-4 w-4"
          />
        )}
        {tab.label}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-auto w-[0.8rem] h-[0.8rem] transition-all ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </div>
      {isOpen && tab.tabChildren && (
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className="bg-teal-700  rounded-b">
            {tab.tabChildren.length > 0 &&
              tab.tabChildren.map((child, index) => {
                if (child.type === 'link' && child.href) {
                  return (
                    <Link
                      draggable={false}
                      key={child.label}
                      href={`${additionToHref}${child.href}`}
                      className={
                        tab.tabChildren && index === tab.tabChildren?.length - 1
                          ? 'flex text-[0.8rem] items-center py-2 px-4 hover:bg-teal-600 rounded-b duration-150 select-none'
                          : 'flex text-[0.8rem] items-center py-2 px-4 hover:bg-teal-600 duration-150 select-none'
                      }
                    >
                      {child.icon && (
                        <FontAwesomeIcon
                          icon={child.icon}
                          className="mr-3 h-3 w-3"
                        />
                      )}
                      {child.label}
                    </Link>
                  )
                }
                return null // Handle other types if needed
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
