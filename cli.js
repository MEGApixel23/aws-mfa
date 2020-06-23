#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ mfa

	Options
		--name  Your name

	Examples
	  $ mfa --name=Jane
	  Hello, Jane
`);

render(React.createElement(ui, cli.flags));
