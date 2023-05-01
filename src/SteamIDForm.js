import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'

function SteamIDForm(props) {
	const {onDataReceived} = props;
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
	};

	const handleSubmit = (event) => {
		setIsLoading(true);
		event.preventDefault();
		const regex = /(?:\/(id|profiles)\/([\w-]+))|(?:^(\d{17,}))$/;
		const result = query.match(regex);
		let steamid = "-1"
		if (result) {
			// console.log(result[1], result[2]);
			console.log(result);
			if (result[1] === "id") {
				// Search steamid by profile name (result[2])
			} else if (result[1] === "profiles") {
				steamid = result[2];
			} else if (result[1] === undefined) {
				steamid = result[3];
			} else {
				// User invalid
			}
		} else {
			console.log("Invalid");
			setIsLoading(false);
		}
		if (steamid !== "-1") {
				// fetch(`/data/${query}/russian`)
				fetch(`/data.json`)
					.then((response) => response.json())
					.then((data) => {
						setIsLoading(false);
						onDataReceived(data);
					})
					.catch((error) => {
						setIsLoading(false);
						console.error(error);
					});
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Profile URL or SteamID:</Form.Label>
				<Form.Control id='query' onChange={handleQueryChange}/>
				<Form.Text muted>
					https://steamcommunity.com/id/onyx1a / onyx1a / 76561198089758289
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={isLoading}>
				{isLoading ? (
					<>
						<Spinner
							as="span"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
						Loading...
					</>
				): "Search"}
			</Button>
		</Form>
	);
}

export default SteamIDForm;