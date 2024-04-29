// API 옵션
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmM4ZTEyN2RiM2FkNjkxYzFmMzhlNmVjMzA4ZDMxMCIsInN1YiI6IjY2Mjc1MTdiN2E5N2FiMDE2MzhkZmNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IsdwlMkyp80ZqFcaKlPyhi-w1wlAo0Ppb03ye2tMJRA'
    }
};

// 카드 만드는 함수
function createCard(id, poster_path, title, overview, vote_average) {
    //let $cardList = document.getElementsByClassName('card-list');
    //console.log($cardList);
    let $cardDiv = document.createElement('div');
    $cardDiv.classList.add('movie-card');
    $cardDiv.id = id;
    $cardDiv.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="">
    <h3 class="moive-title">${title}</h3>
    <p>${overview}</p>
    <p>평점:${vote_average}</p>`;

    document.querySelector('.card-list').append($cardDiv)

    // 클릭 이벤트 생성(카드 클릭시 alert창)
    $cardDiv.addEventListener('click', (e) => {
        alert(e.currentTarget.id);
    })
}

// 영화 검색하는 함수
function searchMovie() {
    $search_input = document.querySelector('#search-input');
    //// 영화 검색 API
    // fetch(`https://api.themoviedb.org/3/search/movie?query=${$search_input.value}&include_adult=false&language=ko-KR&page=1`, options)
    //     .then(response => response.json())
    //     .then(response => {
    //         let movies = response.results;
    //         let $cardList = document.querySelector('.card-list');
    //         $cardList.innerHTML = ""; // 자식 노드 모두 비우기
    //         movies.forEach(movie => {
    //             createCard(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
    //         });
    //     })
    //     .catch(err => console.error(err));

    let $moiveList = document.querySelectorAll('.movie-card');
    let moives = Array.from($moiveList).filter((parent)=>{
        return parent.querySelector('.moive-title').innerHTML.includes($search_input.value);
    })
    let $cardList = document.querySelector('.card-list');
    $cardList.innerHTML = ""; // 자식 노드 모두 비우기
    
    // 검색 결과만 화면에 표시
    Array.from(moives).forEach((x)=>{
        $cardList.append(x);
    })
    
}

// 영화 API 가져오기
fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=1', options)
    .then(response => response.json())
    .then(response => {
        //console.log(response)
        let movies = response.results;
        let $cardList = document.querySelector('.card-list');
        movies.forEach(movie => {
            createCard(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
        });

    }).catch(err => console.error(err));

// 검색 버튼 클릭 이벤트
function handleSearch(event) {
    event.preventDefault(); // 새로고침 방지
    searchMovie();
}

// 키보드 커서 자동 위치
document.addEventListener('DOMContentLoaded', () => document.querySelector('#search-input').focus());