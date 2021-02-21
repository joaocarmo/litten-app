import { apps, clearFirestoreData } from '@firebase/rules-unit-testing'

export const projectId = 'litten-app'

export const cleanFirestore = async () => {
  await Promise.all(apps().map((app) => app.delete()))

  await clearFirestoreData({ projectId })
}

export const mapName = (key) => (object) =>
  Object.assign(object, {
    toString: function () {
      return this[key]
    },
  })

export const getRandInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
