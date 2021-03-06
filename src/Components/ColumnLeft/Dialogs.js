/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {Component} from 'react';
import classNames from 'classnames';
import DialogsHeader from './DialogsHeader';
import DialogsList from './DialogsList';
import UpdatePanel from './UpdatePanel';
import ApplicationStore from '../../Stores/ApplicationStore';
import './Dialogs.css';

class Dialogs extends Component{
    constructor(props){
        super(props);

        this.dialogsList = React.createRef();

        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.onUpdateChatDetailsVisibility = this.onUpdateChatDetailsVisibility.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    componentDidMount(){
        ApplicationStore.on('clientUpdateChatDetailsVisibility', this.onUpdateChatDetailsVisibility);
    }

    componentWillUnmount(){
        ApplicationStore.removeListener('clientUpdateChatDetailsVisibility', this.onUpdateChatDetailsVisibility);
    }

    onUpdateChatDetailsVisibility(update){
        this.forceUpdate();
    }

    handleHeaderClick(){
        this.dialogsList.current.scrollToTop();
    }

    render(){
        const { isChatDetailsVisible } = ApplicationStore;
        
        return (
            <div className={classNames('dialogs', { 'dialogs-third-column': isChatDetailsVisible })}>
                <DialogsHeader onClearCache={this.props.onClearCache} onClick={this.handleHeaderClick}/>
                <DialogsList ref={this.dialogsList} onSelectChat={this.props.onSelectChat}/>
                <UpdatePanel/>
            </div>
        );
    }
}

export default Dialogs;