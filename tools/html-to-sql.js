// Dependencies
import assert from 'assert';
import { closeSync, openSync, readFileSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser';

// Config
const srcPath = 'data/theNightOfNoMoon.html';
const dstPath = 'docs/generated-schema.sql';

const sqlHeader = `\\encoding UTF8
DROP TABLE IF EXISTS periods;
DROP TABLE IF EXISTS commas;
DROP TABLE IF EXISTS the;
DROP TABLE IF EXISTS and;

CREATE TABLE periods (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);

CREATE TABLE commas (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);

CREATE TABLE the (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);

CREATE TABLE and (
  id SERIAL PRIMARY KEY,
  count INT NOT NULL
);
`;

const insertCountPeriod = `INSERT INTO periods (count) VALUES`;
const insertCountComma = `INSERT INTO commas (count) VALUES`;
const insertCountThe = `INSERT INTO the (count) VALUES`;
const insertCountAnd = `INSERT INTO and (count) VALUES`;

const htmlContent = readFileSync(srcPath, 'utf-8');
const root = parse(htmlContent);
const textContent = root.text;

const countPeriod = (textContent) => {
  const periodPull = ".";
  let countP = 0;

  for (let i = 0; i < textContent.length; i++) {
    if (periodPull === textContent.charAt(i)) {
      countP++;
    }
  }

  return countP;
};

const countComma = (textContent) => {
  const commaPull = ",";
  let countC = 0;

  for (let i = 0; i < textContent.length; i++) {
    if (commaPull === textContent.charAt(i)) {
      countC++;
    }
  }

  return countC;
};

const countThe = (textContent) => {
  const thePull = "the";
  let countT = 0;

  for (let i = 0; i < textContent.length; i++) {
    if (thePull === textContent.substr(i, 3).toLowerCase()) {
      countT++;
      i += 2; // Skip ahead to the next word
    }
  }

  return countT;
};

const countAnd = (textContent) => {
  const andPull = "and";
  let countA = 0;

  for (let i = 0; i < textContent.length; i++) {
    if (andPull === textContent.substr(i, 3).toLowerCase()) {
      countA++;
      i += 2; // Skip ahead to the next word
    }
  }

  return countA;
};

const fd = openSync(dstPath, 'w');
writeFileSync(fd, sqlHeader);

writeFileSync(fd, `${insertCountPeriod} (${countPeriod(textContent)})\n`);
writeFileSync(fd, `${insertCountComma} (${countComma(textContent)})\n`);
writeFileSync(fd, `${insertCountThe} (${countThe(textContent)})\n`);
writeFileSync(fd, `${insertCountAnd} (${countAnd(textContent)})\n`);

closeSync(fd);
