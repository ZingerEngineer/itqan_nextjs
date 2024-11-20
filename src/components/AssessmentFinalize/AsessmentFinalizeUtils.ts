import { IQuestion, ITest } from '@/interfaces/global'

export const moveItem = (
  array: ITest[] | IQuestion[],
  index: number,
  direction: 'up' | 'down'
) => {
  if (
    (direction === 'up' && index === 0) ||
    (direction === 'down' && index === array.length - 1)
  ) {
    return array
  }

  const newArray = [...array]
  const [removed] = newArray.splice(index, 1)
  newArray.splice(direction === 'up' ? index - 1 : index + 1, 0, removed)
  return newArray
}

// export const handleImageUpload = (
//   questionId: number,
//   event: React.ChangeEvent<HTMLInputElement>
// ) => {
//   const file = event.target.files?.[0]
//   if (file) {
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setQuestions(
//         questions.map((q) =>
//           q.id === questionId ? { ...q, image: reader.result as string } : q
//         )
//       )
//     }
//     reader.readAsDataURL(file)
//   }
// }
