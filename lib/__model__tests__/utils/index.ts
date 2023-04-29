import firebase from 'firebase/compat/app'
import { initializeTestEnvironment } from '@firebase/rules-unit-testing'

export const projectId = 'litten-app'

export const cleanFirestore = async () => {
  const testEnv = await initializeTestEnvironment({
    projectId,
  })

  await Promise.all(firebase.apps.map((app) => app.delete()))
  await testEnv.clearFirestore()
}

export const mapName =
  <T>(key: string) =>
  (object: T): T =>
    Object.assign(object, {
      toString() {
        return this[key]
      },
    })
