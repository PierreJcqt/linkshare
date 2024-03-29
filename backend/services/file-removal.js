const fs = require('fs')

function deleteFile (imageUrl) {
  if (!imageUrl) return
  const filename = imageUrl.split('/images/')[1]
  fs.unlink(`images/${filename}`, (err) => {
    if (err) throw err;
  })
}

module.exports = {
  deleteFile
}

