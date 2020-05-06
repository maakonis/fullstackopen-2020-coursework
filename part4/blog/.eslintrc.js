module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
        'jest': true,
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'extends': 'airbnb'
}