import app from './app';
import config from './config/config';

app.listen(config.app.port, () => {
    console.log('Servidor rodando na porta: ',  config.app.port);
});