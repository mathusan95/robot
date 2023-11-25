//package imports
import React, { useContext, useState } from 'react';
import { Modal, Form, Col, Row, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

//file imports
import { MockContext } from '../utils/MockContext';
import { createArrayUpTo } from '../utils/helperFunctions';
import NavigationLayout from './NavigationLayoutComponent';
import { RobotContext } from '../App';

const Setting = () => {
  const context = process.env.NODE_ENV === 'test' ? MockContext : RobotContext;
  const { tableConfiguration, saveConfiguration, blinkingId } = useContext(context);
  const [modalStatus, setModalStatus] = useState(false);
  const [internalTableConfiguration, setTableInternalConfig] = useState(tableConfiguration);

  const renderTooltip = (props) => (
    <Tooltip id="settings-tooltip" {...props}>
      Change Navigation Layout
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger placement="right" delay={{ show: 150, hide: 200 }} overlay={renderTooltip}>
        <FontAwesomeIcon
          data-testid="change-nvg-btn"
          title="Change Navigation Layout"
          icon={faCog}
          size="3x"
          onClick={() => {
            if (!blinkingId) {
              setModalStatus(true);
            }
          }}
          className={blinkingId ? 'setting-icon disabled' : 'setting-icon'}
        />
      </OverlayTrigger>
      <Modal
        show={modalStatus}
        onHide={() => {
          {
            setModalStatus(false), setTableInternalConfig(tableConfiguration);
          }
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formGridRows">
                  <Form.Label>Rows</Form.Label>
                  <Form.Control
                    data-testid="select-row"
                    as="select"
                    value={internalTableConfiguration.row}
                    onChange={(e) =>
                      setTableInternalConfig((prevState) => {
                        return {
                          ...prevState,
                          row: parseInt(e.target.value)
                        };
                      })
                    }>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    {/* ... more options */}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formGridColumns">
                  <Form.Label>Columns</Form.Label>
                  <Form.Control
                    data-testid="select-col"
                    as="select"
                    value={internalTableConfiguration.col}
                    onChange={(e) =>
                      setTableInternalConfig((prevState) => {
                        return {
                          ...prevState,
                          col: parseInt(e.target.value)
                        };
                      })
                    }>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    {/* ... more options */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <div className="view-space pt-3">
            <Row>
              <NavigationLayout
                viewOnly={true}
                configuration={{
                  row: createArrayUpTo(internalTableConfiguration.row).reverse(),
                  col: createArrayUpTo(internalTableConfiguration.col)
                }}
              />
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              {
                setModalStatus(false), setTableInternalConfig(tableConfiguration);
              }
            }}>
            Close
          </Button>
          <Button
            data-testid="save-changes-button"
            variant="primary"
            onClick={() => {
              {
                saveConfiguration(internalTableConfiguration);
                setModalStatus(false);
              }
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Setting;
