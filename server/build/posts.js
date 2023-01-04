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
    getPost(postNumber) {
        return new Promise((inResolve, inReject) => {
            this.db.find({ nmb: postNumber }, (inError, inNewDoc) => {
                if (inError) {
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
    updatePost(inPost) {
        return new Promise((inResolve, inReject) => {
            this.db.update({ nmb: inPost.nmb }, { nmb: inPost.nmb, author: inPost.author, body: inPost.body }, {}, (inError) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    console.log("conseguimos");
                    inResolve();
                }
            });
        });
    }
    deletePost(nr) {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ nmb: nr }, {}, (inError) => {
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
