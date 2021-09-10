
import { IHttpResponse } from "../interfaces/IHttp";

interface IExeption {
    statusCode : number,
    body : string
}

export const success = (data: any): IHttpResponse => ({
    statusCode: 200,
    body: data
})
export const badRequest = (message: string): IHttpResponse => ({
    statusCode: 400,
    body: message
})

export const notFound = (message: string): IHttpResponse => ({
    statusCode: 404,
    body: message
})


export const Unauthorized = (message: string): IHttpResponse => ({
    statusCode: 401,
    body: message
})


export const serverError = (message: string): IHttpResponse => ({
    statusCode: 500,
    body: message
})

export const catchException = (error: IExeption ): IHttpResponse => ({
    statusCode: error.statusCode,
    body: { error : error.body }
})