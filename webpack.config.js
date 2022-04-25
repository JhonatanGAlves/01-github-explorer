// Como o webpack roda dentro do node, tem que ser usado o require.
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Para usar o Fast Refresh => yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

/* NODE_ENV é uma varável que precisa ser criada dentro de process.env que é onde são declarado as variáveis de ambiente, para através desta variável eu consigo configurar algo baseado no ambiente da minha aplicação. Nesse caso, quero configurar se a aplicação está em ambiente de desenvolvimento ou de produção. */

/* No Linux e no MAC, basta digitar no terminal o comando => NODE_ENV=production yarn webpack, que pronto, a variável de ambiente é criada/definida. Porém, para windows isso não funciona, então é preciso instalar uma dependência, o yarn add cross-env -D e lá no arquivo package.json, criar dentro de scripts dois comandos de execução, um para dev e um para build. O comando dev vai receber "webpack serve" e assim rodar "yarn dev" no terminal que é o equivalente a yarn webpack serve, e o comando build vai receber "cross-env NODE_ENV=production webpack" com isso, através do cross-env irá criar a variável NODE_ENV passando production para ela e modificar o webpack. */
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  // Por padrão vem com o mode 'production' que faz com que a conversão demore um pouco mais
  mode: isDevelopment ? 'development' : 'production',
  // Faz com que o arquivo de erro no console seja o mesmo de desenvolcimento e não o convertido.
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  // No windows, esse tipo de / é dessa forma \, logo, o usar o diretório 'src/index.jsx' daria problema no windows por conta da /.
  // Por isso é utilizado da forma abaixo.
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //__dirname == o caminho que o arquio webpack está localizado no seu projeto.
  // O objeto abaixo está referenciando o arquivo convertido que é interpretado pelo browser.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  //
  resolve: {
    // Por padrão, o webpack só le aquivos js, então é necessário passar um array com as extensões a ser lidas.
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  /* Estou referenciando para o dev server o caminho para o meu arquivo estático, no caso, o index.html, dessa forma é automatizado o processo de conversão. Sendo assim, não à mais necessidade de rodar toda vez o yarn webpack quando a aplicação sofrer alterações, basta dar um yarn webpack server. */ 
  devServer: {
    static: path.resolve(__dirname, 'public'),
    // Faz parte do ReactRefreshWebpackPlugin
    hot: true
  },
  // Está dizendo qual template HTML o webpack tem que seguir.
  plugins: [
    /* ReactRefreshWebpackPlugin() serve para as variáveis de estado não resetar o seu valor quando a página sofrer relaod. Mas isso somente em ambiente de desenvolvimento. */
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean), // Plugins não pode retornar um boolean, então é feito isso pra ele filtrar e excluir algum boolean
  // Module é responsável por ditar quais extensões será tratada de tal.
  module: {
    /* A regra abaixo diz o seguinte, encontre arquivos .jsx que estou tentando importar e exclua de node module utilizando o babel-loader (faz a ligação entre o babel e webpack. Ele converte o arquivo que está sendo importado para uma maneira em que o browser consiga interpretar, utilizando o babel. No caso do CSS, utilizando o style-loader e css-loader em conjunto (ambos precisam ser instalados => yarn add style-loader css-loader -D)) */
    rules: [
      {
        // Para referenciar os arquivos, foi utilizado expressões regulares (Regex).
        test: /\.(j|t)sx/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            // Faz parte do ReactRefreshWebpackPlugin
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }

        }
      },
      {
        test: /\.scss/,
        exclude: /node_module/,
        // sass-loader é um pré processador css, para funcionalidades a mais no css. para isso basta instalar
        // => yarn add sass-loader -D e => yarn add node-sass -D, referenciar dentro do array abaixo e mudar test para scss.
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}