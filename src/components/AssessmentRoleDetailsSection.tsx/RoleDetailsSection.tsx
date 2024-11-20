import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select'
import TimePicker from '../TimePicker/TimePicker'
import { Input } from '../ui/input'
import useAssessment from '@/hooks/useAssessment'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { IAssessment, IFetchedAssessment } from '@/interfaces/global'
import capitalize from '@/utils/strings/capitalize'
import { getCookie } from '@/utils/getCookie'
import axios from 'axios'
import { showToast } from '@/utils/showToast'

export default function RoleDetailsSection() {
  const { state, dispatch } = useAssessment()

  // State for new job role input
  const [newlyCreatedJobRole, setNewlyCreatedJobRole] = useState<string>('')
  const [newlyCreatedJobRoleArray, setNewlyCreatedJobRoleArray] = useState<
    string[]
  >([])
  const [fetchedJobRoles, setFetchedJobRoles] = useState<string[]>([])
  const [fetchedAssessments, setFetchedAssessments] = useState<IAssessment[]>(
    []
  )
  useEffect(() => {
    const fetchAssessments = async () => {
      const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
      const token = getCookie('Authorization')
      const assessmentAxiosResponse = await axios.get(
        `${url}/api/v1/assessments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      return assessmentAxiosResponse.data.data.data
    }

    const results = fetchAssessments()
    results
      .then((data) => {
        const currentAssessmentArray: IAssessment[] = []
        data.map((assessment: IFetchedAssessment) => {
          return currentAssessmentArray.push(assessment.assessment)
        })
        setFetchedAssessments(currentAssessmentArray)
      })
      .catch((error) => {
        return
      })
  }, [])

  // Extract job roles from fetched assessments
  useMemo(() => {
    const jobRoles: string[] = fetchedAssessments
      .map((assessment) => assessment.jobRole?.toLowerCase())
      .filter((jobRole) => jobRole && jobRole.length > 0)
    setFetchedJobRoles(jobRoles)
  }, [fetchedAssessments])

  // Combine fetched job roles with newly created job roles
  const combinedJobRoles = useMemo(() => {
    const combined = [...fetchedJobRoles, ...newlyCreatedJobRoleArray]
    // Remove duplicates by converting to a Set and back to an array
    return Array.from(new Set(combined))
  }, [fetchedJobRoles, newlyCreatedJobRoleArray])

  // Handle changes in role details
  const handleRoleDetailsChange = (action: string, newDetails: unknown) => {
    dispatch({ type: action, payload: newDetails })
  }

  // Handle addition of new job role
  const handleJobRoleInputAddition = () => {
    const trimmedInput = newlyCreatedJobRole.trim().toLowerCase()
    if (
      trimmedInput &&
      trimmedInput.length >= 2 &&
      !combinedJobRoles.includes(trimmedInput)
    ) {
      setNewlyCreatedJobRoleArray((prev) => [...prev, trimmedInput])
      setNewlyCreatedJobRole('')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Role Details</h2>
      <div className="flex flex-row w-full gap-4">
        <div className="w-2/6 space-y-4">
          {/* Name of Assessment */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Name of Assessment
            </label>
            <Input
              className="mb-4"
              type="text"
              value={state.name}
              onChange={(e) => {
                handleRoleDetailsChange('SET_NAME', e.target.value)
              }}
            />
          </div>

          {/* Language of Assessment */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Language of Assessment
            </label>
            <Select
              value={state.language}
              onValueChange={(value) =>
                handleRoleDetailsChange('SET_LANGUAGE', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Role</label>
            <div className="flex flex-row justify-center items-center">
              <Select
                value={state.jobRole}
                onValueChange={(value) =>
                  handleRoleDetailsChange('SET_JOB_ROLE', value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Job Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Job Role</SelectLabel>

                    {/* Input for adding new job role */}
                    <div className="flex flex-row items-center gap-2 p-2">
                      <Input
                        value={newlyCreatedJobRole}
                        onChange={(e) => setNewlyCreatedJobRole(e.target.value)}
                        placeholder="Add new job role..."
                      />
                      <Button
                        variant="ghost"
                        onClick={handleJobRoleInputAddition}
                        disabled={
                          !newlyCreatedJobRole.trim() ||
                          newlyCreatedJobRole.trim().length < 2 ||
                          combinedJobRoles.includes(
                            newlyCreatedJobRole.trim().toLowerCase()
                          )
                        }
                        title={
                          combinedJobRoles.includes(
                            newlyCreatedJobRole.trim().toLowerCase()
                          )
                            ? 'Job role already exists'
                            : 'Add Job Role'
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>

                    {/* Displaying job roles */}
                    {combinedJobRoles && combinedJobRoles.length > 0 ? (
                      combinedJobRoles.map((jobRole, index) => (
                        <SelectItem
                          key={`${jobRole}-${index}`}
                          value={jobRole.toLowerCase()}
                        >
                          {jobRole.length > 3
                            ? capitalize(jobRole)
                            : jobRole.toUpperCase()}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        value="no-job-roles"
                        disabled
                      >
                        No job roles available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time to Complete Question Section */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Time to Complete Question Section
            </label>
            <TimePicker
              duration={state.duration}
              setDuration={(value) =>
                handleRoleDetailsChange('SET_DURATION', value)
              }
            />
          </div>
        </div>

        {/* Assessment Description */}
        <div className="w-4/6 flex-grow flex flex-col items-start justify-center">
          <label className="flex flex-col justify-center w-full text-sm font-medium mb-1">
            Assessment Description (Optional)
          </label>
          <Textarea
            value={state.description}
            onChange={(e) =>
              handleRoleDetailsChange('SET_DESCRIPTION', e.target.value)
            }
            style={{ resize: 'none' }}
            className="flex-grow"
            placeholder="Assessment description"
          />
        </div>
      </div>
    </div>
  )
}
