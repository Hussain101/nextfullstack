import React from 'react'

const UserProfile = ({params}) => {
  console.log("🚀 ~ file: page.tsx:4 ~ UserProfile ~ params:", params)
  return (
    <div>
        <p>
            your are on 
            {params.id}
        </p>
    </div>
  )
}

export default UserProfile