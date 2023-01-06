import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

//IPost é uma interface que descreve um post e que é necessária para adicionar, listar e eliminar operações de posts.
//Quando se adiciona um post, caso não seja identificado um id, o NeDB irá associar um id automaticamente.
export interface IPost {
    nmb: number;
    author: string,
    body: string,
}

// Um objeto do tipo NeDB Datastore, que será criado, bem como o path para a posts.db.
// A Nedb carrega o ficheiro aotumaticamente caso ainda não exista é criado.
export class Microposts {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "posts.db"),
            autoload: true
        });
    }

    public getPost(postNumber: number): Promise<IPost> {
        return new Promise((inResolve, inReject) => {
            this.db.find({nmb: postNumber}, // é chamado dentro da promise o método find() na DataStore no qual o resultado que será retornado
                                            // é o de apenas um post em posts.db
                (inError: Error | null, inNewDoc: IPost) => { // visto que sabe,os que os objetos que serao retornados sao do tipo IPost podemos usar como argumento o inNewDoc
                    if (inError) {//rejeitamos a promise ou retornamos um objeto de documentos que contem os nossos objetos
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public getPosts(): Promise<IPost[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},// é chamado dentro da promise o método find() na DataStore no qual o resultado que será retornado
                            // é o de todos e os dados em posts.db (que representa todos os posts)
                (inError: Error | null, inNewDoc: IPost[]) => { // visto que sabe,os que os objetos que serao retornados sao do tipo IPost podemos usar como argumento o inNewDoc
                    if (inError) {//rejeitamos a promise ou retornamos um objeto de documentos que contem os nossos objetos
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public addPost(inPost: IPost): Promise<IPost> {     // inPost como primeiro argumento
        return new Promise((inResolve, inReject) => {   // este método passa o objeto adicionaodo para a callback que irºa possuir um campo , sendo esse obejto rentornado caller e ao client, de maneira a aparecer no ecrã
            this.db.insert(inPost,
                (inError: Error | null, inNewDoc: IPost) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }


    public updatePost(inPost: IPost): Promise<void> {   // inPost como primeiro argumento
        return new Promise((inResolve, inReject) => {   // este método passa o objeto adicionaodo para a callback que irºa possuir um campo , sendo esse obejto rentornado caller e ao client, de maneira a aparecer no ecrã
            this.db.update({nmb: inPost.nmb}, {nmb: inPost.nmb, author: inPost.author, body: inPost.body} , {},
                (inError: Error | null) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }

    public deletePost(nr: number): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({nmb: nr},{}, // este método recebe o nr do post e é necessário que exista um post com esse nr
                (inError: Error | null) => {// como a callback representa  o número de posts removidos, à partida será sempre 1
                                            // entao desde que a promise nao seja rejeitada, o post será sempre removido com sucesso
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }
}