import { apps, clearFirestoreData } from '@firebase/rules-unit-testing'

export const projectId = 'litten-app'

export const cleanFirestore = async (): Promise<void> => {
  await Promise.all(apps().map((app) => app.delete()))
  await clearFirestoreData({
    projectId,
  })
}

export const mapName =
  <T>(key: string) =>
  (object: T): T =>
    Object.assign(object, {
      toString: function () {
        return this[key]
      },
    })

export const getRandInt = (min: num, max: num): num =>
  Math.floor(Math.random() * (max - min + 1) + min)
