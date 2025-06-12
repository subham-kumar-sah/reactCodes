import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    console.log("Parent Constructor");
  }
  async componentDidMount() {
    console.log("Parent Component Did Mount");
  }
  render() {
    console.log("Parent Render");

    return (
      <div>
        <h1></h1>
        <UserClass name={"Subahm Kumar"} location={"Bangalore"} />
        <UserClass name={"Niraj Kumar"} location={"Bangalore"} />
      </div>
    );
  }
}

export default About;
