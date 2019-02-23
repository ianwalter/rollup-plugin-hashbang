import { join } from 'path'
import test from 'ava'
import { rollup } from 'rollup'
import Subpub from '@ianwalter/subpub'
import hashbang from '..'

test('hashbang is preserved', async t => {
  const input = join(__dirname, 'fixtures/cli.js')
  const bundler = await rollup({ input, plugins: [hashbang()] })
  const { output } = await bundler.generate({ format: 'cjs' })
  t.snapshot(output[0].code)
})

test('no hashbang, no problem', async t => {
  const input = join(__dirname, 'fixtures/mod.js')
  const bundler = await rollup({ input, plugins: [hashbang()] })
  const { output } = await bundler.generate({ format: 'cjs' })
  t.snapshot(output[0].code)
})

test('prepend false', async t => {
  const input = join(__dirname, 'fixtures/cli.js')
  const bundler = await rollup({
    input,
    plugins: [hashbang({ prepend: false })]
  })
  const { output } = await bundler.generate({ format: 'cjs' })
  t.snapshot(output[0].code)
})

test('publishes hashbang', async t => {
  return new Promise(async resolve => {
    const subpub = new Subpub()
    subpub.sub('hashbang', hashbang => {
      t.snapshot(hashbang)
      resolve()
    })
    const input = join(__dirname, 'fixtures/cli.js')
    const bundler = await rollup({ input, plugins: [hashbang({ subpub })] })
    await bundler.generate({ format: 'cjs' })
  })
})
