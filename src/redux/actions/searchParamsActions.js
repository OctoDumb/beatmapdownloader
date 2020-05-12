export function addMode(mode) {
    return {
        type: 'ADD_MODE',
        mode
    }
}

export function addCategory(category) {
    return {
        type: 'ADD_CATEGORY',
        category
    }
}

export function switchGeneral(general) {
    return {
        type: 'SWITCH_GENERAL',
        general
    }
}

export function addQuery(e) {
    let query = e.target.value;

    return {
        type: 'ADD_QUERY',
        query
    }
}