import { useState } from 'react';
import config from '../../config.json';
import axios from 'axios';
const MovieSearch = () => {
	const [videos, setVideos] = useState([]);
	const YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
	const [query, setQuery] = useState('');

	const fetchVideos = async () => {
		try {
			const res = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=15&key=${YOUTUBE_API_KEY}`
			);
			if (res.data.items && res.data.items.length) {
				setVideos(res.data.items);
			}
		} catch (error) {
			return error;
		}
	};
	console.log(videos);
	return (
		<>
			<div className="bg-black h-[100vh]">
				<div className="flex justify-center items-center">
					<div className="flex gap-[20px] text-white ">
						<input
							type="text"
							placeholder="Search for movies"
							onChange={(e) => setQuery(e.target.value)}
							value={query}
							className="border-2 border-white"
						/>
						<button
							onClick={fetchVideos}
							className="text-[red] text-xl font-bold"
						>
							Search
						</button>
					</div>{' '}
				</div>
				<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
					{videos.map((video) => (
						<div key={video.id.videoId} className="p-4 bg-[white] rounded-md">
							<iframe
								width="100%"
								height="200"
								src={`https://www.youtube.com/embed/${video.id.videoId}`}
								frameBorder="0"
								allow="autoplay; encrypted-media"
								allowFullScreen
							></iframe>
							<h3 className="text-lg font-bold text-black">
								{video.snippet.title}
							</h3>
							<p>{video.snippet.publishedAt}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MovieSearch;
