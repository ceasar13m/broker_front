import {signIn, signUp} from "../services/http-service";
import channels from "./channels"
import sendMessage from "../services/web-socket-service";


class DataController {
    constructor(app) {
        this.app = app;
        this.state = {
            token: null,
            signInLayer: true,
            signUpLayer: false,
            createNewChannelWindow: false,
            content: false,
            channels: channels.channels,
            channelId: '',
            messenger: false
        }
    }

    sendMessage(message) {
        sendMessage(message);
    }

    showNewChannelWindow() {
        this.state = {
            ...this.state,
            createNewChannelWindow: true,
        };
        this.app.onCreateNewChannelWindowChanged({
            createNewChannelWindow: this.state.createNewChannelWindow
        });
    }

    hideNewChannelWindow() {
        this.state = {
            ...this.state,
            createNewChannelWindow: false,
        };
        this.app.onCreateNewChannelWindowChanged({
            createNewChannelWindow: this.state.createNewChannelWindow
        });
    }

    channelIdChange(id) {
        this.state = {
            ...this.state,
            channelId: id,
        }
        this.app.onChannelIdChanged({
            channelId: this.state.channelId
        });
    }

    async signIn(user) {
        await signIn(user).then(response => response.json())
            .then(json => {
                if (json.token !== null) {
                    this.state = {
                        ...this.state,
                        token: json.token,
                        signInLayer: false,
                        messenger: true
                    }
                    this.app.onTokenChange({
                        token: this.state.token
                    });
                    this.app.onSignInLayerChange({
                        signInLayer: this.state.signInLayer
                    });
                    this.app.onMessengerChange({
                        messenger: this.state.messenger
                    });
                } else{
                    alert("Не удалось войти")
                }
            })
            .catch(err => console.log(err));
    }

    async signUp(user) {
        await signUp(user).then(response => {
            if (response.status === 200) {
                alert("ОК")
            } else {
                alert("Не удалось зарегистрироваться")
            }
        }).catch(err => console.log(err));
        this.state = {
            ...this.state,
            signUpLayer: false
        }
    }

    showSignInLayer() {
        this.state = {
            ...this.state,
            signInLayer: true,
            signUpLayer: false
        }
        this.app.onSignUpLayerChange({
            signUpLayer: this.state.signUpLayer
        })
        this.app.onSignInLayerChange({
            signInLayer: this.state.signInLayer
        })
    }

    showSignUpLayer() {
        this.state = {
            ...this.state,
            signUpLayer: true,
            signInLayer: false
        }
        this.app.onSignInLayerChange({
            signInLayer: this.state.signInLayer
        })
        this.app.onSignUpLayerChange({
            signUpLayer: this.state.signUpLayer
        })
    }

    getState() {
        return this.state;
    }
}

export default DataController;