// Dependencies ////////////////////////////////////////////
import { strict as assert } from 'node:assert'
import { closeSync, openSync, readFileSync, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'


//Config
const srcPath = 'data/theNightOfNoMoon.html'
const dstPath = 'docs/generated-schema.sql'

const sqlHeader = `\\encoding UTF8
DROP TABLE IF EXISTS periods;
DROP TABLE IF EXISTS commas;
DROP TABLE IF EXISTS the;
DROP TABLE IF EXISTS and;

CREATE TABLE Commons (
id SERIAL PRIMARY KEY,
countPeriod INT NOT NULL
countComma INT NOT NULL
countThe INT NOT NULL
countAnd INT NOT NULL
);

`
const insertCountPeriod = `INSERT INTO period (count) VALUES`

const insertCountComma = `INSERT INTO period (count) VALUES`

const insertCountThe = `INSERT INTO period (count) VALUES`

const insertCountAnd = `INSERT INTO period (count) VALUES`

const gobanConfig = {
  size: 19,
  theme: 'classic',
  coordSystem: 'A1',
  noMargin: false,
  hideMargin: false
}

const paraAll = function() {
  output =  paraAll.getElementsByTagName('p').text.removeWhiteSpace().toString();
  return output
}



const periodPull = "."
const commaPull = ","
const thePull = "the"
const andPull = "and"

const countPeriod = paraAll => {
  let countP = 0
for(let i = 0; i < paraAll.length; i++) {
  if(!periodPull.includes(paraAll[i])){
    continue
  }
  countP++
}
return countP
}

const countComma = paraAll => {
  let countC = 0
for(let i = 0; i < paraAll.length; i++) {
  if(!commaPull.includes(paraAll[i])){
    continue
  }
  countC++
}
return countC
}

const countThe = paraAll => {
  let countT = 0
for(let i = 0; i < paraAll.length; i++) {
  if(!thePull.includes(paraAll[i])){
    continue
  }
  countT++
}
return countT
}

const countAnd = paraAll => {
  let countA = 0
for(let i = 0; i < paraAll.length; i++) {
  if(!andPull.includes(paraAll[i])){
    continue
  }
  countA++
}
return countA
}

const fd = openSync(dstPath, 'w')
writeFileSync(fd, sqlHeader)

writeFileSync(fd, insertCountPeriod)
writeFileSync(fd, ` (${countPeriod()})`)

writeFileSync(fd, insertCountComma)
writeFileSync(fd, ` (${countComma()})`)

writeFileSync(fd, insertCountThe)
writeFileSync(fd, ` (${countThe()})`)

writeFileSync(fd, insertCountAnd)
writeFileSync(fd, ` (${countAnd()})`)

closeSync(fd)