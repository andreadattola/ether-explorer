export const handleInputsProfile = (input, user) => {
    switch (input) {
        case '_id':
        case 'session':
        case 'expiredAt':
            break;
        case 'lastLogin': 
           return <div key={new Date().toString()}>
                <label  disabled>{input}</label>
                <input value={user[input]} disabled></input>
            </div>
            break;
        case 'password':
           return <div key={new Date().toString()}>
                <label  >{input}</label>
                <input type={'password'} value={user[input]} disabled></input>
            </div>
        default:
           return <div key={new Date().toString()}>
                <label >{input}</label>
                <input value={user[input]}></input>
            </div>
            break;
    }
}