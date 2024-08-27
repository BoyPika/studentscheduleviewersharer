import '../src/app.css'
import SignUp from './SignUp.svelte'

const app = new SignUp({
  target: document.getElementById('app')!,
})

export default app
