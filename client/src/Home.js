import { createContext, useState } from "react";
import axios from "axios";

import LinktreeForm from "./LinktreeForm";
import LinktreeList from "./LinktreeList";

import "./css/Home.css";

export const HelperLinktreeContext = createContext();

function Home() {
  const linktree = JSON.parse(window.sessionStorage.getItem("linktree"));
  const username = JSON.parse(
    window.sessionStorage.getItem("userdata")
  ).username;

  const [tree, setTree] = useState(linktree.tree);

  const insertTreeData = async (text, url) => {
    if (!text.length || !url.length) return alert("Fill all the entries.");
    const res = await axios.post("http://localhost:8080/linktree", {
      userId: linktree.user,
      text,
      url,
    });
    window.sessionStorage.setItem("linktree", JSON.stringify(res.data));
    setTree(res.data.tree);
  };

  const deleteItem = async (itemId) => {
    const data = {
      userId: linktree.user,
      treeId: itemId,
    };
    await axios.delete("http://localhost:8080/linktree", {
      data,
    });
    const res = await axios.post(
      `http://localhost:8080/linktree/${linktree.user}`
    );
    window.sessionStorage.setItem("linktree", JSON.stringify(res.data));
    setTree(res.data.tree);
  };

  const updateItem = async (itemId, text, url) => {
    // Add spinner or loader with true
    const data = {
      userId: linktree.user,
      treeId: itemId,
      text,
      url,
    };
    const res = await axios.put("http://localhost:8080/linktree", data);
    window.sessionStorage.setItem("linktree", JSON.stringify(res.data));
    setTree(res.data.tree);
    // Make spinner or loader value false
  };
  return (
    <HelperLinktreeContext.Provider value={{ tree, deleteItem, updateItem }}>
      <div className="Home">
        <LinktreeForm insertTreeData={insertTreeData} />
        <LinktreeList />
        <p>
          Your site is hosted at:{" "}
          <a target="_blank" href={`http://localhost:3000/${username}`}>
            <i>{`http://localhost:3000/${username}`}</i>
          </a>
        </p>
      </div>
    </HelperLinktreeContext.Provider>
  );
}

export default Home;
