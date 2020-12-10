import * as express from "express"

const router = express.Router()

router.get('/',(req:express.Request,res: express.Response)=>{
    res.redirect("/signin")
  //  res.send("hi")
})
export default router