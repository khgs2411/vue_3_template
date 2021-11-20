import {Store} from "vuex";
import {createStore} from "vuex-extensions";
import indexM from "./modules/indexM";
import GLOBAL_MUTATIONS from "@/helpers/GLOBAL_MUTATIONS"

export default createStore(Store, {
    modules: {
        index: indexM,
    },
    mixins: {
        mutations: {
            setProperty: GLOBAL_MUTATIONS.SET_PROPERTY,
            updateIndexInArray: GLOBAL_MUTATIONS.UPDATE_INDEX_IN_ARRAY,
            setObject: GLOBAL_MUTATIONS.SET_OBJECT,
            updateArray: GLOBAL_MUTATIONS.UPDATE_ARRAY,
            filterArrayByKey: GLOBAL_MUTATIONS.FILTER_ARRAY_BY_KEY,
            resetState: GLOBAL_MUTATIONS.RESET_STATE,
        },
    },
});
