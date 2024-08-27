import '../src/app.css'
import Password from './Password.svelte'

const app = new Password({
  target: document.getElementById('app')!,
})

export default app
