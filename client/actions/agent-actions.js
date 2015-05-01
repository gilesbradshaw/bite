import crudActions from "./crud-actions";

export default crudActions(
	"AGENT", 
	"AGENTS",
	(params)=> {
		if(params.props.params.agencyId)
			return "/AGENCIES/" + params.props.params.agencyId + "/AGENTS";
		else
			return "/AGENTS";
	}
);
