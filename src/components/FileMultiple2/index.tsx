import React from 'react'
import Dropzone from 'react-dropzone'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import Axios from 'axios'

import FileList from '../FileList'

import { DropContainer, UploadMessage, Container } from './styles'

// eslint-disable-next-line no-unused-vars
import Props from '../../interfaces/File'

// eslint-disable-next-line no-unused-vars
import UploadedFile from '../../interfaces/UploadedFile'

export default class Index extends React.Component {
  props: Props

  renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage>Clique ou Arraste arquivos aqui...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type='success'>Solte os arquivos aqui</UploadMessage>
  }

  updateFile = async (id: string, data: Object) => {
    const newFiles = this.props.value.map((file: UploadedFile) => {
      return id === file.id ? { ...file, ...data } : file
    })

    this.props.onChange(newFiles)
  }

  processUpload = async (uploadedFile: UploadedFile) => {
    try {
      const data = new FormData()
      data.append('files', uploadedFile.file)
      const response = await Axios.post(`${this.props.baseUrl}/upload/`, data, {
        headers: this.props.headers || { Authorization: '' },
        onUploadProgress: async (event: ProgressEvent) => {
          const progress = Math.round((event.loaded * 100) / event.total)
          this.updateFile(uploadedFile.id, { progress })
        }
      })

      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data[0].id,
        url: response.data[0].url
      })
    } catch (error) {
      this.updateFile(uploadedFile.id, {
        error: true
      })
    }
  }

  render() {
    return (
      <Container>
        <Dropzone
          accept={this.props.accept}
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

            this.props.onChange(this.props.value.concat(serializedFiles))

            serializedFiles.forEach(this.processUpload)
          }}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              {this.renderDragMessage(isDragActive, isDragReject)}
              <input {...getInputProps()} />
            </DropContainer>
          )}
        </Dropzone>
        {!!this.props.value.length && <FileList {...this.props} />}
      </Container>
    )
  }
}
