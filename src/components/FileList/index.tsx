import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import {
  FaFilePdf,
  FaFileWord,
  FaFileAudio,
  FaFileVideo,
  FaFileCsv,
  FaFile
} from 'react-icons/fa'

import 'react-circular-progressbar/dist/styles.css'

import { Container, FileInfo, Preview } from './styles'

// eslint-disable-next-line no-unused-vars
import UploadedFile from '../../interfaces/UploadedFile'
// eslint-disable-next-line no-unused-vars
import Props from '../../interfaces/File'

import Axios from 'axios'

function Index(props: Props) {
  function handlerRemove(file: UploadedFile) {
    if (file.url) {
      Axios.delete(`${props.baseUrl}/upload/files/${file.id}`, {
        headers: props.headers || { Authorization: '' }
      })
        .then(() => {
          filteredFiles(file)
        })
        .catch((err) => {
          console.error(err)
        })

      return
    }

    filteredFiles(file)
  }

  function filteredFiles(data: UploadedFile) {
    const filteredFiles = props.value.filter(
      (file: UploadedFile) => file.id !== data.id
    )

    props.onChange(filteredFiles)
  }

  function renderPreview(type: string, preview?: string) {
    switch (type) {
      case 'application/pdf':
        return (
          <Preview>
            <FaFilePdf size={32} />
          </Preview>
        )

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
      case 'application/vnd.oasis.opendocument.text':
      case 'application/vnd.oasis.opendocument.text-template':
        return (
          <Preview>
            <FaFileWord size={32} />
          </Preview>
        )

      case 'image/gif':
      case 'image/jpeg':
      case 'image/png':
      case 'image/svg+xml	':
        return <Preview src={preview} />

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
            <FaFileAudio size={32} />
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
            <FaFileVideo size={32} />
          </Preview>
        )

      case 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
      case 'text/csv':
        return (
          <Preview>
            <FaFileCsv size={32} />
          </Preview>
        )

      default:
        return (
          <Preview>
            <FaFile size={32} />
          </Preview>
        )
    }
  }

  return (
    <Container>
      {props.value.map((file: UploadedFile) => (
        <li key={file.id}>
          <FileInfo>
            {renderPreview(file.type, file.preview)}
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}{' '}
                {(file.uploaded || file.error) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handlerRemove(file)
                    }}
                  >
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: 'var(--primary-color)' }
                }}
                strokeWidth={10}
                value={file.progress}
              />
            )}

            {file.url && (
              <a
                href={`${props.baseUrl}${file.url}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <MdLink size={24} color='#222' style={{ marginRight: 8 }} />
              </a>
            )}

            {file.uploaded && <MdCheckCircle size={24} color='#8bc34a' />}

            {file.error && <MdError size={24} color='#f44336' />}
          </div>
        </li>
      ))}
    </Container>
  )
}

export default Index
