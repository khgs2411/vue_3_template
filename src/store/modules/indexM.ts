import api from "@/api/modules/indexA"

const getDefaultState = (): Object => {
    return {
        stateVariable: "Default state variable",
    };
}

export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {},
    actions:{},
}
