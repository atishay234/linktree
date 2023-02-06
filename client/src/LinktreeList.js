import { useContext } from "react";
import { HelperLinktreeContext } from "./Home";
import LinktreeListItem from "./LinktreeListItem";

import "./css/LinktreeList.css";

function LinktreeList() {
  const { tree, deleteItem } = useContext(HelperLinktreeContext);
  return (
    <div className="LinktreeList">
      {tree.length &&
        tree.map((item) => {
          return (
            <div className="LinktreeListItem">
              <LinktreeListItem
                key={item._id}
                item={item}
                deleteItem={deleteItem}
                homePage={true}
              />
            </div>
          );
        })}
    </div>
  );
}

export default LinktreeList;
