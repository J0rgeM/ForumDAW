"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importação de módulos
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Posts = __importStar(require("./posts"));
const app = (0, express_1.default)();
let num = 0;
// built-in middleware for json
app.use(express_1.default.json());
//endpoint "/"
//express.static() - serve para fornecer os recursos estaticos (html, images, CSS files, and JavaScript files, etc.)
//path.join() - junta os dois argumentos e poe normal o resultado do caminho para irmos buscar um ficheiro estatico a nossa maquina
//__dirname - e o caminho da pasta atual
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
//esta funcao adiciona os headers necessarios a resposta
//inNext() - passa a proxima funcao que esta em stack do middleware
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
const microposts = new Posts.Microposts();
//Registro do path e do method para o endpoint que é utilizado para obter a lista de posts.
//app.get() - Routes HTTP GET requests to the specified path with the specified callback functions
app.get("/", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield microposts.getPosts();
        inResponse.json(post);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//Registro do path e método para o endpoint utilizado para adicionar posts, sendo que o path é /addPost
//app.post() function routes the HTTP POST requests to the specified path with the specified callback functions
app.post("/addPost", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // foi criada esta variável para passar o que se recebe para argumento para IPost
        const r = {
            nmb: num++,
            author: inRequest.body.author,
            body: inRequest.body.body,
        };
        const post = yield microposts.addPost(r);
        inResponse.json(post);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//Registro do path e do method para o endpoint que é utilizado para obter um post.
//app.get() - Routes HTTP GET requests to the specified path with the specified callback functions
app.get("/updatePost/:number", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield microposts.getPost(Number(inRequest.params.number));
        inResponse.json(post);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//Registro do path e do method para o endpoint que é utilizado para dar update a um post em especifico.
app.put("/updatePost/:number", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = {
            nmb: inRequest.body.nmb /* Number(inRequest.params.number) */,
            body: inRequest.body.body,
            author: inRequest.body.author
        };
        yield microposts.updatePost(post);
        inResponse.send("updated");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//Registro do path e do method para o endpoint que é utilizado para eliminar um post em especifico.
app.delete("/:number", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield microposts.deletePost(parseInt(inRequest.params.number));
        inResponse.send("deleted");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.listen(8080, () => console.log("listening"));
