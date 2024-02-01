import React, { useEffect, useState } from "react";
import "./css/App.css";
import Header from "./components/header/Header";
import Inputs from "./components/inputs/Inputs";
import Boxs from "./components/boxs/Boxs";
import { Toaster } from "react-hot-toast";
import { data } from "./Data";

const App = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todo")) {
      setColumns(JSON.parse(localStorage.getItem("todo")));
    } else {
      setColumns(data);
    }
  }, []);

  function addPostHandler(postdata) {
    const updatedData = [...columns];
    updatedData[0] = {
      ...updatedData[0],
      items: [...updatedData[0].items, postdata],
    };
    localStorage.setItem("todo", JSON.stringify(updatedData));
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
