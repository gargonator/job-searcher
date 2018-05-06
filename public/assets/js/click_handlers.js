$(document).ready(function() {

  // api keys
  var appid = "b4426d84";
  var appkey = "d779b949d37028683decee4cd652a2d0";

  // hardcoded api parameters
  var results_per_page = 10;
  var content_type = "application/json";
  var distance = 100;

  // handler for job search
  $('#search-form').on('submit', (event) => {
    event.preventDefault();

    // capture key query parameters
    var search = $('[name=search-query]').val().trim();
    var city = $('[name=city]').val().trim();
    var state = $('[name=state]').val().trim();
    var locale = city + ', ' + state;

    // URL to query jobs API
    var queryURL = "https://api.adzuna.com/v1/api/jobs/us/search/1?" +
      "app_id=" + appid +
      "&app_key=" + appkey +
      "&results_per_page=" + results_per_page +
      "&what=" + search +
      "&content-type=" + content_type +
      "&where=" + locale +
      "&distance=" + distance;

    // call Adzuna job search API
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function(results) {
      console.log(results)

      // remove any previous search results
      $('#job-results').empty();

      // create table to hold jobs results
      var table = $(`<table id='results-table'></table>`)
        .append($(`<tr></tr>`)
          .html($(`<th class='results-heading'></th>`).text('Job results'))
        );

      // store array of jobs
      var jobs_array = results.results;

      // iterate through jobs array, generating divs and appending to table
      jobs_array.forEach(job => {
        
        var title = $(`<a href=${job.redirect_url} class="job-title">${job.title}</a>`);
        var favorite = $(`<img src="/assets/img/heart-icon.png" class="heart">`);
        var location = $(`<div class="location">${job.location.display_name}</div>`);

        // store all the essential variables in the favorites element
        favorite.attr({
          title: job.title,
          company: job.company.display_name,
          href: job.redirect_url,
          details: job.description,
          loc: job.location.display_name,
        });

        var company = $(`<div class="company-name">@ ${job.company.display_name}</div>`);
        var description = $(`<div class="result-description">${job.description}</div>`);

        var result_header = $(`<div class="result-header">`);
        result_header.append(title).append(favorite).append(location);

        var job_result = $(`<div class="job-result">`);
        job_result.append(result_header).append(company).append(description);

        var td = $(`<td />`);
        td.append(job_result);

        var tr = $(`<tr />`);
        tr.append(td);

        table.append(tr);

      });;

      // attach the job results to the page
      $('#job-results').append(table);


      // *********** attach handler to favorites button *************
      
      // handler for saving jobs if favorites button is clicked
      $('.heart').on('click',(event) => {

        console.log(event.target);
        
        // capture the various attributes of the job that was clicked
        var title = $(event.target).attr('title');
        var href = $(event.target).attr('href');
        var company = $(event.target).attr('company');
        var details = $(event.target).attr('details');
        var loc = $(event.target).attr('loc');

        // formulate into an object that can be posted to the database
        var job = {
          title: title,
          href: href,
          company: company,
          details: details,
          loc: loc,
        };

        console.log(job);

        // post to the database!
        $.ajax('api/new-job', {
          type: 'POST',
          data: job,
        }).then(() => {
          console.log('saved a new job');
        });

      });

    
      // ********** populate related careers ************

      // create table to hold related tables
      var table = $(`<table id='careers-table'></table>`)
        .append($(`<tr></tr>`)
          .html($(`<th class='results-heading'></th>`).text('Related careers you might consider'))
        );

      // store list of careers
      var careers = onet_results.career;
      
      // iterate through related careers and append to table
      careers.forEach(career => {
        var title = career.title;
        var link = career.href;
        var isBright = career.tags.bright_outlook;

        var tr = $(`<tr />`);
        var td1 = $(`<td />`);
        var td2 = $(`<td />`);

        var career_link = $(`<a class='career-link' href=${link}>${title}</a>`);
        td1.append(career_link);
        tr.append(td1);

        // if career has a bright outlook, add a green dot
        if (isBright) {
          var dot = $(`<span class="dot"></span>`);
          td2.append(dot);
          tr.append(td2);
        }

        // append row to table
        table.append(tr);

      });

      // append table to the page
      $('#related-careers').append(table);

    }); // end ajax call
    
  }); // end handler

}); // end doc ready fcn


// static API results from O*NET web services
var onet_results =
  {
    "keyword" : "software developer",
    "start" : 1,
    "end" : 20,
    "total" : 571,
    "link" : [
      {
          "href" : "https://services.onetcenter.org/ws/mnm/search?keyword=software%20developer&start=21&end=40",
          "rel" : "next"
      }
    ],
    "career" : [
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1133.00/",
          "code" : "15-1133.00",
          "title" : "Software Developers, Systems Software",
          "tags" : {
            "bright_outlook" : true,
            "green" : true,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1132.00/",
          "code" : "15-1132.00",
          "title" : "Software Developers, Applications",
          "tags" : {
            "bright_outlook" : true,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1134.00/",
          "code" : "15-1134.00",
          "title" : "Web Developers",
          "tags" : {
            "bright_outlook" : true,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1131.00/",
          "code" : "15-1131.00",
          "title" : "Computer Programmers",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/17-2072.01/",
          "code" : "17-2072.01",
          "title" : "Radio Frequency Identification Device Specialists",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1199.01/",
          "code" : "15-1199.01",
          "title" : "Software Quality Assurance Engineers & Testers",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1143.00/",
          "code" : "15-1143.00",
          "title" : "Computer Network Architects",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1199.02/",
          "code" : "15-1199.02",
          "title" : "Computer Systems Engineers/Architects",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1121.00/",
          "code" : "15-1121.00",
          "title" : "Computer Systems Analysts",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1151.00/",
          "code" : "15-1151.00",
          "title" : "Computer User Support Specialists",
          "tags" : {
            "bright_outlook" : true,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1111.00/",
          "code" : "15-1111.00",
          "title" : "Computer & Information Research Scientists",
          "tags" : {
            "bright_outlook" : true,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1142.00/",
          "code" : "15-1142.00",
          "title" : "Network & Computer Systems Administrators",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1152.00/",
          "code" : "15-1152.00",
          "title" : "Computer Network Support Specialists",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/15-1141.00/",
          "code" : "15-1141.00",
          "title" : "Database Administrators",
          "tags" : {
            "bright_outlook" : true,
            "green" : false,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/43-9111.01/",
          "code" : "43-9111.01",
          "title" : "Bioinformatics Technicians",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/13-1151.00/",
          "code" : "13-1151.00",
          "title" : "Training & Development Specialists",
          "tags" : {
            "bright_outlook" : true,
            "green" : true,
            "apprenticeship" : true
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/19-4099.03/",
          "code" : "19-4099.03",
          "title" : "Remote Sensing Technicians",
          "tags" : {
            "bright_outlook" : true,
            "green" : true,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/17-2072.00/",
          "code" : "17-2072.00",
          "title" : "Electronics Engineers",
          "tags" : {
            "bright_outlook" : false,
            "green" : true,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/17-2061.00/",
          "code" : "17-2061.00",
          "title" : "Computer Hardware Engineers",
          "tags" : {
            "bright_outlook" : false,
            "green" : false,
            "apprenticeship" : false
          }
      },
      {
          "href" : "https://services.onetcenter.org/ws/mnm/careers/11-3021.00/",
          "code" : "11-3021.00",
          "title" : "Computer & Information Systems Managers",
          "tags" : {
            "bright_outlook" : true,
            "green" : false,
            "apprenticeship" : true
          }
      }
    ]
  }