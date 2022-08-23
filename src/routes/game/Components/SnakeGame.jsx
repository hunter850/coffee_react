import React from "react";
// import "../css/SnakeGame.css";
import "../css/SnakeGame.scss";

import GameOver from "./GameOver.jsx";
// import useSound from "use-sound";
// import sounds from "../../../images/Coupon/yisell_sound_201404102304403674_88366.mp3";

class SnakeGame extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            width: 0,
            height: 0,
            blockWidth: 0,
            blockHeight: 0,
            gameLoopTimeout: 50,
            timeoutId: 0,
            startSnakeSize: 0,
            snake: [],
            Beans: {},
            direction: "right",
            directionChanged: false,
            isGameOver: false,
            snakeColor: "#FFA83F",
            BeansColor: this.props.BeansColor,
            score: 0,
            highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
        };
    }
    componentDidMount() {
        this.initGame();
        window.addEventListener("keydown", this.handleKeyDown);
        this.gameLoop();
    }

    initGame() {
        let percentageWidth = this.props.percentageWidth || 40;
        let width = 452;
        width -= width % 30;
        if (width < 30) width = 30;
        let height = 220;
        let blockWidth = width / 30;
        let blockHeight = height / 20;
        let startSnakeSize = this.props.startSnakeSize || 6;
        let snake = [];
        let Xpos = width;
        let Ypos = height / 2;
        let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
        snake.push(snakeHead);
        for (let i = 1; i < startSnakeSize; i++) {
            Xpos -= blockWidth;
            let snakePart = { Xpos: Xpos, Ypos: Ypos };
            snake.push(snakePart);
        }
        let BeansXpos =
            Math.floor(
                Math.random() * ((width - blockWidth) / blockWidth + 1)
            ) * blockWidth;
        let BeansYpos =
            Math.floor(
                Math.random() * ((height - blockHeight) / blockHeight + 1)
            ) * blockHeight;
        while (BeansYpos === snake[0].Ypos) {
            BeansYpos =
                Math.floor(
                    Math.random() * ((height - blockHeight) / blockHeight + 1)
                ) * blockHeight;
        }
        this.setState({
            width,
            height,
            blockWidth,
            blockHeight,
            startSnakeSize,
            snake,
            Beans: { Xpos: BeansXpos, Ypos: BeansYpos },
        });
    }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (!this.state.isGameOver) {
                this.moveSnake();
                this.tryToEatSnake();
                this.tryToEatBeans();
                this.setState({ directionChanged: false });
            }
            this.gameLoop();
        }, this.state.gameLoopTimeout);
        this.setState({ timeoutId });
    }
    componentWillUnmount() {
        clearTimeout(this.state.timeoutId);
        window.removeEventListener("keydown", this.handleKeyDown);
    }
    resetGame() {
        let width = this.state.width;
        let height = this.state.height;
        let blockWidth = this.state.blockWidth;
        let blockHeight = this.state.blockHeight;
        let Beans = this.state.Beans;
        let snake = [];
        let Xpos = width;
        let Ypos = height;
        let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
        snake.push(snakeHead);
        for (let i = 1; i < this.state.startSnakeSize; i++) {
            Xpos -= blockWidth;
            let snakePart = { Xpos: Xpos, Ypos: Ypos };
            snake.push(snakePart);
        }
        Beans.Xpos =
            Math.floor(
                Math.random() * ((width - blockWidth) / blockWidth + 1)
            ) * blockWidth;
        Beans.Ypos =
            Math.floor(
                Math.random() * ((height - blockHeight) / blockHeight + 1)
            ) * blockHeight;
        while (this.isBeansOnSnake(Beans.Xpos, Beans.Ypos)) {
            Beans.Xpos =
                Math.floor(
                    Math.random() * ((width - blockWidth) / blockWidth + 1)
                ) * blockWidth;
            Beans.Ypos =
                Math.floor(
                    Math.random() * ((height - blockHeight) / blockHeight + 1)
                ) * blockHeight;
        }

        this.setState({
            snake,
            Beans,
            direction: "right",
            directionChanged: false,
            isGameOver: false,
            gameLoopTimeout: 50,
            snakeColor: "#FFA83F",
            BeansColor: "#FFA83F",
            score: 0,
        });
    }

    moveSnake() {
        let snake = this.state.snake;
        let previousPartX = this.state.snake[0].Xpos;
        let previousPartY = this.state.snake[0].Ypos;
        let tmpPartX = previousPartX;
        let tmpPartY = previousPartY;
        this.moveHead();
        for (let i = 1; i < snake.length; i++) {
            tmpPartX = snake[i].Xpos;
            tmpPartY = snake[i].Ypos;
            snake[i].Xpos = previousPartX;
            snake[i].Ypos = previousPartY;
            previousPartX = tmpPartX;
            previousPartY = tmpPartY;
        }
        this.setState({ snake });
    }

    tryToEatBeans() {
        let snake = this.state.snake;
        let Beans = this.state.Beans;
        if (snake[0].Xpos === Beans.Xpos && snake[0].Ypos === Beans.Ypos) {
            let width = this.state.width;
            let height = this.state.height;
            let blockWidth = this.state.blockWidth;
            let blockHeight = this.state.blockHeight;
            let newTail = { Xpos: Beans.Xpos, Ypos: Beans.Ypos };
            let highScore = this.state.highScore;
            let gameLoopTimeout = this.state.gameLoopTimeout - 1;
            snake.push(newTail);
            Beans.Xpos =
                Math.floor(
                    Math.random() * ((width - blockWidth) / blockWidth + 1)
                ) * blockWidth;
            Beans.Ypos =
                Math.floor(
                    Math.random() * ((height - blockHeight) / blockHeight + 1)
                ) * blockHeight;
            while (this.isBeansOnSnake(Beans.Xpos, Beans.Ypos)) {
                Beans.Xpos =
                    Math.floor(
                        Math.random() * ((width - blockWidth) / blockWidth + 1)
                    ) * blockWidth;
                Beans.Ypos =
                    Math.floor(
                        Math.random() *
                            ((height - blockHeight) / blockHeight + 1)
                    ) * blockHeight;
            }
            if (this.state.score === highScore) {
                highScore++;
                localStorage.setItem("snakeHighScore", highScore);
            }

            if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5;

            this.setState({
                snake,
                Beans,
                score: this.state.score + 1,
                highScore,
                gameLoopTimeout,
            });
        }
    }

    tryToEatSnake() {
        let snake = this.state.snake;

        for (let i = 1; i < snake.length; i++) {
            if (
                snake[0].Xpos === snake[i].Xpos &&
                snake[0].Ypos === snake[i].Ypos
            )
                this.setState({ isGameOver: true });
        }
    }
    isBeansOnSnake(BeansXpos, BeansYpos) {
        let snake = this.state.snake;
        for (let i = 0; i < snake.length; i++) {
            if (BeansXpos === snake[i].Xpos && BeansYpos === snake[i].Ypos)
                return true;
        }
        return false;
    }
    moveHead() {
        switch (this.state.direction) {
            case "left":
                this.moveHeadLeft();
                break;
            case "up":
                this.moveHeadUp();
                break;
            case "right":
                this.moveHeadRight();
                break;
            default:
                this.moveHeadDown();
        }
    }

    moveHeadLeft() {
        let width = this.state.width;
        let blockWidth = this.state.blockWidth;
        let snake = this.state.snake;
        snake[0].Xpos =
            snake[0].Xpos <= 0
                ? width - blockWidth
                : snake[0].Xpos - blockWidth;
        this.setState({ snake });
    }

    moveHeadUp() {
        let height = this.state.height;
        let blockHeight = this.state.blockHeight;
        let snake = this.state.snake;
        snake[0].Ypos =
            snake[0].Ypos <= 0
                ? height - blockHeight
                : snake[0].Ypos - blockHeight;
        this.setState({ snake });
    }

    moveHeadRight() {
        let width = this.state.width;
        let blockWidth = this.state.blockWidth;
        let snake = this.state.snake;
        snake[0].Xpos =
            snake[0].Xpos >= width - blockWidth
                ? 0
                : snake[0].Xpos + blockWidth;
        this.setState({ snake });
    }

    moveHeadDown() {
        let height = this.state.height;
        let blockHeight = this.state.blockHeight;
        let snake = this.state.snake;
        snake[0].Ypos =
            snake[0].Ypos >= height - blockHeight
                ? 0
                : snake[0].Ypos + blockHeight;
        this.setState({ snake });
    }
    handleKeyDown(event) {
        if (this.state.isGameOver && event.keyCode === 32) {
            this.resetGame();
            return;
        }

        if (this.state.directionChanged) return;

        switch (event.keyCode) {
            case 37:
                this.goLeft();
                break;
            case 38:
                this.goUp();
                break;
            case 39:
                this.goRight();
                break;
            case 40:
                this.goDown();
                break;
            default:
        }
        this.setState({ directionChanged: true });
    }

    goLeft() {
        let newDirection = this.state.direction === "right" ? "right" : "left";
        this.setState({ direction: newDirection });
    }

    goUp() {
        let newDirection = this.state.direction === "down" ? "down" : "up";
        this.setState({ direction: newDirection });
    }

    goRight() {
        let newDirection = this.state.direction === "left" ? "left" : "right";
        this.setState({ direction: newDirection });
    }

    goDown() {
        let newDirection = this.state.direction === "up" ? "up" : "down";
        this.setState({ direction: newDirection });
    }

    render() {
        if (this.state.isGameOver) {
            return (
                <GameOver
                    width={this.state.width}
                    height={this.state.height}
                    score={this.state.score}
                />
            );
        }
        return (
            <div
                id="GameBoard"
                style={{
                    width: this.state.width + 12,
                    height: this.state.height + 20,
                    borderWidth: this.state.width / 50,
                }}
            >
                {this.state.snake.map((snakePart, index) => {
                    return (
                        <div
                            key={index}
                            className="Block"
                            style={{
                                width: this.state.blockWidth,
                                height: this.state.blockHeight,
                                left: snakePart.Xpos,
                                top: snakePart.Ypos,
                                background: this.state.snakeColor,
                            }}
                        />
                    );
                })}
                <div
                    className="Block CoffeeBean"
                    style={{
                        width: this.state.blockWidth + 3,
                        height: this.state.blockHeight + 3,
                        left: this.state.Beans.Xpos,
                        top: this.state.Beans.Ypos,
                    }}
                />
                <div id="Score" style={{ fontSize: this.state.width / 20 }}>
                    累計積分: {this.state.score}
                </div>
            </div>
        );
    }
}

export default SnakeGame;
