
import './App.css';
import Start from './components/Start';
import Quiz from './components/Quiz';
import {Switch,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">

        <Switch>
        <Route  exact path="/" component={Start}/>
        <Route  exact  path="/Quiz" component={Quiz}/>
       </Switch>

    </div>
  );
}

export default App;
