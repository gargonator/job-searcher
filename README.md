# Uplevel: A smarter way to find your next opportunity

## The problem

Where do you go to find a job these days online? There isn't an easy answer. Job search sites represent a highly fragmented market. There are literally over a hundred such sites. It's tough to know which is the best one for the job you're looking for.

Also, most sites use simple keyword-based searches. In this day and age of highly relevant search results, pure keyword based search with filtering / sorting options is rather obsolete. Finding jobs in the haystack of search results is like finding a diamond in the rough. With the latest advances in machine learning, there are ways to *personalize* the job search process to give you the results most relevant to you.

Lastly, job search sites are focused on giving you results for precisely what you search for, but miss the opportunity to expand your horizons and expose related opportunities that may be of interest. Job searching is also a great time to explore tangential career opportunities that you may enjoy even more than your current path.


## The solution

Enter Uplevel, the smarter way to search for jobs.

The current version is a highly limited prototype that allows the user to both find related careers opportunities as well as search for & favorite specific jobs.

Basic functionality:
* Enter your desired job and location
* Hit the search button
* View related career opportunities from the O*NET database, and jobs from the Adzuma Jobs API
* Favorite jobs that seem especially interesting by clicking the heart next to the job title
* Come back to your favorite jobs at a later time
* Click the job title link to view the detailed job description

A future version would:
* Include results from more job search APIs in order to improve comprehensiveness
* Incorporate machine learning into the search algorithm
* Allow for advanced sorting and filtering on search results
* Incorporate additional data sources about companies and job locations
* Personalize the job search based on your background

## Tips and tricks

A few things to keep in mind:
* If the search doesn't work, try modifying the location queries. E.g., try changing the state 'CA' to California
* Currently, no keys are available for the O*NET API, so the related careers list is hardcoded to software engineers :/

## The vision

More jobs: Incorporating more job search APIs and web scraping (e.g., for Craigslist jobs) to ensure that job seekers are not missing out on opportunities.

Machine learning: Search results will be optimized based on which jobs other users like you have favorited. This would involve training a model based on historical data of what users have clicked on. We can get more information about users in a variety of ways to develop a similarity model, such as asking them to connect their LinkedIn profiles.

More data sources: Incorporate novel data sources such as Glassdoor ratings for companies, Walkscore for locations, etc. to go beyond keyword-based search and surface what job-seekers really care about.

## Contact

Please contact Bhaskar Garg at bhask.garg@gmail.com for any questions.