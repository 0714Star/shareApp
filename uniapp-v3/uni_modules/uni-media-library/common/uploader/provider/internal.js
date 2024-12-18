import BaseProvider from './base';

const uniMediaLibraryCo = uniCloud.importObject('uni-media-library-co', {
  customUI: true
})

class InternalUploadProvider extends BaseProvider {
  async upload (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = await file.getFileType()

      try {
        const result = await uniCloud.uploadFile({
          filePath: file.originUrl,
          fileType: file.mediaType,
          cloudPathAsRealPath: true,
          cloudPath: `uni-media-library/${Date.now()}.${ext}`,
          onUploadProgress: (progressEvent) => {
            file.setStatus('uploading')
            file.setPercent(Math.floor((progressEvent.loaded / progressEvent.total) * 100))
            this.emit('progress', file)
          }
        })
        file.setStatus('uploaded')
        file.setUrl(result.fileID)
        file.setPercent(100)
      } catch (e) {
        file.setStatus('failed')
        file.setError(e)
        console.error(e)
      }

      if ((i + 1) === files.length) {
        this.emit('success', files)
      }
    }
  }

  async cloudUpload (files, options) {
    const { imageLibraryProvider } = options
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      try {
        file.setStatus('uploading')
        file.setPercent(0)
        this.emit('progress', file)

        const result = await uniMediaLibraryCo.uploadImage({
          url: file.originUrl,
          id: file.id,
          provider: imageLibraryProvider
        })

        if (!result.data.fileID) {
          file.setStatus('failed')
          file.setError(new Error('上传失败'))
          this.emit('error', file)
          return
        }

        file.setStatus('uploaded')
        file.setUrl(result.data.fileID)
        file.setPercent(100)
        file.setAttributes(result.data.detail)
      } catch (e) {
        file.setStatus('failed')
        file.setError(e)
        console.error(e)
        this.emit('error', file)
      }

      if ((i + 1) === files.length) {
        this.emit('success', files)
      }
    }
  }
}

export default InternalUploadProvider
