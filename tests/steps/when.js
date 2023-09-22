"use strict";

const _ = require("lodash");
const Promise = this.Promise || require("promise");
const agent = require("superagent-promise")(require("superagent"), Promise);

const makeHttpRequest = async (path, method, options) => {
  let root = process.env.TEST_ROOT;
  let url = `${root}/${path}`;
  let httpReq = agent(method, url);
  let body = _.get(options, "body");

  console.log(body);
  let idToken = _.get(options, "idToken");
  console.log(`invoking HTTP ${method} ${url}`);

  try {
    httpReq.set("Authorization", idToken);
    if (body) {
      console.log(`Tratando de enviar: ${JSON.stringify(body)}`)
      httpReq.send(body);
      console.log(`AQUI YA NO LLEGA`)
    }
    let response = await httpReq;

    console.log(`AQUI TAMPOCO`)

    return {
      statusCode: response.status,
      body: response.body,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.status,
      body: null,
    };
  }
};

exports.we_invoke_createNote = (options) => {
  let response = makeHttpRequest("notes", "POST", options);
  return response;
};
