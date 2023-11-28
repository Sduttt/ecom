'use client'
import React from 'react'
import AdminProtected from '@/middleware/AdminProtect'

const AddBook = () => {
  return (
    <div>AddBook</div>
  )
}

export default AdminProtected(AddBook)