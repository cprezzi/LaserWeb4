import { combineReducers } from './undo'

import { camera, resetCamera } from './camera'
import { documents } from './document'
import { gcode } from './gcode'
import { operations, currentOperation, operationsAddDocuments, fixupOperations } from './operation'
import panes from './panes'
import { settings } from './settings'
import { splitters } from './splitters'
import { workspace } from './workspace'

const combined = combineReducers({ camera, documents, operations, currentOperation, gcode, panes, settings, splitters, workspace });

export default function reducer(state, action) {
    switch (action.type) {
        case 'CAMERA_RESET':
            return {...state, camera: resetCamera(state.camera, state.settings) };
        case 'DOCUMENT_REMOVE':
            state = combined(state, action);
            return {...state, operations: fixupOperations(state.operations, state.documents) };
        case 'OPERATION_ADD_DOCUMENTS':
            state = combined(state, action);
            return {...state, operations: operationsAddDocuments(state.operations, state.documents, action) };
        default:
            return combined(state, action);
    }
}
