import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import config from '../webpack.config.babel';

const app = express();

const PORT = process.env.PORT || 1337;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({limit: '500kb', extended: false}));
app.use(bodyParser.json({limit: '500kb', strict: false}));

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// API endpoints
app.use('/api', require('./api/wanted').default);

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Boxoffice running on port ${PORT}`);
});
