const React = require('react');
const {Text, Box, useInput, useApp} = require('ink');
const {getConfigVar} = require('./config');
const {getCredentials, writeProfile} = require('./lib/authenticator');

const tokenTtl = getConfigVar('TOKEN_TTL');
const profileName = getConfigVar('PROFILE_NAME');
const accountName = getConfigVar('ACCOUNT_NAME');
const accountNumber = getConfigVar('ACCOUNT_NUMBER');
const mainProfileName = getConfigVar('MAIN_PROFILE_NAME');

const App = () => {
	const {exit} = useApp();
	const [token, setToken] = React.useState('');
	const [done, setDone] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [isProcessing, setIsProcessing] = React.useState(false);

	useInput((input, key) => {
		if (key.delete || key.backspace) {
			setToken(token.slice(0, -1));

			return;
		}

		if (key.return) {
			setIsProcessing(true);
			(async () => {
				try {
					const cred = await getCredentials({token, profileName, mainProfileName, accountNumber, accountName, tokenTtl});

					writeProfile(profileName)(cred);
					setDone(true);
				} catch (error) {
					setError(error);
				} finally {
					setIsProcessing(false);
					exit();
				}
			})();

			return;
		}

		setToken(`${token}${input}`);
	});

	return (
		<>
			{token !== false && (
				<Box>
					<Text>
						Input the code from an authenticator app: <Text color="green">{token}</Text>
					</Text>
				</Box>
			)}
			{isProcessing && (
				<Box>
					<Text color="blue">Processing...</Text>
				</Box>
			)}
			{error && (
				<>
					<Text color="red">Error</Text>
					<Text color="red">{error.message}</Text>
				</>
			)}
			{done && (
				<Text color="green">Credentials were successfully updated!</Text>
			)}
		</>
	);
};

module.exports = App;
