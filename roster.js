var csv = require('csv');
var fs = require('fs');


var info;
module.exports.loadInfo = function(callback){
    if(!callback){
      throw("Callback is needed");
    }
    csv.parse(fs.readFileSync('./csvs/roster.csv'), function(err, data){
      var headers = data[0].map((s)=>s.toLowerCase());
      info = [];
      for (var i = 1; i < data.length;i++){
          info.push({
              'lastName': data[i][headers.indexOf("first name")],
              'firstName' : data[i][headers.indexOf("last name")],
              'name' : data[i][headers.indexOf("first name")] + " " + data[i][headers.indexOf("last name")],
              'email': data[i][headers.indexOf("email")],
              'rcsid': data[i][headers.indexOf("email")].split("@")[0],
              'requesting': data[i][headers.indexOf("credits")],
              'project': data[i][headers.indexOf("project name")]
          });
      }
      callback();
    });
};

module.exports.getUserInfo = function(name, rcsid){
    if (!info){
        throw "CSV not yet loaded";
    }
    for (var i = 0;i < info.length;i++){
        var record = info[i];
        if (record.name.toLowerCase() == name.toLowerCase() || (rcsid && (rcsid.toLowerCase() == rcsid))){
            return record;
        }
    }
    console.log("NO ROSTER USER " + name + " @" + rcsid);
    return null;
};
