'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import axios from 'axios'

type Contact = {
  _id: string
  firstName: string
  lastName: string
  businessEmail: string
  phone: string
  companySize: string
  message: string
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const handleApprove = () => {
    const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
    axios
      .put(`${url}/api/v1/contact/requests/${selectedContact?._id}/approve`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          setContacts(
            contacts.filter((contact) => contact._id !== selectedContact?._id)
          )
        }
      })
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
    axios
      .put(`${url}/api/v1/contact/requests/${selectedContact?._id}/decline`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          setContacts(
            contacts.filter((contact) => contact._id !== selectedContact?._id)
          )
        }
      })
    setIsModalOpen(false)
  }

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
    axios.get(`${url}/api/v1/contact/requests`).then((res) => {
      setContacts(res.data)
    })
  }, [])
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search contacts..."
            className="max-w-sm"
          />
          <Button
            variant="outline"
            size="icon"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {contacts && contacts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact._id}
                onClick={() => handleContactClick(contact)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                <TableCell>{contact.businessEmail}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.companySize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        'No contacts found.'
      )}

      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium">Name:</label>
                <span className="col-span-3">{`${selectedContact.firstName} ${selectedContact.lastName}`}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium">Email:</label>
                <span className="col-span-3">
                  {selectedContact.businessEmail}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium">Phone:</label>
                <span className="col-span-3">{selectedContact.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium">Company Size:</label>
                <span className="col-span-3">
                  {selectedContact.companySize}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium">Message:</label>
                <span className="col-span-3">{selectedContact.message}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              variant="default"
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
