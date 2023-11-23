import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { RobotContext } from '../App';

const Navigation = () => {
  const { handleKeyDown } = useContext(RobotContext);

  const handleNavigation = (movement) => {
    handleKeyDown({ key: movement });
  };
  return (
    <div className="navigation-container">
      <div className="navigation-header">
        <strong>Navigation</strong>
      </div>
      <FontAwesomeIcon
        icon={faArrowUp}
        size="3x"
        onClick={() => handleNavigation('ArrowUp')}
        className="arrow-icon"
      />
      <div className="middle-arrows">
        <FontAwesomeIcon
          className="arrow-icon"
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
          className="arrow-icon"
          icon={faArrowRight}
          size="3x"
          onClick={() => handleNavigation('ArrowRight')}
        />
      </div>
      <div>
        <FontAwesomeIcon
          className="arrow-icon"
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
