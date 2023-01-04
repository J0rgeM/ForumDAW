//Importação de módulos
import express, {Express, NextFunction, Request, Response} from "express";
import path from "path";
import {IPost} from "./posts";
import * as Posts from "./posts";
import cors from "cors";

const app : Express = express();

// built-in middleware for json
app.use(express.json());

//serve static files
app.use("/", express.static(path.join (__dirname, "../../client/dist")));

//app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));
app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

app.get("/getPost", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const microposts: Posts.Microposts = new Posts.Microposts();
        const post: IPost[] = await microposts.getPost();
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.post("/addPost", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const microposts: Posts.Microposts = new Posts.Microposts();
        // foi criada esta variável para passar o que se recebe para argumento para IPost
        const r : IPost = {
            number: (await microposts.getPost()).length + 1,
            author: inRequest.body.author,
            body: inRequest.body.body,
        }
        const post: IPost = await microposts.addPost(r);
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.put("/updatePost/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const microposts: Posts.Microposts = new Posts.Microposts();
        let post : IPost = {
            number: inRequest.body.number,
            author: inRequest.body.author,
            body: inRequest.body.body
        }
        console.log(inRequest.body)
        await microposts.updatePost(post, inRequest.body.text);
        inResponse.send("updated");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.delete("/deletePost/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const microposts: Posts.Microposts = new Posts.Microposts();
        await microposts.deletePost(parseInt(inRequest.params.number));
        inResponse.send("deleted");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.listen(8080, () => console.log("listening"))
