import { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

import Navigation from './components/NavigationComponent';
import NavigationLayoutComponent from './components/NavigationLayoutComponent';
import { intialConfiguration } from './config';

export const RobotContext = createContext(null);

function App() {
  const [imagePosition, setImagePosition] = useState(intialConfiguration.startPosition);
  const [blinkingId, setBlinkingId] = useState('');

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        moveImage(imagePosition.row + 1, imagePosition.col);
        break;
      case 'ArrowDown':
        moveImage(imagePosition.row - 1, imagePosition.col);
        break;
      case 'ArrowLeft':
        moveImage(imagePosition.row, imagePosition.col - 1);
        break;
      case 'ArrowRight':
        moveImage(imagePosition.row, imagePosition.col + 1);
        break;
      default:
        break;
    }
  };

  const handleClick = (row, col) => {
    if (blinkingId !== '') return;
    setBlinkingId(`${row}-${col}`);

    const currRow = imagePosition.row;
    const currentCol = imagePosition.col;
    const rowBoxesToMove = currRow > row ? currRow - row : row - currRow;
    const columnBoxesToMove = currentCol > col ? currentCol - col : col - currentCol;
    const totalBosesToMove = rowBoxesToMove + columnBoxesToMove;

    setTimeout(() => {
      moveImage(row, col);
      setBlinkingId('');
    }, totalBosesToMove * 400);
  };

  const moveImage = (newRow, newCol) => {
    if (
      newRow >= 1 &&
      newRow < intialConfiguration.tableLayout.row + 1 &&
      newCol >= 1 &&
      newCol < intialConfiguration.tableLayout.column + 1
    ) {
      setImagePosition({ row: newRow, col: newCol });
    }
  };
  //to create an arry based on the dynamic input(row and colums)
  const createArrayUpTo = (n) => {
    let array = [];
    for (let i = 1; i <= n; i++) {
      array.push(i);
    }
    return array;
  };
  return (
    <RobotContext.Provider
      value={{
        handleKeyDown,
        handleClick,
        imagePosition,
        blinkingId,
        configration: {
          row: createArrayUpTo(intialConfiguration.tableLayout.row).reverse(),
          column: createArrayUpTo(intialConfiguration.tableLayout.column)
        }
      }}>
      <Container>
        <Row>
          <Col sm={12} lg={8} md={12}>
            <NavigationLayoutComponent imagePosition={imagePosition} />
          </Col>
          <Col sm={12} lg={4} md={12}>
            <Navigation />
          </Col>
        </Row>
      </Container>
    </RobotContext.Provider>
  );
}

export default App;
