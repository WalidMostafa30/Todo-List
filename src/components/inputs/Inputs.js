import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Inputs({ addPostHandler }) {
  const [input, setInput] = useState("");
  const inpt = useRef();

  function onChangeHandler(e) {
    setInput(e.target.value);
  }

  function postData() {
    const postdata = {
      id: `${Math.random()}`,
      content: input,
    };
    addPostHandler(postdata);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (input.trim().length > 0) {
      postData();
      setInput("");
      inpt.current.focus();
      toast.success("Task Added");
    } else {
      toast.error("Enter any Words to Add Task");
    }
  }

  return (
    <div className="inputs">
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          ref={inpt}
          className="form__input"
          placeholder="Add Some Tasks..."
          onChange={onChangeHandler}
          value={input}
        />
        <button className="form__btn">Post</button>
      </form>
    </div>
  );
}
