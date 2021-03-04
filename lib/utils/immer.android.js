import origProduce, { enableES5 } from 'immer'

const isHermes = () => !!global.HermesInternal

const produceES5 = (...args) => {
  enableES5()

  return origProduce.apply(null, args)
}

const produce = isHermes ? produceES5 : origProduce

export default produce
