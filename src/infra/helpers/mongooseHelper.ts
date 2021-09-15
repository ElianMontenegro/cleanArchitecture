import mongoose from "mongoose";
class MongooseHelper {

    client: any
    db : any
    public async connect(uri: string){
        await mongoose.connect(uri)
        this.client = mongoose.connection;
    } 

    public async disconnect(){
        await this.client.close()
        this.client = null
    } 

    public getCollection (name: string) {
        return this.client.db.collection(name)
    }
}

export const mongooseHelper = new MongooseHelper()

