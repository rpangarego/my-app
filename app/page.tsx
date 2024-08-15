"use client";

import { Contract, providers, utils } from "ethers";
import React, { useState, useRef } from "react";
import { CirclePlus } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoContent from "./components/TodoContent";
import web3Modal from "web3modal";

type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export default function Home() {
  const [walletConnected, setWalletConnected] = useState<Boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const web3ModalRef = useRef();

  const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Connect wallet button clicked!");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoInput) {
      const newTodo = [
        ...todos,
        {
          id: todos.length + 1,
          content: todoInput,
          isCompleted: false,
        },
      ];
      setTodos(newTodo);
      setTodoInput("");
    }
  };

  const handleChecklist = (id: Number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: Number) => {
    const todoList = todos.filter((todo) => todo.id !== id);
    setTodos(todoList);
  };

  const renderTodoContent = () => {
    if (!walletConnected) {
      return (
        <p>
          Please connect to your <br /> metamask wallet to continue.
          <br />
          <br />
          <button className="btn btn-primary" onClick={handleConnect}>
            Connect
          </button>
        </p>
      );
    } else if (walletConnected) {
      if (!todos.length) {
        return <p>You have nothing to do (yet)</p>;
      } else {
        const todoContent = todos.map((todo) => (
          <TodoContent
            id={todo.id}
            content={todo.content}
            isCompleted={todo.isCompleted}
            handleChecklist={handleChecklist}
            handleDelete={handleDelete}
          />
        ));
        return todoContent;
      }
    }
  };

  return (
    <div className="w-3/4 my-10 mx-auto sm:w-3/4 md:w-3/5 lg:w-2/4 xl:w-1/4">
      <Header walletStatus={walletConnected} />

      {/* TODO LIST COMPONENT */}
      <div className="bg-white shadow-md mt-5 border rounded-lg p-5">
        {/* FORM: INPUT AND BUTTON */}
        <div className="mb-5">
          <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-5/6 input-text"
              placeholder="Type your plan..."
              disabled={Boolean(!walletConnected)}
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className={`w-1/6 flex justify-center btn ${
                walletConnected ? "btn-primary" : "btn-disabled"
              }`}
              disabled={Boolean(!walletConnected)}
            >
              <CirclePlus />
            </button>
          </form>
        </div>

        {/* TODO CONTENT */}
        <div
          className={`flex min-h-[25rem] ${
            todos.length
              ? "flex-col gap-3"
              : "justify-center items-center text-gray-500 text-center"
          }`}
        >
          {renderTodoContent()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
