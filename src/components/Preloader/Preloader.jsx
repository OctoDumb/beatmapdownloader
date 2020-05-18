import React, { Component } from 'react';
import { Redirect }  from 'react-router-dom';
import CheckUpdates from "../../Updater.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import '@sweetalert2/themes/dark/dark.scss';
import './Preloader.scss';

const Alert = withReactContent(Swal);

export default class Preloader extends Component {
    state = {};

    async componentDidMount() {
        if(!window.updatesChecked) {
            window.updatesChecked = true;
            try {
                let nv = await CheckUpdates();
                if(nv) {
                    Alert.fire({
                        icon: "info",
                        titleText: `Update ${nv}`,
                        text: "A new version available! Open download page?",
                        showCancelButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        reverseButtons: true,
                        onClose: () => {
                            this.redirect();
                        }
                    }).then(result => {
                        if(result.value)
                            window.electron.remote.openExternal(`https://github.com/OctoDumb/beatmapdownloader/releases/${nv}`);
                        this.redirect();
                    });
                }
            } catch(e) {}
        } else this.redirect();
    }

    redirect() {
        this.setState({ redirect: window.Config.refresh_token ? "auth" : "login" });
    }

    render() {
        switch(this.state.redirect) {
            case "login": {
                return (
                    <Redirect to="/login" />
                )
            }

            case "auth": {
                return (
                    <Redirect to="/auth" />
                )
            }

            default: {
                return (
                    <div className="preloader">
                        <div className="container">
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                        </div>
                    </div>
                )
            }
        }
    }
}