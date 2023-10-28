import "./videoPopUp.scss";

const VideoPopUp = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        <iframe
          width={"100%"}
          height={"100%"}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPopUp;
