import {render} from "@testing-library/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";

// Funcao que envolve um componente
// children = conteudo dentro das tags
const BaseProviders = ({ children }: any) => (
    <BrowserRouter>{children}</BrowserRouter>
);

export const renderWithRouter = (component: React.ReactElement) =>
    render(component, {
        wrapper: (props) => <BaseProviders {...props} />,
    });
// children está dentro das props
// <BaseProvider> children </BaseProvider> = BaseProviders {...props} />