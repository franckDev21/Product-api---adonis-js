import vine from '@vinejs/vine'

export const updateProductImageValidator = vine.compile(
  vine.object({
    thumbnail: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
)

export const createImagesValidator = vine.compile(
  vine.object({
    images: vine.array(
      vine.file({
        size: '2mb',
        extnames: ['jpg', 'png'],
      })
    ),
  })
)
