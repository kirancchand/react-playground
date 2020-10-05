import React from "react";
import { render } from "react-dom";
import { createStore, bindActionCreators, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import { Provider, connect } from "react-redux";
import rootSaga from './saga'
import Table from "./components/Table";



const GET_DATA="PAGE_NAME/GET_DATA"
const SET_DATA="PAGE_NAME/SET_DATA"
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {...state,isLoading:true};
    case "SET_DATA":
      return {countries:action.data,isLoading:false};
    default:
      return state;
  }
};
const data={
  isLoading: false,
  countries:[]
}
const sagaMiddleware=createSagaMiddleware();
const store = createStore(reducer, data, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);//or helloSaga

class App extends React.Component {
  constructor(){
    super();
    this.state={
      country:[],
    };
  }
  componentDidMount(){
      this.props.getData();
       // fetch('https://restcountries.eu/rest/v2/all')
       //  .then(res => res.json())
       //  .then((countries) => {
       //    this.setState({countries })
       //  })
       //  .catch(console.log)
      }

  render() {
    // console.log(this.state.countries);
    // const countrydata=this.state.country;
    // const { getData } = this.props;
    // const { data } = this.props;

    const view =this.props.data.isLoading? "Loading..." : <Table data={this.props.data.countries}/>

    // const data=[{
    //   name:"india",
    //   capital:"delhis"
    // },
    // {
    //   name:"america",
    //   capital:"washington"
    // },
    // ];
    // <Tables data={data} countrydata={countrydata}/>
    return (
      <div>
          
        {view}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData: () => ({ type: "GET_DATA" })
    },
    dispatch
  );
}

function mapStateToProps(state) {
  debugger;
  return {
    data: state
  };
}

const EnhancedApp = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={store}>
    <EnhancedApp />
  </Provider>,
  document.getElementById("root")
);
