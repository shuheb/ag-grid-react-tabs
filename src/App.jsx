import React, {Component} from 'react';
import './App.css';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

import {connect, Provider} from 'react-redux';

import MyGrid from "./myGrid";

import 'react-tabs/style/react-tabs.css';

import store from "./store";
import {bindActionCreators} from "redux";
import {actions} from "./actions/gridActions";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gridState: []
        }
    }

    // check if there the grid state has been saved in local storage, and set it to the store
    componentDidMount() {
        let gridState = JSON.parse(window.localStorage.getItem('gridState'));

        if (gridState) {
            this.props.actions.restoreState(gridState)
        }
    }

    // creates a new tab for a grid, an action is dispatched with a url for a dataset and the column definitions
    // this will then dispatch another action to retrieve the data from the url provided
    addNewTab(event) {
        let payload = {};
        let url = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json';
        let colDefs = [{field: 'athlete'}, {field: 'age'}, {field: 'country'}, {field: 'year'}, {field: 'date'}, {field: 'sport'}, {field: 'gold'}, {field: 'silver'}, {field: 'bronze'}, {field: 'total'}];

        payload = {
            url: url,
            colDefs: colDefs
        };

        this.props.actions.newTab(payload)

    }

    // when the button 'Save All Tabs' is clicked, the redux store is saved to local storage
    saveAllTabs(event) {
        let gridState = JSON.stringify(this.props.grids);
        window.localStorage.setItem('gridState', gridState)
    }

    render() {
        const tabs = this.props.grids.map(g => <Tab key={g.name}>{g.name}</Tab>);
        const tabPanels = this.props.grids.map(g => <TabPanel key={g.name}><Provider store={store}><MyGrid
            gridId={g.name} gridState={this.state.gridState}/></Provider></TabPanel>);
        return (
            <div>
                <button className={'button'} onClick={this.addNewTab.bind(this)}>Add Tab</button>
                <button className={'button'} style={{marginLeft: '10px'}} onClick={this.saveAllTabs.bind(this)}>Save All
                    Tabs
                </button>
                <Tabs>
                    <TabList>
                        {tabs}
                    </TabList>
                    {tabPanels}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    grids: state.grids
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);






