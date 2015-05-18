import crudActions from "./crud-actions";
import {clientId} from "../config/mix-radio";

export var genre=  crudActions(
	"GENRE", 
	"GENRES",
	{
		many:params=>`http://api.mixrad.io/1.x/${params.props.params.countryCode}/genres?domain=music&client_id=${clientId}`,
		single:params=>`http://api.mixrad.io/1.x/${params.props.params.countryCode}/genres?domain=music&client_id=${clientId}`,
	},
	{
		items:data=>data.items,
		item:(data, params)=>{
			return data.get("items").find(item=>item.get("id")===params.id);
		}
	}
);


export var artist=  crudActions(
	"ARTIST", 
	"ARTISTS",
	{
		many:params=>{
			if(params.props.params.genreId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=artist&genre=${params.props.params.genreId}&domain=music&itemsperpage=30&client_id=${clientId}`;
			}
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=artist&domain=music&itemsperpage=30&client_id=${clientId}`;
		},
		single:params=>`http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=artist&domain=music&id=${params.id}&client_id=${clientId}`,
	},
	{
		items:data=>data.items,
		item:data=>{
			return data.getIn(["items",0]);

		}
	}
);

export var track=  crudActions(
	"TRACK", 
	"TRACKS",
	{
		many:params=>{
			if(params.props.params.albumId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/${params.props.params.albumId}/?domain=music&category=album&client_id=${clientId}`;
			}
			if(params.props.params.singleId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/${params.props.params.singleId}/?domain=music&category=single&client_id=${clientId}`;
			}
			if(params.props.params.artistId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/creators/${params.props.params.artistId}/products?domain=music&category=track&client_id=${clientId}`;	
			}
			if(params.props.params.genreId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=track&genre=${params.props.params.genreId}&domain=music&itemsperpage=30&client_id=${clientId}`;
			}			
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=track&domain=music&itemsperpage=30&client_id=${clientId}`;
		},
		single:params=>`http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/${params.props.params.trackId}/?domain=music&category=track&client_id=${clientId}`,
	},
	{
		items:(data, params)=>(params.props.params.albumId || params.props.params.singleId ? data.tracks : data.items),
		item:data=>data
	}
) ;

export var album=  crudActions(
	"ALBUM", 
	"ALBUMS",
	{
		many:params=>{
			if(params.props.params.genreId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=album&domain=music&genre=${params.props.params.genreId}&itemsperpage=30&client_id=${clientId}`;
			}
			if(params.props.params.artistId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/creators/${params.props.params.artistId}/products?domain=music&category=album&client_id=${clientId}`;	
			}			
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=album&domain=music&itemsperpage=30&client_id=${clientId}`;
		},
		single:params=>`http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/${params.props.params.albumId}/?domain=music&category=album&client_id=${clientId}`,
	},
	{
		items:data=>data.items,
		item:data=>data
	}
) ;

export var single=  crudActions(
	"SINGLE", 
	"SINGLES",
	{
		many:params=>{
			if(params.props.params.genreId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=single&domain=music&genre=${params.props.params.genreId}&itemsperpage=30&client_id=${clientId}`;
			}

			if(params.props.params.artistId)
			{
				return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/creators/${params.props.params.artistId}/products?domain=music&category=single&client_id=${clientId}`;	
			}			
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/?category=single&domain=music&itemsperpage=30&client_id=${clientId}`;
		},
		single:params=>`http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/${params.props.params.singleId}/?domain=music&category=single&client_id=${clientId}`,
	},
	{
		items:data=>data.items,
		item:data=>data
	}
) ;

export var chartAlbum=  crudActions(
	"CHARTALBUM", 
	"CHARTALBUMS",
	{
		many:params=>{
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/charts/album?domain=music&itemsperpage=30&client_id=${clientId}`;
		},
	},
	{
		items:data=>data.items,
		item:data=>data
	}
);

export var chartTrack=  crudActions(
	"CHARTTRACK", 
	"CHARTTRACKS",
	{
		many:params=>{
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/charts/track?domain=music&itemsperpage=30&client_id=${clientId}`;
		},
	},
	{
		items:data=>data.items,
		item:data=>data
	}
) ;

export var newReleaseAlbum=  crudActions(
	"NEWRELEASEALBUM", 
	"NEWRELEASALBUMS",
	{
		many:params=>{
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/new/album?domain=music&itemsperpage=30&client_id=${clientId}`;
		},
	},
	{
		items:data=>data.items,
		item:data=>data
	}
) ;

export var newReleaseSingle=  crudActions(
	"NEWRELEASESINGLE", 
	"NEWRELEASESINGLES",
	{
		many:params=>{
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/new/single?domain=music&itemsperpage=30&client_id=${clientId}`;
		},
	},
	{
		items:data=>data.items,
		item:data=>data
	}
) ;

export var newReleaseTrack=  crudActions(
	"NEWRELEASETRACK", 
	"NEWRELEASETRACKS",
	{
		many:params=>{
			return `http://api.mixrad.io/1.x/${params.props.params.countryCode}/products/new/track?domain=music&itemsperpage=30&client_id=${clientId}`;
		},
	},
	{
		items:data=>data.items,
		item:data=>data
	}
) ;


export var country=  crudActions(
	"COUNTRY", 
	"COUNTRIES",
	{
		many:params=>"/COUNTRIES"
	}
) ;



export var opportunityStatus=  crudActions(
	"OPPORTUNITYSTATUS", 
	"OPPORTUNITYSTATUSES",
	{
		many:params=>"/OPPORTUNITYSTATUSES"
	}
) ;

export var opportunityAgentRating=  crudActions(
	"OPPORTUNITYAGENTRATING", 
	"OPPORTUNITYAGENTRATINGS",
	{
		many:params=>"/OPPORTUNITYAGENTRATINGS"
	}
) ;

export var opportunityRatePeriod=  crudActions(
	"OPPORTUNITYRATEPERIOD", 
	"OPPORTUNITYRATEPERIODS",
	{
		many:params=>"/OPPORTUNITYRATEPERIODS"
	}
) ;

export var opportunityType=  crudActions(
	"OPPORTUNITYTYPE", 
	"OPPORTUNITYTYPES",
	{
		many:params=>"/OPPORTUNITYTYPES"
	}
) ;

export var agency=  crudActions(
	"AGENCY", 
	"AGENCIES",
	{
		many:params=>"/AGENCIES"
	}
) ;

export var agent = crudActions(
	"AGENT", 
	"AGENTS",
	{
		many:params=> {
			if(params.props.params.agencyId)
				return "/AGENCIES/" + params.props.params.agencyId + "/AGENTS";
			else
				return "/AGENTS";
		}
	}
);

export var profile = crudActions(
	"PROFILE", 
	"PROFILES",
	{
		many:params=>"/PROFILES"
	}
);

export var opportunity = crudActions(
	"OPPORTUNITY", 
	"OPPORTUNITIES",
	{
		many:params=> {
			if(params.props.params.profileId)
				return "/PROFILES/" + params.props.params.profileId + "/OPPORTUNITIES";
			else
				return "/OPPORTUNITIES";
		}
	}
);

export var note = crudActions(
	"NOTE", 
	"NOTES",
	{
		many:params=> {
			if(params.props.params.opportunityId)
				return "/OPPORTUNITIES/" + params.props.params.opportunityId + "/NOTES";
			else
				return "/NOTES";
		}
	}
);

export var task = crudActions(
	"TASK", 
	"TASKS",
	{
		many:params=> {
			if(params.props.params.opportunityId)
				return "/OPPORTUNITIES/" + params.props.params.opportunityId + "/TASKS";
			else
				return "/TASKS";
		}
	}
);

export var email = crudActions(
	"EMAIL", 
	"EMAILS",
	{
		many:params=> {
			if(params.props.params.opportunityId)
				return "/OPPORTUNITIES/" + params.props.params.opportunityId + "/EMAILS";
			else
				return "/EMAILS";
		}
	}
);
