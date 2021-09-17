import { Router } from "express";
import { expressRouteAdapter } from "../adapters/expressRoutesAdapter";
import { makeSignUpController } from '../factories/signup'
export default (router: Router): void => { 
    router.post('/singup', expressRouteAdapter(makeSignUpController()))
}