import React from "react";
import UserContext from "../util/UserContext";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: null,
    };
    console.log(this.props.name + "Constructor");
  }
  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/subham-kumar-sah");
    const response = await data.json();
    this.setState({ data: response });
    console.log("Response:", response);
    console.log(this.props.name + "Component Did Mount");
  }
  render() {
    const { name, location, avatar_url } = this.state.data || {};
    console.log(this.props.name + " Render");
    return (
      <>
        <h2>This is Class Component</h2>
        <img src={avatar_url} alt="Avatar" />
        <h4>My name is {name}</h4>
        <h4>My location is {location}</h4>
        <UserContext.Consumer>
          {({ loggedInUser }) => <h4>Logged in User: {loggedInUser}</h4>}
        </UserContext.Consumer>
      </>
    );
  }
}

export default UserClass;
