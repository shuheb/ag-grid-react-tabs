import {types} from "../reducers/gridTypes";
import store from "../store";

export const actions = {

    // this action returns a function to dispatch another action
    // the url for the dataset and column definitions are supplied to this action
    // the data is fetched from the url and the second action is given the data and column definitions
    newTab(config) {
        let dataAndColDefs = {
            colDefs: config.colDefs,
            data: null
        };
        return () => {
            fetch(config.url)
                .then(response => {
                        response.json()
                            .then(data => {
                                dataAndColDefs.data = data;
                                return this.newTabData(dataAndColDefs);
                            });
                    }
                )
        }
    },
    // this action is given the data and column definitions and also creates a id for each grid
    newTabData(config) {
        config.count = store.getState().grids.length;
        return {
            type: types.NEW_TAB_DATA,
            payload: {config}
        }
    },
    saveSortState(config) {
        return {
            type: types.SAVE_SORT_STATE,
            payload: {config}
        }
    },
    saveFilterState(config) {
        return {
            type: types.SAVE_FILTER_STATE,
            payload: {config}
        }
    },
    restoreState(config) {
        return {
            type: types.RESTORE_STATE,
            payload: {config}
        }
    }
};
