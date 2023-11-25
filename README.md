# Project Name

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (specify version)

### Installing

To get a development environment running:

1. Clone the repository: git clone [repository-url]

2. Install dependencies: npm install

3. To start the application: npm start

## Usage

- To start the application : npm start

- To format code using Prettier: npm run format

- To run the linter: npm run lint

- To deploy to GitHub Pages: npm run deploy

## Libraries Used

This application uses the following libraries:

- React
- React-Bootstrap
- React Font Awesome

## Rules of the Application

1. The robot is initially at 1,1 position within a table of 5x5 units.
2. Navigation arrows can help the robot to move up, down, right, and left by one unit.
3. When a cell is clicked, the robot will be teleported. The teleportation will be delayed according to the number of boxes to travel. During the delay, another teleportation or navigation is disabled, as well as changing the layout.
4. The layout can be configured with a maximum of 8x8. After changing the layout, the robot returns to its initial position.
