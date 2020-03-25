import {types} from "./gridTypes";

export default function gridReducer(state = {}, action) {
    const payload = action.payload;
    switch (action.type) {
        case types.NEW_TAB:
            break;
        case types.NEW_TAB_DATA:

            return {
                grids: [
                    ...state.grids,
                    newTab(payload.config.count, payload.config.colDefs, payload.config.data)
                ]
            };
        case types.SAVE_SORT_STATE:
            let newGridsSort = addSortModelToStore(payload.config.id,payload.config.sort,state.grids);

            return {
                grids: newGridsSort
            };

        case types.SAVE_FILTER_STATE:
            let newGridsFilter = addFilterModelToStore(payload.config.id,payload.config.filter,state.grids);

            return {
                grids: newGridsFilter
            };

        case types.RESTORE_STATE:
            return {
                grids: [ ...payload.config ]
            };
        default:
            return state;
    }
}

const newTab = (count,colDefs,data) => {
    let tabId = count + 1;
    return {
        name:'grid'+tabId,
        columnDefs:colDefs,
        rowData:data
    }
};

const addSortModelToStore = (id,sortModel,currentStore) => {
    return currentStore.map((grid) => {
        if (id === grid.name) {
            return {
                ...grid,
                sortModel: sortModel
            }
        }
        return {
            ...grid
        };
    });
};

const addFilterModelToStore =  (id,filterModel,currentStore) => {
    return currentStore.map((grid) => {
        if (id === grid.name) {
            return {
                ...grid,
                filterModel: filterModel
            }
        }
        return {
            ...grid
        };
    });
};



