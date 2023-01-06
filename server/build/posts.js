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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Microposts = void 0;
const path = __importStar(require("path"));
const Datastore = require("nedb");
// Um objeto do tipo NeDB Datastore, que será criado, bem como o path para a posts.db.
// A Nedb carrega o ficheiro aotumaticamente caso ainda não exista é criado.
class Microposts {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "posts.db"),
            autoload: true
        });
    }
    getPost(postNumber) {
        return new Promise((inResolve, inReject) => {
            this.db.find({ nmb: postNumber }, // é chamado dentro da promise o método find() na DataStore no qual o resultado que será retornado
            // é o de apenas um post em posts.db
            (inError, inNewDoc) => {
                if (inError) { //rejeitamos a promise ou retornamos um objeto de documentos que contem os nossos objetos
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    getPosts() {
        return new Promise((inResolve, inReject) => {
            this.db.find({}, // é chamado dentro da promise o método find() na DataStore no qual o resultado que será retornado
            // é o de todos e os dados em posts.db (que representa todos os posts)
            (inError, inNewDoc) => {
                if (inError) { //rejeitamos a promise ou retornamos um objeto de documentos que contem os nossos objetos
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    addPost(inPost) {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inPost, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    updatePost(inPost) {
        return new Promise((inResolve, inReject) => {
            this.db.update({ nmb: inPost.nmb }, { nmb: inPost.nmb, author: inPost.author, body: inPost.body }, {}, (inError) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    }
    deletePost(nr) {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ nmb: nr }, {}, // este método recebe o nr do post e é necessário que exista um post com esse nr
            (inError) => {
                // entao desde que a promise nao seja rejeitada, o post será sempre removido com sucesso
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    }
}
exports.Microposts = Microposts;
