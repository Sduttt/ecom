'use client'
import React from 'react'
import AdminProtected from '@/middleware/AdminProtect'
import { AddBookForm } from '@/components'

const AddBook = () => {
  return (
    <>
      <h1 className="">Add a book</h1>
      <AddBookForm />
    </>
  )
}

export default AdminProtected(AddBook)