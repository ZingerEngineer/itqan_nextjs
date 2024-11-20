'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Upload, File as FileIcon, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import useQuestion from '@/hooks/useQuestion'
import { generateRandomId } from '@/utils/generateRandomId'
import { uploadMultipleBytes, storage } from '@/app/lib/firebaseConfig'
import {
  ref,
  getDownloadURL,
  deleteObject,
  StorageReference,
  UploadTaskSnapshot
} from 'firebase/storage'
import { generateRandomFileName } from '@/utils/generateRandomName'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faX } from '@fortawesome/free-solid-svg-icons'
import { showToast } from '@/utils/showToast'

const AttachmentSection: React.FC = () => {
  const { state, dispatch } = useQuestion()
  const handleQuestionDispatch = (
    type: string,
    payload: unknown,
    attachmentId?: string,
    optionId?: string,
    answerId?: string
  ) => {
    dispatch({
      type: type,
      payload: payload,
      attachmentId: attachmentId,
      optionId: optionId,
      answerId: answerId
    })
  }
  const handleDeleteUploadedAttachment = async (
    id: string,
    fileRef: StorageReference
  ) => {
    await deleteObject(fileRef)
    handleQuestionDispatch(
      'REMOVE_SUCCESSFULLY_UPLOADED_ATTACHMENT',
      undefined,
      id
    )
  }
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  // Handler for removing a file from the list
  const removeFile = (id: string) => {
    handleQuestionDispatch('DELETE_ATTACHMENT', undefined, id)
  }

  // Handler for file uploads (optional)
  const uploadFiles = async () => {
    if (state.attachments && state.attachments.length === 0) {
      setError('No files to upload.')
      return
    }
    if (state.attachments && state.attachments.length > 0) {
      try {
        setUploading(true)
        setError(null)
        const imageRef = ref(storage, generateRandomFileName('file'))
        const files = state.attachments.map((file) => file.file)
        const resultsArray = await uploadMultipleBytes(
          imageRef,
          files,
          undefined,
          (progress) => {
            setUploadProgress(progress)
          }
        )

        if (
          resultsArray &&
          resultsArray.snapshots &&
          resultsArray.snapshots.length > 0
        ) {
          resultsArray.snapshots.map(async (result) => {
            const currentResult = result as UploadTaskSnapshot
            const downloadUrl = await getDownloadURL(currentResult.ref)
            handleQuestionDispatch('ADD_SUCCESSFULLY_UPLOADED_ATTACHMENT', {
              id: generateRandomId(),
              name: currentResult.metadata.name,
              url: downloadUrl,
              size: currentResult.metadata.size,
              type: currentResult.metadata.contentType
            })
          })
          handleQuestionDispatch('CLEAR_ATTACHMENTS', undefined)
        }
      } catch (err: unknown) {
        setError('Failed to upload files.')
        showToast('error', error, {
          className: 'bg-red-500 text-white'
        })
      } finally {
        setUploading(false)
        setUploadProgress(0)
      }
    }
  }

  // Handler for file drop
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        setError(
          'Some files were rejected. Please check the file types and sizes.'
        )
      }
      if (acceptedFiles.length > 0) {
        acceptedFiles.map((file) => {
          const newPendingAttachment = {
            id: generateRandomId(),
            file: file,
            name: file.name,
            url: ''
          }
          handleQuestionDispatch('ADD_ATTACHMENT', newPendingAttachment)
        })
      }
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    noClick: true,
    noKeyboard: true
  })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="attachments">Attachments</Label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/25'
            }`}
        >
          <input
            {...getInputProps()}
            id="attachments"
          />
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
            <p className="text-sm font-medium">
              {isDragActive
                ? 'Drop the files here...'
                : 'Drag & drop files here, or click the button below to select files'}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Supports images, PDFs, DOC files (Max size: 10MB each)
            </p>
            <button
              type="button"
              onClick={open}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
            >
              Select Files
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {state.attachments && state.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold">Selected Files:</h4>
            <ul className="space-y-1">
              {state.attachments.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded"
                >
                  <div className="flex items-center">
                    <FileIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        {state.attachments && state.attachments.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={uploadFiles}
              disabled={uploading}
              className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? `Uploading (${uploadProgress}%)` : 'Upload Files'}
            </button>
          </div>
        )}
      </div>

      {state.successfullyUploadedAttachments &&
      state.successfullyUploadedAttachments.length > 0 ? (
        <div>
          <h4 className="text-sm font-semibold">Uploaded Files:</h4>
          <ul className="space-y-1">
            {state.successfullyUploadedAttachments.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <FontAwesomeIcon
                      icon={faFile}
                      className="w-4 h-4 mr-2 text-muted-foreground"
                    />
                    <Link
                      target="_blank"
                      href={file.url}
                      className="text-sm"
                    >
                      {file.name}
                    </Link>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleDeleteUploadedAttachment(
                        file.id,
                        ref(storage, file.name)
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faX} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default AttachmentSection
