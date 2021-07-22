import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dh1wpvoji', 
    api_key: '222865459758933', 
    api_secret: 'ft5dU2N6pxkBWgyI57DkVGn8LPY',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async (done) => {
        const resp = await fetch('https://www.pequeocio.com/wp-content/uploads/2018/09/simple-perfect.jpg');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect( typeof url ).toBe( 'string' );

        // Borrar imagen de prueba por id
        const segments = url.split('/');
        const imageId = segments[segments.length-1].replace('.png', '');
        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done();
        } );
    });

    test('debe de retornar un error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect( url ).toBe( null );
    });

});