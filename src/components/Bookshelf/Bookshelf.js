import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, setBooks } from "../../redux/booksSlice";
import Book from "../Book/Book";

const BookShelf = () =>{
    const dispatch = useDispatch();
    const booksData = useSelector((state) => state.books.value);
    const [, drop] = useDrop( ()=> ({
        accept: 'card',
        drop: (item)=> (console.log(item)),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));
  
    useEffect( ()=>{
        dispatch(getBooks());
    }, [dispatch]);

    const moveCardHandler = (dragIndex, hoverIndex) =>{
        const dragItem = booksData[dragIndex];
        const copyArray = [...booksData];
        const prevItem = copyArray.splice(hoverIndex, 1, dragItem);
        copyArray.splice(dragIndex,1,prevItem[0]);
        dispatch( setBooks(copyArray));
    }
  
    return (
        <>
            <div ref={drop}>
                {booksData?.map( (book, index) => {
                    return (
                    <Book moveCardHandler={moveCardHandler} index={index} key={book.isbn} data={book}></Book>
                    )
                })}
            </div>
        </>
    )
}


export default BookShelf;