import React, { useEffect, useState } from "react";
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { IPost } from "../../server/src/posts";
import { useParams } from "react-router-dom";

function UpdatePost() {
    let params = useParams();
    const [post, setPost] = useState<IPost[]>([]);
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    /**
     * enviamos um get request com o axios e esperamos pela promise
     * da-nos um post com o numero dado
     * @param nmb numero do post
     */
    const getPost = async (nmb: any) => {
        try {
            const response: AxiosResponse = await axios.get<IPost[]>(
                "http://localhost:8080/updatePost/" + String(nmb)
            );
            setPost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * envia um put request como axios com a informacao necessaria
     * para dar update ao post com o numero nmb
     * faz-se preventDefault para prevenir que o browser execute a acao
     * default do elemento
     * @param e event relacionado com a submissao
     * @param nmb numero do post
     */
    const updatePost = async (e, nmb: any) => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.put(
                "http://localhost:8080/updatePost/" + String(nmb),
                {
                    nmb: nmb,
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

    /**
     * form template com botao de submissao e dois campos
     * para preencher com o nome do autor e com o conteudo
     * do post
     */
    return (
        <div>
            <Navbar />
            {post.map((post) => (
                <div key={post.nmb} className="container text-center">
                    <form
                        onSubmit={(e) => updatePost(e, post.nmb)}
                        className="shadow p-3 mb-5 bg-white rounded"
                    >
                        <h1 className="mt-2">Post</h1>
                        <div className="mb-3">
                            <input
                                type="textarea"
                                className="form-control m-1"
                                id="inputPost"
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder={post.author}
                            ></input>
                            <input
                                type="textarea"
                                className="form-control m-1"
                                id="inputPost"
                                onChange={(e) => setBody(e.target.value)}
                                placeholder={post.body}
                            ></input>
                        </div>
                        <button type="submit" className="btn btn-dark">
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
