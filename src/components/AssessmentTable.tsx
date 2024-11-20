import { Button } from '@/components/ui/button'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IAssessment } from '@/interfaces/global'

export default function AssessmentTable({
  assessments,
  filteredAssessments
}: {
  assessments: IAssessment[]
  filteredAssessments: IAssessment[]
}) {
  if (!filteredAssessments && !assessments) return <div>Loading...</div>

  return (
    <Table className="text-[0.7rem]">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total candidates</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Created on</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!filteredAssessments?.length && assessments && assessments.length
          ? assessments.map((assessment, index) => (
              <TableRow key={index}>
                <TableCell>{assessment.title}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {assessment.state}
                  </span>
                </TableCell>
                <TableCell>{assessment.totalScore}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  {new Date(assessment.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell>
                  {' '}
                  {assessment.user_name ? assessment.user_name : 'Unspecified'}
                </TableCell>
                <TableCell>
                  {assessment.duration?.hours}h {assessment.duration?.minutes}m{' '}
                  {assessment.duration?.seconds}s
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="h-4 w-4"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          : null}
        {filteredAssessments.length > 0
          ? filteredAssessments.map((assessment, index) => (
              <TableRow key={index}>
                <TableCell>{assessment.title}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {assessment.state}
                  </span>
                </TableCell>
                <TableCell>{assessment.totalScore}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  {new Date(assessment.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell>
                  {' '}
                  {assessment.user_name ? assessment.user_name : 'Unspecified'}
                </TableCell>
                <TableCell>
                  {assessment.duration?.hours}h {assessment.duration?.minutes}m{' '}
                  {assessment.duration?.seconds}s
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="h-4 w-4"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  )
}
