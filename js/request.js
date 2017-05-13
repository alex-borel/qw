const apiKey = 'AIzaSyB-votjYYzjsN9OOjd8-8r3g4ep1VkZYMQ';

export default class Request {
    chooseVideosCount() {
        if (window.innerWidth > 1600) {
            Request.videosCount = 4;
        } else if (window.innerWidth > 1250) {
            Request.videosCount = 3;
        } else if (window.innerWidth > 930) {
            Request.videosCount = 2;
        } else {
            Request.videosCount = 1;
        }
    }

    initialization(render, slidePos) {
        Request.counter = 1;
        Request.searchResult = true;
        Request.pageNumber = 0;
        Request.searchText = document.querySelector('.search').value;
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=${Request.videosCount}&q=${Request.searchText}`;
        Request.openXHRRequest(url, false, false, render, slidePos);
    }

    static isSearchText() {
        return Request.searchResult;
    }

    static openXHRRequest(url, isStatistics, index, render) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(xhr.responseText);
                if (isStatistics) {
                    for (let i = 0; i < response.items.length; i++) {
                        document.querySelectorAll('.viewers')[index + i].innerHTML = response.items[i].statistics.viewCount;
                    }
                } else {
                    Request.onSearchResponse(response);
                }
                if (render) {
                    render.addNewSlide();
                }
            }
        };
    }

    static onSearchResponse(response) {
        let videoIDs = '';
        for (let i = 0; i < response.items.length; i++) {
            const title = response.items[i].snippet.title;
            const description = response.items[i].snippet.description;
            const date = response.items[i].snippet.publishedAt.slice(0, 10);
            const videoID = response.items[i].id.videoId;
            const author = response.items[i].snippet.channelTitle;
            const previewUrl = response.items[i].snippet.thumbnails.medium.url;
            videoIDs += videoID;
            if (i !== response.items.length - 1) {
                videoIDs += ',';
            }
            const index = response.items.length * Request.pageNumber + i;
            document.querySelectorAll('.title')[index].innerHTML = title;
            document.querySelectorAll('.title')[index].setAttribute('href', `http://www.youtube.com/watch?v=${videoID}`);
            document.querySelectorAll('.description')[index].innerHTML = description;
            document.querySelectorAll('.date')[index].innerHTML = date;
            document.querySelectorAll('.author')[index].innerHTML = author;
            document.querySelectorAll('.preview')[index].setAttribute('src', previewUrl);
            document.querySelectorAll('.coverPreview')[index].dataset['id'] = videoID;
        }

        let url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIDs}&part=snippet,statistics`;

        if (Request.pageNumber === 0) {
            Request.firstTwoSlidesID = videoIDs;
        } else if (Request.pageNumber === 1) {
            Request.firstTwoSlidesID += ',' + videoIDs;
            url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${Request.firstTwoSlidesID}&part=snippet,statistics`;
            Request.openXHRRequest(url, true, 0);
        } else {
            Request.openXHRRequest(url, true, response.items.length * Request.pageNumber);
        }
        Request.nextPageToken = response.nextPageToken;
    }

    newRequest() {
        if (Request.searchText && Request.nextPageToken) {
            Request.pageNumber++;
            const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=${Request.videosCount}&pageToken=${Request.nextPageToken}&q=${Request.searchText}`;
            Request.openXHRRequest(url);
        }
    }
}
