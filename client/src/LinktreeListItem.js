import { useContext } from "react";
import "./css/LinktreeListItem.css";
import { LogginContext } from "./Linktree";
import useToggle from "./hooks/useToggle";

import EditingForm from "./EditingForm";

function LinktreeListItem({ item, deleteItem, homePage }) {
  const { loggedIn } = useContext(LogginContext);
  const [isEditing, toggleIsEditing] = useToggle(false);

  return (
    <>
      {isEditing ? (
        <EditingForm
          className="LinktreeList-item"
          initialText={item.text}
          initialUrl={item.url}
          itemId={item._id}
          toggleIsEditing={toggleIsEditing}
        />
      ) : loggedIn && homePage ? (
        <div key={item._id} className="row">
          <div className="col-2"></div>
          <div className="col-7">
            <a
              className="list-item-hyperlink"
              target="_blank"
              href={`${item.url}`}
            >
              <h3 className="LinktreeList-text">{item.text}</h3>
              <p className="LinktreeList-url">{item.url}</p>
            </a>
          </div>
          <div className="col-2">
            <div className="col">
              <i
                className="row-6 fas fa-trash edit-delete-icon"
                onClick={() => deleteItem(item._id)}
              ></i>
              <br />
              <i
                className="row-6 fas fa-edit edit-delete-icon"
                onClick={toggleIsEditing}
              ></i>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      ) : (
        <div className="" key={item._id}>
          <div className="row LinktreeList-item">
            <div className="col-2"></div>
            <div className="col-8">
              <a
                className="list-item-hyperlink"
                target="_blank"
                href={`${item.url}`}
              >
                <h3 className="LinktreeList-text">{item.text}</h3>
                <p className="LinktreeList-url">{item.url}</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LinktreeListItem;
