'use client'

import { Textarea } from '@headlessui/react'
import { Check, Edit2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { useState } from 'react'
import TimePicker from '../TimePicker/TimePicker'
import capitalize from '@/utils/strings/capitalize'
import useAssessment from '@/hooks/useAssessment'
import React from 'react'

const FinalizeAssessmentSection: React.FC = () => {
  const [editingAssessment, setEditingAssessment] = useState(false)
  const { state, dispatch } = useAssessment()
  const handleAssessmentDispatch = (type: string, newDetails: unknown) => {
    dispatch({
      type: type,
      payload: newDetails
    })
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Assessment details:</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingAssessment(!editingAssessment)}
          >
            {editingAssessment ? (
              <Check className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="assessment-name">Name</label>
              {editingAssessment ? (
                <Input
                  id="assessment-name"
                  value={state.name}
                  onChange={(e) => {
                    handleAssessmentDispatch('SET_NAME', e.target.value)
                  }}
                />
              ) : (
                <p className="mt-1 text-sm">{state.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="assessment-description">Description</label>
              {editingAssessment ? (
                <Textarea
                  id="assessment-description"
                  value={state.description}
                  onChange={(e) => {
                    handleAssessmentDispatch('SET_DESCRIPTION', e.target.value)
                  }}
                />
              ) : (
                <p className="mt-1 text-sm">{state.description}</p>
              )}
            </div>
            <div>
              <label htmlFor="assessment-language">Language</label>
              {editingAssessment ? (
                <Input
                  id="assessment-language"
                  value={state.language}
                  onChange={(e) => {
                    handleAssessmentDispatch('SET_LANGUAGE', e.target.value)
                  }}
                />
              ) : (
                <p className="mt-1 text-sm">{capitalize(state.language)}</p>
              )}
            </div>
            <div>
              <label htmlFor="assessment-job-role">Job Role</label>
              {editingAssessment ? (
                <Input
                  id="assessment-job-role"
                  value={state.jobRole}
                  onChange={(e) => {
                    handleAssessmentDispatch('SET_JOB_ROLE', e.target.value)
                  }}
                />
              ) : (
                <p className="mt-1 text-sm">
                  {state.jobRole && state.jobRole !== ''
                    ? state.jobRole
                    : 'Unspecified'}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="assessment-duration">Duration</label>
              {editingAssessment ? (
                <TimePicker
                  duration={state.duration}
                  setDuration={(value) => {
                    handleAssessmentDispatch('SET_DURATION', value)
                  }}
                />
              ) : (
                <p className="mt-1 text-sm">
                  {state.duration.hours}h {state.duration.minutes}m{' '}
                  {state.duration.seconds}s
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FinalizeAssessmentSection
