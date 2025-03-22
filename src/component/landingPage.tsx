import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LandPage = () => {
	const movies = [
		{
			adult: false,
			backdrop_path: '/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg',
			// genre_ids: (3)[(10749, 878, 53)],
			id: 950396,
			original_language: 'en',
			original_title: 'The Gorge',
			overview:
				'Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.',
			popularity: 584.464,
			poster_path: '/7iMBZzVZtG0oBug4TfqDb9ZxAOa.jpg',
			release_date: '2025-02-13',
			title: 'The Gorge',
			video: false,
			vote_average: 7.77,
			vote_count: 1739,
		},
		{
			adult: false,
			backdrop_path: '/sGFR4zSOsogo77Wi5XI0P5il0ek.jpg',
			// genre_ids: (3)[(28, 53, 80)],
			id: 1126166,
			original_language: 'en',
			original_title: 'Flight Risk',
			overview:
				"A U.S. Marshal escorts a government witness to trial after he's accused of getting involved with a mob boss, only to discover that the pilot who is transporting them is also a hitman sent to assassinate the informant. After they subdue him, they're forced to fly together after discovering that there are others attempting to eliminate them.",
			popularity: 555.547,
			poster_path: '/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg',
			release_date: '2025-01-22',
			title: 'Flight Risk',
			video: false,
			vote_average: 6.1,
			vote_count: 401,
		},
		{
			adult: false,
			backdrop_path: '/kEYWal656zP5Q2Tohm91aw6orlT.jpg',
			// genre_ids: (3)[(18, 35, 10749)],
			id: 1064213,
			original_language: 'en',
			original_title: 'Anora',
			overview:
				'A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.',
			popularity: 448.424,
			poster_path: '/qh8m8Udz0sCa5gy9VaqfHPh0yPM.jpg',
			release_date: '2024-10-14',
			title: 'Anora',
			video: false,
			vote_average: 7.1,
			vote_count: 1512,
		},
		{
			adult: false,
			backdrop_path: '/1w8kutrRucTd3wlYyu5QlUDMiG1.jpg',
			// genre_ids: (3)[(12, 10751, 16)],
			id: 762509,
			original_language: 'en',
			original_title: 'Mufasa: The Lion King',
			overview:
				'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.',
			popularity: 391.149,
			poster_path: '/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
			release_date: '2024-12-18',
			title: 'Mufasa: The Lion King',
			video: false,
			vote_average: 7.466,
			vote_count: 1579,
		},
		{
			adult: false,
			backdrop_path: '/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg',
			// genre_ids: (4)[(16, 12, 10751, 35)],
			id: 1241982,
			original_language: 'en',
			original_title: 'Moana 2',
			overview:
				"After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
			popularity: 381.44,
			poster_path: '/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg',
			release_date: '2024-11-21',
			title: 'Moana 2',
			video: false,
			vote_average: 7.156,
			vote_count: 1799,
		},
		{
			adult: false,
			backdrop_path: '/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg',
			// genre_ids: (4)[(28, 878, 35, 10751)],
			id: 939243,
			original_language: 'en',
			original_title: 'Sonic the Hedgehog 3',
			overview:
				'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.',
			popularity: 364.976,
			poster_path: '/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg',
			release_date: '2024-12-19',
			title: 'Sonic the Hedgehog 3',
			video: false,
			vote_average: 7.738,
			vote_count: 2098,
		},
		{
			adult: false,
			backdrop_path: '/ywe9S1cOyIhR5yWzK7511NuQ2YX.jpg',
			// genre_ids: (3)[(28, 53, 878)],
			id: 822119,
			original_language: 'en',
			original_title: 'Captain America: Brave New World',
			overview:
				'After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.',
			popularity: 309.068,
			poster_path: '/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
			release_date: '2025-02-12',
			title: 'Captain America: Brave New World',
			video: false,
			vote_average: 6.2,
			vote_count: 923,
		},
	];
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const changeMovie = () => {
		setCurrentIndex((prev) => (prev + 1) % movies.length);
	};
	useEffect(() => {
		const interval = setInterval(changeMovie, 10000);
		return () => clearInterval(interval);
	}, []);
	const currentMovie = movies[currentIndex];
	return (
		<>
			<div className="flex justify-center items-center" id="home">
				<div className=" w-[90%] h-[400px] bg-[#000] text-white">
					<img
						src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
						alt={currentMovie.title}
						className="w-[100%] h-[90vh]"
					/>
					<div className="mt-[-250px] ml-[80px] ">
						<h2 className="relative text-[30px] font-bold text-[#fff]">
							{currentMovie.title}
						</h2>
						<p className="relative text-[14px] mt-[10px] text-[#fff]">
							{currentMovie.overview}
						</p>
						<p className="text-xl mt-[10px]">
							Rating:
							<span className="font-bold ml-[10px]">
								{currentMovie.vote_average}
							</span>
						</p>
						<button
							className="text-white bg-[red] p-[10px] mt-[10px] text-2xl font-bold rounded "
							onClick={() => navigate(`/trailer/${currentMovie.id}`)}
						>
							Play Now{' '}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default LandPage;
