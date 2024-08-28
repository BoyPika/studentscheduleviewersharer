import '../src/app.css'
import LogIn from './LogIn.svelte'

const app = new LogIn({
  target: document.getElementById('app')!,
})

export default app
