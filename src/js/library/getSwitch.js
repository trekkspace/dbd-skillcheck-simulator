
const getSwitch = function (prop,name){
    for (var i in prop["switches"]){
        if (prop["switches"][i]["attr"]===name){
            return prop["switches"][i];
        }
    }
    return {}
}
export {getSwitch};
