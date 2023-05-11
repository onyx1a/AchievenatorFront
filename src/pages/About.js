import { useState } from "react";
import { Placeholder, Spinner } from "react-bootstrap";

const About = () => {

  const [itchLoaded, setItchLoaded] = useState(false);
  const handleItchLoad = () => {
    setItchLoaded(true);
  };

  return(
    <>
      {!itchLoaded && (
        <>
          <Spinner animation="grow" variant="light"/>
        </>
      )}
      <iframe frameborder="0" src="https://itch.io/embed/1972127?linkback=true&amp;border_width=0&amp;dark=true" width="550" height="165" onLoad={handleItchLoad}>
        <a href="https://onyx1a.itch.io/solastia">Solastia by onyx1a</a>
      </iframe>
      <hr/>
      <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('Support Me on Ko-fi', '#e04a28', 'B0B3KOMMY');kofiwidget2.draw();</script> 
    </>
  );
};

export default About;