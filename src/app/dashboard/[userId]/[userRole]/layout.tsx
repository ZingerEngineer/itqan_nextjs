'use client'
import Image from 'next/image'
import bayanLogo from '@/assets/images/bayan-consulting.png'
import Link from 'next/link'
import { sideBarNavTabs } from '@/statics/assessmentSideBarNavList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropdown from '@/components/DropDownComponent'
import { Button } from '@/components/ui/button'
import {
  faArrowRightFromBracket,
  faBell,
  faCog,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/providers/AuthProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function AssessmentDashboard({
  children,
  params
}: {
  children: React.ReactNode
  params: {
    userId: string
    userRole: string
  }
}) {
  const { logout, user } = useAuth()
  return (
    <div className="flex flex-col w-full lg:flex-row min-h-screen bg-gray-100">
      <div className="flex flex-col min-h-max  lg:min-h-screen lg:pl-6 pb-6">
        <div className="h-[4rem] my-5 lg:flex justify-center items-center hidden">
          <Image
            src={bayanLogo}
            alt="Bayan Consulting Logo"
            width={200}
          />
        </div>
        <aside className="w-full lg:rounded-md lg:w-56 lg:h-full bg-teal-800 text-white p-6 flex flex-col ">
          <nav className="space-y-4 flex-grow">
            {sideBarNavTabs.map((tab) => {
              if (tab.accessRoles.includes(params.userRole)) {
                if (tab.type === 'link' && tab.href) {
                  return (
                    <Link
                      key={tab.label}
                      href={`/dashboard/${params.userId}/${params.userRole}/${tab.href}`}
                      className="flex text-[0.8rem] items-center py-2 px-4 bg-teal-700 duration-150  hover:bg-teal-600 rounded"
                    >
                      {tab.icon ? (
                        <FontAwesomeIcon
                          icon={tab.icon}
                          className="mr-3 h-4 w-4"
                        />
                      ) : null}
                      {tab.label}
                    </Link>
                  )
                }
                if (tab.type === 'dropdown') {
                  return (
                    <Dropdown
                      additionToHref={`/dashboard/${params.userId}/${params.userRole}`}
                      key={tab.label}
                      tab={tab}
                    >
                      {tab.label}
                    </Dropdown>
                  )
                }
              }
            })}
          </nav>
          <div className="mt-auto pt-6 space-y-4">
            <Link
              href="#"
              className=" hover:bg-teal-600 text-[0.8rem] rounded  duration-150 flex items-center py-2 px-4"
            >
              <FontAwesomeIcon
                icon={faCog}
                className=" mr-3 h-4 w-4"
              />
              Settings
            </Link>
            <button
              onClick={logout}
              className="hover:bg-teal-600 text-[0.8rem] rounded w-full duration-150 flex items-center py-2 px-4"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-3 h-4 w-4"
              />
              Logout
            </button>
          </div>
        </aside>
      </div>
      <main className="flex-1 p-6 h-screen overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Assessments</h2>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
            >
              <FontAwesomeIcon
                icon={faBell}
                className="h-5 w-5"
              />
            </Button>
            <div>
              <p className="font-semibold text-sm">{user?.role}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full flex justify-center items-center outline-teal-500">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="rounded-full h-8 w-8"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
