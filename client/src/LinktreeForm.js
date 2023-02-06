import useHandleChange from "./hooks/useHandleChange";
import React from "react";
import TextField from "@mui/material/TextField";

import "./css/LinktreeForm.css";

function LinktreeForm({ insertTreeData }) {
  const [text, handleChangeText, handleResetText] = useHandleChange("");
  const [url, handleChangeUrl, handleResetUrl] = useHandleChange("");
  const handleSubmit = (e) => {
    e.preventDefault();
    insertTreeData(text, url);
    handleResetText();
    handleResetUrl();
    document.querySelector("#title").focus();
  };

  return (
    <form className="linktree-form" onSubmit={handleSubmit}>
      <div className="linktree-title">
        {/* <label htmlFor="title">Title</label> */}
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          size="small"
          type="text"
          value={text}
          onChange={handleChangeText}
          className="mb-3"
          color="dark"
        />
      </div>
      <div className="linktree-url">
        {/* <label htmlFor="url">URL</label> */}
        {/* <input type="url" id="url" value={url} onChange={handleChangeUrl} /> */}
        <TextField
          id="url"
          label="Link"
          variant="outlined"
          size="small"
          type="text"
          value={url}
          onChange={handleChangeUrl}
          className="mb-3"
          color="dark"
        />
      </div>
      <button className="btn btn-large submit-button">Add new</button>
    </form>
  );
}
export default LinktreeForm;
