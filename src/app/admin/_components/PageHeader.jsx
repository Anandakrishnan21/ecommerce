import React from 'react'

function PageHeader({children}) {
  return (
    <h1 className='text-lg font-medium'>
      {children}
    </h1>
  )
}

export default PageHeader
