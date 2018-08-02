import React, {Component} from 'react';
import { observer } from 'mobx-react';
import Util from '../utils/index';
import SquadGame from './squadGame/index';
import SquadSinglePlayerGame from './singlePlayerGame/index';
import SquadDoubleWindowsGame from './singlePlayerTwoWindows/index';
import SquadSecondGame from './squadSecondGame/index';
//import GemCollector from './GemCollector/index';
//import SinglePlayerTwoWindows from './singlePlayerTwoWindows/index';

import SquadDefaultConfig from '../defaultConfigs/squadConfig.json';
import SinglePlayerTwoWindowsDefaultConfig from '../defaultConfigs/singlePlayerTwoWindowsConfig.json';
import SquadPlayerConfig from '../defaultConfigs/squadSecondConfig.json';
import gemCollectorDefaultConfig from '../defaultConfigs/gemCollectorConfig.json';
import CodeEditor from '../games/squadGame/code-editor'
import config from '../../../config.json'

class ALSETReactGame extends Component{
    constructor(props){
        super(props);
        this.getGameData = this.getGameData.bind(this);
    }
    render() {
        const {selectedGameMode} = this.props
        var gameData = this.getGameData(selectedGameMode.name);
        var getCommands = Util.getCommands;
        switch(selectedGameMode.id){
            case 0:
                return <SquadGame
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />
                case 1:
                return <SquadSinglePlayerGame
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />
                case 2:
                return <SquadDoubleWindowsGame
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />
                case 3:
                return <SquadSecondGame
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />
            default:
                return (
                <div>
                <SquadGame
                    gameData={gameData}
                    getCommands={getCommands}
                    onGameEvent={this.props.onGameEvent}
                />
                <CodeEditor/>
                </div>
                )
        }
    }
    getGameData(gameType){
        var data = {};
        if(gameType=="Single Player")
            var defaultConfig = gemCollectorDefaultConfig;
        else if(gameType=="Single Player Two Windows")
            var defaultConfig = SinglePlayerTwoWindowsDefaultConfig;
        else if(gameType=="Squad")
            var defaultConfig = SquadPlayerConfig;
        else
            var defaultConfig = SquadDefaultConfig;
        var customConfig =this.props.config?this.props.config:{};
        data.showCodeEditor = this.props.showCodeEditor||customConfig.showCodeEditor||defaultConfig.showCodeEditor;
        data.config = this.props.config||defaultConfig;
        data.player = this.props.player||customConfig.player||defaultConfig.player;
        data.mode = this.props.mode||customConfig.mode||defaultConfig.mode;
        data.player1Keys = this.props.gameConfig.player1Keys||customConfig.player1Keys;
        data.player2Keys = this.props.gameConfig.player2Keys||customConfig.player2Keys;
        return data;
    }
}
export default observer(ALSETReactGame)
