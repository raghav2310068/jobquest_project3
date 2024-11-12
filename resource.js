document.addEventListener("DOMContentLoaded", () => {
  const videoCards = document.querySelectorAll(".video-card");

  videoCards.forEach((card) => {
    const videoId = card.getAttribute("data-video-id");
    const thumbnail = card.querySelector(".video-thumbnail");

    // On hover, show a YouTube preview
    card.addEventListener("mouseenter", () => {
      thumbnail.innerHTML = `<iframe 
          width="200" 
          height="120" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}"
          frameborder="0" allow="autoplay; encrypted-media"
          allowfullscreen></iframe>`;
    });

    // On mouse leave, revert back to the image thumbnail
    card.addEventListener("mouseleave", () => {
      thumbnail.innerHTML = `<img src="thumbnail${videoId}.jpg" alt="Video Thumbnail">`;
    });

    // On click, open video in a new tab
    card.addEventListener("click", () => {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    });
  });
});
