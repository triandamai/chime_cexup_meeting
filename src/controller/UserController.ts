
import Controller from "./Controller"
import {Request,Response} from "express"

class UserController extends Controller{
    constructor(){
        super()
        
    }

    public index(req:Request,res:Response){
        res.send("hey")
    }
    public add(req:Request,res:Response){

    }
    public edit(req:Request,res:Response){

    }

    public showUser(req:Request,res:Response){
        res.render("index")
    
    }
    registerRoutes (){
        this.router.get("/api/users",this.index)
        this.router.post("/api/users",this.add)
        this.router.put("/api/users",this.edit)
        this.router.get("/users",this.showUser)
    }

}



export default new UserController().router