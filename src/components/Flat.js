//The user chooses to sign up as a Flat
import React, {Component} from 'react'
import FlatInfo from './FlatInfo';
import FlatAddress from './FlatAddress';
import FlatPhoto from './FlatPhoto';

export class Flat extends Component{

    //Ininitial state of Flat
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        address: '',
        photo: '',
    }

    //Move to the next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step +1
        });
    }

    //Go back to the previous one
    previousStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }    

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render () {
        const {step} = this.state;
        const {firstName, lastName, address, photo} = this.state;
        const values = {firstName, lastName, address, photo};


        switch(step){
            case 1:
                return(
                    <FlatInfo 
                    nextStep = {this.nextStep}
                    previousStep = {this.previousStep}
                    values = {values}/>
                ) 
            case 2:
                return(
                    <FlatAddress
                    nextStep = {this.nextStep}
                    previousStep = {this.previousStep}
                    values = {values}/>
                )
            case 3:
                return(
                    <FlatPhoto 
                    nextStep = {this.nextStep}
                    previousStep = {this.previousStep}
                    values = {values}/>
                )
            default:
                console.log('the user is a flat');
        }
    }
}

export default Flat
