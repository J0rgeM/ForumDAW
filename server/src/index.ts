//Importação de módulos
import express, {Express, NextFunction, Request, Response} from "express";
import path from "path";
import {IPost} from "./posts";
import * as Posts from "./posts";

const app : Express = express();

// built-in middleware for json
app.use(express.json());

//serve static files
app.use("/", express.static(path.join (__dirname, "../../client/dist")));

app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

const microposts: Posts.Microposts = new Posts.Microposts();

app.get("/", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const post: IPost[] = await microposts.getPosts();
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.post("/addPost", async (inRequest: Request ,inResponse: Response ) => {
    try {
        // foi criada esta variável para passar o que se recebe para argumento para IPost
        const r : IPost = {
            nmb: (await microposts.getPosts()).length + 1,
            author: inRequest.body.author,
            body: inRequest.body.body,
        }
        const post: IPost = await microposts.addPost(r);
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.get("/updatePost/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const post: IPost = await microposts.getPost(Number(inRequest.params.number));
        console.log(post);
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.put("/updatePost/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const post : IPost = {
            nmb: inRequest.body.nmb/* Number(inRequest.params.number) */,
            body: inRequest.body.body,
            author: inRequest.body.author
        }
        await microposts.updatePost(post);
        inResponse.send("updated");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.delete("/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        await microposts.deletePost(parseInt(inRequest.params.number));
        inResponse.send("deleted");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.listen(8080, () => console.log("listening"))
