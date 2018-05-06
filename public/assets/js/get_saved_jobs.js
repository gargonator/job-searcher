$(document).ready(function() {

  // get request for all saved jobs
  $.ajax('api/saved-jobs', {
    type: 'GET',
  }).then((results) => {
    // console.log('saved jobs: ',results);

    // create a table to hold the saved jobs
    var table = $(`<table id='favorites-table'></table>`)

    // iterate through saved jobs and append to table
    results.forEach(job => {

      var title = $(`<a href=${job.href} class="job-title">${job.title}</a>`);
      var location = $(`<div class="location">${job.loc}</div>`);
      var company = $(`<div class="company-name">@ ${job.company}</div>`);
      var description = $(`<div class="result-description">${job.details}</div>`);

      var result_header = $(`<div class="result-header">`);
      result_header.append(title).append(location);

      var job_result = $(`<div class="job-result">`);
      job_result.append(result_header).append(company).append(description);

      var td = $(`<td />`);
      td.append(job_result);

      var tr = $(`<tr />`);
      tr.append(td);

      table.append(tr);

    })

    // append table to page
    $('#favorites-list').append(table);

  });

});