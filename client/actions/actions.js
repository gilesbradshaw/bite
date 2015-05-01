import crudActions from "./crud-actions";

var agency=  crudActions(
	"AGENCY", 
	"AGENCIES",
	(params)=>
		"/AGENCIES"
) ;
export {agency as agency};



var agent = crudActions(
	"AGENT", 
	"AGENTS",
	(params)=> {
		if(params.props.params.agencyId)
			return "/AGENCIES/" + params.props.params.agencyId + "/AGENTS";
		else
			return "/AGENTS";
	}
);
export {agent as agent};

var profile = crudActions(
	"PROFILE", 
	"PROFILES",
	(params)=>
		"/PROFILES"
);
export {profile as profile};

var opportunity = crudActions(
	"OPPORTUNITY", 
	"OPPORTUNITIES",
	(params)=> {
		if(params.props.params.profileId)
			return "/PROFILES/" + params.props.params.profileId + "/OPPORTUNITIES";
		else
			return "/OPPORTUNITIES";
	}
);
export {opportunity as opportunity};

var note = crudActions(
	"NOTE", 
	"NOTES",
	(params)=>
		"/NOTES"
);
export {note as note};

var task = crudActions(
	"TASK", 
	"TASKS",
	(params)=>
		"/TASKS"
);
export {task as task};
