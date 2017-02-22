const USER_ROLES = [{
  'name': 'public',
  'roleFlags': 0,
  'homeState': {
    'path': '/',
		'params': {}
  },
},
  {
    'name': 'providerAdmin',
    'roleFlags': 1,
    'homeState': {
      'path': '/providers',
			'params': {}
    },
  },
  {
    'name': 'contactAdmin',
    'roleFlags': 2,
    'homeState': {
      'path': '/contacts',
			'params': {}
    },
  },
  {
    'name': 'siteAdmin',
    'roleFlags': 3,
    'homeState': {
      'path': '/providers',
			'params': {}
    },
  }];

export default USER_ROLES;
