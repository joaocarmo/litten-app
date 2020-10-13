import user from './user.json'
import littenAdopt from './litten-adopt.json'

littenAdopt.user = user

const littens = [...Array(10)].map((v, i) => {
  const newLitten = JSON.parse(JSON.stringify(littenAdopt))
  newLitten._id = `${littenAdopt._id}-${i}`
  return newLitten
})

export { user, littens, littenAdopt }
