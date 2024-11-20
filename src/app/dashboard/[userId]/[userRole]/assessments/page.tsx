'use client'

import { debounce } from '@/utils/debounce'
import AssessmentCards from '@/components/AssessmentCards'
import AssessmentTable from '@/components/AssessmentTable'
import InputComponent from '@/components/InputComponent'
import { Button } from '@/components/ui/button'
import { IAssessment } from '@/interfaces/global'
import { faGrip, faList, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { getCookie } from '@/utils/getCookie'
import axios from 'axios'

export default function Assessments() {
  const { user } = useAuth()
  const router = useRouter()
  const [assessments, setAssessments] = useState<IAssessment[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredAssessments, setFilteredAssessments] = useState<IAssessment[]>(
    []
  )
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  const debouncedSearch = useCallback(
    debounce((searchQuery: string, assessmentsArray: IAssessment[]) => {
      if (searchQuery.length > 0) {
        const filtered = assessmentsArray?.filter((assessment) =>
          assessment.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        if (filtered && filtered.length > 0) {
          setFilteredAssessments(filtered)
        }
      } else {
        setFilteredAssessments(assessments)
      }
    }, 350),
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
        data.map((assessment) =>
          currentAssessmentArray.push(assessment.assessment)
        )
        setAssessments(currentAssessmentArray)
      })
      .catch((error) => {
        return
      })
  }, [])

  useEffect(() => {
    debouncedSearch(searchQuery, assessments)
  }, [searchQuery])
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row justify-between  mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-auto">
          <InputComponent
            overrideInputClass="pr-10 h-10 bg-white text-sm"
            value={searchQuery}
            labelHtmlFor="search"
            labelText=""
            inputType="text"
            inputId="search"
            inputName="search"
            inputPlaceholder="Search assessments..."
            inputIcon={
              <FontAwesomeIcon
                icon={faSearch}
                className="w-5 text-secondary-light absolute top-[0.67rem] right-3 hover:text-primary-400"
              />
            }
            inputDataCallBack={(inputValue) => {
              setSearchQuery(inputValue)
            }}
            errorCompliant={false}
          />
        </div>
        <div className="flex flex-col justify-end items-end gap-4 ">
          <Button
            onClick={() =>
              router.push(
                `/dashboard/${user?._id}/${user?.role}/assessments/create`
              )
            }
            className="bg-primary-500 hover:bg-primary-400"
          >
            + Create assessment
          </Button>
          <div>
            <Button
              className="rounded-r-none "
              variant={viewMode === 'card' ? 'default' : 'outline'}
              onClick={() => setViewMode('card')}
            >
              <FontAwesomeIcon
                icon={faGrip}
                className=" h-4 w-4"
              />
            </Button>
            <Button
              className="rounded-l-none"
              variant={viewMode === 'table' ? 'default' : 'outline'}
              onClick={() => setViewMode('table')}
            >
              <FontAwesomeIcon
                icon={faList}
                className="h-4 w-4"
              />
            </Button>
          </div>
        </div>
      </div>
      {viewMode === 'table' ? (
        <AssessmentTable
          assessments={assessments}
          filteredAssessments={filteredAssessments}
        />
      ) : (
        <AssessmentCards
          assessments={assessments}
          filteredAssessments={filteredAssessments}
        />
      )}
    </div>
  )
}
