import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    // Renombrar el objeto
    const { active:note } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch( startSaveNote(note) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button onClick={ handlePictureClick } className="btn">Picture</button>
                <button onClick={ handleSave } className="btn">Save</button>
            </div>
        </div>
    )
}
