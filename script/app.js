// button click
const findButton = document.getElementById('findButton');
findButton.onclick = function(e) {
      e.preventDefault();
      const query = document.getElementById('query').value || false;
      const url = `https://api.themoviedb.org/3/search/movie?year=2017&include_adult=false&page=1&query=${query}&language=en-US&api_key=291a1c1616938cf8c7272d26b23cf94f`;

      if(query) {
        fetch(url)
            .then( (response) => response.json() ) //response.status
            .then( (movies) => {
                console.log(movies);
                addTable(movies.results)
            });
      }
};

// function for table generate
function addTable( movies ) {
    let table = document.getElementById("mainTable");
    table.innerHTML = "" ;
    movies.forEach( item => {
        let {id, title, original_language, popularity, vote_count, release_date} = item;
        let str = `<tr>
                        <td>${id}</td>
                        <td>${title}</td>
                        <td>${original_language}</td>
                        <td>${popularity}</td>
                        <td>${vote_count}</td>
                        <td>${release_date}</td>
                    <tr>`;
        table.insertAdjacentHTML( 'beforeend', str );
    })  
}

function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}