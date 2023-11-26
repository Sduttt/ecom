'use client';
import { useParams } from 'next/navigation'
import React from 'react'

const Category = () => {
    const param = useParams()
  return (
    <div>
        {param.id}
    </div>
  )
}

export default Category