import csv
from jobspy import scrape_jobs
import pandas as pd

search_terms = [
    'software developer',
    'data analyst', 'data science', 'frontend developer',
    'backend developer', 'designer',
]

all_jobs = pd.DataFrame()


for term in search_terms:
    jobs = scrape_jobs(
        site_name=["indeed", "zip_recruiter", "glassdoor","linkedin"],
        search_term=term,
        location="India",
        results_wanted=30,
        hours_old=72,
        country_indeed='India',
        linkedin_fetch_description=True
    )
    all_jobs = pd.concat([all_jobs, jobs])


print(f"Found {len(all_jobs)} jobs")
all_jobs.to_csv("jobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False)
