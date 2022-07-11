#!/usr/bin/env ts-node
import fs from 'fs'
import path from 'path'

type Country = {
  name: {
    common: string
  }
}

const printError = (message: string) => console.error(message)

const rootDir = process.cwd()
const countriesFile = path.join(rootDir, 'lib/data/countries.json')

const sortByLC = (firstEl: Country, secondEl: Country) => {
  const {
    name: { common: firstName },
  } = firstEl
  const {
    name: { common: secondName },
  } = secondEl

  return Intl.Collator().compare(firstName, secondName)
}

const main = () => {
  if (fs.existsSync(countriesFile)) {
    try {
      const data = fs.readFileSync(countriesFile, 'utf8')
      const jsonData = JSON.parse(data)
      const sortedData = jsonData.sort(sortByLC)
      const stringData = JSON.stringify(sortedData)

      fs.writeFileSync(countriesFile, stringData, 'utf8')
    } catch (err) {
      printError(`ERROR: ${err.message}`)
      process.exit(1)
    }
  } else {
    printError(`ERROR: The file '${countriesFile}' doesn't exist`)
    process.exit(1)
  }
}

main()
