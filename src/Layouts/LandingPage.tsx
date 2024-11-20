'use client'

import Link from 'next/link'
import React from 'react'
import LandingPageNavBar from '@/components/LandingPageNavBar'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import placeHolderWorker from '@/assets/images/user_circle.svg'
import landingPageImage from '@/assets/images/landing_page_pic.svg'
import Image from 'next/image'

const HeroSection = () => (
  <section className="py-20 bg-tertiary-dark-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <Image
          src={landingPageImage}
          alt="Hero Image"
          width={400}
          height={400}
        />
      </div>
      <div className="md:w-1/2 md:pl-10">
        <h1 className="text-4xl font-bold text-primary-400 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-primary-100 mb-8">
          We`&apos;`re revolutionizing the way you work. Join us and experience
          the future of productivity.
        </p>
        <button className="bg-primary-400 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-500 duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Get Started
        </button>
      </div>
    </div>
  </section>
)

const TeamSection = () => {
  const team = [
    { name: 'John Doe', role: 'CEO', image: placeHolderWorker },
    { name: 'Jane Smith', role: 'CTO', image: placeHolderWorker },
    { name: 'Mike Johnson', role: 'Designer', image: placeHolderWorker },
    { name: 'Sarah Williams', role: 'Developer', image: placeHolderWorker }
  ]

  return (
    <section className="py-20 bg-primary-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-tertiary-dark-500 mb-12">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-tertiary-dark-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const StatsSection = () => {
  const stats = [
    { label: 'Users', value: '10M+' },
    { label: 'Countries', value: '100+' },
    { label: 'Uptime', value: '99.99%' },
    { label: 'Projects', value: '1M+' }
  ]

  return (
    <section className="py-20 bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Company Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xl text-secondary-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-primary-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We`&apos;`re on a mission to revolutionize the way people work and
            collaborate.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">123 Main St, Anytown, USA 12345</p>
          <p className="text-gray-400">info@example.com</p>
          <p className="text-gray-400">(123) 456-7890</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p className="text-gray-400">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <LandingPageNavBar />
      <HeroSection />
      <TeamSection />
      <StatsSection />
      <Footer />
    </div>
  )
}
