const React = require('react');
const test = require('ava');
const chalk = require('chalk');
const {render} = require('ink-testing-library');
const App = require('./ui');

test('check start text', t => {
	const {lastFrame} = render(<App/>);

	t.is(lastFrame(), chalk`Input the code from an authenticator app:`);
});
