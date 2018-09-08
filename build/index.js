import Koa from 'koa'
import webpack from 'webpack'
import historyApiFallback from '@overra/koa-history-api-fallback'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from './config/webpack.dev'
import prodConfig from './config/webpack.prod'

const app = new Koa()

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
const compiler = webpack(config)

const webpackMiddleware = devMiddleware(compiler, {
  publicPath: config.output.publicPath,
})

app.use(hotMiddleware(compiler))
app.use(webpackMiddleware) // serve up webpack content
app.use(historyApiFallback()) // catch any other requests and redirect to /index.html
app.use(webpackMiddleware)

// Serve the files on port 3000.
app.listen(process.env.PORT || 3000)
