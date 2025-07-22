# reactCodes

# Parcel

- Does Dev Build for us
- Provides us Local Server
- HMR = Hot Module Replacement i.e render the changes on save of file \*\*
- It integrates file watching algorithm using C++
- It gives us faster build by using caching technique \*\*
- It will do image optimization
- It will Minify our file while doing production build
- It will dp bundling for us
- It will do compressing for us
- It will do consistant hashing for us
- It will do code splitting for us
- It will do differntial bundling for us
- It will do error handling for us
- It will allow us to host our app on HTTPs
- It will help us perform Tree Shaking algorithm \*\*
- It will create different dev and prod build

# Codes (Creating react elements and using them)

//Single Child

// const heading = React.createElement(
// "h1",
// { id: "heading", xyz: "fdada" },
// "This is hello world from React"
// );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

//Multiple Child

// const parent = React.createElement("div", {id: "parent"},
// [React.createElement("h1", {id: "child"}, "This is Heading h1 in React"),
// React.createElement("h2", {id: "child2"}, "This is Heading h2")]
// )
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent);

// Functional Component with return
// const Title = () => {
// return (
// <div>
// <h1 className="heading" tabIndex="2">
// This is Title for Component
// </h1>
// </div>
// );
// };
// const element = <span>This is just a extra element</span>;
// const title2 = (
// <div>
// {element}
// <h2>This is 2nd Title using React Element</h2>;
// </div>
// );

// Functional Component without return
// const HeadingComponent = () => (
// <div id="container">
// <Title />
// {title2}
// <h1>This is Functional Component</h1>;
// </div>
// );

//Assignment chapter 3 using createElement
// const element = React.createElement("div", { className: "title" }, [
// React.createElement("h1", {}, "This is Heading H1"),
// React.createElement("h2", {}, "This is Heading H2"),
// React.createElement("h3", {}, "This is Heading H3"),
// ]);

//Using JSX and Functional Component
// const Element = () => (
// <div className="heading">
// <h1>This is Heading H1</h1>
// <h2>This is Heading H2</h2>
// <h3>This is Heading H3</h3>
// </div>
// );

//NavBar Changes
// const HeaderComponent = () => (
// <>
// <div className="header">
// <img
// src="https://www.freepnglogos.com/uploads/logo-facebook-png/logo-facebook-facebook-logo-transparent-png-pictures-icons-and-0.png"
// alt="Facebook Icon"
// className="icon"
// ></img>
// <div className="nav-items">
// <input className="searchBar" type="text" placeholder="Search Here" />
// <img
// src="https://img.icons8.com/?size=32&id=22396&format=png"
// alt="User Icon"
// className="userIcon"
// />
// </div>
// </div>
// </>
// );

# Redux Toolkit

- Install @reduxjs/toolkit and react-redux
- Build our store
- Connect our store to our app
- Create a cart slice
- Dispatch action
- Read data using Selector
