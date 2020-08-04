

//  for the file uploader
function getMedia() {
    console.log(`[getMedia] ${__dirname}`)
    if (!fs.existsSync(dbFile)) {
        return []
    }

    // split by the new-lines
    mediaList = fs.readFileSync(dbFile, 'utf8').split('\n')
    return mediaList
}

function saveMedia(mediaData) {
    fs.appendFileSync(dbFile, `${mediaData.imageUrl}\n`)
}

