// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

/* eslint-disable turbo/no-undeclared-env-vars */
require("dotenv").config();
const { spawn } = require("child_process");

const privateKeyPath = ".ssh/private_key";
const verboseFlag = "-v";
const noRemoteCmdFlag = "-N";
const remoteServer = process.env.REMOTE_SERVER;
const localPortForwardingFlag = "-L";
const localPort = 5000;
const forwardingServer = process.env.FORWARDING_SERVER;

const sshCommand = "ssh";
const sshArgs = [
  "-i",
  privateKeyPath,
  verboseFlag,
  noRemoteCmdFlag,
  remoteServer,
  localPortForwardingFlag,
  `${localPort}:${forwardingServer}`,
];

const sshProcess = spawn(sshCommand, sshArgs);

sshProcess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

sshProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

sshProcess.on("close", (code) => {
  console.log(`SSH process exited with code ${code}`);
});

sshProcess.on("error", (error) => {
  console.error(`Error executing SSH command: ${error.message}`);
});
