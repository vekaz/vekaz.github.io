define(["orion/plugin", "orion/serviceregistry", "orion/fileClient", "orion/xhr"], 
       
       function(PluginProvider, mServiceRegistry, mFileClient, xhr) {
           var serviceRegistry = new mServiceRegistry.ServiceRegistry();
           
           var headers = { name: "Fruit Project Plugin", version: "1.0", description: "Plugin providing support for Fruit projects." };
           var provider = new PluginProvider(headers);
           
           
           provider.registerService("orion.project.handler", {
               paramsToDependencyDescription: function(params){
                   return {Type: "fruit", Location: removeUserInformation(params.url)};
               },
               
               initProject: function(params, projectMetadata){
                   var request = xhr("GET","/workspace").then(
                       function(result){
                           console.log(result);                           
                       }
                       
                   )
                   
                   /*
                    *                    var fileServices = serviceRegistry.getServiceReferences("orion.core.file");
                    *                   var leSvc = fileServices[0];
                    *                   // drugi parametar je 'filter'...
                    *                   var fileClient = new mFileClient.FileClient(serviceRegistry, null);
                    *                   var url = removeUserInformation(params.url);
                    *                   fileClient.createProject("/workspace/vekaz-OrionContent", params.url, null, true);
                    */
                   return {
                       ContentLocation: "/workspace/vekaz-OrionContent/" + params.url //projectMetadata.WorkspaceLocation
                       
                   }
               }
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
       });



