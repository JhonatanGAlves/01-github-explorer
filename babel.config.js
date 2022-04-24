module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {
      runtime: 'automatic' // Faz com que não seja obrigatório a utilização do import React em arquivos com HTML
    }]
  ]
}