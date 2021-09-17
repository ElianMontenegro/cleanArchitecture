import { IController } from "../../presentation/interfaces/IController";
import { Response, Request } from "express";
import { IHttpRequest } from "../../presentation/interfaces/IHttp";

export const expressRouteAdapter = (controller : IController) => {
    return async (req : Request, res: Response) => {
        const httpRequest : IHttpRequest = {
            body : req.body,
        }
        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}