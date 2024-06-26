import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { cuid } from '@adonisjs/core/helpers'
import fs from 'node:fs'

export default class FileService {
  static async upload(thumbnail: MultipartFile, path: string) {
    await thumbnail.move(app.makePath(`uploads/${path}`), {
      name: `${cuid()}.${thumbnail.extname}`,
    })

    return `${env.get('APP_URL')}/uploads/${path}/${thumbnail.fileName}`
  }

  static async uploadMultiple(thumbnails: MultipartFile[], path: string) {
    const paths: string[] = []
    for (let file of thumbnails) {
      await file.move(app.makePath(`uploads/${path}`), {
        name: `${cuid()}.${file.extname}`,
      })
      paths.push(`${env.get('APP_URL')}/uploads/${path}/${file.fileName}`)
    }
    return paths
  }

  static async deleteFiles(files: string[]) {
    files.forEach((path) => {
      // Use the unlink method to delete the file
      fs.unlink(path, (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error('An error occurred while deleting the file:', err)
          return
        }
        console.log('The file was successfully deleted!')
      })
    })
  }
}
