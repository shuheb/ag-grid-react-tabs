import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./reducers/gridActions";

import {LicenseManager} from "ag-grid-enterprise";

LicenseManager.setLicenseKey('[TRIAL]_16_May_2020_[v2]_MTU4OTU4NzIwMDAwMA==b03f1f5b63303eabbc3b42a734fcc666');

class MyGrid extends Component {

    constructor(props) {
        super(props);

        this.idToFind = props.gridId;

        this.results = props.grids.filter(grid => {
            return grid.name === this.idToFind
        });

        this.state = {
            gridId: this.results[0].name,
            columnDefs: this.results[0].columnDefs,
            rowData: this.results[0].rowData,
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true
            }
        }
    }


    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };

    // this method is fired every time sorting is done on the grid and then dispatches an action to save the sort model to the store
    onSortChanged = params => {
        let stateToSave = {};
        let sortModel = params.api.getSortModel();

        stateToSave = {
            id: this.state.gridId,
            sort: sortModel
        };

        // set to redux store
        this.props.actions.saveSortState(stateToSave);
    };

    // this method is fired every time sorting is done on the grid and then dispatches an action to save the filter model to the store
    onFilterChanged = params => {
        // get filter model
        let stateToSave = {};
        let filterModel = params.api.getFilterModel();

        stateToSave = {
            id: this.state.gridId,
            filter: filterModel
        };

        // set to redux store
        this.props.actions.saveFilterState(stateToSave);
    };

    // fired whenever the grid tab is open, the grid will restore the state if it's been saved previously
    onFirstDataRendered = params => {
        if (window.localStorage.gridState) {
            let gridState = JSON.parse(window.localStorage.gridState);
            gridState.forEach(grid => {
                if (grid.name === this.state.gridId) {
                    let sort = grid.sortModel;
                    let filter = grid.filterModel;
                    this.gridApi.setSortModel(sort);
                    this.gridApi.setFilterModel(filter);
                }
            });
        }
    };

    render() {
        return (
            <div>
                <div
                    id={"myGrid"}
                    className={"ag-theme-alpine-dark"}
                    style={{
                        height: 'calc(100vh - 200px)',
                        width: '100%'
                    }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onSortChanged={this.onSortChanged}
                        onFilterChanged={this.onFilterChanged}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    grids: state.grids
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGrid);

