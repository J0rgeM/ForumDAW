import React, { useState } from "react";
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function AddPost() {
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    /**
     * enviamos um post request com o axios com as informacoes necessarias
     * para adicionar um post a bd e depois o utilizador e redirecionado
     * para a pagina principal
     * faz-se preventDefault para prevenir que o browser execute a acao
     * default do elemento
     * @param e event relaciondo a submissao
     */
    const addPost = async (e) => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.post(
                "http://localhost:8080/addPost",
                {
                    author: JSON.stringify(author),
                    body: JSON.stringify(body),
                    headers: {
                        "Content-type": "text/plain",
                    },
                }
            );
            console.log(response);
            window.location.href = "http://localhost:3000";
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * form template com botao de submissao e dois campos
     * para preencher com o nome do autor e com o conteudo
     * do post
     */
    return (
        <div>
            <Navbar />
            <div className="container text-center">
                <form
                    onSubmit={(e) => addPost(e)}
                    className="shadow p-3 mb-5 bg-white rounded"
                >
                    <h1 className="mt-2">Post</h1>
                    <div className="mb-3">
                        <label form="inputTitle" className="form-label">
                            Message
                        </label>
                        <input
                            type="textarea"
                            className="form-control m-1"
                            id="inputPost"
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="State your name"
                        ></input>
                        <input
                            type="textarea"
                            className="form-control m-1"
                            id="inputPost"
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Content of your post"
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-dark">
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddPost;
