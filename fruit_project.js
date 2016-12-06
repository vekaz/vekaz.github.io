//var serviceRegistry = new orion.ServiceRegistry();
var headers = { name: "Fruit Project Plugin", version: "1.0", description: "Plugin providing support for Fruit projects." };
var provider = new orion.PluginProvider(headers);


provider.registerService("orion.project.handler", {
    paramsToDependencyDescription: function(params){
		return {Type: "fruit", Location: removeUserInformation(params.url)};
	},
    
    initProject: function(params, projectMetadata){
		var url = removeUserInformation(params.url);
        console.log(params);
		return {
            ContentLocation: "/"//projectMetadata.WorkspaceLocation
            
        }
	}
	
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
},
{
		id: "orion.fruit.projecthandler",
		type: "fruit",
        addParameters: [{id: "url", type: "text", name: "URL"}],
        addProjectName: "fruit",
        addProjectTooltip: "..create a new fruit project.."
});
        
function removeUserInformation(url){
	if(url && url.indexOf("@")>0 && url.indexOf("ssh://")>=0){
		return url.substring(0, url.indexOf("ssh://") + 6) + url.substring(url.indexOf("@")+1);
	}
	return url;
}
        
        
        
        
        
provider.connect();
