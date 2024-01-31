import React, { useEffect, useState } from "react";
import "./css/App.css";
import Header from "./components/header/Header";
import Inputs from "./components/inputs/Inputs";
import Boxs from "./components/boxs/Boxs";
import { Toaster } from "react-hot-toast";
import { data } from "./Data";

const App = () => {
  const [columns, setColumns] = useState(data);

  useEffect(() => {
    setColumns(JSON.parse(localStorage.getItem("todos")));
  }, []);

  function addPostHandler(postdata) {
    const updatedData = [...columns];
    updatedData[0] = {
      ...updatedData[0],
      items: [...updatedData[0].items, postdata],
    };
    localStorage.setItem("todos", JSON.stringify(updatedData));
    setColumns(updatedData);
  }

  return (
    <>
      <Toaster />
      <Header />
      <Inputs addPostHandler={addPostHandler} />
      <Boxs columns={columns} setColumns={setColumns} />
    </>
  );
};

export default App;
