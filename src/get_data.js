const fs = require("fs-extra")
const fetch = require('node-fetch')
// const data = fs.readJSONSync("data/sample_data.json")

const {API_KEY, API_HOST} = fs.readJSONSync("credentials.json")
const {API_URL, API_ARGUMENTS} = fs.readJSONSync("API.json")
// API_ARGUMENTS.API_KEY = [API_KEY];


const prepareAPI_URL = function(args) {
    return API_URL.replace(/\${\w+}/g, match => {
        return args[match.slice(2,-1)][0]
    })
}

const CAHCHE_VALID_TIME = 60 * 1000

const REQUEST_CACHE_FILE_PATTERN  = "request_cache/${FILENAME}"
const REQUEST_CACHE_FILE  = "request_cache/cachefile.json"
const requestCache = fs.existsSync(REQUEST_CACHE_FILE) ? fs.readJSONSync(REQUEST_CACHE_FILE) : {}








exports.getData = async () => {
    const reqURL = prepareAPI_URL({...API_ARGUMENTS, API_HOST: [API_HOST], API_KEY: [API_KEY]})
    console.log("SEARCHING FOR", requestCache, reqURL)

    const date = Date.now();
    let match;
    if (requestCache[reqURL]) {
        match = requestCache[reqURL].find(item => date - item.date < CAHCHE_VALID_TIME);
    }
    if (match) {
        console.log("PULLED FROM CACHE", reqURL)
        return await fs.readJSON(match.file)

    } else {
        console.log("REQUESTING DATA", reqURL)

        const data = await fetch(reqURL)
          .then(res => res.json())

        const fileName = REQUEST_CACHE_FILE_PATTERN.replace("${FILENAME}", "123.json")
        
        console.log("PULLE, SAVING", fileName)
        await fs.writeJSON(fileName, data)
        
        requestCache[reqURL] = requestCache[reqURL] || []
        requestCache[reqURL].push({
            date: date,
            file: fileName
        })

        await fs.writeJSON(REQUEST_CACHE_FILE, requestCache)

        return data
    }

}