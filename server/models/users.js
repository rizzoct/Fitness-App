const { use } = require("../controllers/users");

const list = [
    {
        firstName: 'Carlo',
        lastName: 'Rizzo',
        email:'ctrizzo33@gmail.com',
        pic:'https://bulma.io/images/placeholders/128x128.png'

    
    },

    {
        firstName: 'Tanner',
        lastName: 'Johnson',
        email:'tannerthedude123@gmail.com',
        pic:'https://bulma.io/images/placeholders/128x128.png'

    
    },
    {
        firstName: 'Barrack',
        lastName: 'Obama',
        email:'realobama@gmail.com',
        pic:'https://bulma.io/images/placeholders/128x128.png'

    
    }
];

module.exports.GetAll = ()=> list;
module.exports.Get = (user_id)=> list[user_id];
module.exports.GetByEmail = (email)=> ({...list.find((x,i)=> x.email == email), password: undefined}) ;
module.exports.Add = (user)=> {
    if(!user.firstName){
        throw "First Name is required"
    }
    list.push(user);
    return user;
}
module.exports.Update = (user_id, user)=> {
    //Make patchable
    const oldObj = list[user_id];
    if(user.firstName){
        oldObj.firstName = user.firstName;
    }
    if(user.lastName){
        oldObj.lastName = user.lastName;
    }
    if(user.email){
        oldObj.email = user.email;
    }
    if(user.pic){
        oldObj.pic = user.pic;
    }
    //list[user_id] = { ...list[user_id], ...user };
    return user;
}
module.exports.Delete = (user_id)=> {
    //Make patchable
    const user = list[user_id];
    list.splice(user_id, 1);
    return user;
}