import React, {Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
    theme as ThemeActions
} from "actions";
import Localization from "localization";
import GridSystem from "dnn-grid-system";
import GridCell from "dnn-grid-cell";
import Button from "dnn-button";
import RadioButtons from "dnn-radio-buttons";
import Collapsible from "react-collapse";
import utils from "utils";

import "./style.less";

class ParseThemePackage extends Component {
    constructor() {
        super();
        this.state = {
            parseType: "localized",
            parsing: false
        };
    }

    getParseType(){
        const {props, state} = this;

        return state.parseType == "portable" ? 1 : 0;
    }

    parseTheme(){
        const {props, state} = this;

        this.setState({parsing: true}, function(){
            this.parseLayout();
        });
    }

    parseLayout(){
        const {props, state} = this;

        let themeName = props.currentTheme.SiteLayout.themeName;
        let parseType = this.getParseType();

        let self = this;
        props.dispatch(ThemeActions.parseTheme(themeName, parseType, function(){
            self.setState({parsing: false});
            utils.utilities.notify(Localization.get("Successful"));
        }));
    }

    onParseTypeChanged(type){
        const {props, state} = this;

        this.setState({parseType: type});
    }

    render() {
        const {props, state} = this;

        return (
            <div className="parse-theme-package">
                <Button size="small"
                    onClick={this.parseTheme.bind(this)}
                    disabled={state.parsing}>{Localization.get("ParseThemePackage")}</Button>
                <RadioButtons 
                    options={[{value: "localized", label: Localization.get("Localized")}, {value: "portable", label: Localization.get("Portable")}]} 
                    onChange={this.onParseTypeChanged.bind(this)}
                    value={this.state.parseType}/>
                <div className="clear" />
            </div>
        );
    }
}

ParseThemePackage.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        currentTheme: state.theme.currentTheme
    };
}

export default connect(mapStateToProps)(ParseThemePackage);