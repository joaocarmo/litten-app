#!/usr/bin/env ts-node
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'
import {
  DB_USER_COLLECTION,
  DEFAULT_CONTACT_PREFERENCES,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
} from '../../lib/utils/constants/app'
import type { ContactPreferences } from '../../lib/model/types/user'

const dryRun = true

const projectId = 'litten-app'

const print = (message: string) => console.log(message)
const printError = (message: string) => console.error(message)

const convertPreferences = (preferences: string[]): ContactPreferences => {
  const result: ContactPreferences = {
    [USER_PREFERENCES_CONTACT_CALL]: false,
    [USER_PREFERENCES_CONTACT_EMAIL]: false,
    [USER_PREFERENCES_CONTACT_INAPP]: false,
    [USER_PREFERENCES_CONTACT_SMS]: false,
  }

  preferences.forEach((preference) => {
    switch (preference) {
      case 'USER_PREFERENCES_CONTACT_CALL':
        result[USER_PREFERENCES_CONTACT_CALL] = true
        break
      case 'USER_PREFERENCES_CONTACT_EMAIL':
        result[USER_PREFERENCES_CONTACT_EMAIL] = true
        break
      case 'USER_PREFERENCES_CONTACT_INAPP':
        result[USER_PREFERENCES_CONTACT_INAPP] = true
        break
      case 'USER_PREFERENCES_CONTACT_SMS':
        result[USER_PREFERENCES_CONTACT_SMS] = true
        break
      default:
        break
    }
  })

  return result
}

const migrateContactPreferences = async (
  documentSnapshot: QueryDocumentSnapshot<DocumentData>,
) => {
  print(`Migrating contact preferences for user '${documentSnapshot.id}'`)
  const user = documentSnapshot.data()
  const oldPreferences = user.contactPreferences
  const newPreferences = Array.isArray(oldPreferences)
    ? convertPreferences(oldPreferences)
    : DEFAULT_CONTACT_PREFERENCES

  try {
    print(`  Old preferences: ${JSON.stringify(oldPreferences)}`)
    print(`  New preferences: ${JSON.stringify(newPreferences)}`)

    if (dryRun) {
      return
    }

    await documentSnapshot.ref.update({
      contactPreferences: {
        ...DEFAULT_CONTACT_PREFERENCES,
        ...newPreferences,
      },
    })
  } catch (error) {
    print(
      `Error migrating contact preferences for user '${documentSnapshot.id}': ${error}`,
    )
  }
}

const main = async () => {
  try {
    print(`Initialising project '${projectId}'`)

    const app = initializeApp({ projectId })

    const db = getFirestore(app)

    print(`Using collection '${DB_USER_COLLECTION}'`)
    const dbUsers = db.collection(DB_USER_COLLECTION)

    const querySnapshot = await dbUsers.get()

    if (!querySnapshot.empty) {
      print(`Migrating contact preferences${dryRun ? ' [dry run]' : ''}...`)

      querySnapshot.forEach(migrateContactPreferences)
    }

    await Promise.resolve(() => {
      console.log('Done')
      process.exit(0)
    })
  } catch (error) {
    printError(`Error: ${error}`)
    setImmediate(() => {
      process.exit(1)
    })
  }
}

main()
