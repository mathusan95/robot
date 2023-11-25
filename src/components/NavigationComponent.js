//package imports
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

//file imports
import { RobotContext } from '../App';
import { MockContext } from '../utils/MockContext';

const Navigation = () => {
  const context = process.env.NODE_ENV === 'test' ? MockContext : RobotContext;
  const { handleKeyDown, blinkingId } = useContext(context);

  const handleNavigation = (movement) => {
    if (!blinkingId) {
      handleKeyDown({ key: movement });
    }
  };

  return (
    <div className="navigation-container mt-3">
      <div className="navigation-header">
        <strong>Navigation</strong>
      </div>
      <FontAwesomeIcon
        data-testid="upArrow"
        icon={faArrowUp}
        size="3x"
        onClick={() => handleNavigation('ArrowUp')}
        className={blinkingId ? 'arrow-icon disabled' : 'arrow-icon'}
      />
      <div className="middle-arrows">
        <FontAwesomeIcon
          data-testid="leftArrow"
          className={blinkingId ? 'arrow-icon disabled' : 'arrow-icon'}
          icon={faArrowLeft}
          size="3x"
          onClick={() => handleNavigation('ArrowLeft')}
        />

        <FontAwesomeIcon
          icon={faArrowDown}
          size="3x"
          style={{ marginLeft: '20px', marginRight: '20px', visibility: 'hidden' }}
        />
        <FontAwesomeIcon
          data-testid="rightArrow"
          className={blinkingId ? 'arrow-icon disabled' : 'arrow-icon'}
          icon={faArrowRight}
          size="3x"
          onClick={() => handleNavigation('ArrowRight')}
        />
      </div>
      <div>
        <FontAwesomeIcon
          data-testid="downArrow"
          className={blinkingId ? 'arrow-icon disabled' : 'arrow-icon'}
          icon={faArrowUp}
          size="3x"
          rotation={180}
          onClick={() => handleNavigation('ArrowDown')}
        />
      </div>
    </div>
  );
};

export default Navigation;
