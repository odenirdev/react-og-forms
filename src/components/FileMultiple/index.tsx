import React, { useState, useEffect, useCallback } from 'react'
import Dropzone from 'react-dropzone'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import Axios from 'axios'

import FileList from '../FileList'

import { DropContainer, UploadMessage, Container } from './styles'

// eslint-disable-next-line no-unused-vars
import UploadedFile from '../../interfaces/UploadedFile'

// eslint-disable-next-line no-unused-vars
import Props from '../../interfaces/File'

function Index(props: Props) {
  const [uploadFiles, setUploadFiles] = useState<UploadedFile[]>([])

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  useEffect(() => {
    uploadFiles.forEach((file: UploadedFile) => {
      processUpload(file)
    })
  }, [uploadFiles])

  useEffect(() => {
    props.onChange(uploadedFiles)
  }, [uploadedFiles])

  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <UploadMessage>Clique ou Arraste arquivos aqui...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type='success'>Solte os arquivos aqui</UploadMessage>
  }

  const updateFile = useCallback(
    async (id: string, data: Object) => {
      const newFiles = uploadedFiles.map((file: UploadedFile) => {
        return id === file.id ? { ...file, ...data } : file
      })

      setUploadedFiles(newFiles)
    },
    [uploadedFiles]
  )

  const processUpload = useCallback(
    (uploadedFile: UploadedFile) => {
      async function processUpload(uploadedFile: UploadedFile) {
        try {
          const data = new FormData()
          data.append('files', uploadedFile.file)
          const response = await Axios.post(`${props.baseUrl}/upload/`, data, {
            headers: props.headers || { Authorization: '' },
            onUploadProgress: async (event: ProgressEvent) => {
              const progress = Math.round((event.loaded * 100) / event.total)
              await updateFile(uploadedFile.id, { progress })
            }
          })

          await updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data[0].id,
            url: response.data[0].url
          })
        } catch (error) {
          await updateFile(uploadedFile.id, {
            error: true
          })
        }
      }

      processUpload(uploadedFile)
    },
    [uploadedFiles]
  )

  return (
    <Container>
      <Dropzone
        accept={props.accept}
        onDropAccepted={async (files: File[]) => {
          const serializedFiles = files.map((file: File) => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: '',
            type: file.type
          }))

          setUploadedFiles(props.value.concat(serializedFiles))

          setUploadFiles(serializedFiles)
        }}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            {renderDragMessage(isDragActive, isDragReject)}
            <input {...getInputProps()} />
          </DropContainer>
        )}
      </Dropzone>
      {!!props.value.length && <FileList {...props} />}
    </Container>
  )
}

export default Index
