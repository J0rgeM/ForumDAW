//Importação de módulos
import express, {Express, NextFunction, Request, Response} from "express";
import path from "path";
import {IPost} from "./posts";
import * as Posts from "./posts";

const app : Express = express();
let num: number = 0;

// built-in middleware for json
app.use(express.json());

//endpoint "/"
//express.static() - serve para fornecer os recursos estaticos (html, images, CSS files, and JavaScript files, etc.)
//path.join() - junta os dois argumentos e poe normal o resultado do caminho para irmos buscar um ficheiro estatico a nossa maquina
//__dirname - e o caminho da pasta atual
app.use("/", express.static(path.join (__dirname, "../../client/dist")));

//esta funcao adiciona os headers necessarios a resposta
//inNext() - passa a proxima funcao que esta em stack do middleware
app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

const microposts: Posts.Microposts = new Posts.Microposts();

//Registro do path e do method para o endpoint que é utilizado para obter a lista de posts.
//app.get() - Routes HTTP GET requests to the specified path with the specified callback functions
app.get("/", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const post: IPost[] = await microposts.getPosts();
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

//Registro do path e método para o endpoint utilizado para adicionar posts, sendo que o path é /addPost
//app.post() function routes the HTTP POST requests to the specified path with the specified callback functions
app.post("/addPost", async (inRequest: Request ,inResponse: Response ) => {
    try {
        // foi criada esta variável para passar o que se recebe para argumento para IPost
        const r : IPost = {
            nmb: num++,
            author: inRequest.body.author,
            body: inRequest.body.body,
        }
        const post: IPost = await microposts.addPost(r);        
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para obter um post.
//app.get() - Routes HTTP GET requests to the specified path with the specified callback functions
app.get("/updatePost/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const post: IPost = await microposts.getPost(Number(inRequest.params.number));
        inResponse.json(post);
    } catch (inError) {
        inResponse.send("error") ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para dar update a um post em especifico.
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

//Registro do path e do method para o endpoint que é utilizado para eliminar um post em especifico.
app.delete("/:number", async (inRequest: Request ,inResponse: Response ) => {
    try {
        await microposts.deletePost(parseInt(inRequest.params.number));
        inResponse.send("deleted");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.listen(8080, () => console.log("listening"))
