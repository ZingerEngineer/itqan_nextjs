import { Badge } from '@/components/ui/badge'
import {
  IAssessment,
  IFetchedAssessment,
  IPendingAssessment,
  ITestsFilters
} from '@/interfaces/global'
import FilterSection from './ChooseTestsFilterSection'
import { useCallback, useEffect, useState } from 'react'
import TestCard from './TestCard'
import { debounce } from '@/utils/debounce'
import { getAssessmentTypes } from './ChooseTestsUtils'
import useAssessment from '@/hooks/useAssessment'
import { getCookie } from '@/utils/getCookie'
import axios from 'axios'
import { showToast } from '@/utils/showToast'

export default function ChooseTestsSection() {
  const { state, dispatch } = useAssessment()
  const handleTestsChange = (
    action: string,
    newDetails: unknown,
    testId?: string
  ) => {
    dispatch({ type: action, payload: newDetails, testId: testId })
  }
  const [assessments, setAssessments] = useState<IAssessment[]>([])
  const [filteredAssessments, setFilteredAssessments] = useState<IAssessment[]>(
    []
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filters, setFilters] = useState<ITestsFilters[]>([
    {
      name: 'Job roles',
      options: [],
      isSelected: null
    },
    {
      name: 'Test type',
      options: [],
      isSelected: null
    },
    {
      name: 'Language',
      options: ['Arabic', 'English'],
      isSelected: null
    }
  ])

  const getSelectedTestIds = (state: IPendingAssessment) => {
    const idsArray: string[] = []
    state.tests?.map((test) => {
      idsArray.push(test.id)
    })
    return idsArray
  }
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
        data.map((assessment: IFetchedAssessment) =>
          currentAssessmentArray.push(assessment.assessment)
        )
        setAssessments(currentAssessmentArray)
        setFilters((prevFilters) =>
          prevFilters.map((filter) => {
            if (filter.name === 'Job roles') {
              return {
                ...filter,
                options: Array.from(
                  new Set(
                    currentAssessmentArray.map(
                      (assessment: IAssessment) => assessment.jobRole
                    )
                  )
                )
              }
            }
            if (filter.name === 'Test type') {
              const currentFilters: string[] = []
              currentAssessmentArray.forEach((assessment: IAssessment) => {
                if (
                  assessment.type &&
                  assessment.type.length > 0 &&
                  assessment.type[0] !== ''
                ) {
                  assessment.type.forEach((type) => currentFilters.push(type))
                }
              })
              return {
                ...filter,
                options: Array.from(new Set(currentFilters))
              }
            }
            return filter
          })
        )
      })
      .catch((error) => {
        return
      })
  }, [])

  // Unified debounced filtering function
  const debouncedFilter = useCallback(
    debounce(
      (
        search: string,
        currentFilters: ITestsFilters[],
        allAssessments: IAssessment[]
      ) => {
        let filtered = allAssessments
        const isBeingFiltered = currentFilters.some(
          (filter) => filter.isSelected !== null
        )
        //search query and filters
        if (search.length > 0 && isBeingFiltered) {
          filtered = filtered.filter((assessment) => {
            return currentFilters.every((filter) => {
              if (filter.isSelected) {
                if (filter.name === 'Job roles') {
                  return assessment.jobRole === filter.isSelected
                }
                if (filter.name === 'Test type') {
                  return assessment.type.includes(filter.isSelected)
                }
                if (filter.name === 'Language') {
                  return assessment.language === filter.isSelected
                }
              }
              return true
            })
          })

          filtered = filtered.filter((assessment) =>
            assessment.title.toLowerCase().includes(search.toLowerCase())
          )
        }
        // Only filters.
        if (isBeingFiltered && search.trim().length === 0) {
          filtered = filtered.filter((assessment) => {
            return currentFilters.every((filter) => {
              if (filter.isSelected) {
                if (filter.name === 'Job roles') {
                  return assessment.jobRole === filter.isSelected
                }
                if (filter.name === 'Test type') {
                  return assessment.type.includes(filter.isSelected)
                }
                if (filter.name === 'Language') {
                  return assessment.language === filter.isSelected
                }
              }
              return true
            })
          })
        }

        // Only search query.
        if (search.trim().length > 0 && !isBeingFiltered) {
          filtered = filtered.filter((assessment) =>
            assessment.title.toLowerCase().includes(search.toLowerCase())
          )
        }

        setFilteredAssessments(filtered.length > 0 ? filtered : [])
      },
      350
    ),
    []
  )

  // Trigger filtering whenever searchQuery, filters, or assessments change
  useEffect(() => {
    debouncedFilter(searchQuery, filters, assessments)
  }, [searchQuery, filters, assessments, debouncedFilter])

  const updateTestsArray = useCallback(
    (isSelected: boolean, id: string) => {
      const alreadySelectedTests = getSelectedTestIds(state)
      if (!alreadySelectedTests.includes(id) && isSelected) {
        const newTestId = assessments.find(
          (assessment) => assessment._id === id
        )?._id
        const newTestName = assessments.find(
          (assessment) => assessment._id === newTestId
        )?.title
        if (newTestId) {
          handleTestsChange(
            'ADD_TEST',
            {
              id: newTestId,
              name: newTestName
            },
            newTestId
          )
        }
      } else {
        handleTestsChange('DELETE_TEST', undefined, id)
      }
    },
    [assessments]
  )

  return (
    <div className="w-full flex-grow container p-6 flex flex-col justify-center">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium mr-2">Tests Library</span>
        <Badge variant="secondary">{assessments?.length}</Badge>
      </div>
      <FilterSection
        filters={filters}
        setFilters={(updatedFilters: ITestsFilters[]) => {
          setFilters(updatedFilters)
        }}
        onChangeCallback={(searchInputValue) =>
          setSearchQuery(searchInputValue)
        }
      />
      <div className="flex flex-row gap-4 flex-grow">
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {filteredAssessments.length === 0 &&
          (searchQuery.trim() !== '' ||
            filters.some((filter) => filter.isSelected !== null)) ? (
            <div>No assessments found</div>
          ) : (
            (filteredAssessments.length > 0
              ? filteredAssessments
              : assessments
            ).map((assessment) => (
              <TestCard
                selectedTests={state.tests ? getSelectedTestIds(state) : []}
                key={assessment._id}
                id={assessment._id}
                title={assessment.title}
                type={getAssessmentTypes(assessment)}
                description={assessment.description}
                duration={assessment.duration}
                questionCount={assessment.questions.length}
                onToggleSelection={(id, isSelected) => {
                  updateTestsArray(isSelected, id)
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
