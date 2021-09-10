let fs = require('fs')
var Customer = require('./Customer.json')

Savefile = () =>{
    fs.writeFile('Customer.json', JSON.stringify(Customer), function(err) {
        if(err) throw err;
    });
}
EditProfile = (id,name,address,tel) =>{
    for(data in Customer){
        if(Customer[data].id == id){
         Customer[data].Name = name 
         Customer[data].Address = address
         Customer[data].Tel = tel 
        }
        
    }
    Savefile()
    
}
CreateAccount = (name,address,tel) =>{
    
    Customer.push({"id":parseInt((Customer.length)+1),"Name":name,"Address":address,"Tel":tel})
    Savefile()
    return parseInt((Customer.length))
}
module.exports={
    EditProfile : EditProfile,
    CreateAccount : CreateAccount
}

