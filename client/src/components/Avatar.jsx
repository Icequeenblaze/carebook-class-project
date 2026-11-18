import React from 'react'

function Avatar({name, size, color}) {
    const initials = name.split(" ").filter(Boolean).map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  return (
    <span className={`avatar avatar-${size}`} style={{background: color}}>{initials || "?"}</span>
  )
}

export default Avatar