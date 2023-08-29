const StyleDictionaryModule = require('style-dictionary')
const { makeSdTailwindConfig } = require('sd-tailwindcss-transformer')

const sdConfig = makeSdTailwindConfig({
  type: 'all',
  source: ['./src/tokens/tokens.json'],
  transforms: ['attribute/cti', 'name/cti/kebab'],
  buildPath: `./`,
  tailwind: {
    content: ['./src/**/*.{ts,tsx}']
  }
})

const StyleDictionary = StyleDictionaryModule.extend(sdConfig)
StyleDictionary.buildAllPlatforms()
