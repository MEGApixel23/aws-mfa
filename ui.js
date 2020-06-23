const React = require('react');
const {Text, Color, Box, useInput, useApp} = require('ink');
const {getCredentials, writeProfile} = require('./lib/authenticator');
const {getConfigVar} = require('./config');

const profileName = getConfigVar('PROFILE_NAME');
const mainProfileName = getConfigVar('MAIN_PROFILE_NAME');
const accountNumber = getConfigVar('ACCOUNT_NUMBER');
const accountName = getConfigVar('ACCOUNT_NAME');
const tokenTtl = getConfigVar('TOKEN_TTL');

const App = () => {
	const [token, setToken] = React.useState('');
	const [done, setDone] = React.useState(false);
	const {exit} = useApp();

	useInput((input, key) => {
		if (key.return) {
			getCredentials({token, profileName, mainProfileName, accountNumber, accountName, tokenTtl})
				.then(writeProfile(profileName))
				.then(() => {
					setDone(true);
					exit();
				});

			return;
		}

		setToken(`${token}${input}`);
	});

	return (
		<>
			{token !== false && (
				<Box>
					<Text>
						Input the code from an authenticator app: <Color green>{token}</Color>
					</Text>
				</Box>
			)}
			{done && (
				<Text>Credentials were successfully updated!</Text>
			)}
		</>
	);
};

module.exports = App;
