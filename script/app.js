// button search click
const findButton = document.getElementById('findButton');
findButton.onclick = function (e) {
  e.preventDefault();
  clearArrow();
  const query = document.getElementById('query').value || false;
  const url = `https://api.themoviedb.org/3/search/movie?year=2010&include_adult=true&page=1&query=${query}&language=en-US&api_key=291a1c1616938cf8c7272d26b23cf94f`;

  if (query) {
    fetch(url)
      .then((response) => response.json()) //response.status
      .then((movies) => addTable(movies.results));
  }
};

// table generate
function addTable(movies) {
  let table = document.getElementById("mainTable");
  table.innerHTML = "";
  movies.forEach(item => {
    let {
      id, title, original_language, popularity, vote_count, release_date } = item;
    let str =  `<td>${id}</td>
                <td>${title.length > 30 ? title.substr(0, 20) + "\u2026" : title}</td>
                <td>${original_language}</td>
                <td>${popularity}</td>
                <td>${vote_count}</td>
                <td>${release_date}</td>`;
    table.insertAdjacentHTML('beforeend', str);
  })
}

function sorting(obj, colNum, rev) {
  let compare = (a, b) => {
    //date to string
    aVal = a.cells[colNum].innerHTML.split('-').join(''); 
    bVal = b.cells[colNum].innerHTML.split('-').join(''); 

    return rev * ( isNaN(a.cells[colNum].innerHTML) ?
      aVal > bVal ? 1 : aVal < bVal ? -1 : 0 :
      parseFloat(a.cells[colNum].innerHTML) - parseFloat(b.cells[colNum].innerHTML) )
  }
  return obj.sort(compare);
}


function sortTable(colNum, rev) {
  const table = document.getElementById('table');
  const tbody = document.getElementById('mainTable');
  let   rowsArray = [].slice.call(tbody.rows);
  let   sortingarray = sorting(rowsArray, colNum, rev);
  table.removeChild(tbody);
  for (var i = 0; i < sortingarray.length; i++) {
    tbody.appendChild(sortingarray[i]);
  }
  table.appendChild(tbody);
}

//init reverse state
let reverse = 1;

// adding arrow in sorting
function addArrow(target, rev) {
  let current = target.innerHTML;
  target.innerHTML = rev > 0 ? `${current} ↓` : `${current} ↑`
}

// remove all sorting arrows
function clearArrow(){
  let th = document.getElementsByTagName('th');
  let thArr = [].slice.call(th);
  thArr.forEach( (th) =>  th.innerHTML = th.innerHTML.replace(/[↑↓]/, '').trim() )
}

// click on th for sorting
document.getElementById('table').onclick = function (e) {  
  if (e.target.tagName != 'TH' || document.getElementsByTagName('td').length <= 6 ) return;
  reverse = -((+reverse) || -1); //flip reverce
  sortTable(e.target.cellIndex, reverse);
  clearArrow();
  addArrow( e.target, reverse)
};