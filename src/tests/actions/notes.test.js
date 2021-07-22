import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';

import { types } from "../../types/types";
import { db } from "../../firebase/firebase-config";
import { startLoadingNotes, startNewNote, startSaveNote } from "../../actions/notes";

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'hOJ70xan4pSEIw852oQD',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('debe de crear una nueva note startNewNote', async () => {
        await store.dispatch( startNewNote() );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // Borrar el registro insertado para no acumular
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();
    });

    test('startLoadingNotes debe cargar las notas', async () => {
        // En los scripts del package.json en el script de test tuve quea agregar jest --env=node
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
          id: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
          date: expect.any(Number) 
        };

        expect( actions[0].payload[0] ).toMatchObject( expected );
    });

    test('startSaveNote debe de actualizar la nota', async () => {
        const note = {
            id: 'hOJ70xan4pSEIw852oQD',
            title: 'My Custom Title',
            body: 'body'
        };

        await store.dispatch( startSaveNote(note) );
        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();
        expect( docRef.data().title ).toBe( note.title );
    });
});