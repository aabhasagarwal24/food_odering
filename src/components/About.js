import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
      
    }

    render() {
        return (
            <div>
                <h1>About class Component</h1>
                <div>
                    <UserContext.Consumer>
                        {({loggedInUser}) => <h1 className="text-lg font-bold">{loggedInUser}</h1>}
                    </UserContext.Consumer>
                </div>
                <h2>This is react</h2>
                <UserClass name={"First"} location={"Delhi class"} />
            </div>
        )
    }
};

export default About;