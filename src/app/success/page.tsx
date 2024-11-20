import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className=" flex items-center justify-center bg-tertiary-light-100 rounded-lg">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="mx-auto h-16 w-16 text-primary-500"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-tertiary-dark-800">
            Message Sent Successfully!
          </h2>
          <p className="mt-2 text-sm text-tertiary-dark-500">
            Thank you for contacting our customer support. We've received your
            message and will get back to you shortly.
          </p>
        </div>
        <div className="mt-8">
          <div className="rounded-md bg-primary-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-5 w-5 text-primary-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-primary-800">
                  What happens next?
                </h3>
                <div className="mt-2 text-sm text-primary-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Our support team will review your message</li>
                    <li>We aim to respond within 24 hours</li>
                    <li>You`&apos;`ll receive a reply via email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/auth/signin"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-400 duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 "
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
