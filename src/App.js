import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    //this is the Staring point here routing is done whenever user clicks the start button then quiz page is loaded
    /* to understand the code visit file in below given order
    1: start.js
    2: quiz.js
    3: questionsection.js
    
    */
    <div className="App">
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/Quiz" component={Quiz} />
      </Switch>
    </div>
  );
}

export default App;
