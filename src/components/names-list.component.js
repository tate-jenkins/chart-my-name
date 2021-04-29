import React, { Component } from 'react';
import axios from 'axios';
import Chart from './chart.component'

class NamesList extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNameSex = this.onChangeNameSex.bind(this);
        this.onChangeTargetSex = this.onChangeTargetSex.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: 'Alexis',
            nameSex: 'F',
            targetSex: 'F',
            data: [],
            submitted: false
        };
    }

    saveChanges

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

        this.makePost().then((data) => {
            this.setState({data:data})
            this.setState({submitted: true})
        });
        setTimeout(() => { this.setState({submitted: false}); }, 1);

        //console.log(this.state.data);

        //window.location = '/';
    }

    makePost = async () => {

        const nameObj = {
            name: this.state.name,
            nameSex: this.state.nameSex,
            targetSex: this.state.targetSex
        }

        let res = await axios.post('http://localhost:5005/chart', nameObj, {
            headers: {
            'Content-Type': 'application/json'
            }
          })
        return res.data;
    }


    render() {
        //console.log(this.state);

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
                <br></br>
                <label>
                <input  type="radio"
                    required
                    value="F"
                    checked={this.state.nameSex === "F"}
                    onChange={this.onChangeNameSex}
                    />
                    <span> F</span>
                    </label>
                <span>&ensp;&ensp;</span>
                <label>
                <input  type="radio"
                    required
                    value="M"
                    checked={this.state.nameSex === "M"}
                    onChange={this.onChangeNameSex}
                    />
                    <span> M</span>
                    </label>
                </div>

                <div className="form-group">
                <label>Sex of Target: </label>
                <br></br>
                <label>
                <input  type="radio"
                    required
                    value="F"
                    checked={this.state.targetSex === "F"}
                    onChange={this.onChangeTargetSex}
                    />
                    <span> F</span>
                    </label>
                <span>&ensp;&ensp;</span>
                <label>
                <input  type="radio"
                    required
                    value="M"
                    checked={this.state.targetSex === "M"}
                    onChange={this.onChangeTargetSex}
                    />
                    <span> M</span>
                    </label>
                </div>
                <input type="submit" value="Search" className="btn btn-primary" />
            </form>
            <br></br>
            
            <div>
            {this.state.submitted && <Chart dataFromParent = {this.state.data} />}</div>
            </div>
            
        )

    }


}

export default NamesList;