interface UploadedFile {
  file: File
  id: string
  name: string
  readableSize: string
  preview: string
  progress: number
  uploaded: boolean
  error: boolean
  url: string
  type: string
}

export default UploadedFile
