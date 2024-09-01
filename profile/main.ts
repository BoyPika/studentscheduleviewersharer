import '../src/app.css'
import Profile from './Profile.svelte'

const app = new Profile({
  target: document.getElementById('app')!,
})

export default app
