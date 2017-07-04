var YT = require("./")
, from = 'en'
, languages = ['ar','fr','ru','en']
, text = 'hello world';


YT.getAllLanguages(text,from, languages, function(err,ret){
	console.log(err||ret);
});