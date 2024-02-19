//Single Child
// const heading = React.createElement(
//   "h1",
//   { id: "heading", xyz: "fdada" },
//   "This is hello world from React"
// );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);
//Multiple Child
const parent = React.createElement("div", {
    id: "parent"
}, [
    React.createElement("h1", {
        id: "child"
    }, "This is Heading h1"),
    React.createElement("h2", {
        id: "child2"
    }, "This is Heading h2")
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

//# sourceMappingURL=index.6bd02f5a.js.map
