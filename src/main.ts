import { mount } from 'svelte'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

import './app.css'
import App from './App.svelte'

injectSpeedInsights({ framework: 'svelte' })
inject({ framework: 'svelte' })

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
