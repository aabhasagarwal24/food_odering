import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
                avatar_url: "htp://dummy-photo.com",
            },
        };
    }

    async componentDidMount() {
      const data = await fetch("https://api.github.com/users/aabhasagarwal24");
      const json = await data.json();

      this.setState({
        userInfo: json,
      });
      console.log(json);
    }

    render() {

        const { id, login, avatar_url } = this.state.userInfo;        
        return (
            <div className="user-card">
                <img src={avatar_url}/>
                <h2>Id: {id}</h2>
                <h3>Login: {login}</h3>
                <h4>Contact: @aabhas</h4>
            </div>
        )
    }
}

export default UserClass;