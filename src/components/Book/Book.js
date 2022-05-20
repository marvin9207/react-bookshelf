import { Button, Card } from "antd";
import PropTypes from 'prop-types';
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { removeBook } from "../../redux/booksSlice";

const Book = ({moveCardHandler, index = 0, data}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [ {isDragging}, drag ] = useDrag( ()=> ({
        type: "card",
        item: {id: data.isbn, index: index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    const [, drop] = useDrop({
        accept: 'card',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
           
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));
    
    return (
        <Card ref={ref} style={{ width: 300, marginBottom: '30px', opacity }} title={data.title}>
            <p><strong>Author:</strong> {data.author}</p>
            <Button onClick={()=>{dispatch( removeBook(data.isbn))}} danger>Remove</Button>
        </Card>
    )
};

Book.propTypes = {
    moveCardHandler: PropTypes.func,
    index: PropTypes.number,
    data: PropTypes.object
};

export default Book;