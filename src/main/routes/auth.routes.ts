import { Router } from "express";
import { expressRouteAdapter } from "../adapters/expressRoutesAdapter";
import { makeSignUpController } from '../factories/signupComposer'
import { makeLoginController } from '../factories/loginComposer'
export default (router: Router): void => { 
    router.post('/singup', expressRouteAdapter(makeSignUpController()))
    router.post('/login', expressRouteAdapter(makeLoginController()))
}