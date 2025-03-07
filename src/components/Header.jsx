import { Pill } from "lucide-react"

function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <Pill size={28} />
        <h1>MediRemind</h1>
      </div>
      <p className="tagline">Never miss your medications again</p>
    </header>
  )
}

export default Header

