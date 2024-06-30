import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [selId, setSelId] = useState(0);

  useEffect(() => {
    // console.log("hello");
    // let url = "http://localhost:3000/todos";
    // let method = "GET";
    // fetch(url, { method })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setTodos(data);
    //   });

    handleFetchData();
  }, []);

  const handleAddTodo = () => {
    console.log(todo);
    if (selId != 0) {
      // let newList = todos.map((t) =>
      //   t.id == selId
      //     ? { title: todo, isCompleted: t.isCompleted, id: t.id }
      //     : t
      // );
      // setTodos(newList);
      let item = todos.find((t) => t.id == selId);
      axios
        .put("http://localhost:3000/todos/" + selId, {
          title: todo,
          isCompleted: item.isCompleted,
        })
        .then((res) => {
          // console.log(res.data);
          setTodos(res.data);
        });
      setSelId(0);
    } else {
      // setTodos([{ title: todo, isCompleted: false, id: Date.now() }, ...todos]);
      axios
        .post("http://localhost:3000/todos", {
          id: Date.now(),
          title: todo,
          isCompleted: false,
        })
        .then((res) => {
          // console.log(res.data);
          setTodos(res.data);
        });
    }
    setTodo("");
  };

  const handelTodoChange = (id) => {
    // let newList = todos.map((t) =>
    //   t.id == id ? { title: t.title, isCompleted: !t.isCompleted, id: t.id } : t
    // );
    // setTodos(newList);

    let item = todos.find((t) => t.id == id);
    axios
      .put("http://localhost:3000/todos/" + id, {
        title: item.title,
        isCompleted: !item.isCompleted,
      })
      .then((res) => {
        // console.log(res.data);
        setTodos(res.data);
      });
  };

  const handleTodoDelete = (id) => {
    // let newList = todos.filter((t) => t.id != id);
    // setTodos(newList);
    axios.delete("http://localhost:3000/todos/" + id).then((res) => {
      console.log(res.data);
      setTodos(res.data);
    });
  };

  const handleTodoEdit = (id) => {
    let t = todos.find((t) => t.id == id);
    setSelId(t.id);
    setTodo(t.title);
  };

  const handleFetchData = () => {
    // let url = "http://localhost:3000/todos";
    // let method = "GET";
    // fetch(url, { method }).then((res) => {
    //   res.json().then((data) => {
    //     // console.log(data);
    //     setTodos(data);
    //   });
    // });

    axios.get("http://localhost:3000/todos").then((res) => {
      // console.log(res.data);
      setTodos(res.data);
    });
  };

  return (
    <div>
      <div>
        {/* <button onClick={handleFetchData}> Fetch Todos</button>
        <br />
        <br /> */}
        <input
          type="text"
          name="txtTodo"
          id="txtTodo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>{selId == 0 ? "Add" : "Update"}</button>
      </div>
      <div>
        {todos.map((t, index) => (
          <div key={t.id}>
            <input
              type="checkbox"
              checked={t.isCompleted}
              name={t.id}
              onChange={() => handelTodoChange(t.id)}
            />
            <span>{t.title}</span>
            <button onClick={(e) => handleTodoDelete(t.id)}>Delete</button>
            <button onClick={(e) => handleTodoEdit(t.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;


// create app 