import crudActions from "./crud-actions";

var opportunityStatus=  crudActions(
	"OPPORTUNITYSTATUS", 
	"OPPORTUNITYSTATUSES",
	(params)=>
		"/OPPORTUNITYSTATUSES"
) ;
export {opportunityStatus as opportunityStatus};

var opportunityAgentRating=  crudActions(
	"OPPORTUNITYAGENTRATING", 
	"OPPORTUNITYAGENTRATINGS",
	(params)=>
		"/OPPORTUNITYAGENTRATINGS"
) ;
export {opportunityAgentRating as opportunityAgentRating};

var opportunityRatePeriod=  crudActions(
	"OPPORTUNITYRATEPERIOD", 
	"OPPORTUNITYRATEPERIODS",
	(params)=>
		"/OPPORTUNITYRATEPERIODS"
) ;
export {opportunityRatePeriod as opportunityRatePeriod};

var opportunityType=  crudActions(
	"OPPORTUNITYTYPE", 
	"OPPORTUNITYTYPES",
	(params)=>
		"/OPPORTUNITYTYPES"
) ;
export {opportunityType as opportunityType};


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
	(params)=> {
		if(params.props.params.opportunityId)
			return "/OPPORTUNITIES/" + params.props.params.opportunityId + "/NOTES";
		else
			return "/NOTES";
	}
);
export {note as note};

var task = crudActions(
	"TASK", 
	"TASKS",
	(params)=> {
		if(params.props.params.opportunityId)
			return "/OPPORTUNITIES/" + params.props.params.opportunityId + "/TASKS";
		else
			return "/TASKS";
	}
);
export {task as task};

var email = crudActions(
	"EMAIL", 
	"EMAILS",
	(params)=> {
		if(params.props.params.opportunityId)
			return "/OPPORTUNITIES/" + params.props.params.opportunityId + "/EMAILS";
		else
			return "/EMAILS";
	}
);
export {email as email};
