import React, { Component } from 'react';
import axios from 'axios';

export default class NamesList extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNameSex = this.onChangeNameSex.bind(this);
        this.onChangeTargetSex = this.onChangeTargetSex.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            nameSex: '',
            targetSex: ''
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNameSex(e) {
        this.setState({
            nameSex: e.target.value
        });
    }

    onChangeTargetSex(e) {
        this.setState({
            targetSex: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const nameObj = {
            name: this.state.name,
            nameSex: this.state.nameSex,
            targetSex: this.state.targetSex
        }

        console.log(nameObj);

        axios.post('http://localhost:5002/chart', nameObj, {
            headers: {
            'Content-Type': 'application/json'
            }
          })
        .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });

        //window.location = '/';
    }

    namesList() {
        return this.state.name;
    }

    render() {
        return (
            <div>
            <h3>Find Similar Names</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                    id="name"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
                </div>
                <div className="form-group"> 
                <label>Sex of Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.nameSex}
                    onChange={this.onChangeNameSex}
                    />
                </div>

                <div className="form-group">
                <label>Sex of Targets: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.targetSex}
                    onChange={this.onChangeTargetSex}
                    />
                </div>
                <div className="form-group">
                <input type="submit" value="Search" className="btn btn-primary" />
                </div>
            </form>
            <br></br>
            <p>{ this.namesList() }</p>
            </div>
            
        )
    }


}