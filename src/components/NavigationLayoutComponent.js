//package imports
import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

//file imports
import { RobotContext } from '../App';
import { MockContext } from '../utils/MockContext';

const NavigationLayout = ({ viewOnly, configuration }) => {
  const context = process.env.NODE_ENV === 'test' ? MockContext : RobotContext;
  const { imagePosition, blinkingId, handleClick, handleKeyDown } = useContext(context);
  const gridRef = useRef(null);

  return (
    <div
      className="grid-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={gridRef}
      style={{
        gridTemplateRows: `repeat(${configuration?.row?.length}, 1fr)`,
        gridTemplateColumns: `repeat(${configuration?.col?.length}, 1fr)`
      }}>
      {configuration?.row.map((row) => {
        return configuration?.col.map((col) => {
          return (
            <div
              onClick={() => {
                if (!viewOnly && !blinkingId) {
                  handleClick(row, col);
                }
              }}
              style={{ minHeight: viewOnly ? '20px' : '', minWidth: viewOnly ? '20px' : '' }}
              className={
                blinkingId === `${row}-${col}`
                  ? 'blinking'
                  : blinkingId
                    ? 'grid-cell disabled'
                    : 'grid-cell'
              }
              key={`${row}-${col}`}
              data-testid={`cell-${row}-${col}`}
              id={`cell-${row}-${col}`}>
              {!viewOnly && row === imagePosition.row && col === imagePosition.col && (
                <>
                  <FontAwesomeIcon icon={faRobot} size="7x" bounce={true} className="robot-icon" />
                </>
              )}
            </div>
          );
        });
      })}
    </div>
  );
};

NavigationLayout.propTypes = {
  viewOnly: PropTypes.bool,
  configuration: PropTypes.object
};

export default NavigationLayout;
