import { createConnection } from 'typeorm'
import { updateProfiles } from 'utils/typeorm/updateProfilesTable'

createConnection().then(async () => {
  await updateProfiles()
})
