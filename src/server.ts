import { app } from './app'
import './database/connection'

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`🖥  server is running on port ${PORT}`))
