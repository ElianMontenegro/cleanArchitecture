import { mongooseHelper } from "../../infra/helpers/mongooseHelper";
import app from "./app";

app.listen('3000',async () => {
    await mongooseHelper.connect("mongodb+srv://elianMontenegro:elianMontenegro@cluster0.ngt7y.mongodb.net/V2CleanArchitecture?retryWrites=true&w=majority")
    console.log("server run");
})