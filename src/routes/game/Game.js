import { Fragment } from "react";
import NavBar from "../../component/NavBar/NavBar";
import ChatBot from "../../component/Bot/ChatBot";
function Game() {
    return (
        <Fragment>
            <NavBar />
            <h2>遊戲</h2>
            <ChatBot />
        </Fragment>
    );
}

export default Game;
