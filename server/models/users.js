const { use } = require("../controllers/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt_rounds = process.env.salt_rounds;
const jwt_secret = process.env.jwt_secret;
const list = [
    {
        firstName: 'Carlo',
        lastName: 'Rizzo',
        email:'ctrizzo33@gmail.com',
        password: 'ctr333',
        pic:'https://bulma.io/images/placeholders/128x128.png',
        isAdmin: true,
        following: [ { email: 'ctrizzo33@gmail.com', isApproved: true }, ],
    },

    {
        firstName: 'Tanner',
        lastName: 'Johnson',
        email:'tannerthedude123@gmail.com',
        password: 'ctr123',
        pic:'https://bulma.io/images/placeholders/128x128.png'

    
    },
    {
        firstName: 'Barrack',
        lastName: 'Obama',
        email:'realobama@gmail.com',
        password: 'ctr999',
        pic:'https://bulma.io/images/placeholders/128x128.png'

    
    }
];

module.exports.GetAll = ()=> list;
module.exports.Get = (user_id)=> list[user_id];
module.exports.GetByEmail = (email)=> ({...list.find((x,i)=> x.email == email), password: undefined}) ;
module.exports.Add = (user)=> {
    if(!user.firstName){
        throw { code: 422, msg: "First Name is required"}
    }
    list.push(user);
    return {...user, password: undefined};
}
module.exports.Register = async (user)=> {
    const hash = await bcrypt.hash(user.password, +salt_rounds);

    user.password = hash;

    if(!user.firstName){
        throw { code: 422, msg: "First Name is required" }
    }

    list.push(user);
    return { ...user, password: undefined };

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
    return user;
}
module.exports.Delete = (user_id)=> {
    //Make patchable
    const user = list[user_id];
    list.splice(user_id, 1);
    return user;
}

module.exports.Login = async (email, password) =>{
    console.log({ email, password})
    const user = list.find(x=> x.email == email);
    if(!user) throw { code: 401, msg: "Sorry there is no user with that email" };

    if( ! await bcrypt.compare(password, user.password) ){
        throw { code: 401, msg: "Wrong Password" };
    }

    const data = { ...user, password: undefined};

    const token = jwt.sign(data, jwt_secret)

    return { user: data, token };
} 

module.exports.FromJWT = async (token) =>{
    try {
        const user = jwt.verify(token, jwt_secret);
        return user;       
    } catch (error) {
        console.log({error});
        return null;
    }

}