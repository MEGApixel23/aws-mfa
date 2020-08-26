[![npm](https://img.shields.io/badge/npm-0.0.2-blue)](https://www.npmjs.com/package/aws-mfa-cli)

# AWS MFA CLI

If you have set up the
[Multi-factor Authentication](https://aws.amazon.com/iam/features/mfa)
for your AWS account in order to use AWS CLI with this account you'll
need to use Authenticator app to generate temporary credentials. Our AWS
MFA CLI does that for you and creates a new temporary account within
~/.aws/credentials file.

## Installation

1. If you are using NVM run ```nvm install```. Otherwise just use Node
   v12+
2. Run ```npm i```

## Usage

1. Copy ```.env.example``` file to ```.env```
2. Fill out the ```.env``` file with credentials of your main AWS
   account. Here's a description of the variables:

- PROFILE_NAME - the name of the new temporary profile. For example,
  ```mfa```
- MAIN_PROFILE_NAME - the name of your main AWS profile which you set
  up. More details on the initial AWS CLI configuration
  [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- ACCOUNT_NUMBER - your main AWS account ID.
  [How to find your AWS ID](https://www.apn-portal.com/knowledgebase/articles/FAQ/Where-Can-I-Find-My-AWS-Account-ID)
- ACCOUNT_NAME - your IAM User name. To find it use
  [this](https://www.apn-portal.com/knowledgebase/articles/FAQ/Where-Can-I-Find-My-AWS-Account-ID)
  instruction, but instead look for ```IAM User``` in a dropdown
- TOKEN_TTL - defines for how much seconds is the temporary account is
  valid for. Max value is ```129600``` seconds (36 hours)

3. Run ```npm start``` and input an MFA token from your authenticator
   app.
4. Press enter and wait for the app to finish.
5. Done. You can use your newly generated AWS profile within
   ```TOKEN_TTL``` time.

## Contribution

We'll be happy to help if you have any issues or suggestions. PRs are
welcome!

