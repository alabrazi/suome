import React, {Component} from 'react';
import './App.css';
import 'typeface-roboto';
//import TestRoutes from './TestRoutes';
//import TestRoutes from './TestRoutes';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
class App extends Component {

  render() {
    return (<div>
      <React.Fragment>
        <CssBaseline/>
        <Routes/>
      </React.Fragment>
    </div>);
  }
}

export default App;
