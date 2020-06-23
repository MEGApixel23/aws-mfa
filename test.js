// Import React from 'react';
// import chalk from 'chalk';
// import test from 'ava';
// import {render} from 'ink-testing-library';
// import App from './ui';
//
// test('greet unknown user', t => {
// 	const {lastFrame} = render(<App/>);
//
// 	t.is(lastFrame(), chalk`Hello, {green Stranger}`);
// });
//
// test('greet user with a name', t => {
// 	const {lastFrame} = render(<App name="Jane"/>);
//
// 	t.is(lastFrame(), 1);
// });

const fs = require('fs');
const os = require('os');

const file = fs.readFileSync(`${os.homedir()}/.aws/credentials`).toString();
// Const regExp = /(\[mfa][.\s\S]+\[?)/m;
const regExp = new RegExp('(\\[mfa][.\\s\\S]+\\[?)', 'm');

console.log(file.replace(regExp, 'test'));
