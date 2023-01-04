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
class Microposts {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "posts.db"),
            autoload: true
        });
    }
    getPost() {
        return new Promise((inResolve, inReject) => {
            this.db.find({}, (inError, inNewDoc) => {
                if (inError) {
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
    updatePost(inPost, inText) {
        return new Promise((inResolve, inReject) => {
            this.db.update({ _id: inPost.number }, { _id: inPost.number, author: inPost.author, body: inText }, {}, (inError) => {
                if (inError) {
                    console.log("ola");
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    }
    deletePost(inPost) {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inPost.number }, {}, (inError) => {
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
