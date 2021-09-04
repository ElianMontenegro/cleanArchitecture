
export class MissingParamater extends Error {
    constructor(public name:string){
        super(`Error in the Parameter: ${name}`)
        this.name = name
    }
}