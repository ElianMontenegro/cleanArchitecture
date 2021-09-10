
export class MissingParamater extends Error {
    constructor(public name:string){
        super(`Error in the Parameter: ${name}`)
        this.name = name
    }
}

export class UnauthorizedError extends Error {
    constructor(){
        super("Unauthorized")
    }
}