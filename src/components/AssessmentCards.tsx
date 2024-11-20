import { IAssessment } from '@/interfaces/global'
import {
  faEllipsisVertical,
  faUsers,
  faPenSquare,
  faCalendar,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AssessmentCards({
  assessments,
  filteredAssessments
}: {
  assessments: IAssessment[]
  filteredAssessments: IAssessment[]
}) {
  if (!assessments.length && !filteredAssessments.length)
    return <div>Loading...</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!filteredAssessments?.length && assessments && assessments.length
        ? assessments.map((assessment, index) => (
            <Card key={index}>
              <CardHeader className="flex p-4 flex-row w-full justify-between items-center overflow-hidden">
                <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[10rem]">
                  {assessment.title}
                </CardTitle>
                <Button
                  className="m-0 p-4"
                  variant="ghost"
                  size="icon"
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="h-4 w-4 flex justify-center items-center"
                  />
                </Button>
              </CardHeader>

              <CardContent className="text-xs px-4 pb-4">
                <div className="space-y-2">
                  <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-4 ${
                            (assessment.candidateLevel === 'easy' && i < 1) ||
                            (assessment.candidateLevel === 'medium' && i < 2) ||
                            (assessment.candidateLevel === 'hard' && i < 3)
                              ? 'bg-teal-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {assessment.state}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FontAwesomeIcon
                      className="flex items-center justify-center w-3 h-3"
                      icon={faUsers}
                    />
                    <span>{assessment.totalScore}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 overflow-hidden">
                    <FontAwesomeIcon
                      className="flex items-center justify-center w-3 h-3"
                      icon={faPenSquare}
                    />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {assessment.user_name
                        ? assessment.user_name
                        : 'Unspecified'}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex justify-between items-center gap-2">
                      <FontAwesomeIcon
                        className="flex items-center justify-center w-3 h-3"
                        icon={faCalendar}
                      />
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {new Date(assessment.createdAt).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <FontAwesomeIcon
                        className="flex items-center justify-center w-3 h-3"
                        icon={faClock}
                      />
                      <span>
                        {assessment.duration.hours}h{' '}
                        {assessment.duration.minutes}m{' '}
                        {assessment.duration.seconds}s
                      </span>
                      <span>Hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        : null}
      {filteredAssessments.length
        ? filteredAssessments.map((assessment, index) => (
            <Card key={index}>
              <CardHeader className="flex p-4 flex-row w-full justify-between items-center overflow-hidden">
                <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[10rem]">
                  {assessment.title}
                </CardTitle>
                <Button
                  className="m-0 p-4"
                  variant="ghost"
                  size="icon"
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="h-4 w-4 flex justify-center items-center"
                  />
                </Button>
              </CardHeader>

              <CardContent className="text-xs px-4 pb-4">
                <div className="space-y-2">
                  <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-4 ${
                            (assessment.candidateLevel === 'easy' && i < 1) ||
                            (assessment.candidateLevel === 'medium' && i < 2) ||
                            (assessment.candidateLevel === 'hard' && i < 3)
                              ? 'bg-teal-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {assessment.state}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FontAwesomeIcon
                      className="flex items-center justify-center w-3 h-3"
                      icon={faUsers}
                    />
                    <span>{assessment.totalScore}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 overflow-hidden">
                    <FontAwesomeIcon
                      className="flex items-center justify-center w-3 h-3"
                      icon={faPenSquare}
                    />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {assessment.user_name
                        ? assessment.user_name
                        : 'Unspecified'}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex justify-between items-center gap-2">
                      <FontAwesomeIcon
                        className="flex items-center justify-center w-3 h-3"
                        icon={faCalendar}
                      />
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {new Date(assessment.createdAt).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <FontAwesomeIcon
                        className="flex items-center justify-center w-3 h-3"
                        icon={faClock}
                      />
                      <span>
                        {assessment.duration.hours}h{' '}
                        {assessment.duration.minutes}m{' '}
                        {assessment.duration.seconds}s
                      </span>
                      <span>Hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  )
}
