// imports
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// consts
const API_KEY = 'AIzaSyCs-xGMalkiyWH86FwhaLzfaeQWBwZxrrA';

// App component
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    componentWillMount() {
        this.videoSearch('React tutorials');
    }

    videoSearch(term){
        YTSearch({ key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        })
    }

    render() {
        // adding lodash debounce method to slow down(throttle) function density

        const videoSearch = _.debounce((term) => {
            this.videoSearch(term),
            1000
        });

        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetail 
                    video={this.state.selectedVideo} />
                <VideoList 
                    videos={this.state.videos} 
                    onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}/>
            </div>
        )
    }
}

// Render component
ReactDOM.render(<App />, document.querySelector('.container'));
