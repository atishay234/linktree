import axios from "axios";
import PageNotFound from "./PageNotFound";
import LinktreeListItem from "./LinktreeListItem";
import { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { tree: [], notFound: false };
  }
  async componentDidMount() {
    const res = await axios.post(
      `http://localhost:8080/profile/${this.props.match.params.username}`
    );
    if (res.data === "notfound") this.setState({ notFound: true });
    else this.setState({ tree: res.data.tree });
  }
  render() {
    return (
      <div className="text-center">
        {this.state.notFound ? (
          <PageNotFound />
        ) : (
          <div>
            <h1>{this.props.match.params.username}</h1>
            {this.state.tree.map((item) => (
              <div className="LinktreeListItem p-2">
                <LinktreeListItem key={item._id} item={item} homePage={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
