import React, { useEffect, useState } from "react";
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "../../client/src/components/Navbar";
import Footer from "../../client/src/components/Footer";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { IPost } from "../../server/src/posts";
import { useParams } from "react-router-dom";

function UpdatePost() {
    let params = useParams();
    const [post, setPost] = useState<IPost[]>([]);
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const getPost = async (number) => {
        try {
            const response: AxiosResponse = await axios.get<IPost[]>(
                "http://localhost:8080/updatePost/".concat(number)
            );
            setPost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line
    const updatePost = async (number) => {
        try {
            const response: AxiosResponse = await axios.put(
                "http://localhost:8080/updatePost/".concat(number),
                {
                    author: JSON.stringify(author),
                    body: JSON.stringify(body),
                    headers: {
                        "Content-type": "text/plain",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        window.location.href = "http://localhost:3000";
    };
    useEffect(() => {
        getPost(params.number);
    }, []);

    return (
        <div>
            <Navbar />
            {post.map((post) => (
                <div key={post.number} className="container text-center">
                    <form className="shadow p-3 mb-5 bg-white rounded">
                        <h1 className="mt-2">Post</h1>
                        <div className="mb-3">
                            <label form="inputTitle" className="form-label">
                                Message
                            </label>
                            <input
                                type="textarea"
                                className="form-control m-1"
                                id="inputPost"
                                placeholder={post.author}
                                onChange={(e) => setAuthor(e.target.value)}
                            ></input>
                            <input
                                type="textarea"
                                className="form-control m-1"
                                id="inputPost"
                                placeholder={post.body}
                                onChange={(e) => setBody(e.target.value)}
                            ></input>
                        </div>
                        <button
                            type="submit"
                            onClick={() => updatePost(post.number)}
                            className="btn btn-dark"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ))}

            <Footer />
        </div>
    );
}

export default UpdatePost;
