import { join } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Star Wars API',
            version: '1.0.0',
            description: 'Este é um projeto Rest API que gerencia planetas, sistemas estelares, personagens e naves espaciais do universo Star Wars.',
        },
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'accessToken'
                }
            }
        },
        security: [{
            cookieAuth: []
        }]
    },
     apis: [join(__dirname, '../routes/*.ts')],
};

const specs = swaggerJSDoc(options);

export default specs;