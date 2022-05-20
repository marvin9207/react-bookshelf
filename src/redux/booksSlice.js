import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    value: []
  },
  reducers: {
    setBooks: (state, action) => {
      state.value = action.payload.filter(book => (book !==undefined && book !==[]))
    },
    removeBook: (state, action)=>{
      state.value = state.value.filter(book=> book.isbn !==action.payload)
    },
    getBooks:()=>{
      
    }
  }
})

export const { setBooks, getBooks, removeBook } = booksSlice.actions

export default booksSlice.reducer