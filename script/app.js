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