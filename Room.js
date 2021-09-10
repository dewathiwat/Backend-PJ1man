
var Room = require('./Room.json')


CheckDetail = (type='Double') =>{
    for(data in Room){
        if(Room[data].Type == type){
           return Room[data].Detail
           break;
        }  
    }
}
ShowAllRoom = () =>{
    let numroom = ''
    let totalroom = 0
    for(data in Room){
        numroom += Room[data].Roomnumber +' '
        totalroom = parseInt(data)
    }
    return  [numroom,totalroom+1]
}

module.exports={
    CheckDetail:CheckDetail,
    ShowAllRoom:ShowAllRoom
}
