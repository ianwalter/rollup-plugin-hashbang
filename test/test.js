import { join } from 'path'
import test from 'ava'
import { rollup } from 'rollup'
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
