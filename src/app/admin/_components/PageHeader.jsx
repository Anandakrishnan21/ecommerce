import React from 'react'

function PageHeader({children}) {
  return (
    <h1 className='text-xl font-medium'>
      {children}
    </h1>
  )
}

export default PageHeader
