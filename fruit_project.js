define([
	"orion/plugin"
    ], 
    
    function(PluginProvider){
        var headers = { name: "Fruit Project Plugin", version: "1.0", description: "Plugin providing support for Fruit projects." };
        var provider = new PluginProvider(headers);
        provider.connect();         
    }
);
