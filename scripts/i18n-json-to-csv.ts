#!/usr/bin/env ts-node
import fs from 'fs'
import flatten from 'flat'
import Papa from 'papaparse'

const ARG_REVERSE = '--reverse'
const KEY_COLUMN = "Identifiers (Don't change!)"
const DATA_COLUMN = 'Content'

const parserOptions = undefined

const print = (message: string) => console.log(message)
const printError = (message: string) => console.error(message)

const args = process.argv.slice(2)

const getFileFromArgs = () => {
  if (args.length > 0) {
    return args[0]
  }

  return null
}

const getReverseFromArgs = () => {
  if (args.length > 1) {
    return args[1] === ARG_REVERSE
  }

  return false
}

const getFileContents = (file) => {
  if (fs.existsSync(file)) {
    try {
      return fs.readFileSync(file, 'utf8')
    } catch (err) {
      printError(err)
    }
  }

  return null
}

const transposeContent: any = Object.entries

const untransposeContent: any = Object.fromEntries

const addHeaders = (content: any[]) => [[KEY_COLUMN, DATA_COLUMN], ...content]

const removeHeaders = ([headers, ...content]: any[]) => content

const main = async () => {
  const file = getFileFromArgs()
  const isReverse = getReverseFromArgs()

  if (!file) {
    printError('ERROR: Expected one argument, none given')
    process.exit(1)
  }

  const fileContents = getFileContents(file)

  if (!fileContents) {
    printError('ERROR: The file appears to be invalid')
    process.exit(1)
  }

  if (isReverse) {
    const { data: contentWithHeaders, errors }: any = Papa.parse(
      fileContents,
      parserOptions,
    )

    if (errors.length > 0) {
      printError(errors)
      process.exit(1)
    }

    const transposedContent = removeHeaders(contentWithHeaders)
    const flatContent = untransposeContent(transposedContent)
    const jsonContent = flatten.unflatten(flatContent)

    print(JSON.stringify(jsonContent, null, 2))
  } else {
    const flatContent = flatten(JSON.parse(fileContents))
    const transposedContent = transposeContent(flatContent)
    const contentWithHeaders = addHeaders(transposedContent)
    const csvContent = Papa.unparse(contentWithHeaders, parserOptions)

    process.stdout.write(csvContent)
  }

  process.exit(0)
}

main()
