import crudStore from "./crud-store";

var agency= crudStore("AGENCY", "AGENCIES");
export {agency as agency};	

var agent = crudStore("AGENT", "AGENTS");
export {agent as agent};

var note = crudStore("NOTE", "NOTES");
export {note as note};

var opportunity = crudStore("OPPORTUNITY", "OPPORTUNITIES");
export {opportunity as opportunity};

var profile = crudStore("PROFILE", "PROFILES"); 
export {profile as profile};

var task = crudStore("TASK", "TASKS"); 
export {task as task};