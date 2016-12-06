var serviceRegistry = new orion.serviceRegistry();
var headers = { name: "Fruit Project Plugin", version: "1.0", description: "Plugin providing support for Fruit projects." };
var provider = new orion.PluginProvider(headers);


provider.registerService("orion.project.handler", {
    paramsToDependencyDescription: function(params){
		return {Type: "fruit", Location: removeUserInformation(params.url)};
	},
   /* 
    initDependency: function(dependency, params, projectMetadata){
		var url = removeUserInformation(dependency.Location || params.url);
		return this._cloneRepository(url, params, projectMetadata.WorkspaceLocation);
    },
	initProject: function(params, projectMetadata){
		var url = removeUserInformation(params.url);
		return this._cloneRepository(url, params, projectMetadata.WorkspaceLocation, true);
	},
    */
});
        
function removeUserInformation(url){
	if(url.indexOf("@")>0 && url.indexOf("ssh://")>=0){
		return url.substring(0, url.indexOf("ssh://") + 6) + url.substring(url.indexOf("@")+1);
	}
	return url;
}
        
        
        
        
        
provider.connect();
