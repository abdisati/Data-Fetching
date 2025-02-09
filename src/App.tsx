import { get } from "./util/http";

function App() {
  get("https://jsonplaceholder.typicode.com/todos/1");

  return <h1>Data Fetching!</h1>;
}

export default App;
