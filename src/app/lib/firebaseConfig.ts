import {
  getStorage,
  StorageReference,
  uploadBytes,
  uploadBytesResumable,
  UploadMetadata
} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { ref } from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_SECRET,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_SECRET,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECRET,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SECRET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_SECRET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_SECRET
}
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const storageRef = ref(storage)
export const uploadMultipleBytes = async (
  storageRef: StorageReference,
  filesArray: File[],
  metadata?: UploadMetadata,
  uploadProgress?: (progress: number) => void
) => {
  const progressValues: number[] = Array(filesArray.length).fill(0)

  return Promise.all(
    filesArray.map((file, index) => {
      return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            progressValues[index] = progress
            uploadProgress ? uploadProgress(progress) : null
          },
          (error) => {
            reject(error)
          },
          () => {
            resolve(uploadTask.snapshot)
          }
        )
      })
    })
  ).then((snapshots) => {
    return { snapshots, progressValues }
  })
}
export { uploadBytes }
