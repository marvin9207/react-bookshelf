import { Col, Row } from "antd";
import BookShelf from './components/Bookshelf/Bookshelf';

function App() {

  return (
    <Row justify="center">
      <Col span={4}>
        <BookShelf />
      </Col>
    </Row>
  );
}

export default App;
