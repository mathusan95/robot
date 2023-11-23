import React, { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { RobotContext } from '../App';

const NavigationLayoutComponent = () => {
  const gridRef = useRef(null);

  const { imagePosition, configration, blinkingId, handleClick, handleKeyDown } =
    useContext(RobotContext);

  useEffect(() => {
    gridRef.current.focus();

    console.log(blinkingId, 'kl');
  }, []);

  return (
    <div
      className="grid-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={gridRef}
      style={{
        gridTemplateRows: `repeat(${configration.row.length}, 150px)`,
        gridTemplateColumns: `repeat(${configration.column.length}, 150px)`
      }}>
      {configration.row.map((row) => {
        return (
          <>
            {configration.column.map((col) => {
              return (
                <div
                  onClick={() => handleClick(row, col)}
                  className={
                    blinkingId === `${row}-${col}`
                      ? 'blinking'
                      : blinkingId !== ''
                        ? 'grid-cell-disabled'
                        : 'grid-cell'
                  }
                  key={`${row}-${col}`}
                  id={`cell-${row}-${col}`}>
                  {row === imagePosition.row && col === imagePosition.col && (
                    <>
                      <FontAwesomeIcon icon={faRobot} size="7x" bounce={true} />
                    </>
                  )}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default NavigationLayoutComponent;
