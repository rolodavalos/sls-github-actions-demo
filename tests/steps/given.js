"use strict";

const {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

exports.an_authenticated_user = async () => {
  const userpoolId = process.env.USER_POOL_ID;
  const clientId = process.env.CLIENT_ID;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  const params = {
    UserPoolId: userpoolId,
    ClientId: clientId,
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  const command = new AdminInitiateAuthCommand(params);
  const user = await client.send(command);
  
  return user;
};
