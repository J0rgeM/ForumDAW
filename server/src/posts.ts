import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

export interface IPost {
    number: number;
    author: string,
    body: string,
}

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
            this.db.find({number: postNumber},
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

    public getPosts(): Promise<IPost[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inNewDoc: IPost[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public addPost(inPost: IPost): Promise<IPost> {
        return new Promise((inResolve, inReject) => {
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

    public updatePost(inPost: IPost, inText: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.update({number: inPost.number}, {number: inPost.number, author: inPost.author, body: inText} , {},
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
            this.db.remove({number: nr},{},
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
}