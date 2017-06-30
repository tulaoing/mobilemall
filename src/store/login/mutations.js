import * as type from './type.js'
import * as func from '../function.js' 

export default {
	[type.Login](states,obj){
		//console.log(func.login.get());
		//console.log("statesbefore "+JSON.stringify(states));
		console.log(obj.loginstate.loginname);
		states.loginname=obj.loginstate.loginname;
		//console.log("states" + JSON.stringify(states.loginstate));
		//states.loginstate.shop=obj.shop;
		//console.log(JSON.stringify(states.loginstate));
		//console.log("statesafter " + JSON.stringify(states));
		func.login.set(states);
	},
	[type.Logout](states,obj){
		func.login.clear();
	}
}