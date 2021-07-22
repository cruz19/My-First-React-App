import { types } from "../../types/types";
import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";

describe('Pruebas en ui-actions', () => {

    test('todas las acciones deben de funcionar', () => {
        const action = setError('HELP!!!');
        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'HELP!!!'
        });

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(removeErrorAction).toStrictEqual({
            type: types.uiRemoveError
        });
        expect(startLoadingAction).toStrictEqual({
            type: types.uiStartLoading
        });
        expect(finishLoadingAction).toStrictEqual({
            type: types.uiFinishLoading
        });
    });

});