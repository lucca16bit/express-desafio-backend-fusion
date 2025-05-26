import app from './app';
import config from './config/config';

app.listen(config.port, () => {
    console.log('Servidor rodando na porta: ',  config.port);
});