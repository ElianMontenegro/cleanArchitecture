const { MongoClient, Collection } = require("mongodb");

class MongoHelper {

    client: any
    db : any
    uri : any

    public async connect(uri: string){
        this.uri = uri
        this.client  = await MongoClient.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
     
    } 

    public async disconnect(){
        await this.client.close();
        this.client = null
    } 

    public getCollection (name: string): typeof Collection {
        return this.client.db().collection(name)
    }
}

export const mongoHelper = new MongoHelper()

