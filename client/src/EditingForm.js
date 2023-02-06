import { useContext } from "react";
import TextField from "@mui/material/TextField";

import { HelperLinktreeContext } from "./Home";
import useHandleChange from "./hooks/useHandleChange";

function EditingForm({ initialText, initialUrl, itemId, toggleIsEditing }) {
  const { updateItem } = useContext(HelperLinktreeContext);
  const [text, setText, resetText] = useHandleChange(initialText);
  const [url, setUrl, resetUrl] = useHandleChange(initialUrl);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem(itemId, text, url);
    resetText();
    resetUrl();
    toggleIsEditing();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3">
        <TextField
          id="text"
          label="Title"
          variant="outlined"
          size="small"
          type="text"
          value={text}
          onChange={setText}
          className="mb-3"
          color="dark"
        />
      </div>
      <div className="">
        {/* <label htmlFor="url">Url</label>
        <input type="url" name="url" id="url" value={url} onChange={setUrl} /> */}
        <TextField
          id="url"
          label="Link"
          variant="outlined"
          size="small"
          type="url"
          value={url}
          onChange={setUrl}
          className="mb-3"
          color="dark"
        />
      </div>
      <button className="btn btn-large submit-button">Edit</button>
    </form>
  );
}

export default EditingForm;
