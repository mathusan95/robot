//package imports
import { createContext, useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

//file imports
import Navigation from './components/NavigationComponent';
import NavigationLayout from './components/NavigationLayoutComponent';
import { initialConfiguration } from './utils/config';
import Setting from './components/SettingsComponent';
import { createArrayUpTo } from './utils/helperFunctions';

export const RobotContext = createContext(null);

const App = () => {
  const [imagePosition, setImagePosition] = useState(initialConfiguration.startPosition);
  const [blinkingId, setBlinkingId] = useState('');
  const [tableConfiguration, setTableConfiguration] = useState(initialConfiguration.tableLayout);

  //function to handle user key press and navigation button press
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

  //intialize the image position when navigation layout change
  useEffect(() => {
    setImagePosition(initialConfiguration.startPosition);
  }, [tableConfiguration]);

  //handle teleportation via click or tapping
  const handleClick = (row, col) => {
    if (!blinkingId) {
      setBlinkingId(`${row}-${col}`);
    }
  };

  //delay functionality
  useEffect(() => {
    let timeoutId = null;
    if (blinkingId !== '') {
      //extract the traget row and column from the blinkingId via splitting the {row}-{col} string
      const targetRow = parseInt(blinkingId.split('-')[0]);
      const targetColumn = parseInt(blinkingId.split('-')[1]);

      // calculate the no of boxes for robot to cover
      const currRow = imagePosition.row;
      const currentCol = imagePosition.col;
      const rowBoxesToMove = currRow > targetRow ? currRow - targetRow : targetRow - currRow;
      const columnBoxesToMove =
        currentCol > targetColumn ? currentCol - targetColumn : targetColumn - currentCol;
      const totalBosesToMove = rowBoxesToMove + columnBoxesToMove;

      timeoutId = setTimeout(() => {
        moveImage(targetRow, targetColumn);
        setBlinkingId('');
      }, totalBosesToMove * initialConfiguration.delayForOneBox);
    }

    return () => {
      //cleanup
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [blinkingId]);

  const moveImage = (newRow, newCol) => {
    if (
      newRow >= 1 &&
      newRow < tableConfiguration.row + 1 &&
      newCol >= 1 &&
      newCol < tableConfiguration.col + 1
    ) {
      setImagePosition({ row: newRow, col: newCol });
    }
  };

  const memoizedNavigationLayout = useMemo(() => {
    return (
      <NavigationLayout
        configuration={{
          row: createArrayUpTo(tableConfiguration.row).reverse(),
          col: createArrayUpTo(tableConfiguration.col)
        }}
        viewOnly={false}
      />
    );
  }, [tableConfiguration]);

  return (
    <RobotContext.Provider
      value={{
        handleKeyDown,
        handleClick,
        imagePosition,
        saveConfiguration: setTableConfiguration,
        tableConfiguration,
        blinkingId
      }}>
      <Container>
        <Row>
          <Col sm={2} lg={1} md={2}>
            <Setting />
          </Col>
          <Col sm={10} lg={7} md={10}>
            {memoizedNavigationLayout}
          </Col>
          <Col sm={12} lg={4} md={12}>
            <Navigation />
          </Col>
        </Row>
      </Container>
    </RobotContext.Provider>
  );
};

export default App;
