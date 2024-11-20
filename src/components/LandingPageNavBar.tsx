'use client'
import bayanLogo from '../assets/images/bayan-logo-dark.svg'
import Link from 'next/link'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu
} from '@headlessui/react'

import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { faHandshake } from '@fortawesome/free-regular-svg-icons'
import { navigationItems } from '../statics/landingPageNavigationLists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownItem from './DropDownItem'

export default function LandingPageNavBar() {
  return (
    <Disclosure
      as="nav"
      className="bg-tertiary-dark-500 border-b-2 border-primary-400 w-full"
    >
      <div className=" w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className="w-full relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                priority={true}
                alt="Your Company"
                src={bayanLogo}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigationItems.map((item) => {
                  if (item.type === 'dropdown') {
                    return (
                      <DropDownItem
                        key={item.label}
                        dropDownItemLabel={item.label}
                        dropDownItems={item.navigationItemsChildren || []}
                      />
                    )
                  }
                  if (item.type === 'link' && item.href) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-white hover:text-[#099797] duration-150"
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  if (item.type === 'div') {
                    return (
                      <div
                        key={item.label}
                        className="text-white hover:text-[#099797] duration-150"
                      >
                        {item.label}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu
              as="div"
              className="relative ml-3"
            >
              <div className="hidden md:flex">
                <button className="px-4 font-semibold py-2 text-white bg-primary-400 rounded-md flex flex-row justify-center items-center gap-2 hover:bg-[#099797] duration-150">
                  <FontAwesomeIcon icon={faHandshake} />
                  Join us
                </button>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col ">
          {navigationItems.map((item) =>
            item.href ? (
              <Link
                key={`${item.label}-side-menu`}
                href={item.href}
                className="text-white hover:text-[#099797] duration-150"
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={`${item.label}-side-menu`}
                className="text-white hover:text-[#099797] duration-150 hover:"
              >
                {item.label}
              </div>
            )
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
