export interface rankingResponse {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
export interface Team {
  teamName: string,
  teamHome?: Matches[]
}

export interface Goals {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface Matches {
  id?: number,
  homeTeam?: number,
  homeTeamGoals: number,
  awayTeam?: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}
