const currentMatches = [
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
		"awayTeamId": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Internacional"
		},
		"awayTeam": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 3,
		"homeTeamId": 4,
		"homeTeamGoals": 0,
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
		"homeTeamId": 4,
		"homeTeamGoals": 2,
		"awayTeamId": 2,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Corinthians"
		},
		"awayTeam": {
			"teamName": "Bahia"
		},},
  	{
      "id": 5,
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
      "id": 6,
      "homeTeamId": 15,
      "homeTeamGoals": 1,
      "awayTeamId": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São José-SP"
      },
      "awayTeam": {
        "teamName": "Napoli-SC"
      },},
      {
        "id": 7,
        "homeTeamId": 1,
        "homeTeamGoals": 0,
        "awayTeamId": 15,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        },
      },
      {
        "id": 8,
        "homeTeamId": 13,
        "homeTeamGoals": 3,
        "awayTeamId": 12,
        "awayTeamGoals": 4,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Real Brasília"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        },},
        {
          "id": 9,
          "homeTeamId": 12,
          "homeTeamGoals": 0,
          "awayTeamId": 13,
          "awayTeamGoals": 0,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Palmeiras"
          },
          "awayTeam": {
            "teamName": "Real Brasília"
          }
        },
        {
          "id": 10,
          "homeTeamId": 8,
          "homeTeamGoals": 0,
          "awayTeamId": 13,
          "awayTeamGoals": 0,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Grêmio"
          },
          "awayTeam": {
            "teamName": "Real Brasília"
          }
        },
        {
          "id": 11,
          "homeTeamId": 8,
          "homeTeamGoals": 0,
          "awayTeamId": 13,
          "awayTeamGoals": 0,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Grêmio"
          },
          "awayTeam": {
            "teamName": "Real Brasília"
          }
        },

      
    ]

    const leaderboard = [
      {
        name: 'Corinthians',
        totalPoints: 4,
        totalGames: 2,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 2,
        goalsOwn: 0,
        goalsBalance: 2,
        efficiency: '66.67'
      },
      {
        name: 'Palmeiras',
        totalPoints: 4,
        totalGames: 2,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 4,
        goalsOwn: 3,
        goalsBalance: 1,
        efficiency: '66.67'
      },
      {
        name: 'São José-SP',
        totalPoints: 4,
        totalGames: 2,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 0,
        goalsBalance: 1,
        efficiency: '66.67'
      },
      {
        name: 'Grêmio',
        totalPoints: 4,
        totalGames: 4,
        totalVictories: 0,
        totalDraws: 4,
        totalLosses: 0,
        goalsFavor: 2,
        goalsOwn: 2,
        goalsBalance: 0,
        efficiency: '33.33'
      },
      {
        name: 'Real Brasília',
        totalPoints: 3,
        totalGames: 4,
        totalVictories: 0,
        totalDraws: 3,
        totalLosses: 1,
        goalsFavor: 3,
        goalsOwn: 4,
        goalsBalance: -1,
        efficiency: '25.00'
      },
      {
        name: 'Internacional',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: '33.33'
      },
      {
        name: 'São Paulo',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 1,
        goalsOwn: 1,
        goalsBalance: 0,
        efficiency: '33.33'
      },
      {
        name: 'Avaí/Kindermann',
        totalPoints: 1,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '33.33'
      },
      {
        name: 'Napoli-SC',
        totalPoints: 1,
        totalGames: 2,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 1,
        goalsBalance: -1,
        efficiency: '16.67'
      },
      {
        name: 'Botafogo',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'NaN'
      },
      {
        name: 'Cruzeiro',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'NaN'
      },
      {
        name: 'Ferroviária',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'NaN'
      },
      {
        name: 'Flamengo',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'NaN'
      },
      {
        name: 'Minas Brasília',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'NaN'
      },
      {
        name: 'Santos',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'NaN'
      },
      {
        name: 'Bahia',
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 2,
        goalsBalance: -2,
        efficiency: '0.00'
      }
    ]

    export {
      currentMatches,
      leaderboard
   }