import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import {
  FaFilePdf,
  FaFileWord,
  FaFileAudio,
  FaFileVideo,
  FaFileCsv,
  FaFile,
  FaFileImage
} from 'react-icons/fa'
import Axios from 'axios'

import {
  Container,
  DropContainer,
  UploadMessage,
  Preview,
  FileInfo
} from './styles'

// eslint-disable-next-line no-unused-vars
import UploadedFile from '../../interfaces/UploadedFile'

import 'react-circular-progressbar/dist/styles.css'

interface Props {
  accept: string
  value: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  baseUrl: string
  headers?: Object
  multiple?: boolean
  width?: string
  height?: string
}

function Index(props: Props) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile>()
  const [over, setOver] = useState(false)

  useEffect(() => {
    if (uploadedFile) processUpload(uploadedFile)
  }, [uploadedFile])

  function renderDragMessage(
    isDragActive: boolean,
    isDragReject: boolean,
    uploaded: boolean
  ) {
    if (!isDragActive) {
      if (uploaded && !over) {
        return <div />
      }

      return <UploadMessage>Clique ou Arraste arquivos aqui...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type='success'>Solte os arquivos aqui</UploadMessage>
  }

  function renderPreview() {
    switch (uploadedFile?.type) {
      case 'image/gif':
      case 'image/jpeg':
      case 'image/png':
        return (
          <Preview>
            <img src={uploadedFile.preview} />
          </Preview>
        )

      case 'image/svg+xml':
        return (
          <Preview>
            <FaFileImage
              size={62}
              style={{ color: '#7f7f7f', margin: '24px' }}
            />
          </Preview>
        )

      case 'application/pdf':
        return (
          <Preview>
            <FaFilePdf size={62} style={{ color: '#7f7f7f', margin: '24px' }} />
          </Preview>
        )

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
      case 'application/vnd.oasis.opendocument.text':
      case 'application/vnd.oasis.opendocument.text-template':
        return (
          <Preview>
            <FaFileWord
              size={62}
              style={{ color: '#7f7f7f', margin: '24px' }}
            />
          </Preview>
        )

      case 'audio/wave':
      case 'audio/wav':
      case 'audio/x-wav':
      case 'audio/x-pn-wav':
      case 'audio/webm':
      case 'audio/ogg':
      case 'audio/mpeg':
      case 'audio/mp3':
      case 'audio/mp4':
      case 'audio/vnd.wav':
        return (
          <Preview>
            <FaFileAudio
              size={62}
              style={{ color: '#7f7f7f', margin: '24px' }}
            />
          </Preview>
        )

      case 'video/x-flv':
      case 'video/mp4':
      case 'application/x-mpegURL':
      case 'video/MP2T':
      case 'video/3gpp':
      case 'video/quicktime':
      case 'video/x-msvideo':
      case 'video/x-ms-wmv':
        return (
          <Preview>
            <FaFileVideo
              size={62}
              style={{ color: '#7f7f7f', margin: '24px' }}
            />
          </Preview>
        )

      case 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
      case 'text/csv':
        return (
          <Preview>
            <FaFileCsv size={62} style={{ color: '#7f7f7f', margin: '24px' }} />
          </Preview>
        )

      default:
        return (
          <Preview>
            <FaFile size={62} style={{ color: '#7f7f7f', margin: '24px' }} />
          </Preview>
        )
    }
  }

  function updateFile(id: string, data: Object) {
    const processUploadedFiles = props.value.map((file: UploadedFile) => {
      return id === file.id ? { ...file, ...data } : file
    })

    props.onChange(processUploadedFiles)
  }

  async function processUpload(uploadedFile: UploadedFile) {
    try {
      const data = new FormData()
      data.append('files', uploadedFile.file)
      Axios.post(`${props.baseUrl}/upload/`, data, {
        headers: props.headers || { Authorization: '' },
        onUploadProgress: (event: ProgressEvent) => {
          const progress = Math.round((event.loaded * 100) / event.total)

          updateFile(uploadedFile.id, { progress })
        }
      })
        .then((response: any) => {
          updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data[0].id,
            url: response.data[0].url
          })
        })
        .catch((error) => {
          console.error(error)

          updateFile(uploadedFile.id, {
            error: true
          })
        })
    } catch (error) {
      console.error('Upload file fail')
    }
  }

  async function handlerRemove() {
    try {
      if (props.value[0].url) {
        Axios.delete(`${props.baseUrl}/upload/files/${props.value[0].id}`, {
          headers: props.headers || { Authorization: '' }
        })

        setUploadedFile(undefined)
        props.onChange([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Dropzone
        accept={props.accept}
        onDropAccepted={async (files: File[]) => {
          const file = files[0]

          if (props.value.length > 0) {
            await handlerRemove()
          }

          const serializedFiles = {
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
          }

          const newUploadedFiles = [serializedFiles]
          props.onChange(newUploadedFiles)

          setUploadedFile(serializedFiles)
        }}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            uploaded={!!uploadedFile}
            onMouseEnter={() => {
              setOver(true)
            }}
            onMouseLeave={() => {
              setOver(false)
            }}
          >
            {renderDragMessage(isDragActive, isDragReject, !!uploadedFile)}
            {uploadedFile && renderPreview()}
            <input {...getInputProps()} />
          </DropContainer>
        )}
      </Dropzone>
      {uploadedFile && (
        <FileInfo>
          <div className='infos'>
            <strong>{props.value[0].name}</strong>
            <span>
              {props.value[0].readableSize}{' '}
              <button onClick={handlerRemove}>Excluir</button>
            </span>
          </div>
          <div className='status' />

          <div>
            {!props.value[0].uploaded && !props.value[0].error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: 'var(--primary-color)' }
                }}
                strokeWidth={10}
                value={props.value[0].progress}
              />
            )}

            {props.value[0].url && (
              <a
                href={`${props.baseUrl}${props.value[0].url}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <MdLink size={24} color='#222' style={{ marginRight: 8 }} />
              </a>
            )}

            {props.value[0].uploaded && (
              <MdCheckCircle size={24} color='#8bc34a' />
            )}

            {props.value[0].error && <MdError size={24} color='#f44336' />}
          </div>
        </FileInfo>
      )}
    </Container>
  )
}

export default Index
