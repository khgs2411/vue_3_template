const getVariableFromString = (state, path) => {
    const [head, ...rest] = path.split('.');
    if (!rest.length) {
        return state[head];
    }
    return getVariableFromString(state[head], rest.join('.'));
}

const GLOBAL_MUTATIONS = {
    
    /**
     *
     * @param state
     * @param nested
     * @param key
     * @param value
     * @constructor
     */
    SET_PROPERTY(state, {nested, key, value}) {
        console.log('setProperty')
        if (nested) {
            state[nested][key] = value;
        } else {
            state[key] = value;
        }
    },
    
    /**
     *
     * @param state
     * @param path
     * @param value
     * @param safe
     * @constructor
     */
    SET_OBJECT(state, {path, value, safe}) {
        const setObject = (state, path, value, safe) => {
            const [head, ...rest] = path.split('.');
            if (!rest.length) {
                if (safe) {
                    for (let key in value) if (state[head].hasOwnProperty(key)) {
                        state[head][key] = value[key]
                    }
                    return;
                }
                state[head] = value[key]
                return;
            }
            setObject(state[head], rest.join('.'), value, safe);
        }
        setObject(state, path, value, safe);
    },
    
    /**
     *
     * @param state
     * @param nested
     * @param array
     * @param iterator
     * @param iterator_value
     * @param key
     * @param value
     * @param boolean
     * @constructor
     */
    UPDATE_INDEX_IN_ARRAY(state, {path_to_array, nested, array, iterator, iterator_value, key, value, toggle = false}) {
        if (toggle && (value === true || value === false || parseInt(value) === 1 || parseInt(value) === 0)) {
            state[array] = state[array].map(item => {
                item[key] = value === true ? false : value === false ? true : value === 1 ? 0 : 1;
                return item;
            })
        }
        let arrayToIterate;
        if (path_to_array) {
            arrayToIterate = getVariableFromString(state, path_to_array)
        } else {
            arrayToIterate = nested ? state[nested][array] : state[array];
        }
        arrayToIterate.forEach(item => {
            if (item[iterator] === iterator_value) {
                item[key] = value;
            }
        })
    },
    
    /**
     *
     * @param state
     * @param path_to_array
     * @param array
     * @param modifiedItems
     * @param key
     * @constructor
     */
    UPDATE_ARRAY(state, {nested, array, modifiedItems, key}) {
        state[array] = state[array].map((row) => {
            let modified = modifiedItems.find(item => item[key] === row[key]);
            if (modified) {
                row = modified;
            }
            return row;
        });
    },
    
    /**
     *
     * @param state
     * @param defaultState
     * @constructor
     */
    RESET_STATE(state, defaultState) { // pass reference to state initialization function
        Object.assign(state, defaultState());
    },
    
    /**
     *
     * @param state
     * @param nested
     * @param array
     * @param values
     * @param key
     * @constructor
     */
    FILTER_ARRAY_BY_KEY(state, {nested, array, values, key}) {
        let filteredArray = [];
        nested ? filteredArray = state[nested][array] : filteredArray = state[array];
        values.forEach(val => {
            filteredArray = filteredArray.filter(item => {
                return item[key].toString() !== val.toString();
            })
        })
        nested ? state[nested][array] = filteredArray : state[array] = filteredArray;
    }
    
}
export default GLOBAL_MUTATIONS