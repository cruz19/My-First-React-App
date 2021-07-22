import { types } from "../../types/types";
import { authReducer } from "../../reducers/authReducer";

describe('Pruebas en el authReducer', () => {

    test('debe de realizar el login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Fernando'
            }
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({ uid: 'abc', name: 'Fernando' });
    });

    test('debe de realizar el logout', () => {
        const initState = {
            uid: '841848183481fkadkf',
            name: 'Fernando'
        };
        const action = {
            type: types.logout
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({});
    });

    test('no debe de hacer cambios en el initState', () => {
        const initState = {
            uid: '841848183481fkadkf',
            name: 'Fernando'
        };
        const action = {
            type: ''
        };
        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
    });

});