import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
        <h1>Foods App</h1>
        <div>
            <p>Welcome</p>
        </div>

    <Link to= '/recipes'>
    <button>Enter</button>
    </Link>
    </div>
  )
}
