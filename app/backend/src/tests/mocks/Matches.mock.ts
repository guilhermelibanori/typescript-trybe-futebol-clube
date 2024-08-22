const allMatches = [
	{
		"id": 1,
		"homeTeamId": 16,
		"homeTeamGoals": 1,
		"awayTeamId": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"homeTeam": {
			"teamName": "São Paulo"
		},
		"awayTeam": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeamId": 9,
		"homeTeamGoals": 1,
		"awayTeamId": 14,
		"awayTeamGoals": 1,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Internacional"
		},
		"awayTeam": {
			"teamName": "Santos"
		}
	},
	{
		"id": 3,
		"homeTeamId": 4,
		"homeTeamGoals": 3,
		"awayTeamId": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Corinthians"
		},
		"awayTeam": {
			"teamName": "Napoli-SC"
		}
	},
	{
		"id": 4,
		"homeTeamId": 3,
		"homeTeamGoals": 0,
		"awayTeamId": 2,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Botafogo"
		},
		"awayTeam": {
			"teamName": "Bahia"
		},},
  	{
      "id": 46,
      "homeTeamId": 4,
      "homeTeamGoals": 1,
      "awayTeamId": 12,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Corinthians"
      },
      "awayTeam": {
        "teamName": "Palmeiras"
      }
    },
    {
      "id": 47,
      "homeTeamId": 8,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 2,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Grêmio"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    {
      "id": 48,
      "homeTeamId": 13,
      "homeTeamGoals": 1,
      "awayTeamId": 2,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Real Brasília"
      },
      "awayTeam": {
        "teamName": "Bahia"
      }}]

const matchToFinish =     {
  "id": 48,
  "homeTeamId": 13,
  "homeTeamGoals": 1,
  "awayTeamId": 2,
  "awayTeamGoals": 1,
  "inProgress": true,
  "homeTeam": {
    "teamName": "Real Brasília"
  },
  "awayTeam": {
    "teamName": "Bahia"
  }}

const newMatch =     {
    "id": 49,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }}


const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTQyODA3NTEsImV4cCI6MTY5NDg4NTU1MX0.dVikA8mhrj41uYtJD9Cn06gIp_MJkpzUFqBws0quC64'


    export {
       allMatches,
       validToken,
       matchToFinish,
       newMatch,
    }