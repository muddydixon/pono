import React, {Component} from "react";
import {Link} from "react-router";
import Const from "../constants";

export default class Header extends Component {
  render(){
    const {currentUser} = this.props;
    const nav = currentUser ?
            <ul className="nav navbar-nav">
            <li><Link to="/signout">Signout</Link></li>
            </ul>:
      <ul className="nav navbar-nav">
      <li><Link to="/signin">Signin</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      </ul>;

    return <header className="navbar navbar-static-top bs-docs-nav">
             <div className="container">
               <Link to="/" className="navbar-brand">
                 <i className="fa fa-cubes" />&nbsp;{Const.name || "BoilerPlate"}
               </Link>
               <nav className="collapse navbar-collapse">
                 <ul className="nav navbar-nav">
                   <li><Link to="/rules"><i className="fa fa-bolt" />&nbsp;Rules</Link></li>
                   <li><Link to="/rules/new"><i className="fa fa-plus" />&nbsp;Create Rule</Link></li>
                   <li><Link to="/tokens"><i className="fa fa-key" />&nbsp;Token</Link></li>
                   <li><Link to="/tokens/new"><i className="fa fa-plus" />&nbsp;Create Token</Link></li>
                 </ul>
                 {nav}
               </nav>
             </div>
           </header>;
  }
}
