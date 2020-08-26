const {homedir} = require('os');
const {exec} = require('child_process');
const {readFileSync, writeFileSync} = require('fs');

module.exports.getCredentials = async ({token, mainProfileName, accountNumber, accountName, tokenTtl}) => {
	const command =
    `AWS_PROFILE=${mainProfileName} ` +
    'aws sts get-session-token ' +
    `--serial-number arn:aws:iam::${accountNumber}:mfa/${accountName} ` +
    `--token-code ${token} ` +
    `--duration-seconds ${tokenTtl}`;
	const {Credentials: {AccessKeyId, SecretAccessKey, SessionToken}} = await new Promise((resolve, reject) => {
		exec(command, (err, stdout) => {
			if (err) {
				return reject(err);
			}

			if (stdout) {
				try {
					return resolve(JSON.parse(stdout));
				} catch (error) {
					return reject(error);
				}
			}

			return reject(err);
		});
	});

	return {AccessKeyId, SecretAccessKey, SessionToken};
};

module.exports.writeProfile = profileName => ({AccessKeyId, SecretAccessKey, SessionToken}) => {
	const regExp = new RegExp(`(\\[${profileName}][.\\s\\S]+\\[?)`, 'm');
	const content =
		`[${profileName}]\n` +
		`aws_access_key_id=${AccessKeyId}\n` +
		`aws_secret_access_key=${SecretAccessKey}\n` +
		`aws_session_token=${SessionToken}\n`;
	const credentialsFilePath = `${homedir()}/.aws/credentials`;
	const originalContent = readFileSync(credentialsFilePath).toString();
	const newContent = regExp.test(originalContent) ?
		originalContent.replace(regExp, content) : `${originalContent}\n\n${content}`;

	return writeFileSync(credentialsFilePath, newContent);
};
