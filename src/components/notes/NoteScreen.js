import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {
    const dispatch = useDispatch();
    // Renombrar el objeto desestructurado
    const { active:note } = useSelector(state => state.notes);

    // Formulario
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id } = formValues;

    const activeId = useRef( note.id );
    useEffect(() => {
        // Solo se ejecuta si el id de la nota cambia
        if (note.id !== activeId.current) {
            reset( note );
            activeId.current = note.id;
        }
    }, [note, reset]);

    // Se dispara cuando los valores del formulario cambian
    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}) );
    }, [formValues, dispatch]);

    // Eliminar nota
    const handleDelete = () => {
        dispatch( startDeleting(id) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    name="title"
                    value={ title }
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    onChange={ handleInputChange }
                    autoComplete="off" />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    value={ body }
                    onChange={ handleInputChange }
                    className="notes__textarea"></textarea>

                {
                    note?.url &&
                    (
                        <div className="notes__image">
                            <img alt={ note.title } src={ note.url } />
                        </div>
                    )
                }
            </div>

            <button onClick={ handleDelete } className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}
