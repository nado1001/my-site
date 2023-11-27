const StyleDictionaryModule = require('style-dictionary')
const { makeSdTailwindConfig } = require('sd-tailwindcss-transformer')
const { transformTokens } = require('token-transformer')
const { writeFileSync } = require('fs')

const tokens = require('./src/tokens/figmaToken/tokens.json')

const setsToUse = []
const excludes = []

const transformerOptions = {
  expandTypography: true,
  expandShadow: true,
  expandComposition: true,
  expandBorder: true,
  preserveRawValue: false,
  throwErrorWhenNotResolved: true,
  resolveReferences: true
}

const resolved = transformTokens(
  tokens,
  setsToUse,
  excludes,
  transformerOptions
)
delete resolved.tokenSetOrder

writeFileSync('./src/tokens/tokens.json', JSON.stringify(resolved))

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
