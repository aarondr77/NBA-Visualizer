#%%
import csv
import os
import pandas as pd
import numpy as np
import math

folder_path = os.getcwd()+ "/"
season_stats_file = "Seasons_Stats.csv"
shots_file = "NBA_Shots_2000_to_2018.csv"
draft_file = "nba_draft_combine_all_years.csv"
draft_team_file = "NBA drafts.csv"

season_df = pd.read_csv(folder_path + season_stats_file)
draft_df = pd.read_csv(folder_path + draft_file)
draft_tm_df = pd.read_csv(folder_path + draft_team_file)
shots_df = pd.read_csv(folder_path + shots_file, dtype={'X': float, 'ID': str, 
	'Player': str, 
	'Season': float, 
	'Top.px. (Location)': float, 
	'Left.px. (location)': float, 
	'date': float, 
	'Team': str,
	'Opponent': str,
	'Location': str,
	'Quarter': str,
	'Game_Clock': str,
	'Outcome':float,
	'Shot_Value':float,
	'Shot_Distance.FT.':float,
	'Team_Score':float,
	'Opponent_Score':float,
	})
team_df = None

#%%
def add_team_to_draft_data():
	global draft_df
	global draft_tm_df
	draft_df = pd.merge(draft_df, draft_tm_df, how="left", left_on=["Player", "Year"], right_on=["Player", "Draft Year"])[list(draft_df.columns) + ["Team"]]

"""
Adds the ids from shots_df to draft_df and season_df. 
If an ID doesn't exist for a given player in season_df then just generate one
"""
def add_ids():
	global draft_df
	global season_df

	tmp_df = shots_df[["Player", "ID"]].drop_duplicates()
	draft_df = pd.merge(draft_df, tmp_df, how="left", on=["Player"])[list(draft_df.columns) + ["ID"]]

	tmp_df = shots_df[["Player", "ID", "Team"]].drop_duplicates()
	season_df = pd.merge(season_df, tmp_df, how="left", left_on=["Player", "Tm"], right_on=["Player", "Team"])[list(season_df.columns) + ["ID"]]

	def gen_id(x):
		if len(str(x['ID'])) == 3:
			name = str(x['Player'])
			last_name = name.split(" ")[1] if len(name.split(" ")) > 1 else name
			player_id = last_name.lower()[:5] + name.lower()[:2] + "01"
			return player_id
		else:
			return x['ID']

	season_df['ID'] = season_df.apply(gen_id, axis=1)

	tmp_df = season_df[["Player", "ID"]].drop_duplicates()
	draft_df = pd.merge(draft_df, tmp_df, how="left", on=["Player"])


"""
Adds 3P%, 2P%, FT%, Rebounds/Game (RPG), and Points/Game (PPG
for a given season to a new team df based off data from allshots
"""
def add_team_data():
	#tmp_df = season_df[["Tm", "Year"]].drop_duplicates()
	global season_df
	global team_df
	ind_df = season_df.groupby(["Tm","Year"]).agg({"FG%": np.average, "3P%": np.average, "2P%": np.average, "FT%": np.average, "3P": np.sum, "2P": np.sum, "FT": np.sum, "TRB%": np.sum}).reset_index()

	def div_num_games(x):
		if x["Year"] <= 1950:
			#games = 68
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 68
		elif x["Year"] <= 1951:
			#games = 66
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 66
		elif x["Year"] <= 1952:
			#games = 70
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 70
		elif x["Year"] <= 1958:
			#games = 72
			return (x["3P"]*3 + x["2P"]*2 + x["FT"])/ 72
		elif x["Year"] <= 1959:
			#games = 75
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 75
		elif x["Year"] <= 1960:
			#games = 79
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 79
		elif x["Year"] <= 1966:
			#games = 80
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 80
		else:
			#games = 82
			return (x["3P"]*3 + x["2P"]*2 + x["FT"]) / 82
	def div_rpg(x):
		if x["Year"] <= 1950:
			#games = 68
			return x["TRB%"] / 68
		elif x["Year"] <= 1951:
			#games = 66
			return x["TRB%"] / 66
		elif x["Year"] <= 1952:
			#games = 70
			return x["TRB%"] / 70
		elif x["Year"] <= 1958:
			#games = 72
			return x["TRB%"] / 72
		elif x["Year"] <= 1959:
			#games = 75
			return x["TRB%"] / 75
		elif x["Year"] <= 1960:
			#games = 79
			return x["TRB%"] / 79
		elif x["Year"] <= 1966:
			#games = 80
			return x["TRB%"] / 80
		else:
			#games = 82
			return x["TRB%"] / 82
	ind_df["PPG"] = ind_df.apply(div_num_games, axis=1)
	ind_df["RPG"] = ind_df.apply(div_rpg, axis=1)
	team_df = ind_df[["Tm", "Year", "FG%", "3P%", "2P%", "RPG", "PPG"]].copy()


def main():
	add_team_to_draft_data()
	add_ids()
	add_team_data()
	team_df.to_csv(folder_path + "filtered/" + "Team.csv")
	shots_df.to_csv(folder_path + "filtered/" + "Shots.csv")
	draft_df.to_csv(folder_path + "filtered/" + "Draft.csv")
	season_df.to_csv(folder_path + "filtered/" + "SeasonStats.csv")



main()
