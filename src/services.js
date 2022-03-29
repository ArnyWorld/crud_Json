const data = require('./MOCK_DATA.json');

module.exports = {
    getUsers: ()=>data,
    getUser:(id)=>{
        let identifier = Number(id);
        let user = data.filter((person)=>person.id == identifier)[0]
        return user; 
    },
    createUser: (dataUser)=>{
        let newUser = {
            id: data.length + 1,
            ...dataUser
        }
        data.push(newUser)
        return newUser
    },
    modifyUser:(id, userModified)=>{
        let identifier = Number(id);
        let index = data.findIndex((person)=>person.id == identifier)
        if(index>=0){
            var user = {
                id:identifier,
                ...userModified
            }
            data.splice(index,1, user)
        }
        
        return user;
    },
    deleteUser:(id)=>{
        let index = data.findIndex((person)=>person.id == id)
        let user = data.find((person)=>person.id == id)
        if(index>=0){
            data.splice(index,1);
        }
        return user;
    }

}