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

// 카드 검색하는 함수
function searchMovie(moiveList) {
    const $search_input = document.querySelector('#search-input');
    // 검색한 결과 카드 반환
    const moives = moiveList.filter((moive)=>{
        return moive.title.toLowerCase().includes($search_input.value.toLowerCase());
    })
    document.querySelector('.card-list').innerHTML = ""; // 카드 공간 비우기
    // 검색한 영화 카드 만들기
    moives.forEach((movie)=>{
        createCard(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
    })
}

// 영화 가져오기 API
async function getMoiveList() {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .catch(err => console.error(err));
    return response.results;
}

// 영화 만들기
async function movie() {
    const moiveList = await getMoiveList();
    // 카드 만들기
    moiveList.forEach((movie)=>{
        createCard(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
    })
}

// 함수 실행
movie();

// 검색 버튼 클릭 이벤트
async function handleSearch(event) {
    event.preventDefault(); // 새로고침 방지
    const moiveList = await getMoiveList();
    searchMovie(moiveList);
}

// 키보드 커서 자동 위치
document.addEventListener('DOMContentLoaded', () => document.querySelector('#search-input').focus());