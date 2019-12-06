import {Router, Request, Response, NextFunction} from 'express';


export class ApiV1Router {
    router: Router    

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {                
        this.router.post('/data', this.setData);
        this.router.get('/data', this.getData);
        
    }

    setData = async (req: Request, res: Response, next: NextFunction) => {

        try {
            

            let session = req.session;

            session.storedData = req.body;

            res.send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Failed")
        }
    };     

    getData = async (req: Request, res: Response, next: NextFunction) => {
    
        let session = req.session;     

        res.send(session.storedData);
    
    }

}

// Create the Router, and export its configured Express.Router
const apiRouter = new ApiV1Router();
apiRouter.init();

export default apiRouter.router;