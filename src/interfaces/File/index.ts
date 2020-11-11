// eslint-disable-next-line no-unused-vars
import UploadedFile from '../UploadedFile'

interface File {
  accept: string
  value: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  baseUrl: string
  headers?: Object
  multiple?: boolean
}

export default File
