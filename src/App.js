import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Video from "./Pages/Video";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Add /> } />
        <Route path="/list" element={ <List /> } />
        <Route path="/video/:id" element={ <Video /> } />
      </Routes>
    </div>
  );
}

export default App;
