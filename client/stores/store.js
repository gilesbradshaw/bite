import crudStore from "./crud-store";

var opportunityType = crudStore("OPPORTUNITYTYPE", "OPPORTUNITYTYPES");
export {opportunityType as opportunityType};

var opportunityStatus = crudStore("OPPORTUNITYSTATUS", "OPPORTUNITYSTATUSES");
export {opportunityStatus as opportunityStatus};

var opportunityRatePeriod = crudStore("OPPORTUNITYRATEPERIOD", "OPPORTUNITYRATEPERIODS");
export {opportunityRatePeriod as opportunityRatePeriod};

var opportunityAgentRating = crudStore("OPPORTUNITYAGENTRATING", "OPPORTUNITYAGENTRATINGS");
export {opportunityAgentRating as opportunityAgentRating};

var opportunityType = crudStore("OPPORTUNITYTYPE", "OPPORTUNITYTYPES");
export {opportunityType as opportunityType};

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

var email = crudStore("EMAIL", "EMAILS"); 
export {email as email};