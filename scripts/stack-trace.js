#!/usr/bin/env node
const fs = require('fs')
const { SourceMapConsumer } = require('source-map')

const main = async () => {
  const args = process.argv.slice(2)

  const [sourceMap, lineNum, columnNum] = args
  const line = +lineNum
  const column = +columnNum
  console.log(line, column)
  console.log(typeof line, typeof column)

  const rawSourceMap = JSON.parse(fs.readFileSync(sourceMap, 'utf8'))

  await SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
    console.log(
      consumer.originalPositionFor({
        line,
        column,
      }),
    )
  })
}

main()
