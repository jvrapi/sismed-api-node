import Profile from '@entities/Profile'
import https from 'https'
import { getConnection } from 'typeorm'
import { JsonData } from 'utils/IJsonData'

const updateProfiles = async () => {
  const options = {
    host: 'api.github.com',
    path: '/gists/a35a27da8b7b83f4faea0e4df13750fa',
    port: 443,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    }
  }
  let body = ''

  const req = https.request(options, res => {
    res.setEncoding('utf8')

    res.on('data', function (chunk) {
      body = body + chunk
    })
    res.on('end', function () {
      const gistData = JSON.parse(body)
      const profiles = JSON.parse(gistData.files['profiles.json'].content)

      const connection = getConnection()
      const repository = connection.getRepository(Profile)

      profiles.forEach(async (profile: JsonData) => {
        const productAlreadyExists = await repository.findOne({
          type: profile.name
        })
        if (!productAlreadyExists) {
          try {
            const newProfile = repository.create({ type: profile.name })
            await repository.save(newProfile)
          } catch (error) {
            throw new Error('Error when try create a new product' + error)
          }
        }
      })
    })
  })
  req.end()
}
export { updateProfiles }
