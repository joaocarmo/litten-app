#!/usr/bin/env node
const camelCase = require('camelcase')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const util = require('util')
const { Validator } = require('jsonschema')
const baseSchema = require('../lib/translations/schemas/base.json')

const pathToTranslations = path.resolve(
  path.join(__dirname, '../lib/translations'),
)
const pathToSchemas = path.join(pathToTranslations, 'schemas')
const excludedFiles = ['base.json', 'package.json']
const jsonExt = '.json'
const validatorOptions = { required: true }
const outputFormat = '%s %s'
const outputPadding = 24

const pascalCase = (str) => camelCase(str, { pascalCase: true })
const print = console.log

const globAsync = (...args) =>
  new Promise((resolve, reject) => {
    glob(...args, (err, matches) => {
      if (err) {
        reject(err)
      }
      resolve(matches)
    })
  })

const readFileAsync = (...args) =>
  new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })

const getAllSchemas = async () => {
  const allSchemas = []
  const schemas = await globAsync(`${pathToSchemas}/*.json`)

  for (const schemaFile of schemas) {
    const fileName = path.basename(schemaFile)

    if (!excludedFiles.includes(fileName)) {
      const schemaRef = `/${pascalCase(path.basename(fileName, jsonExt))}`

      const schemaData = await readFileAsync(schemaFile, 'utf8')
      const schema = JSON.parse(schemaData)

      allSchemas.push({
        schema,
        schemaRef,
      })
    }
  }

  return allSchemas
}

const main = async () => {
  const results = {
    valid: [],
    invalid: [],
  }
  const jsonschema = new Validator()

  const subSchemas = await getAllSchemas()

  subSchemas.forEach(({ schema, schemaRef }) => {
    jsonschema.addSchema(schema, schemaRef)
  })

  try {
    const files = await globAsync(`${pathToTranslations}/*.json`)

    print(
      util.format(outputFormat, 'Translation'.padEnd(outputPadding), 'Valid'),
    )

    for (const file of files) {
      const fileName = path.basename(file)

      if (!excludedFiles.includes(fileName)) {
        try {
          const data = await readFileAsync(file, 'utf8')

          const jsonData = JSON.parse(data)
          const translation = jsonschema.validate(
            jsonData,
            baseSchema,
            validatorOptions,
          )

          let isValid = ''
          if (translation.valid) {
            results.valid.push(fileName)
            isValid = 'yes'
          } else {
            results.invalid.push(fileName)
            isValid = 'no'
          }

          print(
            util.format(outputFormat, fileName.padEnd(outputPadding), isValid),
          )
        } catch (readErr) {
          print(`Could not read the JSON file ${fileName}: ${readErr}`)
        }
      }
    }
  } catch (globErr) {
    print(`Could not read the JSON files in ${pathToTranslations}: ${globErr}`)
  }
}

main()
