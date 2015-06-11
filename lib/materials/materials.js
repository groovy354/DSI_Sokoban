var fs = require("fs");
var path = require("path");

var files = fs.readdirSync(path.resolve(module.filename, "../"));

var materials = {};

for(var i in files){
	var filename = files[i];
	var material_name = filename.split(".")[0];
	if(material_name!="materials"){
		materials[material_name] = require("./" + material_name);
	}
}

module.exports = materials;