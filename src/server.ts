import app from './app'
import * as dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 4000

app.listen(port,()=>{
 console.log(`Running ${port}`)
})

app.on('error',(err)=>{
    console.log(err)
})

